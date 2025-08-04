from fastapi import UploadFile

from plugins.s3_storage.client import InvalidFileTypeError
from services.user.schemas import UserCreateSchema, UserUpdateSchema, UserDTO
from core.repositories.uow import UnitOfWork
from .repository import UserRepository
from core.auth.utils import get_password_hash
from services.order.schemas import OrderDTO
from plugins.s3_storage.utils import upload_file_to_storage, delete_file_from_storage

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
            session = uow.session
            email_user = await self.repository.get_by_filters(session, {"email": data.email}, True)
            if email_user: raise EmailAlreadyExists
            data_dict = data.model_dump()
            data_dict["password_hash"] = get_password_hash(data.password)
            data_dict.pop('password')
            user = await self.repository.create(
                session,
                data_dict
            )
            await session.commit()
            await session.refresh(user)
            return UserDTO.model_validate(user)

    async def update_user(self, data: UserUpdateSchema, id: int) -> UserDTO:
        async with self.uow as uow:
            session = uow.session
            user = await self.repository.get_by_id(uow.session, id)
            if user is None:
                raise UserNotFoundError
            await self.repository.update(session, data.model_dump(exclude_unset=True), user)
            await session.commit()
            await session.refresh(user)
            return UserDTO.model_validate(user)

    async def delete_user(self, id: int) -> UserDTO:
        async with self.uow as uow:
            session = uow.session
            user = await self.repository.get_by_id(session, id)
            if user is None:
                raise UserNotFoundError
            await self.repository.delete(session, user)
            await session.commit()
            return UserDTO.model_validate(user)

    async def get_orders(self, user: UserDTO) -> list[OrderDTO]:
        async with self.uow as uow:
            user = await self.repository.get_with_orders(uow.session, user.id)
            if user is None: raise UserNotFoundError
            return [OrderDTO.model_validate(order) for order in user.orders]

    async def update_profile_image(self, user_data: UserDTO, file: UploadFile) -> str:
        if not file.content_type.startswith("image/"):
            raise InvalidFileTypeError
        async with self.uow as uow:
            user = await self.repository.get_by_id(uow.session, user_data.id)
            if user is None:
                    raise UserNotFoundError
            if user.profile_image_url:
                await delete_file_from_storage(user.profile_image_url)
            file_binary = await file.read()
            file_path = await upload_file_to_storage(file_binary, file.filename)
            user.profile_image_url = file_path
            await uow.session.commit()
            return file_path

    async def delete_profile_image(self, user_data: UserDTO) -> None:
        async with self.uow as uow:
            user = await self.repository.get_by_id(uow.session, user_data.id)
            if user is None:
                raise UserNotFoundError
            if user.profile_image_url:
                await delete_file_from_storage(user.profile_image_url)
                user.profile_image_url = None
                await uow.session.commit()