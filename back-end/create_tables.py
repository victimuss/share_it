import asyncio
from databases.databases_compile import Base
from databases.users_db import *
from databases.lesson_db import *
from databases.main_databases import engine

async def main():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("Таблицы успешно созданы!")

if __name__ == "__main__":
    asyncio.run(main())