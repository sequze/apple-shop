from pydantic import BaseModel, EmailStr
from core.models.user import UserRole
from datetime import datetime


class UserBaseSchema(BaseModel):
    email: EmailStr
    full_name: str
    role: UserRole


class UserDTO(UserBaseSchema):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


class UserCreateSchema(UserBaseSchema):
    password: str


class UserUpdateSchema(BaseModel):
    email: EmailStr | None = None
    full_name: str | None = None
    role: UserRole | None = None
