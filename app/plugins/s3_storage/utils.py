from fastapi import UploadFile

from plugins import s3_client
from plugins.s3_storage.client import InvalidFileTypeError


async def upload_image(file: UploadFile, filename: str) -> str:
    file_to_upload = await file.read()
    if not file.content_type.startswith("image/"):
        raise InvalidFileTypeError
    url = await s3_client.upload_file(file_to_upload, filename)
    return url


async def delete_file_from_storage(url: str):
    filename = url.split("/")[-1]
    await s3_client.delete_file(filename)
