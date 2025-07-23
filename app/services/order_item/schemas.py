from datetime import datetime

from pydantic import BaseModel, PositiveInt, PositiveFloat

from services.product.schemas import ProductDTO


class OrderItemSchema(BaseModel):
    quantity: PositiveInt
    unit_price: PositiveFloat
    order_id: PositiveInt
    product_id: PositiveInt


class OrderItemDTO(OrderItemSchema):
    id: PositiveInt
    created_at: datetime
    product: ProductDTO

    class Config:
        from_attributes = True
