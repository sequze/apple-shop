"""add product views

Revision ID: 63c6558aeebe
Revises: 4458825224a5
Create Date: 2025-09-01 19:09:59.036075

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "63c6558aeebe"
down_revision: Union[str, Sequence[str], None] = "4458825224a5"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.add_column(
        "products",
        sa.Column(
            "views", sa.Integer(), server_default=sa.text("0"), nullable=False
        ),
    )



def downgrade() -> None:
    """Downgrade schema."""
    op.drop_column("products", "views")
