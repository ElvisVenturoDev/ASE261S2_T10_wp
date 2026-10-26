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
            "SELECT u.identificador_cliente, u.password_hash, u.rol, c.nombre "
            "FROM usuario u "
            "LEFT JOIN cliente c ON c.identificador = u.identificador_cliente "
            "WHERE u.correo = %s AND u.activo = 1",
            (correo,),
        )

        usuario = resultado[0] if resultado else None
        if not usuario or not check_password_hash(usuario["password_hash"], password):
            flash("Correo o contraseña incorrectos.", "error")
            return render_template("clientes/login.html", datos=request.form), 400

        nombre = usuario["nombre"] or "Administrador"
        session["cliente_id"] = usuario["identificador_cliente"]
        session["cliente_nombre"] = nombre
        session["rol"] = usuario["rol"]
        flash(f"¡Hola de nuevo, {nombre}! Sesión iniciada.", "ok")
        return redirect(url_for("inicio.index"))

    return render_template("clientes/login.html", datos={})


@login_bp.route("/logout")
def logout():
    session.clear()
    flash("Sesión cerrada correctamente.", "ok")
    return redirect(url_for("inicio.index"))