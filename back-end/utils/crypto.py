from eth_account.messages import encode_defunct
from eth_account import Account

def verify_signature(public_key: str, message: str, signature: str) -> bool:
    try:
        print(f"DEBUG: verify_signature called.")
        print(f"DEBUG: public_key: {public_key}")
        print(f"DEBUG: message: {message}")
        print(f"DEBUG: signature: {signature}")
        
        # ethers.js signMessage prepends the standard Ethereum message prefix
        msg_hash = encode_defunct(text=message)
        
        # Recover the address from the signature
        recovered_address = Account.recover_message(msg_hash, signature=signature)
        print(f"DEBUG: recovered_address: {recovered_address}")
        
        # Compare the recovered address with the public_key (case-insensitive)
        return recovered_address.lower() == public_key.lower()
    except Exception as e:
        print(f"Signature verification failed: {e}")
        return False
