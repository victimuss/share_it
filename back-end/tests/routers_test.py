import pytest
from datetime import datetime, timedelta, timezone
import os
import sys
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from fastapi.testclient import TestClient
from main import app

@pytest.fixture(scope="module")
def client():
    with TestClient(app) as c:
        yield c

def test_register_user_success(client):
    import uuid
    uid = uuid.uuid4().hex[:6]
    payload = {
        'user_name': f'test_user_{uid}',
        'email': f'test_new_{uid}@gmail.com',
        'password': 'test_password'
    }

    response = client.post('/users/signup', json=payload)
    assert response.status_code == 200, f"Expected status code 200, got {response.status_code}. Detail: {response.text}"
    data = response.json()
    assert data.get('user_name') == payload['user_name'], "User_name does not match"


def test_login_user_success(client):
    import uuid
    uid = uuid.uuid4().hex[:6]
    # Сначала создаем пользователя
    payload = {
        'user_name': f'test_login_{uid}',
        'email': f'test_login_{uid}@gmail.com',
        'password': 'test_password'
    }
    client.post('/users/signup', json=payload)

    # Теперь тестируем логин
    login_payload = {
        'email': payload['email'],
        'password': 'test_password'
    }
    response = client.post('/users/login', json=login_payload)

    assert response.status_code == 200, f"Expected status code 200, got {response.status_code}. Detail: {response.text}"
    data = response.json()
    assert data.get('access_token') and data.get('refresh_token') and data.get('token_type') and data.get('user'), "Invalid data format in response"


def test_email_duplicate_failed(client):
    import uuid
    uid = uuid.uuid4().hex[:6]
    payload = {
        'user_name': f'test_dup_{uid}',
        'email': f'test_dup_{uid}@gmail.com',
        'password': 'test_password'
    }

    response = client.post('/users/signup', json=payload)
    assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"
    
    response2 = client.post('/users/signup', json=payload)
    assert response2.status_code == 400, f"Expected status code 400 for duplicate, got {response2.status_code}"
    
