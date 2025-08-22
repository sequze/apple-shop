from sqlalchemy.ext.asyncio.session import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from core.models import Category, db_helper, Product
from core.repositories.base_repository import SQlAlchemyRepository
from sqlalchemy.sql.functions import func
import asyncio

class CategoryRepository(SQlAlchemyRepository):
    model = Category


    async def get_with_products(self, session: AsyncSession, id: int) -> Category:
        res = await session.scalar(select(Category)
                                   .where(Category.id == id)
                                   .options(selectinload(Category.products)))
        return res

    async def get_range(self, session: AsyncSession, id: int):
        result = await session.execute(
            select(
                func.min(Product.price).label("min_price"),
                func.max(Product.price).label("max_price"),
            ).where(Product.category_id == id)
        )
        return result.one()