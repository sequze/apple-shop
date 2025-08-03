from decimal import Decimal
from pydantic import BaseModel, PositiveInt
from services.product.schemas import ProductDTO


class CartItemBaseSchema(BaseModel):
    quantity: PositiveInt
    user_id: PositiveInt
    product_id: PositiveInt


class CartItemDTO(CartItemBaseSchema):
    total_price: Decimal
    discount: Decimal
    discount_description: str | None = None
    price_with_discount: Decimal
    id: PositiveInt
    product: ProductDTO | None = None

    class Config:
        from_attributes = True


class CartItemCreateSchema(CartItemBaseSchema):
    pass


class CartItemUpdateSchema(BaseModel):
    quantity: PositiveInt | None = None
