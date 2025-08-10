from pydantic import BaseModel, HttpUrl, PositiveInt
from datetime import datetime


class ProductImageBaseSchema(BaseModel):
    url: HttpUrl
    alt_text: str
    is_main: bool
    color_id: PositiveInt


class ProductImageDTO(ProductImageBaseSchema):
    id: PositiveInt
    created_at: datetime

    class Config:
        from_attributes = True


class ProductImageCreate(BaseModel):
    alt_text: str
    is_main: bool
    color_id: PositiveInt


class ProductImageUpdateSchema(BaseModel):
    alt_text: str | None = None
    is_main: bool | None = None
