from sqlalchemy.ext.asyncio.session import AsyncSession
from sqlalchemy import select
from sqlalchemy.inspection import inspect
from sqlalchemy.orm import joinedload
from core.models import Category
from core.repositories.base_repository import SQlAlchemyRepository


class CategoryRepository(SQlAlchemyRepository):
    model = Category

    async def update(
            self,
            session: AsyncSession,
            data: dict,
            category: Category) -> Category:
        mapper = inspect(Category)
        for key, value in data.items():
            if key in mapper.attrs:
                setattr(category, key, value)
        await session.commit()
        await session.refresh(category)
        return category

    async def get_by_id(self, session: AsyncSession, id: int):
        return await session.get(Category, id)

    async def get_with_children(self, session: AsyncSession, id: int):
        res = await session.scalar(select(Category)
                                   .where(Category.id == id)
                                   .options(joinedload(Category.children)))
        return res
