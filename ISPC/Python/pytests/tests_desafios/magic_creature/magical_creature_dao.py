import mysql.connector
from interface_dao import DataAccessDAO
from magical_creature import MagicCreature
from db_connect import connect_db

class MagicalCreatureDAO(DataAccessDAO):
    def __init__(self, db_conn: connect_db):
        self.db_conn = db_conn.connect_to_mysql()
        self.db_name = db_conn.get_db_name()

    # Metodo para leer una creatura por su id
    def get(self, id: int) -> MagicCreature:
        with self.db_conn as conn:
            try:
                conn.reconnect() 
                cursor = conn.cursor()
                query = "SELECT id, nombre, vigor, poder_magico FROM creatures WHERE id=%s"
                cursor.execute(query, (id,))
                fila = cursor.fetchone()

                if fila:
                    return MagicCreature(fila[0], fila[1], fila[2], fila[3])
                return None
            except mysql.connector.Error as err:    
                raise err

    # Metodo para leer todas las creaturas
    def get_all(self) -> list:
        with self.db_conn as conn:
            try:
                conn.reconnect()
                cursor = conn.cursor()
                query = "SELECT id, nombre, vigor, poder_magico FROM creatures"
                cursor.execute(query)
                filas = cursor.fetchall()

                return [MagicCreature(fila[0], fila[1], fila[2], fila[3],) for fila in filas]
            except mysql.connector.Error as err:    
                raise err

    # Metodo para crear una creatura
    def create(self, creature: MagicCreature):
        with self.db_conn as conn:
            try: 
                conn.reconnect() 
                cursor = conn.cursor()
                query = "INSERT INTO creatures (nombre, vigor, poder_magico) VALUES (%s, %s, %s)"
                insert = (*creature._nombre, *creature._vigor, creature._poder_magico,)
                cursor.execute(query, insert)
                conn.commit()
            except mysql.connector.Error as err:    
                raise err

    # Metodo para modificar una creatura
    def update(self, id: int, creature: MagicCreature):
        with self.db_conn as conn:
            try:
                conn.reconnect() 
                cursor = conn.cursor()
                query = "UPDATE creatures SET nombre=%s, vigor=%s, poder_magico=%s WHERE id=%s"
                update = (*creature._nombre, *creature._vigor, creature._poder_magico, id)
                cursor.execute(query, update)
                conn.commit()
            except mysql.connector.Error as err:    
                raise err
            
    # Metodo para eliminar una creatura
    def delete(self, id: int):
        with self.db_conn as conn:
            try:
                conn.reconnect() 
                cursor = conn.cursor()
                delete = "DELETE FROM creatures WHERE id=%s"
                cursor.execute(delete, (id,))
                conn.commit()
            except mysql.connector.Error as err:
                raise err
            