import pytest
import asyncio
import nacl.signing
import nacl.encoding
from httpx import AsyncClient, ASGITransport
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from databases.main_databases import get_db, async_session
from databases.users_db.users_db import User
from redis import asyncio as aioredis
from auth.jwt_tokens import create_access_token, decode_token
from main import app

# --- HELPERS ---

def sign_nonce(private_key_hex: str, nonce: str) -> str:
    """Имитация подписи на стороне телефона"""
    signing_key = nacl.signing.SigningKey(private_key_hex, encoder=nacl.encoding.HexEncoder)
    signed_message = signing_key.sign(nonce.encode())
    return signed_message.signature.hex()

# --- FIXTURES ---


@pytest.fixture
async def client():
    """Асинхронный клиент для запросов"""
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        yield ac

@pytest.fixture
async def redis_test_client():
    client = aioredis.from_url("redis://localhost", decode_responses=True)
    try:
        yield client
    finally:
        await client.aclose()

@pytest.fixture(autouse=True)
def patch_auth_router_redis(redis_test_client):
    from routers import auth_router
    original_redis = auth_router.redis
    auth_router.redis = redis_test_client
    yield
    auth_router.redis = original_redis

@pytest.fixture
async def db_session():
    """Фикстура для прямого доступа к тестовой БД"""
    async with async_session() as session:
        yield session
        # После теста можно сделать rollback
        await session.rollback()

# --- JWT TESTS ---

def test_create_and_decode_token_success():
    user_payload = {'sub': '1'}
    token = create_access_token(data=user_payload)
    decoded_data = decode_token(token)

    assert isinstance(token, str)
    assert len(token.split(".")) == 3
    assert decoded_data["sub"] == '1'
    assert "exp" in decoded_data

def test_decode_invalid_token_fails():
    fake_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake.fake"
    with pytest.raises(ValueError):
        decode_token(fake_token)

# --- INTEGRATION TESTS ---

@pytest.mark.asyncio
async def test_challenge_binding_to_user_id(client, redis_test_client):
    test_user_id = 11
    response = await client.post("/auth/request_challenge", params={"user_id": test_user_id})
    assert response.status_code == 200
    
    nonce_from_api = response.json()["nonce"]
    nonce_in_redis = await redis_test_client.get(f"auth:nonce:id:{test_user_id}")
    
    assert nonce_in_redis == nonce_from_api
    await redis_test_client.delete(f"auth:nonce:id:{test_user_id}")

@pytest.mark.asyncio
async def test_challenge_binding_to_user_id(client, redis_test_client, db_session: AsyncSession): 
    new_user = User(
        public_key="test_public_key_123",
        user_name="test_pilot",
        email="test@pilot.com",
        tag="@test12",
        hashed_password="test_password"
    )
    db_session.add(new_user)
    await db_session.commit()
    await db_session.refresh(new_user)
    

    real_user_id = new_user.id

    response = await client.post("/auth/request_challenge", params={"user_id": real_user_id})
    assert response.status_code == 200
    

    nonce_from_api = response.json()["nonce"]
    nonce_in_redis = await redis_test_client.get(f"auth:nonce:id:{real_user_id}")
    
    assert nonce_in_redis == nonce_from_api
    await redis_test_client.delete(f"auth:nonce:id:{real_user_id}")