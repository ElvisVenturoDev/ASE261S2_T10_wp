# ASE261S2_T10_wp

## Configuracion local

Las credenciales se leen de variables de entorno definidas en un archivo `.env`
en la raiz del proyecto (ignorado por Git). Crea ese archivo manualmente con
los valores de tu MySQL:

```dotenv
DB_HOST=127.0.0.1
DB_PORT=3308
DB_USER=tu_usuario_mysql
DB_PASSWORD=tu_contrasena_mysql
DB_NAME=Miskylac
SECRET_KEY=una_clave_secreta_larga
PORT=5000
```

| Variable | Descripcion |
| --- | --- |
| `DB_HOST` | Host de MySQL (local, Docker o Aiven) |
| `DB_PORT` | Puerto MySQL |
| `DB_USER` | Usuario MySQL |
| `DB_PASSWORD` | Contrasena MySQL |
| `DB_NAME` | Nombre de la base de datos |
| `SECRET_KEY` | Clave secreta de Flask |
| `PORT` | Puerto del servidor (por defecto 5000) |

Instala las dependencias y arranca:

```bash
pip install -r requirements.txt
python app.py
```

Si falta alguna variable, la app muestra un error indicando cual. En Docker o
en el hosting las variables se pasan con `-e`, `--env-file .env` o el panel de
variables del proveedor (el archivo `.env` no se copia dentro de la imagen).

## Base de datos

El esquema y los datos iniciales se administran desde MySQL Workbench. Ejecuta
allí tu script SQL antes de iniciar la aplicación. La app espera que exista el
esquema `Miskylac` con sus tablas y vistas.

Tablas principales: `cliente`, `detalle_cliente`, `usuario`, `producto`,
`inventario`, `venta`, `detalle_venta`, `mensaje_contacto`, `intento_login` y
`recuperacion_password`.

## MySQL en Docker y Workbench

La configuración local de este proyecto conecta la aplicación a
`127.0.0.1:3308` y al esquema `Miskylac`. Si el contenedor MySQL publica
el puerto `3306` como `3308` en el equipo, usa esos mismos valores en MySQL
Workbench (Hostname `127.0.0.1`, Port `3308`) y selecciona
`Miskylac` como esquema predeterminado. Después de ejecutar el script
SQL en Workbench, actualiza la lista de esquemas y tablas.

El `Dockerfile` de la aplicación no crea la base de datos ni ejecuta los
scripts SQL. Si también ejecutas Flask dentro de Docker,
`127.0.0.1` se refiere al propio contenedor de Flask; en ese caso configura
`DB_HOST` con el nombre del contenedor/servicio MySQL y `DB_PORT=3306` en una red
Docker compartida. Desde Flask ejecutándose directamente en Windows, usa el
puerto publicado del contenedor, por ejemplo `DB_HOST=127.0.0.1` y
`DB_PORT=3308`.
