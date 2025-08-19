"""add color code to ProductColor

Revision ID: 4458825224a5
Revises: 859b4e782038
Create Date: 2025-08-19 20:37:39.289264

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "4458825224a5"
down_revision: Union[str, Sequence[str], None] = "859b4e782038"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.add_column(
        "productcolors", sa.Column("color_code", sa.String(), nullable=False)
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_column("productcolors", "color_code")
