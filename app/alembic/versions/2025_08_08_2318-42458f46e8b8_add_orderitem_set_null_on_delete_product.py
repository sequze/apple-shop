"""add OrderItem set null on delete product

Revision ID: 42458f46e8b8
Revises: ec3031ca1e92
Create Date: 2025-08-08 23:18:47.144060

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "42458f46e8b8"
down_revision: Union[str, Sequence[str], None] = "ec3031ca1e92"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.drop_constraint(
        op.f("fk_orderitems_product_id_products"),
        "orderitems",
        type_="foreignkey",
    )
    op.create_foreign_key(
        op.f("fk_orderitems_product_id_products"),
        "orderitems",
        "products",
        ["product_id"],
        ["id"],
        ondelete="SET NULL",
    )
    op.create_unique_constraint(
        op.f("uq_refreshsessions_refresh_token"),
        "refreshsessions",
        ["refresh_token"],
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_constraint(
        op.f("uq_refreshsessions_refresh_token"),
        "refreshsessions",
        type_="unique",
    )
    op.drop_constraint(
        op.f("fk_orderitems_product_id_products"),
        "orderitems",
        type_="foreignkey",
    )
    op.create_foreign_key(
        op.f("fk_orderitems_product_id_products"),
        "orderitems",
        "products",
        ["product_id"],
        ["id"],
    )
