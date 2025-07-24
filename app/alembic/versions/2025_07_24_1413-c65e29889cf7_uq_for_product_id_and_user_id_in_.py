"""uq for product_id and user_id in CartItem

Revision ID: c65e29889cf7
Revises: dfdd5f65d972
Create Date: 2025-07-24 14:13:25.220944

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = "c65e29889cf7"
down_revision: Union[str, Sequence[str], None] = "dfdd5f65d972"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_unique_constraint(
        op.f("uq_cartitems_user_id"), "cartitems", ["user_id", "product_id"]
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_constraint(
        op.f("uq_cartitems_user_id"), "cartitems", type_="unique"
    )
