from plugins import s3_client


async def upload_file_to_storage(file, filename: str) -> str:
    url = await s3_client.upload_file(file, filename)
    return url


async def delete_file_from_storage(url: str):
    filename = url.split("/")[-1]
    await s3_client.delete_file(filename)
