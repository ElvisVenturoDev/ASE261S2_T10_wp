import os

import pymysql
from pymysql.cursors import DictCursor
from flask import g


def _env(name, default=None):
    """Lee una variable de entorno y falla con un mensaje claro si falta."""
    value = os.environ.get(name, default)
    if value is None or value == "":
        raise RuntimeError(
            f"Falta la variable de entorno {name}. Revisa tu archivo .env "
            "y completa las variables requeridas en el README."
        )
    return value


def get_db():
    if "db" not in g:
        g.db = pymysql.connect(
            host=_env("DB_HOST"),
            port=int(_env("DB_PORT")),
            user=_env("DB_USER"),
            password=_env("DB_PASSWORD"),
            database=_env("DB_NAME"),
            charset="utf8mb4",
            cursorclass=DictCursor,
            autocommit=False,
        )
    return g.db

def close_db(_exception=None):
    db = g.pop("db", None)
    if db is not None:
        db.close()


def query(sql, params=()):
    """SELECT: devuelve una lista de diccionarios."""
    with get_db().cursor() as cur:
        cur.execute(sql, params)
        return cur.fetchall()


def init_db():
    get_db()  # El esquema se administra externamente desde MySQL Workbench.


def init_app(app):
    app.teardown_appcontext(close_db)
