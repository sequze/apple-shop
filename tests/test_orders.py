from httpx import AsyncClient, Response

from services.order.schemas import OrderCreateSchema, OrderDTO, OrderUpdateSchema
from services.order_item.schemas import OrderItemCreateSchema
from tests.clients.orders import OrdersCli
from core.models.order import VALID_TRANSITIONS, OrderStatus

orders_cli = OrdersCli()

mock_data = OrderCreateSchema(
    first_name="Иван",
    last_name="Иванов",
    phone_number="1234567890",
    email="test@test.ru",
    city="Москва",
    address_line="ул. Ленина, д. 1",
    region="МО",
    payment_method="cash",
    items=[OrderItemCreateSchema(quantity=1, product_id=1, color_id=1)],
)


class TestOrders:
    async def test_create_and_get_order(self, user_ac: AsyncClient):
        created_order = await orders_cli.create_order(mock_data, user_ac)
        assert isinstance(created_order, OrderDTO)
        assert created_order.email == "test@test.ru"

        orders = await orders_cli.get_user_orders(user_ac)
        assert len(orders) == 1
        assert orders[0].id == created_order.id

    async def test_update_order(self, user_ac: AsyncClient):
        orders = await orders_cli.get_user_orders(user_ac)
        if orders:
            order = orders[0]
        else:
            order = await orders_cli.create_order(mock_data, user_ac)
        order_id = order.id

        update_schema = OrderUpdateSchema(city="Санкт-Петербург")
        updated_order = await orders_cli.update_order(order_id, update_schema, user_ac)
        assert isinstance(updated_order, OrderDTO)
        assert updated_order.city == "Санкт-Петербург"
        order = await orders_cli.get_order(order_id, user_ac)
        assert order.city == "Санкт-Петербург"

    async def test_update_order_status(self, admin_ac: AsyncClient):
        orders = await orders_cli.get_all_orders(admin_ac)
        if orders:
            order = orders[0]
        else:
            order = await orders_cli.create_order(mock_data, admin_ac)
        order_id = order.id
        order_status = order.status
        new_status = VALID_TRANSITIONS[order_status].copy().pop()
        updated_order = await orders_cli.update_order_status(
            order_id, new_status, admin_ac
        )
        assert isinstance(updated_order, OrderDTO)
        assert updated_order.status == new_status

    async def test_invalid_order_transition(self, admin_ac: AsyncClient):
        orders = await orders_cli.get_all_orders(admin_ac)
        if orders:
            order = orders[0]
        else:
            order = await orders_cli.create_order(mock_data, admin_ac)
        order_id = order.id
        order_status = order.status
        new_status = None
        for transition in VALID_TRANSITIONS.keys():
            if transition not in VALID_TRANSITIONS[order_status]:
                new_status = transition
                break
        response = await orders_cli.update_order_status(order_id, new_status, admin_ac)
        assert isinstance(response, Response)
        assert response.status_code == 409

    async def test_cancel_order(self, user_ac: AsyncClient):
        order = await orders_cli.create_order(mock_data, user_ac)
        response = await orders_cli.cancel_order(order.id, user_ac)
        assert isinstance(response, dict)
        order_canceled = await orders_cli.get_order(order.id, user_ac)
        assert order_canceled.status == OrderStatus.cancelled.value

    async def test_bad_cancel_order(self, user_ac: AsyncClient, admin_ac: AsyncClient):
        order = await orders_cli.create_order(mock_data, user_ac)
        await orders_cli.update_order_status(order.id, OrderStatus.paid.value, admin_ac)
        await orders_cli.update_order_status(
            order.id, OrderStatus.processing.value, admin_ac
        )
        response = await orders_cli.cancel_order(order.id, user_ac)
        assert isinstance(response, Response)
        assert response.status_code == 403
        order = await orders_cli.get_order(order.id, user_ac)
        assert order.status != "cancelled"

    async def test_delete_order(self, admin_ac: AsyncClient):
        order_schema = mock_data
        created_order = await orders_cli.create_order(order_schema, admin_ac)
        order_id = created_order.id

        response = await orders_cli.delete_order(order_id, admin_ac)
        assert isinstance(response, dict)

        # Проверяем, что заказа больше нет
        result = await orders_cli.get_order(order_id, admin_ac)
        assert isinstance(result, Response)
        assert result.status_code == 404
