"""fix uq for cart_item

Revision ID: 2efe67492aea
Revises: c4462afd5992
Create Date: 2025-09-07 19:23:24.938550

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "2efe67492aea"
down_revision: Union[str, Sequence[str], None] = "c4462afd5992"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.drop_constraint(op.f("uq_cartitems_user_id"), "cartitems", type_="unique")
    op.create_unique_constraint(
        op.f("uq_cartitems_user_id"), "cartitems", ["user_id", "color_id"]
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_constraint(op.f("uq_cartitems_user_id"), "cartitems", type_="unique")
    op.create_unique_constraint(
        op.f("uq_cartitems_user_id"),
        "cartitems",
        ["user_id", "product_id"],
        postgresql_nulls_not_distinct=False,
    )
