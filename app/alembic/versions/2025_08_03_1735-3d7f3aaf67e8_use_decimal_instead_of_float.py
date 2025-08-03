"""use decimal instead of float

Revision ID: 3d7f3aaf67e8
Revises: a238eeaa8759
Create Date: 2025-08-03 17:35:03.626914

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "3d7f3aaf67e8"
down_revision: Union[str, Sequence[str], None] = "a238eeaa8759"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.alter_column(
        "discounts",
        "percent",
        existing_type=sa.DOUBLE_PRECISION(precision=53),
        type_=sa.Numeric(precision=5, scale=2),
        existing_nullable=False,
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.alter_column(
        "discounts",
        "percent",
        existing_type=sa.Numeric(precision=5, scale=2),
        type_=sa.DOUBLE_PRECISION(precision=53),
        existing_nullable=False,
    )
