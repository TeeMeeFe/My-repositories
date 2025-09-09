import mysql.connector
from mysql.connector import errorcode
from interface_dao import DataAccessDAO
from magical_creature import MagicCreature
import configparser
import pathlib

class connect_db:
    def __init__(self, config_file = "config.ini"):
        self.config_file = config_file

        if(self.config_file != ""):
            # Creamos una instacia de configparser
            config = configparser.ConfigParser()
            # Establecemos la ruta para configparser
            config_path = pathlib.Path(__file__).parent.absolute() / config_file
            # Leemos dicho archivo
            config.read(config_path)
        # Definimos del archivo config.ini una variable config_db que contiene los datos de la seccion [database]
        self.config_db = config["database"]
    
    def get_db_name(self):
        return self.config_db.get("database")
    
    # Metodo para conectar a una base de datos mysql
    def connect_to_mysql(self):
        try:
            return mysql.connector.connect(
                user = self.config_db.get("user"),
                password = self.config_db.get("password"),
                host = self.config_db.get("host"),
                database = self.config_db.get("database"),
                port = self.config_db.get("port")
            )
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                raise "El usuario o la contraseña ingresados no son correctos"
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                raise "No se pudo conectar con la base de datos"
            else:
                raise err
            