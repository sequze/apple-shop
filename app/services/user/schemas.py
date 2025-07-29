from pydantic import BaseModel, EmailStr, PositiveInt
from datetime import datetime


class UserBaseSchema(BaseModel):
    email: EmailStr
    full_name: str
    is_verified: bool = False
    is_superuser: bool = False
    is_active: bool = True


class UserDTO(UserBaseSchema):
    id: PositiveInt
    created_at: datetime

    class Config:
        from_attributes = True


class UserCreateSchema(UserBaseSchema):
    password: str


class UserUpdateSchema(BaseModel):
    email: EmailStr | None = None
    full_name: str | None = None
    is_verified: bool | None = None
    is_superuser: bool | None = None
    is_active: bool | None = None
