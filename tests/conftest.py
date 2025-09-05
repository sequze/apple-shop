import asyncio
import json
from datetime import datetime

import pytest
from httpx import AsyncClient, ASGITransport
from sqlalchemy import insert

from app.main import app as fastapi_app
from core.config import settings
from core.models import *


def open_mock_json(model: str):
    with open(f"tests/mocks/mock_{model}.json", "r") as file:
        return json.load(file)


cart_items = open_mock_json("cart_items")
categories = open_mock_json("categories")
discounts = open_mock_json("discounts")
order_items = open_mock_json("order_items")
orders = open_mock_json("orders")
product_characteristics = open_mock_json("product_characteristics")
product_colors = open_mock_json("product_colors")
product_images = open_mock_json("product_images")
products = open_mock_json("products")
users = open_mock_json("users")


for user in users:
    user["created_at"] = datetime.fromisoformat(user["created_at"])
for product in products:
    product["created_at"] = datetime.fromisoformat(product["created_at"])
for order in orders:
    order["created_at"] = datetime.fromisoformat(order["created_at"])


@pytest.fixture(scope="session", autouse=True)
async def prepare_database():
    assert settings.mode == "TEST"
    async with db_helper.engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)

    # get mock models by open_mock_json()
    async with db_helper.session_factory() as session:
        add_cart_items = insert(CartItem).values(cart_items)
        add_categories = insert(Category).values(categories)
        add_products = insert(Product).values(products)
        add_users = insert(User).values(users)
        add_colors = insert(ProductColor).values(product_colors)
        add_orders = insert(Order).values(orders)
        add_order_items = insert(OrderItem).values(order_items)

        await session.execute(add_categories)
        await session.execute(add_products)
        await session.execute(add_users)
        await session.execute(add_colors)
        await session.execute(add_cart_items)
        await session.execute(add_orders)
        await session.execute(add_order_items)

        await session.commit()


@pytest.fixture(scope="session")
def event_loop(request):
    """Создаём отдельный event loop"""
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()


@pytest.fixture(scope="session")
async def ac():
    async with AsyncClient(
        transport=ASGITransport(app=fastapi_app), base_url="http://test"
    ) as ac:
        yield ac


@pytest.fixture(scope="function")
async def authenticated_ac():
    async with AsyncClient(
        transport=ASGITransport(app=fastapi_app), base_url="http://test"
    ) as ac:
        response = await ac.post(
            "/auth/login", json={"email": "admin@example.com", "password": "test"}
        )
        ac.headers["Authorization"] = f"Bearer {response.json()['access_token']}"
        yield ac
