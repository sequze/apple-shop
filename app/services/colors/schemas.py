# services/product_color/schemas.py
from pydantic import BaseModel, PositiveInt, NonNegativeInt
from datetime import datetime

from services.product_image.schemas import ProductImageDTO


class ProductColorBaseSchema(BaseModel):
    name: str
    stock: NonNegativeInt

class ProductColorCreateSchema(ProductColorBaseSchema):
    product_id: PositiveInt

class ProductColorUpdateSchema(BaseModel):
    name: str | None = None
    stock: NonNegativeInt | None = None

class ProductColorDTO(ProductColorBaseSchema):
    id: PositiveInt
    product_id: PositiveInt
    images: list[ProductImageDTO]

    class Config:
        from_attributes = True
