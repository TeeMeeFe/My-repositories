class MagicCreature:
    def __init__(self, _id: int, _nombre: str, _vigor: int, _poder_magico: int):
        self._id = _id,
        self._nombre = _nombre,
        self._vigor = _vigor,
        self._poder_magico = _poder_magico

    def __str__(self):
        return (f"Creatura Magica ID: {self._id}, '{self._nombre}' nombre, {self._vigor} vigor, {self._poder_magico} poder")
    