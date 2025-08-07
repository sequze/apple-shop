"""delete useless category parent id

Revision ID: 94de7f1623b6
Revises: 766f757bb3cb
Create Date: 2025-08-07 13:32:01.522749

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "94de7f1623b6"
down_revision: Union[str, Sequence[str], None] = "766f757bb3cb"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.drop_constraint(
        op.f("uq_categories_name"), "categories", type_="unique"
    )
    op.drop_constraint(
        op.f("fk_categories_parent_id_categories"),
        "categories",
        type_="foreignkey",
    )
    op.drop_column("categories", "parent_id")


def downgrade() -> None:
    """Downgrade schema."""
    op.add_column(
        "categories",
        sa.Column(
            "parent_id", sa.INTEGER(), autoincrement=False, nullable=True
        ),
    )
    op.create_foreign_key(
        op.f("fk_categories_parent_id_categories"),
        "categories",
        "categories",
        ["parent_id"],
        ["id"],
    )
    op.create_unique_constraint(
        op.f("uq_categories_name"),
        "categories",
        ["name", "parent_id"],
        postgresql_nulls_not_distinct=False,
    )
