import re

import pymysql
from flask import Blueprint, current_app, render_template, request

from app.db import get_db


contacto_bp = Blueprint("contacto", __name__)
CORREO_RE = re.compile(r"[^@\s]+@[^@\s]+\.[^@\s]+")


@contacto_bp.route("/contacto", methods=["GET", "POST"])
def contacto():
    if request.method == "POST":
        nombre = " ".join(request.form.get("nombre", "").split())
        celular = request.form.get("celular", "").strip()
        correo = request.form.get("correo", "").strip().lower() or None
        asunto = request.form.get("asunto", "").strip()
        mensaje = request.form.get("mensaje", "").strip()

        errores = []
        if not nombre or len(nombre) > 80:
            errores.append("Ingresa tu nombre (máximo 80 caracteres).")
        if not celular or len(celular) > 15:
            errores.append("Ingresa un celular válido (máximo 15 caracteres).")
        if correo and (len(correo) > 120 or not CORREO_RE.fullmatch(correo)):
            errores.append("Ingresa un correo válido.")
        if len(asunto) > 80:
            errores.append("El asunto no puede superar 80 caracteres.")
        if not mensaje or len(mensaje) > 5000:
            errores.append("El mensaje es obligatorio y no puede superar 5000 caracteres.")

        if errores:
            return render_template(
                "clientes/contacto.html",
                error=" ".join(errores),
                enviado=False,
                nombre=nombre,
            ), 400

        db = get_db()
        try:
            with db.cursor() as cur:
                cur.execute(
                    "INSERT INTO mensaje_contacto "
                    "(nombre, celular, correo, asunto, mensaje, ip, user_agent) "
                    "VALUES (%s, %s, %s, %s, %s, %s, %s)",
                    (
                        nombre,
                        celular,
                        correo,
                        asunto or None,
                        mensaje,
                        request.remote_addr,
                        request.user_agent.string[:255] or None,
                    ),
                )
            db.commit()
        except pymysql.MySQLError:
            db.rollback()
            current_app.logger.exception("Error guardando mensaje de contacto")
            return render_template(
                "clientes/contacto.html",
                error="No pudimos guardar tu mensaje. Inténtalo de nuevo más tarde.",
                enviado=False,
                nombre=nombre,
            ), 500

        return render_template(
            "clientes/contacto.html",
            enviado=True,
            nombre=nombre,
        )

    return render_template("clientes/contacto.html", enviado=False, nombre="")