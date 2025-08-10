from core.repositories.uow import UnitOfWork
from .schemas import CartDTO
from services.cart_item.schemas import CartItemDTO
from services.cart_item.service import get_cart_item_dto
from services.user import UserRepository, UserDTO
from services.user.service import UserNotFoundError


class UserGetCartUseCase:
    def __init__(self, user_repository: UserRepository, uow: UnitOfWork):
        self.user_repository = user_repository
        self.uow = uow
    async def execute(
            self,
            user_data: UserDTO,
    ) -> CartDTO:
        async with self.uow as uow:
            user = await self.user_repository.get_with_cart_items(uow.session, user_data.id)
            if not user: raise UserNotFoundError
            total_price = 0
            price_with_discount = 0
            items_dto = [get_cart_item_dto(item) for item in user.cart_items]
            for item_dto in items_dto:
                total_price += item_dto.total_price
                price_with_discount += item_dto.price_with_discount
            return CartDTO(
                user_id=user_data.id,
                total_price=total_price,
                discount_sum=total_price - price_with_discount,
                price_with_discount=price_with_discount,
                items=items_dto,
            )
