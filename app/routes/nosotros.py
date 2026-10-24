from flask import Blueprint, render_template

nosotros_bp = Blueprint("nosotros", __name__)


@nosotros_bp.get("/nosotros")
def nosotros():
    return render_template("clientes/nosotros.html")
