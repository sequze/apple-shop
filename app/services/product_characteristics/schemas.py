from pydantic import BaseModel, PositiveInt

class ProductCharacteristicBaseSchema(BaseModel):
    name: str
    value: str

class ProductCharacteristicCreate(ProductCharacteristicBaseSchema):
    pass

class ProductCharacteristicDTO(ProductCharacteristicBaseSchema):
    id: PositiveInt
    image_url: str | None = None
    product_id: PositiveInt

    class Config:
        from_attributes = True

class ProductCharacteristicUpdate(BaseModel):
    name: str | None = None
    value: str | None = None
