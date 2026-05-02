import secrets
import hashlib
from mnemonic import Mnemonic
from typing import Tuple
import os
import sys
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from core.config import settings
from dotenv import load_dotenv
load_dotenv()

P = int(os.getenv('P_KEY'), 16)
G = int(os.getenv('G_KEY'))

class ZKPService:
    mnemo = Mnemonic("english")
    @classmethod
    def generate_user_secrets(cls) -> Tuple[str, str]:
        entropy = secrets.token_bytes(16)
        mnemonic_phrase = cls.mnemo.generate(strength=128)
        s = int.from_bytes(entropy, byteorder="big")
        print(f'G = {G}, s = {s}, P = {P}')
        v = pow(G, s, P)
        return mnemonic_phrase, str(v)

    @classmethod
    def mnemonic_to_s(cls, mnemonic_phrase: str) -> int:
        if not cls.mnemo.check(mnemonic_phrase):
            raise ValueError("Invalid mnemonic phrase")
        entropy = cls.mnemo.to_entropy(mnemonic_phrase)
        return int.from_bytes(entropy, byteorder="big")

    @staticmethod
    def register_commit() -> Tuple[int, int]:
        r = secrets.randbelow(P - 1) + 1
        x = pow(G, r, P)
        return r, x

    @staticmethod
    def compute_response(r, c, s):
        return (r + c * s) % (P - 1)

    @staticmethod
    def verify_proof(x, v, c, y):
        left = pow(G, y, P)  
        right = (x * pow(v, c, P)) % P
        return left == right


    