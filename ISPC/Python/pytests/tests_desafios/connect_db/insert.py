from connect_db import connectToDB, logger
import mysql.connector

conn = connectToDB()

# Parametros para varios usuarios nuevos
nuevos_usuarios = [
    ("Camila", 19),
    ("Tobias", 25),
    ("Verónica", 31)
]

if conn.is_connected:
    try:
        with conn.cursor() as cursor:
            # Generamos la insercion de una fila con los datos en la tabla
            query = "INSERT INTO usuarios (nombre, edad) VALUES (%s, %s)"
            cursor.executemany(query, nuevos_usuarios)
            logger.info(cursor)
            conn.commit()
            logger.info(f"{cursor.rowcount} usuario/s registrado/s con exito.")
    except mysql.connector.Error as err:
        logger.error(err)
        raise f"Error al insertar, {err}"
    finally:
        cursor.close()
        conn.close()