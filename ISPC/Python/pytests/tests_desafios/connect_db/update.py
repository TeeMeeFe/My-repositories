from connect_db import connectToDB, logger
import mysql.connector

conn = connectToDB()

# Parametros para varios usuarios nuevos
cambiar_usuario = ["Rosario", 1]

if conn.is_connected:
    try:
        with conn.cursor() as cursor:
            # Generamos la insercion de una fila con los datos en la tabla
            query = "UPDATE usuarios SET nombre=%s WHERE id=%s"
            cursor.execute(query, cambiar_usuario)
            logger.info(cursor)
            conn.commit()
            logger.info(f"{cursor.rowcount} usuario/s modificado/s con exito.")
    except mysql.connector.Error as err:
        logger.error(err)
        raise f"Error al modificar, {err}"
    finally:
        conn.close()