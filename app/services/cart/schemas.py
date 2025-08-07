from pydantic import BaseModel, PositiveInt, NonNegativeInt

from services.cart_item.schemas import CartItemDTO


class CartDTO(BaseModel):
    user_id: PositiveInt
    total_price: NonNegativeInt
    discount_sum: NonNegativeInt
    price_with_discount: NonNegativeInt
    items: list[CartItemDTO]

class AddToCartSchema(BaseModel):
    product_id: PositiveInt
    quantity: PositiveInt