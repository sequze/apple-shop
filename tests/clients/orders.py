from httpx import AsyncClient, Response

from services.order.schemas import OrderDTO, OrderCreateSchema, OrderUpdateSchema


class OrdersCli:
    def url(self, postfix: str) -> str:
        prefix = "/api/orders"
        return f"{prefix}{postfix}"

    async def get_all_orders(
        self, ac: AsyncClient, page: int = 0, size: int = 10
    ) -> list[OrderDTO] | Response:
        url = self.url(f"/?page={page}&size={size}")
        response = await ac.get(url)

        if response.status_code == 200:
            return [OrderDTO(**order) for order in response.json()]
        return response

    async def get_user_orders(self, ac: AsyncClient):
        url = "/api/users/orders"
        response = await ac.get(url)
        if response.status_code == 200:
            return [OrderDTO(**order) for order in response.json()]
        return response

    async def get_order(self, order_id: int, ac: AsyncClient) -> OrderDTO | Response:
        url = self.url(f"/{order_id}")
        response = await ac.get(url)

        if response.status_code == 200:
            return OrderDTO(**response.json())
        return response

    async def create_order(
        self, data: OrderCreateSchema, ac: AsyncClient
    ) -> OrderDTO | Response:
        url = self.url("/")
        response = await ac.post(url, json=data.model_dump())

        if response.status_code in (200, 201):
            return OrderDTO(**response.json())
        return response

    async def update_order(
        self, order_id: int, data: OrderUpdateSchema, ac: AsyncClient
    ) -> OrderDTO | Response:
        url = self.url(f"/{order_id}")
        response = await ac.patch(url, json=data.model_dump(exclude_none=True))

        if response.status_code == 200:
            return OrderDTO(**response.json())
        return response

    async def update_order_status(
        self, order_id: int, status: str, ac: AsyncClient
    ) -> OrderDTO | Response:
        url = self.url(f"/{order_id}/update_status")
        response = await ac.put(url, params={"order_status": status})

        if response.status_code == 200:
            return OrderDTO(**response.json())
        return response

    async def delete_order(self, order_id: int, ac: AsyncClient) -> dict | Response:
        url = self.url(f"/{order_id}")
        response = await ac.delete(url)

        if response.status_code == 200:
            return response.json()
        return response

    async def cancel_order(self, order_id, ac: AsyncClient) -> dict | Response:
        url = self.url(f"/cancel/{order_id}")
        response = await ac.post(url)
        if response.status_code == 200:
            return response.json()
        return response
