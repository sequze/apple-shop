# cart
# product -> discount
from httpx import AsyncClient

from services.cart.schemas import CartDTO, AddToCartSchema
from services.cart_item.schemas import CartItemDTO, CartItemUpdateSchema


# 1 color 1
class CartCli:
    def url(self, postfix: str) -> str:
        prefix = "/api/cart_items"
        return f"{prefix}{postfix}"

    async def get_user_cart(self, ac: AsyncClient):
        url = self.url("/user_cart")
        response = await ac.get(url)
        if response.status_code == 200:
            return CartDTO(**response.json())

    async def add_to_cart(self, data: AddToCartSchema, ac: AsyncClient):
        url = self.url("/add_to_cart")
        response = await ac.post(
            url,
            json=data.model_dump(),
        )
        return CartItemDTO(**response.json())

    async def get_cart_item(self, ac: AsyncClient, id: int):
        url = self.url(f"/{id}")
        response = await ac.get(url)
        if response.status_code == 200:
            return CartItemDTO(**response.json())

    async def update_cart_item(
        self, ac: AsyncClient, id: int, data: CartItemUpdateSchema
    ):
        url = self.url(f"/{id}")
        response = await ac.patch(url, json=data.model_dump())
        if response.status_code == 200:
            return CartItemDTO(**response.json())
        return response

    async def delete_cart_item(self, ac: AsyncClient, id: int):
        url = self.url(f"/{id}")
        response = await ac.delete(url)
        if response.status_code == 200:
            return CartItemDTO(**response.json())
        return response
