from pydantic import BaseModel


class CategoryBaseSchema(BaseModel):
    name: str
    parent_id: int | None = None


class CategoryDTO(CategoryBaseSchema):
    id: int

    class Config:
        from_attributes = True


class CategoryCreateSchema(CategoryBaseSchema):
    pass


class CategoryUpdateSchema(CategoryBaseSchema):
    pass
