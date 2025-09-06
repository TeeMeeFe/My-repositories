from connect_db import connectToDB, logger
import mysql.connector

conn = connectToDB()

# Parametros para usuario nuevo
id = 3
nombre = "Maira"        
edad = 18

if conn.is_connected:
    try:
        with conn.cursor() as cursor:
            query = "INSERT INTO usuarios (id, nombre, edad) VALUES (%s, %s, %s)"
            cursor.execute(query, (id, nombre, edad,))
            conn.commit()
            logger.info("Usuario registrado con exito.")
    except mysql.connector.Error as err:
        logger.error(err)
        raise f"Error al insertar, {err}"
    finally:
        cursor.close()
        conn.close()