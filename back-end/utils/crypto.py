import nacl.signing
import nacl.encoding
from nacl.exceptions import BadSignatureError

def verify_signature(public_key: str, message: str, signature: str) -> bool:
    try:
        verify_key = nacl.signing.VerifyKey(public_key, encoder=nacl.encoding.HexEncoder)
        verify_key.verify(
            message.encode(), 
            nacl.encoding.HexEncoder.decode(signature)
        )
        return True
    except BadSignatureError:
        return False
    except Exception as e:
        return False
