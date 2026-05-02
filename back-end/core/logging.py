import sys
import re
from loguru import logger

def obfuscate_secrets(record):
    msg = str(record["message"])
    
    # Obfuscate email (keep first letter and domain)
    msg = re.sub(
        r'([a-zA-Z0-9_.+-])[a-zA-Z0-9_.+-]*(@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)',
        r'\1***\2',
        msg
    )
    
    # Obfuscate passwords and tokens
    msg = re.sub(
        r'(?i)(password|token|access_token|refresh_token)\s*[:=]\s*(["\']?)[^\s,"\']+((["\']?))',
        r'\1: \2***\3',
        msg
    )
    
    record["message"] = msg

# Configure loguru
logger.remove()
logger.add(
    sys.stdout,
    format="<green>{time:YYYY-MM-DD HH:mm:ss}</green> | <level>{level: <8}</level> | <cyan>{name}</cyan>:<cyan>{function}</cyan>:<cyan>{line}</cyan> - <level>{message}</level>",
    level="INFO"
)
logger.add(
    "logs/app.log",
    rotation="10 MB",
    retention="10 days",
    format="{time:YYYY-MM-DD HH:mm:ss} | {level: <8} | {name}:{function}:{line} - {message}",
    level="INFO"
)

logger = logger.patch(obfuscate_secrets)
