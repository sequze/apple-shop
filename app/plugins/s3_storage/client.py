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
        }
        self.bucket_name = bucket_name
        self.session = get_session()
        self.domain = domain

    @asynccontextmanager
    async def get_client(self):
        async with self.session.create_client("s3", **self.config) as client:
            yield client

    async def upload_file(
            self,
            file,
            filename: str,
    ) -> str:
        try:
            async with self.get_client() as client:
                await client.put_object(
                    Bucket=self.bucket_name,
                    Key=filename,
                    Body=file,
                )
                return f"{self.domain}/{filename}"
        except ClientError as e:
            raise UploadingFileError

    async def delete_file(self, object_name: str):
        try:
            async with self.get_client() as client:
                await client.delete_object(Bucket=self.bucket_name, Key=object_name)
        except ClientError as e:
            raise DeleteFileError


s3_client = S3Client(
    access_key=settings.s3.access_key,
    secret_key=settings.s3.secret_key,
    endpoint_url=settings.s3.endpoint_url,
    bucket_name=settings.s3.bucket_name,
    domain=settings.s3.domain,
)
