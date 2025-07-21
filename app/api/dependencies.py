from core.models import db_helper
from core.services.user_service import UserService
from repositories.uow import UnitOfWork
from repositories.user_repository import UserRepository


def users_service() -> UserService:
    return UserService(UserRepository(), UnitOfWork(db_helper.session_factory))
