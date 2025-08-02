from datetime import datetime

from pydantic import BaseModel, NonNegativeFloat, PositiveInt

from core.models.order import OrderStatus
from services.order_item.schemas import OrderItemDTO


class OrderBaseSchema(BaseModel):
    status: OrderStatus
    user_id: PositiveInt


class OrderDTO(OrderBaseSchema):
    id: PositiveInt
    created_at: datetime
    total_amount: NonNegativeFloat
    items: list[OrderItemDTO]
    class Config:
        from_attributes = True

class OrderCreateSchema(OrderBaseSchema):
    pass


class OrderUpdateSchema(OrderBaseSchema):
    status: OrderStatus | None = None
    user_id: PositiveInt | None = None
