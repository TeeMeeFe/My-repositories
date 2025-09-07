from connect_db import connectToDB, logger
import mysql.connector

conn = connectToDB()

# Parametros para usuario nuevo
nombre = "Maira"        
edad = 18

if conn.is_connected:
    try:
        with conn.cursor() as cursor:
            # Generamos la insercion de una fila con los datos en la tabla
            query = "INSERT INTO usuarios (nombre, edad) VALUES (%s, %s)"
            cursor.execute(query, (nombre, edad,))
            logger.info(cursor)
            conn.commit()
            logger.info("Usuario registrado con exito.")
    except mysql.connector.Error as err:
        logger.error(err)
        raise f"Error al insertar, {err}"
    finally:
        cursor.close()
        conn.close()