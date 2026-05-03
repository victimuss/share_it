import aioboto3
import os
from core.config import settings
from core.logging import logger

class S3Storage:
    def __init__(self):
        self.session = aioboto3.Session()
        self.config = {
            "endpoint_url": settings.S3_ENDPOINT,
            "aws_access_key_id": settings.S3_ACCESS_KEY,
            "aws_secret_access_key": settings.S3_SECRET_KEY,
        }

    def get_client(self):
        return self.session.client("s3", **self.config)

    async def upload_file(self, local_path: str, object_name: str, bucket_name: str = None):
        print(f"ПЫТАЮСЬ ЗАГРУЗИТЬ ФАЙЛ: {local_path}")
        print(f"РАЗМЕР ФАЙЛА: {os.path.getsize(local_path)} байт")
        bucket = bucket_name or settings.S3_BUCKET_NAME
        print(f"ВЕДЁТСЯ ЗАГРУЗКА: {object_name}")

        async with self.get_client() as s3:
            with open(local_path, "rb") as file_data:
                await s3.put_object(
                    Bucket=bucket,
                    Key=object_name, 
                    Body=file_data,
                    ContentType="image/jpeg" 
                )
        print(f"ФАЙЛ УСПЕШНО ЗАГРУЖЕН В MINIO!")
        return f"{settings.S3_ENDPOINT}/{bucket}/{object_name}"

    async def delete_file(self, object_name: str, bucket_name: str = None):
        async with self.get_client() as s3:
            try:
                await s3.delete_object(Bucket=bucket, Key=object_name)
                return True
            except Exception as e:
                logger.error(f"Ошибка при удалении из S3: {e}")
                return False


s3_storage = S3Storage()