from services.user.schemas import UserCreateSchema, UserUpdateSchema, UserDTO
from core.repositories.uow import UnitOfWork
from .repository import UserRepository
from core.auth.utils import get_password_hash


class UserNotFoundError(Exception):
    """User not found"""
    pass


class EmailAlreadyExists(Exception):
    """Email already exists"""


class UserService:
    def __init__(
            self,
            repository: UserRepository,
            uow: UnitOfWork,
    ):
        self.repository = repository
        self.uow = uow

    async def get_by_email(self, email: str):
        async with self.uow as uow:
            user = await self.repository.get_by_filters(uow.session, {"email": email})
            if user is None:
                raise UserNotFoundError
            return UserDTO.model_validate(user)

    async def get_by_id(self, id: int):
        async with self.uow as uow:
            user = await self.repository.get_by_id(uow.session, id)
            if user is None:
                raise UserNotFoundError
            return UserDTO.model_validate(user)

    async def get_users(self) -> list[UserDTO]:
        async with self.uow as uow:
            users = await self.repository.get_all(uow.session)
            dtos = [UserDTO.model_validate(user) for user in users]
            return dtos

    async def create_user(self, data: UserCreateSchema) -> UserDTO:
        async with self.uow as uow:
            email_user = await self.repository.get_by_filters(uow.session, {"email": data.email}, True)
            if email_user: raise EmailAlreadyExists
            data_dict = data.model_dump()
            data_dict["password_hash"] = get_password_hash(data.password)
            data_dict.pop('password')
            user = await self.repository.create(
                uow.session,
                data_dict
            )
            return UserDTO.model_validate(user)

    async def update_user(self, data: UserUpdateSchema, id: int) -> UserDTO:
        async with self.uow as uow:
            user = await self.repository.get_by_id(uow.session, id)
            if user is None:
                raise UserNotFoundError
            res = await self.repository.update(uow.session, data.model_dump(exclude_unset=True), user)
            return UserDTO.model_validate(res)

    async def delete_user(self, id: int) -> UserDTO:
        async with self.uow as uow:
            user = await self.repository.get_by_id(uow.session, id)
            if user is None:
                raise UserNotFoundError
            await self.repository.delete(uow.session, user)
            return UserDTO.model_validate(user)
