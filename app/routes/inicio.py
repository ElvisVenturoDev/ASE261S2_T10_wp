from flask import Blueprint, render_template

from app.catalog import PRODUCTS

inicio_bp = Blueprint("inicio", __name__)


@inicio_bp.get("/")
def index():
    return render_template("clientes/index.html", products=PRODUCTS[:4])
