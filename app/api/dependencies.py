from core.models import db_helper
from services.user.service import UserService
from repositories.uow import UnitOfWork
from services.user.repository import UserRepository


def users_service() -> UserService:
    return UserService(UserRepository(), UnitOfWork(db_helper.session_factory))
