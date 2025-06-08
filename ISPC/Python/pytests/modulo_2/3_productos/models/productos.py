class Producto:
    _productos = []
    _id_producto = 0

    def __init__(self, nombre, precio, stock=0):
        self._nombre = nombre
        self._precio = precio
        self._stock = stock

    # Metodos clase
    @classmethod
    def mostrar_todos(cls):
        return [
            {
            "Índice": u._id_producto,
            "Nombre": u._nombre,
            "Precio": u._precio,
            "Stock" : u._stock
            }
            for u in cls._productos
        ]
    
    @classmethod
    def obtener_por_id(cls, id_prod):
        for u in cls._productos:
            if (u._id_producto == id_prod):
                return u
        return None
    
    @classmethod
    def agregar_producto(cls, nom, pre):
        try:
            cls._id_producto += 1
            nuevo_producto = Producto(cls._id_producto, nom, pre)
            cls._productos.append(nuevo_producto)
            print(f"El producto {nom} fue agregado con éxito en Índice {cls._id_producto}")
            return True
        except Exception as e:
            print(f"[Error]: {e}")
            return False
    
    @classmethod
    def actualizar_productos(cls):
        try:
            print(cls.mostrar_todos())
            while True:
                prod = cls.obtener_por_id(int(input("\n¿Qué producto vas a actualizar? Selecciona su índice: ")))
                if (prod):
                    cambio = str(input("\n¿Qué deseas cambiar? Presiona las siguientes teclas:" \
                                        "\n[S] para actualizar stock" \
                                        "\n[P] para actualizar precio" \
                                        "\n[Q] para salir de este modo")).lower()
                    match (cambio):
                        case "s":
                            nuevo_stock = int(input(f"Nuevo stock para '{cls._nombre}': "))
                            cls._stock = nuevo_stock
                            print(f"\n¡El stock para '{cls._nombre}' ha sido actualizado con éxito!" /
                                   "\nNuevo stock: {cls._stock}")
                            continue
                        case "p":
                            nuevo_precio = int(input(f"Nuevo precio para '{cls._nombre}: '"))
                            cls._precio = nuevo_precio
                            print(f"¡El precio para {cls._nombre} ha sido cambiado con éxito!" /
                                   "\nNuevo precio: {cls._precio}")
                            continue
                        case "q":
                            break
                        case _:
                            raise ValueError
        except ValueError:
            print(f"[Error]: ¡Has ingresado un valor que es inválido!")
        except Exception as e:
            print(f"[Error]: {e}")
    

    @classmethod
    def eliminar_producto(cls, id_producto):
        producto = cls.obtener_por_id(id_producto)
        if (producto):
            cls._productos.remove(producto)
            return True
        return False
