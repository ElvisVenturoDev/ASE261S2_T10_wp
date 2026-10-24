from flask import (
    Blueprint,
    flash,
    redirect,
    render_template,
    request,
    session,
    url_for,
)
from werkzeug.security import check_password_hash

from app.db import query

login_bp = Blueprint("login", __name__)


@login_bp.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        correo = request.form.get("correo", "").strip().lower()
        password = request.form.get("password", "")

        if not correo or not password:
            flash("Ingresa tu correo y contraseña.", "error")
            return render_template("clientes/login.html", datos=request.form), 400

        resultado = query(
            "SELECT identificador, nombre, password_hash FROM cliente WHERE correo = %s",
            (correo,),
        )

        cliente = resultado[0] if resultado else None
        if not cliente or not cliente.get("password_hash") or not check_password_hash(
            cliente["password_hash"], password
        ):
            flash("Correo o contraseña incorrectos.", "error")
            return render_template("clientes/login.html", datos=request.form), 400

        session["cliente_id"] = cliente["identificador"]
        session["cliente_nombre"] = cliente["nombre"]
        flash(f"¡Hola de nuevo, {cliente['nombre']}! Sesión iniciada.", "ok")
        return redirect(url_for("inicio.index"))

    return render_template("clientes/login.html", datos={})


@login_bp.route("/logout")
def logout():
    session.clear()
    flash("Sesión cerrada correctamente.", "ok")
    return redirect(url_for("inicio.index"))
