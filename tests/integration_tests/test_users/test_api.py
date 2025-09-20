import pytest


@pytest.mark.parametrize(
    "email, password, full_name, status_code",
    [
        ("test@test.com", "test", "Test Test", 200),
        ("test@test.com", "test_1", "Test Test", 403),
        ("abcde", "test", "Test Test", 422),
    ],
)
async def test_register(email, password, full_name, status_code, ac):
    response = await ac.post(
        "/api/auth/register",
        json={
            "email": email,
            "password": password,
            "full_name": full_name,
        },
    )
    assert response.status_code == status_code


@pytest.mark.parametrize(
    "email, password, status_code",
    [
        (
            "john.doe@example.com",
            "test",
            200,
        ),
        (
            "john.doe@example.com",
            "incorrect password",
            401,
        ),
    ],
)
async def test_login(email, password, status_code, ac):
    response = await ac.post(
        "api/auth/login", json={"email": email, "password": password}
    )
    assert response.status_code == status_code
