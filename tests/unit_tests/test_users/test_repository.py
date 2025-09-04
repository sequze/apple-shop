from services.user.repository import UserRepository
from core.models import db_helper
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
