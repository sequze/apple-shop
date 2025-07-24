from core.models import db_helper
from services.cart_item.repository import CartItemRepository
from services.cart_item.service import CartItemService
from services.category.repository import CategoryRepository
from services.category.service import CategoryService
from services.discount.repository import DiscountRepository
from services.discount.service import DiscountService
from services.order.repository import OrderRepository
from services.order.service import OrderService
from services.order_item.repository import OrderItemRepository
from services.order_item.service import OrderItemService
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


def discount_service() -> DiscountService:
    return DiscountService(DiscountRepository(), unit_of_work())


def order_service() -> OrderService:
    return OrderService(OrderRepository(), unit_of_work())


def order_item_service() -> OrderItemService:
    return OrderItemService(OrderItemRepository(), unit_of_work())


def cart_item_service() -> CartItemService:
    return CartItemService(CartItemRepository(), unit_of_work())
