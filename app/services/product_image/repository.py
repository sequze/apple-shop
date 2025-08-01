from sqlalchemy.ext.asyncio.session import AsyncSession
from sqlalchemy import inspect
from core.models import ProductImage
from core.repositories.base_repository import SQlAlchemyRepository


class ProductImageRepository(SQlAlchemyRepository):
    model = ProductImage
