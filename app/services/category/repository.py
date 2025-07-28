from sqlalchemy.ext.asyncio.session import AsyncSession
from sqlalchemy import select
from sqlalchemy.inspection import inspect
from sqlalchemy.orm import joinedload
from core.models import Products
from repositories.base_repository import SQlAlchemyRepository


class CategoryRepository(SQlAlchemyRepository):
    model = Products

    async def update(
            self,
            session: AsyncSession,
            data: dict,
            category: Products) -> Products:
        mapper = inspect(Products)
        for key, value in data.items():
            if key in mapper.attrs:
                setattr(category, key, value)
        await session.commit()
        await session.refresh(category)
        return category

    async def get_by_id(self, session: AsyncSession, id: int):
        return await session.get(Products, id)

    async def get_with_children(self, session: AsyncSession, id: int):
        res = await session.scalar(select(Products)
                                   .where(Products.id == id)
                                   .options(joinedload(Products.children)))
        return res
