from fastapi import UploadFile
from sqlalchemy.exc import SQLAlchemyError

from core.repositories.uow import UnitOfWork
from plugins.s3_storage.client import InvalidFileTypeError
from plugins.s3_storage.utils import delete_file_from_storage, upload_image
from .repository import CategoryRepository
from .schemas import CategoryCreateSchema, CategoryDTO, CategoryUpdateSchema
from ..product.schemas import ProductDTO


class CategoryNotFoundError(Exception):
    """Products not found"""
    pass


class CategoryService:
    def __init__(
            self,
            repository: CategoryRepository,
            uow: UnitOfWork,
    ):
        self.repository = repository
        self.uow = uow

    async def create(self, data: CategoryCreateSchema) -> CategoryDTO:
        async with self.uow as uow:
            category = await self.repository.create(uow.session, data.model_dump())
            await uow.commit()
            return CategoryDTO.model_validate(category)

    async def update(self, data: CategoryUpdateSchema, id: int) -> CategoryDTO:
        async with self.uow as uow:
            category = await self.repository.get_by_id(uow.session, id)
            await self.repository.update(uow.session, data.model_dump(exclude_unset=True), category)
            await uow.commit()
            await uow.session.refresh(category)
            return CategoryDTO.model_validate(category)

    async def delete(self, id: int) -> CategoryDTO:
        async with self.uow as uow:
            category = await self.repository.get_by_id(uow.session, id)
            if category is None: raise CategoryNotFoundError
            await self.repository.delete(uow.session, category)
            await uow.commit()
            return CategoryDTO.model_validate(category)

    async def get_by_id(self, id: int) -> CategoryDTO:
        async with self.uow as uow:
            category = await self.repository.get_by_id(uow.session, id)
            if category is None: raise CategoryNotFoundError
            return CategoryDTO.model_validate(category)

    async def get_all(self) -> list[CategoryDTO]:
        async with self.uow as uow:
            categories = await self.repository.get_all(uow.session)
            return [CategoryDTO.model_validate(category) for category in categories]

    async def get_products(self, id: int) -> list[ProductDTO]:
        async with self.uow as uow:
            category = await self.repository.get_with_products(uow.session, id)
            if category is None: raise CategoryNotFoundError
            return [ProductDTO.model_validate(product) for product in category.products]

    async def update_image(self, category_id: int, file: UploadFile) -> str:
        async with self.uow as uow:
            category = await self.repository.get_by_id(uow.session, category_id)
            if category is None:
                    raise CategoryNotFoundError
            if category.image_url:
                await delete_file_from_storage(category.image_url)
            file_path = await upload_image(file, file.filename)
            try:
                category.image_url = file_path
                await uow.commit()
            except SQLAlchemyError:
                await delete_file_from_storage(file_path)
            return file_path

    async def delete_image(self, category_id) -> None:
        async with self.uow as uow:
            category = await self.repository.get_by_id(uow.session, category_id)
            if category is None:
                raise CategoryNotFoundError
            if category.image_url:
                await delete_file_from_storage(category.image_url)
                category.image_url = None
                await uow.commit()

    async def get_range(self, category_id: int) -> dict[str, int]:
        async with self.uow as uow:
            range = await self.repository.get_range(uow.session, category_id)
            return {
                'min': range[0],
                'max': range[1],
            }
