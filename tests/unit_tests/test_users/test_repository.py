from services.user.repository import UserRepository
from core.models import db_helper, User
import pytest


@pytest.mark.parametrize(
    "id, email, exists",
    [
        (1, "john.doe@example.com", True),
        (2, "jane.smith@example.com", True),
        (12, "", False),
    ],
)
async def test_find_user_by_id(id, email, exists):
    async with db_helper.session_factory() as session:
        user = await UserRepository.get_by_id(session, id)

        if exists:
            assert user
            assert user.id == id
            assert user.email == email
        else:
            assert not user


async def test_delete_by_id():
    async with db_helper.session_factory() as session:
        user = await UserRepository.get_by_id(session, 1)
        await UserRepository.delete_by_id(session, 1)
        await session.flush()
        u = await session.get(User, user.id)
        assert not u
        await session.rollback()


async def test_create_user():
    async with db_helper.session_factory() as session:
        data = {
            "email": "test@test.ru",
            "password_hash": "super-hash-secret",
            "full_name": "test test",
        }
        user = await UserRepository.create(session, data)
        assert user.id
        await session.flush()
        u = await session.get(User, user.id)
        assert u
        assert u == user
        await session.rollback()


@pytest.mark.parametrize(
    "id, email, exists",
    [
        (3, "admin@example.com", True),
        (2, "jane.smith@example.com", True),
        (15, "emailnotexists@mail.ru", False),
    ],
)
async def test_get_user_by_email(id, email, exists):
    async with db_helper.session_factory() as session:
        user = await UserRepository.get_by_email(session, email)
        if exists:
            assert user
            assert user.email == email
            assert user.id == id
        else:
            assert not user


@pytest.mark.parametrize(
    "id, count_of_orders, exists",
    [
        (1, 1, True),
        (2, 1, True),
        (3, 0, True),
        (120, 32, False),
    ],
)
async def test_get_user_with_orders(id, count_of_orders, exists):
    async with db_helper.session_factory() as session:
        user = await UserRepository.get_with_orders(session, id)
        if exists:
            assert len(user.orders) == count_of_orders
        else:
            assert not user


@pytest.mark.parametrize(
    "id, count_of_items, exists",
    [
        (1, 2, True),
        (2, 1, True),
        (3, 0, True),
        (120, 32, False),
    ],
)
async def test_get_with_cart_items(id, count_of_items, exists):
    async with db_helper.session_factory() as session:
        user = await UserRepository.get_with_cart_items(session, id)
        if exists:
            assert len(user.cart_items) == count_of_items
            assert user.id == id
        else:
            assert not user
