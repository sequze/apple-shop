from core.models import ProductCharacteristic
from core.repositories.base_repository import SQlAlchemyRepository


class ProductCharacteristicRepository(SQlAlchemyRepository):
    model = ProductCharacteristic
