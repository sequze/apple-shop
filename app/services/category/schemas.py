from pydantic import BaseModel, PositiveInt


class CategoryBaseSchema(BaseModel):
    name: str


class CategoryDTO(CategoryBaseSchema):
    id: PositiveInt

    class Config:
        from_attributes = True


class CategoryCreateSchema(CategoryBaseSchema):
    pass


class CategoryUpdateSchema(CategoryBaseSchema):
    pass
