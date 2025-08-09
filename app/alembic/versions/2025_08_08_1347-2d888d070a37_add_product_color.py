"""add product color

Revision ID: 2d888d070a37
Revises: 5ae34653793f
Create Date: 2025-08-08 13:47:13.744383

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "2d888d070a37"
down_revision: Union[str, Sequence[str], None] = "5ae34653793f"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table(
        "productcolors",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("product_id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("stock", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["product_id"],
            ["products.id"],
            name=op.f("fk_productcolors_product_id_products"),
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_productcolors")),
    )
    op.drop_constraint(
        op.f("fk_productimages_product_id_products"),
        "productimages",
        type_="foreignkey",
    )
    op.drop_column("productimages", "product_id")
    op.drop_column("products", "stock")


def downgrade() -> None:
    """Downgrade schema."""
    op.add_column(
        "products",
        sa.Column("stock", sa.INTEGER(), autoincrement=False, nullable=False),
    )
    op.add_column(
        "productimages",
        sa.Column(
            "product_id", sa.INTEGER(), autoincrement=False, nullable=False
        ),
    )
    op.create_foreign_key(
        op.f("fk_productimages_product_id_products"),
        "productimages",
        "products",
        ["product_id"],
        ["id"],
        ondelete="CASCADE",
    )
    op.drop_table("productcolors")
