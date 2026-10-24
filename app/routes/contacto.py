from flask import Blueprint, render_template, request


contacto_bp = Blueprint("contacto", __name__)


@contacto_bp.route("/contacto", methods=["GET", "POST"])
def contacto():
    if request.method == 'POST':
        nombre = request.form.get("nombre", "").strip()
        celular = request.form.get("celular", "").strip()
        correo = request.form.get("correo", "").strip()
        asunto = request.form.get("asunto", "").strip()
        mensaje = request.form.get("mensaje", "").strip()

        if not nombre or not celular or not mensaje:
            return render_template(
                "clientes/contacto.html",
                error="Completa tu nombre, celular y mensaje.",
                enviado=False,
                nombre=nombre,
            )

        return render_template(
            "clientes/contacto.html",
            enviado=True,
            nombre=nombre,
        )

    return render_template("clientes/contacto.html", enviado=False, nombre="")