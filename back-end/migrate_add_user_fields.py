"""
One-off migration: adds avatar, site, and telegram columns to the users table.
Safe to run multiple times — skips columns that already exist.
Run from the back-end directory:
    python migrate_add_user_fields.py
"""
import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "db.sqlite3")

NEW_COLUMNS = [
    ("avatar",   "VARCHAR(255) DEFAULT ''"),
    ("site",     "VARCHAR(255) DEFAULT ''"),
    ("telegram", "VARCHAR(255) DEFAULT ''"),
]

def migrate():
    if not os.path.exists(DB_PATH):
        print(f"[ERROR] Database not found at: {DB_PATH}")
        return

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Get existing columns
    cursor.execute("PRAGMA table_info(users)")
    existing = {row[1] for row in cursor.fetchall()}
    print(f"Existing columns: {existing}")

    for col_name, col_def in NEW_COLUMNS:
        if col_name in existing:
            print(f"  [SKIP] Column '{col_name}' already exists.")
        else:
            sql = f"ALTER TABLE users ADD COLUMN {col_name} {col_def}"
            print(f"  [ADD]  {sql}")
            cursor.execute(sql)

    conn.commit()
    conn.close()
    print("\nMigration complete!")

if __name__ == "__main__":
    migrate()
