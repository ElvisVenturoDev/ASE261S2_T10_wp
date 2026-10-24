import json
import re
from datetime import date

from flask import (
    Blueprint,
    current_app,
    flash,
    redirect,
    render_template,
    request,
    url_for,
)

from app.catalog import PRODUCTS
from app.db import get_db

formulario_bp = Blueprint("formulario", __name__)

NOMBRE_RE = re.compile(r"[A-Za-zÁÉÍÓÚáéíóúÑñÜü' ]{3,80}")
TELEFONO_RE = re.compile(r"9\d{8}")
CORREO_RE = re.compile(
    r"[a-z0-9._+\-]+@(gmail\.com|gmail\.com\.pe|hotmail\.com|outlook\.com|yahoo\.com|vallegrande\.edu\.pe)"
)
ENTREGAS_VALIDAS = ("entrega_domicilio", "recogida")


def _nombre_producto(p):
    """Funciona si los productos son diccionarios u objetos."""
    return p["name"] if isinstance(p, dict) else p.name


def _productos_validos():
    return {_nombre_producto(p) for p in PRODUCTS}


def validar_pedido(f):
    errores = []
    nombre = " ".join(f.get("nombre", "").split())
    telefono = f.get("telefono", "").strip()
    correo = f.get("correo", "").strip()
    producto = f.get("producto", "")
    productos_carrito = f.get("productos_carrito", "")
    entrega = f.get("entrega") or "entrega_domicilio"
    comentarios = f.get("comentarios", "").strip()

    if not NOMBRE_RE.fullmatch(nombre) or len(nombre.replace(" ", "")) < 3:
        errores.append("El nombre debe tener al menos 3 letras (solo letras y espacios).")

    if not TELEFONO_RE.fullmatch(telefono):
        errores.append("El teléfono debe tener 9 dígitos y empezar con 9.")

    if correo and not CORREO_RE.fullmatch(correo):
        errores.append("El correo debe estar en minúsculas y usar un dominio permitido (ej. @gmail.com).")

    if productos_carrito:
        try:
            cart_items = json.loads(productos_carrito)
            if not isinstance(cart_items, list) or len(cart_items) == 0:
                errores.append("El carrito está vacío.")
            else:
                for item in cart_items:
                    if item.get("name") not in _productos_validos():
                        errores.append(f"Producto no válido: {item.get('name', 'desconocido')}.")
                    if not isinstance(item.get("quantity"), int) or item.get("quantity", 0) < 1:
                        errores.append("Las cantidades deben ser números enteros de 1 o más.")
        except (json.JSONDecodeError, TypeError):
            errores.append("Error al procesar los productos del carrito.")
    else:
        if producto not in _productos_validos():
            errores.append("Selecciona un producto válido.")

        try:
            if int(f.get("cantidad", "")) < 1:
                raise ValueError
        except ValueError:
            errores.append("La cantidad debe ser un número entero de 1 o más.")

    if entrega not in ENTREGAS_VALIDAS:
        errores.append("Selecciona una modalidad de entrega.")

    if len(comentarios) > 300:
        errores.append("Los comentarios no pueden superar 300 caracteres.")

    if "confirmacion" in f and not f.get("confirmacion"):
        errores.append("Debes aceptar los términos para enviar el pedido.")

    return errores


def _items_del_pedido(f):
    """Devuelve [(nombre_producto, cantidad)] desde el carrito o el producto individual."""
    productos_carrito = f.get("productos_carrito", "")
    if productos_carrito:
        return [(i["name"], int(i["quantity"])) for i in json.loads(productos_carrito)]
    return [(f["producto"], int(f["cantidad"]))]


