"""add color_id to CartItem

Revision ID: c4462afd5992
Revises: 63c6558aeebe
Create Date: 2025-09-02 16:03:23.745084

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "c4462afd5992"
down_revision: Union[str, Sequence[str], None] = "63c6558aeebe"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.add_column(
        "cartitems", sa.Column("color_id", sa.Integer(), nullable=True)
    )
    op.create_foreign_key(
        op.f("fk_cartitems_color_id_productcolors"),
        "cartitems",
        "productcolors",
        ["color_id"],
        ["id"],
        ondelete="SET NULL",
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_constraint(
        op.f("fk_cartitems_color_id_productcolors"),
        "cartitems",
        type_="foreignkey",
    )
    op.drop_column("cartitems", "color_id")
