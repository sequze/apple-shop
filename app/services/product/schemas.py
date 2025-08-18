from decimal import Decimal

from pydantic import BaseModel, NonNegativeInt, PositiveInt
from datetime import datetime

from services.colors.schemas import ProductColorDTO
from services.discount.schemas import DiscountDTO
from services.product_characteristics.schemas import ProductCharacteristicDTO


class ProductBaseSchema(BaseModel):
    name: str
    description: str | None = None
    price: Decimal
    category_id: PositiveInt


class ProductCreateSchema(ProductBaseSchema):
    pass


class ProductUpdateSchema(BaseModel):
    name: str | None = None
    description: str | None = None
    price: Decimal | None = None
    category_id: PositiveInt | None = None


class ProductDTO(ProductBaseSchema):
    id: PositiveInt
    discounts: list[DiscountDTO]
    colors: list[ProductColorDTO]
    created_at: datetime
    category_id: PositiveInt | None = None
    characteristics: list[ProductCharacteristicDTO]

    class Config:
        from_attributes = True


class ProductPriceInfo(BaseModel):
    total_price: NonNegativeInt
    discount_sum: NonNegativeInt
    price_with_discount: NonNegativeInt
    discount_description: str | None = None