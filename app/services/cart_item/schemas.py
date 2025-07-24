from pydantic import BaseModel, PositiveInt

from services.product.schemas import ProductDTO


class CartItemBaseSchema(BaseModel):
    quantity: PositiveInt
    user_id: PositiveInt
    product_id: PositiveInt


class CartItemDTO(CartItemBaseSchema):
    id: PositiveInt
    product: ProductDTO | None = None

    class Config:
        from_attributes = True


class CartItemCreateSchema(CartItemBaseSchema):
    pass


class CartItemUpdateSchema(BaseModel):
    quantity: PositiveInt | None = None
