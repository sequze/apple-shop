"""uq for order_item

Revision ID: c23b28ebf473
Revises: 4a83b1775526
Create Date: 2025-07-24 12:33:53.641618

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = "c23b28ebf473"
down_revision: Union[str, Sequence[str], None] = "4a83b1775526"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_unique_constraint(
        op.f("uq_orderitems_order_id"),
        "orderitems",
        ["order_id", "product_id"],
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_constraint(
        op.f("uq_orderitems_order_id"), "orderitems", type_="unique"
    )
