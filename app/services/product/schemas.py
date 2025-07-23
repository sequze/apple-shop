from decimal import Decimal

from pydantic import BaseModel, NonNegativeInt, PositiveInt
from datetime import datetime

from services.discount.schemas import DiscountDTO
from services.product_image.schemas import ProductImageDTO


class ProductBaseSchema(BaseModel):
    name: str
    description: str | None = None
    price: Decimal
    stock: NonNegativeInt
    category_id: PositiveInt


class ProductCreateSchema(ProductBaseSchema):
    pass


class ProductUpdateSchema(BaseModel):
    name: str | None = None
    description: str | None = None
    price: Decimal | None = None
    stock: NonNegativeInt | None = None
    category_id: PositiveInt | None = None


class ProductDTO(ProductBaseSchema):
    id: PositiveInt
    images: list[ProductImageDTO]
    discounts: list[DiscountDTO]
    created_at: datetime

    class Config:
        from_attributes = True
