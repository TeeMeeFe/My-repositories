import mysql.connector 
import logging
from mysql.connector import errorcode

# Configuración del logger
logger = logging.getLogger("mysql.connector")
logger.setLevel(logging.INFO) # Establecemos el nivel de registro hasta INFO

# Formateamos el registro del logger
formatter = logging.Formatter("[%(asctime)s] - %(name)s(%(levelname)s): %(message)s")

# Llevamos los registros a la consola
stream_handler = logging.StreamHandler()
stream_handler.setFormatter(formatter)
logger.addHandler(stream_handler)

# Conectamos a una base de datos MySQL local
def conectarABD():
    try:
        return mysql.connector.connect(
            user = "root",
            password = "",
            host = "localhost",
            database = "test", 
            port = "3307"
        )
    except mysql.connector.Error as err:
        logger.error(err)
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            raise "El usuario o contraseña no son correctos"
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            raise "Error en la conexión a la base de datos"
        else:
            raise "Se ha producido un error!"

conn = conectarABD()

# Creamos un cursor para ejecutar sentencias SQL
cursor = conn.cursor()

# Creamos una tabla si no existe
e = cursor.execute("""
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY,
        nombre TEXT,
        edad INTEGER
    )
""")

# Insertamos datos en la tabla
#cursor.execute("INSERT INTO usuarios (id, nombre, edad) VALUES (%s, %s, %s)", (1, "ana", 30))
#cursor.execute("INSERT INTO usuarios (id, nombre, edad) VALUES (%s, %s, %s)", (2, "bob", 25))
conn.commit()

# Realizamos una consulta SQL
cursor.execute("SELECT * FROM usuarios")
for fila in cursor.fetchall():
    print(f"ID: {fila[0]}, Nombre: {fila[1]}, Edad: {fila[2]}")

# Cerramos la conexion con la BD
cursor.close()
conn.close()