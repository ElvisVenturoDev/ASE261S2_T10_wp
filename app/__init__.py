import os
from pathlib import Path

from flask import Flask, send_from_directory

# Carga las variables de .env (raíz del proyecto) antes de leer la configuracion.
try:
    from dotenv import load_dotenv
except ModuleNotFoundError:  # sin python-dotenv se usan solo las variables del sistema
    load_dotenv = None

if load_dotenv is not None:
    load_dotenv(Path(__file__).resolve().parent.parent / ".env")

from app import db as db_module


def create_app(test_config=None):
    app = Flask(__name__)
    app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "dev-secret-key-santaclara")

    if test_config:
        app.config.update(test_config)

    db_module.init_app(app)
    with app.app_context():
        db_module.init_db()

    from app.routes.auth import auth_bp
    from app.routes.contacto import contacto_bp
    from app.routes.formulario import formulario_bp
    from app.routes.inicio import inicio_bp
    from app.routes.login import login_bp
    from app.routes.nosotros import nosotros_bp
    from app.routes.productos import productos_bp

    app.register_blueprint(inicio_bp)
    app.register_blueprint(nosotros_bp)
    app.register_blueprint(productos_bp)
    app.register_blueprint(contacto_bp)
    app.register_blueprint(formulario_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(login_bp)

    @app.get("/sitemap.xml")
    def sitemap():
        return send_from_directory(
            os.path.dirname(app.root_path),
            "sitemap.xml",
            mimetype="application/xml",
        )

    return app
