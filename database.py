```python
import sqlite3
from sqlite3 import Error

def create_connection():
    conn = None;
    try:
        conn = sqlite3.connect(':memory:')       
        print(sqlite3.version)
    except Error as e:
        print(e)
    finally:
        if conn:
            conn.close()

def create_table(conn, create_table_sql):
    try:
        c = conn.cursor()
        c.execute(create_table_sql)
    except Error as e:
        print(e)

def main():
    database = r"C:\sqlite\db\pythonsqlite.db"

    sql_create_macros_table = """ CREATE TABLE IF NOT EXISTS macros (
                                        id integer PRIMARY KEY,
                                        protein integer NOT NULL,
                                        carbs integer NOT NULL,
                                        fats integer NOT NULL
                                    ); """

    sql_create_weightloss_table = """CREATE TABLE IF NOT EXISTS weightloss (
                                    id integer PRIMARY KEY,
                                    current_weight integer NOT NULL,
                                    goal_weight integer NOT NULL,
                                    progress integer NOT NULL
                                );"""

    sql_create_recipes_table = """CREATE TABLE IF NOT EXISTS recipes (
                                    id integer PRIMARY KEY,
                                    name text NOT NULL,
                                    ingredients text NOT NULL,
                                    instructions text NOT NULL
                                );"""

    conn = create_connection(database)

    if conn is not None:
        create_table(conn, sql_create_macros_table)
        create_table(conn, sql_create_weightloss_table)
        create_table(conn, sql_create_recipes_table)
    else:
        print("Error! cannot create the database connection.")

if __name__ == '__main__':
    main()
```