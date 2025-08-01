from sqlalchemy.ext.asyncio.session import AsyncSession
from sqlalchemy import insert, select, delete, inspect


class SQlAlchemyRepository:
    model = None

    async def create(self, session: AsyncSession, data: dict):
        stmt = insert(self.model).values(**data).returning(self.model)
        result = await session.execute(stmt)
        return result.scalar()

    async def get_all(self, session: AsyncSession):
        res = await session.scalars(select(self.model))
        return [user for user in res]

    async def get_by_filters(self, session: AsyncSession, filters: dict, one: bool = True):
        stmt = select(self.model).filter_by(**filters)
        res = await session.execute(stmt)
        if one:
            return res.scalar_one_or_none()
        return res.scalars().all()

    async def delete_by_id(self, session: AsyncSession, entity_id: int):
        res = await session.execute(
            delete(self.model)
            .where(self.model.id == entity_id).returning(self.model))
        return res.scalar()

    async def delete(self, session: AsyncSession, entity):
        await session.delete(entity)
        await session.commit()


    async def update(
            self,
            session: AsyncSession,
            data: dict,
            object_to_update):
        mapper = inspect(self.model)
        for key, value in data.items():
            if key in mapper.attrs:
                setattr(object_to_update, key, value)

    async def get_by_id(self, session: AsyncSession, id: int):
        return await session.get(self.model, id)