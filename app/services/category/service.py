from core.repositories.uow import UnitOfWork
from .repository import CategoryRepository
from .schemas import CategoryCreateSchema, CategoryDTO, CategoryUpdateSchema


class CategoryNotFoundError(Exception):
    """Category not found"""
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
            return CategoryDTO.model_validate(category)

    async def update(self, data: CategoryUpdateSchema, id: int) -> CategoryDTO:
        async with self.uow as uow:
            category = await self.repository.get_by_id(uow.session, id)
            category_updated = await self.repository.update(uow.session, data.model_dump(exclude_unset=True), category)
            return CategoryDTO.model_validate(category_updated)

    async def delete(self, id: int) -> CategoryDTO:
        async with self.uow as uow:
            category = await self.repository.get_by_id(uow.session, id)
            if category is None: raise CategoryNotFoundError
            await self.repository.delete(uow.session, category)
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

    async def get_children(self, id: int) -> list[CategoryDTO]:
        async with self.uow as uow:
            category = await self.repository.get_with_children(uow.session, id)
            if category is None: raise CategoryNotFoundError
            return [CategoryDTO.model_validate(child) for child in category.children]
