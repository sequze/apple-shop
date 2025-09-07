import json

import pytest

from services.order.schemas import OrderCreateSchema


def get_mock_data(filename):
    with open(filename) as f:
        return json.load(f)


mock_data = get_mock_data("tests/integration_tests/test_orders/data.json")


@pytest.mark.parametrize("data,status", [(d["mock"], d["status"]) for d in mock_data])
async def test_create_order(data, status, authenticated_ac):
    response = await authenticated_ac.post(
        "/api/orders",  # не забудь ведущий слэш
        json=OrderCreateSchema(**data).model_dump(),
    )

    if status:
        assert response.status_code == 200
        # можешь добавить проверки ответа, например:
        # body = response.json()
        # assert body["id"] is not None
    else:
        assert response.status_code >= 400
