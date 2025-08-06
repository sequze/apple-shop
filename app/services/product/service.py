from decimal import Decimal

from core.models import Product, Category
from core.repositories.uow import UnitOfWork
from plugins.s3_storage.client import DeleteFileError
from services.category.repository import CategoryRepository
from services.category.service import CategoryNotFoundError
from services.product.repository import ProductRepository
from services.product.schemas import ProductCreateSchema, ProductDTO, ProductUpdateSchema, ProductPriceInfo
from services.product_image.repository import ProductImageRepository
from plugins.s3_storage.utils import delete_file_from_storage
from sqlalchemy import select


def get_product_discount(product: Product):
    total_price = product.price
    discount_description = None
    if len(product.discounts) == 0: discount = 0
    else:
        discount = max([ds for ds in product.discounts if ds.is_active == True], key=lambda d: d.percent)
        discount_description = discount.description
        discount = discount.percent
    price_with_discount = total_price * Decimal((100 - discount) / 100)
    return ProductPriceInfo(
        total_price=total_price,
        discount_sum=total_price - price_with_discount,
        price_with_discount=price_with_discount,
        discount_description=discount_description,
    )

class ProductNotFoundError(Exception):
    """Product not found"""
    pass


class ProductService:
    def __init__(
            self,
            repository: ProductRepository,
            uow: UnitOfWork,
    ):
        self.repository = repository
        self.uow = uow

    async def create(self, data: ProductCreateSchema) -> ProductDTO:
        async with self.uow as uow:
            product = await self.repository.create(uow.session, data.model_dump())
            await uow.commit()
            return ProductDTO.model_validate(product)

    async def update(self, data: ProductUpdateSchema, id: int) -> ProductDTO:
        async with self.uow as uow:
            product = await self.repository.get_by_id(uow.session, id)
            await self.repository.update(uow.session, data.model_dump(exclude_unset=True), product)
            await uow.commit()
            await uow.session.refresh(product)
            return ProductDTO.model_validate(product)

    async def get_by_id(self, id: int) -> ProductDTO:
        async with self.uow as uow:
            product = await self.repository.get_by_id(uow.session, id)
            if product is None: raise ProductNotFoundError
            return ProductDTO.model_validate(product)


class ProductDeleteUseCase:
    def __init__(
            self,
            product_repository: ProductRepository,
            product_image_repository: ProductImageRepository,
            uow: UnitOfWork,
    ):
        self.product_repository = product_repository
        self.product_image_repository = product_image_repository
        self.uow = uow
    async def delete(self, id: int) -> ProductDTO:
        async with self.uow as uow:
            product = await self.product_repository.get_by_id(uow.session, id)
            if product is None: raise ProductNotFoundError
            for image in product.images:
                try:
                    await delete_file_from_storage(image.url)
                except DeleteFileError:
                    raise
                await self.product_image_repository.delete(uow.session, image)
            await uow.session.refresh(product)
            await self.product_repository.delete(uow.session, product)
            await uow.commit()
            return ProductDTO.model_validate(product)


class GetProductsUseCase:
    def __init__(self,
                 product_repository: ProductRepository,
                 category_repository: CategoryRepository,
                 uow: UnitOfWork):
        self.product_repository = product_repository
        self.category_repository = category_repository
        self.uow = uow
    async def execute(self,
            category: str | None = None,
            min_price: int | None = None,
            max_price: int | None = None,
            order_by: str | None = None,
            in_stock: bool | None = None,
    ) -> list[ProductDTO]:
        async with self.uow as uow:
            category_id = None
            if category:
                category_obj = await self.category_repository.get_by_filters(uow.session, {'name': category})
                if category_obj is None: raise CategoryNotFoundError
                category_id = category_obj.id
            products = await self.product_repository.get_all(uow.session, category_id, min_price, max_price, order_by, in_stock)
            return [ProductDTO.model_validate(product) for product in products]
