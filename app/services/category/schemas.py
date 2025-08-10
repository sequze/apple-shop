from pydantic import BaseModel, PositiveInt


class CategoryBaseSchema(BaseModel):
    name: str


class CategoryDTO(CategoryBaseSchema):
    id: PositiveInt
    image_url: str | None = None

    class Config:
        from_attributes = True


class CategoryCreateSchema(CategoryBaseSchema):
    pass


class CategoryUpdateSchema(CategoryBaseSchema):
    pass
