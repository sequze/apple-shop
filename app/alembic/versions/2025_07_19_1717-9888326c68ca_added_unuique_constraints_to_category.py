"""added unuique constraints to category

Revision ID: 9888326c68ca
Revises: 9f8ede63f571
Create Date: 2025-07-19 17:17:02.014095

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "9888326c68ca"
down_revision: Union[str, Sequence[str], None] = "9f8ede63f571"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_unique_constraint(
        op.f("uq_categories_name"), "categories", ["name", "parent_id"]
    )


def downgrade() -> None:
    op.drop_constraint(
        op.f("uq_categories_name"), "categories", type_="unique"
    )
