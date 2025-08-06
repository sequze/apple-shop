from sqlalchemy.ext.asyncio.session import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import joinedload

from core.models import Product
from core.repositories.base_repository import SQlAlchemyRepository


class ProductRepository(SQlAlchemyRepository):
    model = Product

    async def get_all(self,
                      session: AsyncSession,
                      category_id: int | None = None,
                      min_price: int | None = None,
                      max_price: int | None = None,
                      order_by: str | None = None,
                      in_stock: bool | None = None,
                      ) -> list[Product]:
        stmt = select(Product)
        if in_stock:
            stmt = stmt.where(Product.stock > 0)
        if category_id:
            stmt = stmt.options(joinedload(Product.category)).where(Product.category_id == category_id)
        if min_price:
            stmt = stmt.where(Product.price >= min_price)
        if max_price:
            stmt = stmt.where(Product.price <= max_price)
        if order_by and len(order_by) != 0:
            desc = False
            if order_by[0] == '-':
                desc = True
                order_by = order_by[1:]
            column = getattr(Product, order_by, None)
            if column:
                if desc: column = column.desc()
                stmt = stmt.order_by(column)
        res =  await session.scalars(stmt)
        return [i for i in res]
