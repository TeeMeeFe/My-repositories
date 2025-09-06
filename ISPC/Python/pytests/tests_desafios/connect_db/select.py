from connect_db import connectToDB
import logging
import mysql.connector

conn = connectToDB()

if conn.is_connected:
    # Creamos un cursor para conexiones sql
    cursor = conn.cursor()

    # Creamos una consulta parametrizada con un nombre de usuario
    user_name = "ana"
    query = "SELECT * FROM usuarios WHERE nombre =%s"

    try:
        # Generamos la consulta SQL
        cursor.execute(query, (user_name,))
        logging.log(logging.INFO, cursor)

        for fila in cursor.fetchall():
            print(f"ID: {fila[0]}, Nombre: {fila[1]}, Edad: {fila[2]}")

        cursor.close()
    except mysql.connector.Error as err:
        logging.error(err)
        raise f"Error al ejecutar la consulta: {err}"
    finally:
        cursor.close()
        conn.close()


        