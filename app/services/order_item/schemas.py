from datetime import datetime

from pydantic import BaseModel, PositiveInt, PositiveFloat

from services.product.schemas import ProductDTO


class OrderItemSchema(BaseModel):
    quantity: PositiveInt
    unit_price: PositiveFloat
    order_id: PositiveInt
    product_id: PositiveInt | None


class OrderItemDTO(OrderItemSchema):
    id: PositiveInt
    product: ProductDTO | None

    class Config:
        from_attributes = True


class OrderItemUpdateSchema(BaseModel):
    quantity: PositiveInt | None = None
    unit_price: PositiveFloat | None = None


class OrderItemCreateSchema(BaseModel):
    quantity: PositiveInt
    product_id: PositiveInt
    color_id: PositiveInt
