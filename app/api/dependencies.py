from core.models import db_helper
from services.category.repository import CategoryRepository
from services.category.service import CategoryService
from services.product.repository import ProductRepository
from services.product.service import ProductService
from services.user.service import UserService
from repositories.uow import UnitOfWork
from services.user.repository import UserRepository


def unit_of_work() -> UnitOfWork:
    return UnitOfWork(db_helper.session_factory)


def users_service() -> UserService:
    return UserService(UserRepository(), unit_of_work())


def category_service() -> CategoryService:
    return CategoryService(CategoryRepository(), unit_of_work())


def product_service() -> ProductService:
    return ProductService(ProductRepository(), unit_of_work())
