from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends
from .jwt_tokens import verify_token, decode_token
from fastapi import HTTPException
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="users/login")

def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = decode_token(token)
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token: missing user ID")
        return user_id
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))
    
    
    
