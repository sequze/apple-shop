from sqlalchemy.ext.asyncio.session import AsyncSession
from sqlalchemy.inspection import inspect

from core.models import Product
from core.repositories.base_repository import SQlAlchemyRepository


class ProductRepository(SQlAlchemyRepository):
    model = Product