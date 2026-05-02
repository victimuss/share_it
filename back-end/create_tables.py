import asyncio
from databases.databases_compile import Base, engine
from databases.users_db import *
from databases.lesson_db import *

async def main():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("Таблицы успешно созданы!")

if __name__ == "__main__":
    asyncio.run(main())