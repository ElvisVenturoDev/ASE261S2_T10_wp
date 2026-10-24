import re
from datetime import date

import pymysql
from flask import Blueprint, flash, redirect, render_template, request, url_for
from werkzeug.security import generate_password_hash

from app.db import get_db, query

auth_bp = Blueprint("auth", __name__)

CORREO_RE = re.compile(r"[^@\s]+@[^@\s]+\.[^@\s]+")
TELEFONO_RE = re.compile(r"9\d{8}")


@auth_bp.route("/registro", methods=["GET", "POST"])
def registro():
    if request.method == "POST":
        nombre = " ".join(request.form.get("nombre", "").split())
        correo = request.form.get("correo", "").strip().lower()
        telefono = request.form.get("telefono", "").strip()
        password = request.form.get("password", "")
        confirmar = request.form.get("confirmar_password", "")

        errores = []
        if len(nombre.replace(" ", "")) < 3:
            errores.append("El nombre debe tener al menos 3 letras.")
        if not CORREO_RE.fullmatch(correo):
            errores.append("Ingresa un correo válido.")
        if telefono and not TELEFONO_RE.fullmatch(telefono):
            errores.append("El teléfono debe tener 9 dígitos y empezar con 9.")
        if len(password) < 6:
            errores.append("La contraseña debe tener al menos 6 caracteres.")
        if password != confirmar:
            errores.append("Las contraseñas no coinciden.")

        if not errores:
            existente = query("SELECT identificador FROM cliente WHERE correo = %s", (correo,))
            if existente:
                errores.append("Ya existe una cuenta con ese correo.")

        if errores:
            for e in errores:
                flash(e, "error")
            return render_template("clientes/registro.html", datos=request.form), 400

        db = get_db()
        try:
            with db.cursor() as cur:
                cur.execute(
                    "INSERT INTO cliente (nombre, telefono, correo, password_hash) "
                    "VALUES (%s, %s, %s, %s)",
                    (nombre, telefono, correo, generate_password_hash(password)),
                )
                id_cliente = cur.lastrowid
                cur.execute(
                    "INSERT INTO detalle_cliente "
                    "(identificador_cliente, direccion, tipo_cliente, fecha_registro) "
                    "VALUES (%s, %s, %s, %s)",
                    (id_cliente, "Sin dirección", "Minorista", date.today()),
                )
            db.commit()
        except pymysql.err.IntegrityError:
            db.rollback()
            flash("Ya existe una cuenta con ese correo.", "error")
            return render_template("clientes/registro.html", datos=request.form), 400

        flash("¡Cuenta creada! Ahora inicia sesión para continuar.", "ok")
        return redirect(url_for("login.login"))

    return render_template("clientes/registro.html", datos={})