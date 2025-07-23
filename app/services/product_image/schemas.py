from pydantic import BaseModel, HttpUrl, PositiveInt
from datetime import datetime


class ProductImageBaseSchema(BaseModel):
    url: HttpUrl
    alt_text: str
    is_main: bool
    product_id: PositiveInt
    created_at: datetime


class ProductImageDTO(ProductImageBaseSchema):
    id: PositiveInt

    class Config:
        from_attributes = True
