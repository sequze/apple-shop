# services/product_color/service.py
from sqlalchemy.ext.asyncio import AsyncSession

from core.models import ProductColor, Product
from core.repositories.uow import UnitOfWork
from plugins.s3_storage.client import DeleteFileError
from plugins.s3_storage.utils import delete_file_from_storage
from .repository import ProductColorRepository
from .schemas import (
    ProductColorCreateSchema,
    ProductColorUpdateSchema,
    ProductColorDTO,
)
from ..product.exceptions import ProductNotFoundError
from ..product_image.repository import ProductImageRepository


class ProductColorNotFoundError(Exception):
    """ProductColor not found"""

class ProductColorService:
    repository = ProductColorRepository
    def __init__(self, uow: UnitOfWork):
        self.uow = uow

    async def create(self, data: ProductColorCreateSchema) -> ProductColorDTO:
        async with self.uow as uow:
            product = await uow.session.get(Product, data.product_id)
            if not product:
                raise ProductNotFoundError
            color = await self.repository.create(uow.session, data.model_dump())
            await uow.commit()
            return ProductColorDTO.model_validate(color)

    async def update(self, id: int, data: ProductColorUpdateSchema) -> ProductColorDTO:
        async with self.uow as uow:
            color = await self.repository.get_by_id(uow.session, id)
            if color is None:
                raise ProductColorNotFoundError
            await self.repository.update(uow.session, data.model_dump(exclude_unset=True), color)
            await uow.commit()
            await uow.session.refresh(color)
            return ProductColorDTO.model_validate(color)

    async def get_by_id(self, id: int) -> ProductColorDTO:
        async with self.uow as uow:
            color = await self.repository.get_by_id(uow.session, id)
            if color is None:
                raise ProductColorNotFoundError
            return ProductColorDTO.model_validate(color)

    async def get_by_product(self, product_id: int) -> list[ProductColorDTO]:
        async with self.uow as uow:
            colors = await self.repository.get_by_product_id(uow.session, product_id)
            return [ProductColorDTO.model_validate(c) for c in colors]


class DeleteColorUseCase:
    def __init__(
            self,
            color_repository: ProductColorRepository,
            product_image_repository: ProductImageRepository,
            uow: UnitOfWork):
        self.color_repository = color_repository
        self.product_image_repository = product_image_repository
        self.uow = uow


    async def execute(self, color_id: int) -> ProductColorDTO:
        async with self.uow as uow:
            color = await self.color_repository.get_by_id(uow.session, color_id)
            if color is None:
                raise ProductColorNotFoundError
            dto = ProductColorDTO.model_validate(color)
            await self.delete(uow.session, color)
            await uow.commit()
            return dto

    async def delete(
            self,
            session: AsyncSession,
            color: ProductColor,
    ) -> None:
        for image in color.images:
            try:
                await delete_file_from_storage(image.url)
            except DeleteFileError:
                raise
        await self.color_repository.delete(session, color)
        await session.flush()

