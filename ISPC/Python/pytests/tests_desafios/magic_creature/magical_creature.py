class MagicCreature:
    def __init__(self, _id: int, _nombre: str, _vigor: int, _poder_magico: int):
        self._id: int = _id,
        self._nombre: str = _nombre,
        self._vigor: int = _vigor,
        self._poder_magico: int = _poder_magico

    def __str__(self):
        return (f"Creatura Magica ID: {self._id}, '{self._nombre}' nombre, {self._vigor} vigor, {self._poder_magico} poder")
    