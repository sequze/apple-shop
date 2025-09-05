import asyncio
import certifi
from contextlib import asynccontextmanager

from aiobotocore.session import get_session
from botocore.exceptions import ClientError
from core.config import settings


class UploadingFileError(Exception):
    pass

class InvalidFileTypeError(Exception):
    pass

class DeleteFileError(Exception):
    pass


class S3Client:
    def __init__(
        self,
        access_key: str,
        secret_key: str,
        endpoint_url: str,
        bucket_name: str,
        domain: str,
    ):
        self.config = {
            "aws_access_key_id": access_key,
            "aws_secret_access_key": secret_key,
            "endpoint_url": endpoint_url,
            "verify": certifi.where(),
        }
        self.bucket_name = bucket_name
        self.session = get_session()
        self.domain = domain

    @asynccontextmanager
    async def get_client(self):
        async with self.session.create_client("s3", **self.config) as client:
            yield client

    def _get_content_type(self, filename: str) -> str:
        """Определяем Content-Type по расширению файла."""
        ext = filename.lower().split(".")[-1]
        if ext in ("jpg", "jpeg"):
            return "image/jpeg"
        elif ext == "png":
            return "image/png"
        elif ext == "gif":
            return "image/gif"
        return "application/octet-stream"

    async def upload_file(
        self,
        file,
        filename: str,
    ) -> str:
        """Загрузка файла в S3 с публичным доступом и корректным Content-Type."""
        try:
            async with self.get_client() as client:
                await client.put_object(
                    Bucket=self.bucket_name,
                    Key=filename,
                    Body=file,
                    ACL="public-read",  # 👈 делаем файл доступным публично
                    ContentType=self._get_content_type(filename),  # 👈 ставим правильный MIME-тип
                )
                return f"{self.domain}/{filename}"
        except ClientError as e:
            raise UploadingFileError from e

    async def delete_file(self, object_name: str):
        """Удаление файла из S3."""
        try:
            async with self.get_client() as client:
                await client.delete_object(Bucket=self.bucket_name, Key=object_name)
        except ClientError as e:
            raise DeleteFileError from e


s3_client = S3Client(
    access_key=settings.s3.access_key,
    secret_key=settings.s3.secret_key,
    endpoint_url=settings.s3.endpoint_url,
    bucket_name=settings.s3.bucket_name,
    domain=settings.s3.domain,
)
