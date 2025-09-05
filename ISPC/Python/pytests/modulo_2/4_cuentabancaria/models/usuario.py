from random import randint

class Usuario:
    __usuarios = []
    _usuario_ultimo_id = 0

    def __init__(self, id, nombre, digCuenta, dinero=0):
        self._id = id
        self._nombre = nombre
        self._dinero = dinero
        self._digCuenta = digCuenta

    def __len__(self):
        return len(self.__usuarios)

    @classmethod
    def verUsuarioPorNombre(cls, nombre):
        for u in cls.__usuarios:
            if (nombre == u._nombre):
                return u
        return None

    @classmethod
    def verUsuarioPorDigCuenta(cls, digCuenta):
        for u in cls.__usuarios:
            if (digCuenta == u._digCuenta):
                return u
        return None

    @classmethod
    def crearUsuario(cls, nombre):
        if any(u._nombre == nombre for u in cls.__usuarios):
            print(f"¡Un usuario con ese nombre ya existe!")
            return False
        cls._usuario_ultimo_id += 1
        digito_cuenta = randint(1000, 9999)
        while True:
            # Nos aseguramos de que cada cuenta sea un digito unico
            if any(d._digCuenta == digito_cuenta for d in cls.__usuarios):
                digito_cuenta = randint(1000, 9999)
            break
        nuevo_usuario = Usuario(cls._usuario_ultimo_id, nombre, digito_cuenta, 0)
        cls.__usuarios.append(nuevo_usuario)
        return True
    
    