import os
import time
import subprocess
from datetime import datetime
import sentry_sdk
from core.config import settings


sentry_sdk.init(
    dsn=settings.SENTRY_DNS,
    send_default_pii=True,
    traces_sample_rate=1.0,
    profiles_sample_rate=1.0,
)

def backup_database():
    if not os.path.exists(settings.BACKUP_DIR):
        os.makedirs(settings.BACKUP_DIR)
    date_str = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(settings.BACKUP_DIR, f"db_{date_str}.backup")

    cmd = [
        "docker", "exec", 
        "-i", 
        "-e", f"PGPASSWORD={settings.DB_PASS}", # Передаем пароль внутрь контейнера
        "postgres_db",
        "pg_dump",
        "-U", settings.DB_USER,
        "-F", "c",
        settings.DB_NAME
    ]
    env = os.environ.copy()
    env["PGPASSWORD"] = settings.DB_PASS

    try:
        with open(backup_file, "wb") as f:
            subprocess.run(cmd, check=True, stdout=f, stderr=subprocess.PIPE)
        msg = f"Backup done {os.path.basename(backup_file)}"
        sentry_sdk.capture_message(msg, level="info")
        return True
    except subprocess.CalledProcessError as e:
        msg = f"Backup failed {e.stderr.decode()}"
        sentry_sdk.capture_message(msg, level="error")
        return False
    except Exception as e:
        msg = f"Backup failed {str(e)}"
        sentry_sdk.capture_message(msg, level="error")
        return False
       
def cleanup_old_backups():
    now = time.time()
    for filename in os.listdir(settings.BACKUP_DIR):
        file_path = os.path.join(settings.BACKUP_DIR, filename)
        if os.path.isfile(file_path):
            if os.path.getmtime(file_path) < now - (settings.DAYS_TO_KEEP * 86400):
                os.remove(file_path)
                msg = f"Deleted backup: {filename}"
                sentry_sdk.capture_message(msg, level="info")
        
if __name__ == "__main__":
    is_success = backup_database()
    if is_success:
        cleanup_old_backups()
    
    