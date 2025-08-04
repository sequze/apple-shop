from sqlalchemy.ext.asyncio.session import AsyncSession

from core.models import ProductImage
from core.repositories.uow import UnitOfWork
from plugins.s3_storage.client import UploadingFileError, DeleteFileError, InvalidFileTypeError
from plugins.s3_storage.utils import upload_file_to_storage, delete_file_from_storage
from services.product_image.repository import ProductImageRepository
from services.product_image.schemas import ProductImageDTO, ProductImageCreate, \
    ProductImageUpdateSchema
from fastapi import UploadFile


class ProductImageNotFoundError(Exception):
    pass


class MainImageAlreadyExistsError(Exception):
    pass


class ProductImageService:
    def __init__(self, repository: ProductImageRepository, uow: UnitOfWork):
        self.repository = repository
        self.uow = uow

    async def __find_by_id(self, session: AsyncSession, id: int) -> ProductImage:
        image = await self.repository.get_by_id(session, id)
        if image is None:
            raise ProductImageNotFoundError
        return image

    async def __validate_main_image(self, session: AsyncSession, product_id: int):
        images = await self.repository.get_by_filters(
            session, {"product_id": product_id, "is_main": True}, one=False
        )
        for i in images:
            i.is_main = False
        await session.flush()

    async def create(self, data: ProductImageCreate, file: UploadFile) -> ProductImageDTO:
        if not file.content_type.startswith("image/"):
            raise InvalidFileTypeError
        async with self.uow as uow:
            if data.is_main:
                await self.__validate_main_image(uow.session, product_id=data.product_id)
            file_binary = await file.read()
            try:
                file_path = await upload_file_to_storage(file_binary, file.filename)
            except UploadingFileError:
                raise
            data_dict = {
                "url": file_path,
                "alt_text": data.alt_text,
                "is_main": data.is_main,
                "product_id": data.product_id,
            }
            image = await self.repository.create(uow.session, data_dict)
            await uow.commit()
            return ProductImageDTO.model_validate(image)

    async def get_all(self) -> list[ProductImageDTO]:
        async with self.uow as uow:
            products = await self.repository.get_all(uow.session)
            return [ProductImageDTO.model_validate(product) for product in products]

    async def get_by_id(self, id: int) -> ProductImageDTO:
        async with self.uow as uow:
            image = await self.__find_by_id(uow.session, id)
            return ProductImageDTO.model_validate(image)

    async def update(self, data: ProductImageUpdateSchema, id: int) -> ProductImageDTO:
        async with self.uow as uow:
            image = await self.__find_by_id(uow.session, id)
            if data.is_main and not image.is_main:
                await self.__validate_main_image(uow.session, product_id=image.product_id)
            await self.repository.update(uow.session, data.model_dump(exclude_unset=True), image)
            await uow.session.commit()
            await uow.session.refresh(image)
            return ProductImageDTO.model_validate(image)

    async def delete(self, id: int) -> ProductImageDTO:
        async with self.uow as uow:
            image = await self.__find_by_id(uow.session, id)
            try:
                await delete_file_from_storage(image.url)
            except DeleteFileError:
                raise
            await self.repository.delete(uow.session, image)
            await uow.commit()
            return ProductImageDTO.model_validate(image)
