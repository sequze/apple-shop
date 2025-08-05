from datetime import datetime

from pydantic import BaseModel, NonNegativeFloat, PositiveInt, EmailStr

from core.models.order import OrderStatus, PaymentMethod
from services.order_item.schemas import OrderItemDTO, OrderItemCreateSchema


class OrderBaseSchema(BaseModel):
    status: OrderStatus
    first_name: str
    last_name: str
    phone_number: str
    email: EmailStr
    city: str
    address_line: str
    region: str
    payment_method: PaymentMethod


class OrderDTO(OrderBaseSchema):
    id: PositiveInt
    created_at: datetime
    total_amount: NonNegativeFloat
    items: list[OrderItemDTO]
    class Config:
        from_attributes = True

class OrderCreateSchema(OrderBaseSchema):
    items: list[OrderItemCreateSchema]


class OrderUpdateSchema(BaseModel):
    first_name: str | None = None
    last_name: str | None = None
    phone_number: str | None = None
    email: EmailStr | None = None
    city: str | None = None
    address_line: str | None = None
    region: str | None = None
    payment_method: PaymentMethod | None = None