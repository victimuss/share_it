import pytest
from datetime import datetime, timedelta, timezone
import os
import sys
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from auth.jwt_tokens import create_access_token, verify_token, create_refresh_token, decode_token

def test_create_and_decode_token_success():
    user_payload = {'sub':'1'}


    token = create_access_token(data=user_payload)
    decoded_data = decode_token(token)

    assert isinstance(token, str)
    assert len(token.split(".")) == 3
    assert decoded_data["sub"] == '1'
    assert "exp" in decoded_data

def test_decode_invalid_token_fails():
    fake_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake_payload.fake_signature"
    with pytest.raises(ValueError):
        decode_token(fake_token)
    