def guardar_pedido(f):
    """Guarda la solicitud y reserva stock solo cuando alcanza para cubrirla."""
    nombre = " ".join(f["nombre"].split())
    telefono = f["telefono"].strip()
    correo = f.get("correo", "").strip().lower() or None
    entrega = f.get("entrega", "entrega_domicilio")
    if entrega == "recogida":
        direccion = "Recojo en tienda"
    else:
        direccion = (f.get("direccion", "").strip() + " " + f.get("distrito", "").strip()).strip()
        direccion = direccion or "Sin dirección"

    db = get_db()
    try:
        with db.cursor() as cur:
            cur.execute("SHOW COLUMNS FROM cliente")
            cliente_tiene_correo = any(
                columna["Field"] == "correo" for columna in cur.fetchall()
            )

            # 1. Buscar cliente existente (por correo o teléfono) o crearlo
            if cliente_tiene_correo:
                cur.execute(
                    "SELECT identificador FROM cliente "
                    "WHERE (correo = %s AND %s IS NOT NULL) OR telefono = %s LIMIT 1",
                    (correo, correo, telefono),
                )
            else:
                cur.execute(
                    "SELECT identificador FROM cliente WHERE telefono = %s LIMIT 1",
                    (telefono,),
                )
            fila = cur.fetchone()
            if fila:
                id_cliente = fila["identificador"]
            else:
                if cliente_tiene_correo:
                    cur.execute(
                        "INSERT INTO cliente (nombre, telefono, correo) "
                        "VALUES (%s, %s, %s)",
                        (nombre, telefono, correo),
                    )
                else:
                    cur.execute(
                        "INSERT INTO cliente (nombre, telefono) VALUES (%s, %s)",
                        (nombre, telefono),
                    )
                id_cliente = cur.lastrowid
                cur.execute(
                    "INSERT INTO detalle_cliente "
                    "(identificador_cliente, direccion, tipo_cliente, fecha_registro) "
                    "VALUES (%s, %s, %s, %s)",
                    (id_cliente, direccion, "Minorista", date.today()),
                )

            # 2. Crear la venta
            cur.execute(
                "INSERT INTO venta (fecha, identificador_cliente) VALUES (%s, %s)",
                (date.today(), id_cliente),
            )
            id_venta = cur.lastrowid

            # 3. Guardar los productos solicitados; reservar stock solo si alcanza.
            for nombre_prod, cantidad in _items_del_pedido(f):
                cur.execute(
                    "SELECT identificador, precio FROM producto WHERE nombre = %s",
                    (nombre_prod,),
                )
                prod = cur.fetchone()
                if not prod:
                    producto_catalogo = next(
                        (p for p in PRODUCTS if _nombre_producto(p) == nombre_prod),
                        None,
                    )
                    if not producto_catalogo:
                        raise ValueError(
                            f"El producto «{nombre_prod}» no está disponible en el catálogo."
                        )
                    categoria = (
                        producto_catalogo["category"]
                        if isinstance(producto_catalogo, dict)
                        else producto_catalogo.category
                    )
                    precio = (
                        producto_catalogo["price"]
                        if isinstance(producto_catalogo, dict)
                        else producto_catalogo.price
                    )
                    cur.execute(
                        "INSERT INTO producto (nombre, categoria, precio) "
                        "VALUES (%s, %s, %s)",
                        (
                            _nombre_producto(producto_catalogo),
                            categoria,
                            precio,
                        ),
                    )
                    prod = {
                        "identificador": cur.lastrowid,
                        "precio": precio,
                    }

                cur.execute(
                    "SELECT stock FROM inventario "
                    "WHERE identificador_producto = %s LIMIT 1 FOR UPDATE",
                    (prod["identificador"],),
                )
                inventario = cur.fetchone()
                if inventario and inventario["stock"] >= cantidad:
                    cur.execute(
                        "UPDATE inventario SET stock = stock - %s "
                        "WHERE identificador_producto = %s AND stock >= %s",
                        (cantidad, prod["identificador"], cantidad),
                    )

                cur.execute(
                    "INSERT INTO detalle_venta "
                    "(identificador_venta, identificador_producto, cantidad, precio_unitario) "
                    "VALUES (%s, %s, %s, %s)",
                    (id_venta, prod["identificador"], cantidad, prod["precio"]),
                )
        db.commit()
        return id_venta
    except Exception:
        db.rollback()
        raise


@formulario_bp.route("/formulario", methods=["GET", "POST"])
def formulario():
    if request.method == "POST":
        errores = validar_pedido(request.form)

        if not errores:
            try:
                guardar_pedido(request.form)
            except ValueError as e:
                errores.append(str(e))
            except Exception:
                current_app.logger.exception("Error inesperado guardando pedido")
                errores.append("No pudimos registrar tu pedido. Inténtalo de nuevo.")

        if errores:
            for e in errores:
                flash(e, "error")
            return (
                render_template(
                    "clientes/formulario.html",
                    products=PRODUCTS,
                    producto_seleccionado=request.form.get("producto", ""),
                    datos=request.form,
                ),
                400,
            )

        flash(
            "¡Pedido recibido! Confirmaremos la disponibilidad y entrega por WhatsApp.",
            "ok",
        )
        return redirect(url_for("formulario.pedido_registrado"))

    return render_template(
        "clientes/formulario.html",
        products=PRODUCTS,
        producto_seleccionado=request.args.get("producto", ""),
        datos={},
    )


@formulario_bp.route("/pedido-registrado")
def pedido_registrado():
    return render_template("clientes/pedido_registrado.html")