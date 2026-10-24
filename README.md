# ASE261S2_T10_wp

## Configuracion local

Las credenciales no viven en el codigo. Se leen de variables de entorno
definidas en un archivo `.env` en la raiz del proyecto (ignorado por Git).

```bash
cp .env.example .env   # o: copy .env.example .env (Windows)
```

Luego completa los valores reales en `.env`:

| Variable | Descripcion |
| --- | --- |
| `DB_HOST` | Host MySQL (Aiven) |
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
