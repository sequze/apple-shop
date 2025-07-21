from core.schemas.user import UserCreateSchema, UserUpdateSchema
from repositories.uow import UnitOfWork
from repositories.user_repository import UserRepository
from core.schemas.user import UserDTO


def hash_pwd(password: str):
    return password


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
            email_user = self.repository.get_by_filters(uow.session, {"email": data.email}, True)
            if email_user: raise EmailAlreadyExists
            data_dict = data.model_dump()
            data_dict["password_hash"] = hash_pwd(data.password)
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
