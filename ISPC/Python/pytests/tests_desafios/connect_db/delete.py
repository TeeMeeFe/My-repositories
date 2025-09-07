import mysql.connector
from connect_db import connectToDB, logger

conn = connectToDB()

if conn.is_connected:
    id = 12 # Puede ser un ID al azar tambien

    try:
        with conn.cursor() as cursor:
            # Consultamos si el usuario existe primero
            query = "SELECT * FROM usuarios WHERE id=%s"
            cursor.execute(query, (id,))

            resultado = cursor.fetchall()
            if(resultado):
                # Ahora eliminamos el usuario con id
                query = "DELETE FROM usuarios WHERE id=%s"
                cursor.execute(query, (id,))
                logger.info(cursor)
                conn.commit()
                logger.info(f"Usuario con id={id} eliminado exitosamente")
            else: 
                logger.error(f"Usuario no fue encontrado o ya no existe")
    except mysql.connector.Error as err:
        logger.error(err)
        raise f"Error al intentar eliminar usuario, {err}"
    finally:
        conn.close()
