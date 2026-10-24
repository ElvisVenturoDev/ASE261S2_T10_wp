from flask import Blueprint, render_template

from app.catalog import PRODUCTS
from app.db import query

productos_bp = Blueprint("productos", __name__)

CATEGORIAS_WEB = {"leche", "yogurt", "queso", "mantequilla", "crema"}

IMAGENES = {
    "leche": "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=900&q=85",
    "yogurt": "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=85",
    "queso": "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=900&q=85",
}
IMAGEN_DEFECTO = IMAGENES["leche"]


def _productos_con_mysql():
    """Lo visual sale de catalog.py; precio/stock de MySQL.
    Los productos que solo existen en MySQL (creados en el escritorio) se agregan al final."""
    productos = [dict(p) for p in PRODUCTS]  # copia, no se modifica catalog.py

    try:
        filas = query(
            "SELECT p.identificador, p.nombre, p.categoria, p.precio, "
            "COALESCE(i.stock, 0) AS stock "
            "FROM producto p "
            "LEFT JOIN inventario i ON i.identificador_producto = p.identificador "
            "ORDER BY p.identificador"
        )
    except Exception as e:
        # Si MySQL está apagado, la web sigue funcionando con los datos de catalog.py
        print("No se pudo leer MySQL:", e)
        filas = []

    por_nombre = {f["nombre"]: f for f in filas}
    nombres_catalogo = {p["name"] for p in productos}

    # 1) Productos de catalog.py: precio y stock desde MySQL
    for p in productos:
        fila = por_nombre.get(p["name"])
        if fila:
            p["price"] = float(fila["precio"])
            p["stock"] = int(fila["stock"])
            p["agotado"] = p["stock"] <= 0
        else:
            p["stock"] = 0
            p["agotado"] = True

    # 2) Productos nuevos (solo en MySQL): se agregan completos
    for f in filas:
        if f["nombre"] in nombres_catalogo:
            continue
        categoria = (f["categoria"] or "").lower()
        if categoria not in CATEGORIAS_WEB:
            categoria = "otros"
        stock = int(f["stock"])
        imagen = IMAGENES.get(categoria, IMAGEN_DEFECTO)
        productos.append({
            "id": f"db-{f['identificador']}",
            "name": f["nombre"],
            "detail": "",
            "category": categoria,
            "price": float(f["precio"]),
            "featured": False,
            "rating": 0,
            "stock": stock,
            "agotado": stock <= 0,
            "image": imagen,
            "alt": f["nombre"],
        })
    return productos


@productos_bp.get("/productos")
def productos():
    return render_template("clientes/productos.html", products=_productos_con_mysql())