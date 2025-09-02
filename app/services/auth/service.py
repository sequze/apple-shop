from imaplib import Int2AP

from sqlalchemy.ext.asyncio.session import AsyncSession

from core.auth.token import Token
from core.models import User
from core.config import settings
from core.repositories.uow import UnitOfWork
from services.auth.repository import AuthRepository
from core.auth.utils import decode_jwt, encode_jwt, verify_password, get_password_hash
from services.auth.schemas import LoginSchema
from services.user import UserRepository
from datetime import datetime

TOKEN_TYPE_FIELD = "type"
ACCESS_TOKEN_FIELD = "access"
REFRESH_TOKEN_FIELD = "refresh"


class EmailNotExistsError(Exception):
    pass


class InvalidTokenError(Exception):
    pass


class TokenExpiredError(Exception):
    pass


class InvalidPasswordError(Exception):
    pass


class AuthService:
    user_repository = UserRepository
    auth_repository = AuthRepository
    def __init__(
            self,
            uow: UnitOfWork,
    ):
        self.uow = uow

    def __create_token(
            self,
            payload: dict,
            token_type: str,
            expire_minutes: int) -> str:
        jwt_payload = {TOKEN_TYPE_FIELD: token_type}
        jwt_payload.update(payload)
        return encode_jwt(jwt_payload, expire_minutes)

    def __create_refresh_token(self, email: str) -> str:
        payload = {
            "sub": email,
        }
        return self.__create_token(
            payload,
            REFRESH_TOKEN_FIELD,
            settings.auth_jwt.refresh_token_expire_days * 60 * 24,
        )

    def __create_access_token(self, user: User):
        payload = {
            "sub": user.email,
            "user_id": user.id,
            "full_name": user.full_name,
        }
        return self.__create_token(payload, ACCESS_TOKEN_FIELD, settings.auth_jwt.access_token_expire_minutes)

    async def __create_tokens(
            self,
            session: AsyncSession,
            user_id: int,
            user: User | None = None,
    ):
        if not user:
            user = await self.user_repository.get_by_id(session, user_id)
        access_token = self.__create_access_token(user)
        refresh_token = self.__create_refresh_token(user.email)
        data = {}
        data.update(refresh_token=refresh_token, user_id=user_id)
        await self.auth_repository.create(session, data)
        await session.commit()
        return Token(
            access_token=access_token,
            refresh_token=refresh_token,
            type="Bearer")

    async def create_token(self, user_id: int):
        async with self.uow as uow:
            return await self.__create_tokens(uow.session, user_id)

    async def logout(self, refresh_token: str):
        async with self.uow as uow:
            token = await self.auth_repository.get_by_filters(
                uow.session,
                {"refresh_token": refresh_token},
            )
            if token:
                await self.auth_repository.delete(uow.session, token)
                await uow.commit()

    async def refresh_token(self, refresh_token: str):
        async with self.uow as uow:
            token = await self.auth_repository.get_by_filters(
                uow.session,
                {"refresh_token": refresh_token},
            )
            if token is None:
                raise InvalidTokenError
            payload = decode_jwt(token.refresh_token)
            if payload.get("type") != "refresh":
                raise InvalidTokenError
            email = payload["sub"]
            user = await self.user_repository.get_by_email(uow.session, email)
            expires_in = payload["exp"]
            if datetime.now().timestamp() >= expires_in:
                raise TokenExpiredError
            await self.auth_repository.delete(uow.session, token)
            await uow.commit()
            return await self.__create_tokens(uow.session, user.id, user)

    async def authenticate_user(self, data: LoginSchema):
        email = data.email
        password = data.password
        async with self.uow as uow:
            user = await self.user_repository.get_by_email(uow.session, email)
            if not user:
                raise EmailNotExistsError
            if not verify_password(password, user.password_hash):
                raise InvalidPasswordError
            return await self.__create_tokens(uow.session, user.id, user)

    async def abort_all_sessions(self, user_id):
        async with self.uow as uow:
            await self.auth_repository.delete_multi(session=uow.session, user_id=user_id)
            await uow.commit()

    async def change_password(self, email, old_password, new_password):
        async with self.uow as uow:
            user = await self.user_repository.get_by_email(uow.session, email)
            if verify_password(old_password, user.password_hash):
                user.password_hash = get_password_hash(new_password)
                await uow.commit()
            else:
                raise InvalidPasswordError
