class Producto:
    _productos = []
    _id_producto = 0

    def __init__(self, indice, nombre, precio, stock=0):
        self._indice = indice
        self._nombre = nombre
        self._precio = precio
        self._stock = stock

    # Metodos clase
    @classmethod
    def obtener_todos(cls):
        return [
            {
            "Índice": u._indice,
            "Nombre": u._nombre,
            "Precio": u._precio,
            "Stock" : u._stock
            }
            for u in cls._productos
        ]
    
    @classmethod
    def obtener_por_id(cls, id_prod):
        for u in cls._productos:
            if (u._indice == id_prod):
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
        while True:
            try:
                print(cls.obtener_todos())
                prod = cls.obtener_por_id(int(input("¿Qué producto vas a actualizar? Selecciona su índice: ")))
                if (prod):
                    cambio = str(input(f"\n¿Qué deseas cambiar de '{prod._nombre}'? Presiona las siguientes teclas:" \
                                        "\n[N] para cambiar el nombre" \
                                        "\n[S] para actualizar stock" \
                                        "\n[P] para actualizar precio" \
                                        "\n[Q] para salir de este modo" \
                                        "\nOpcion: ")).lower()
                    match (cambio):
                        case "n":
                            nuevo_nombre = input("Nuevo nombre: ")
                            print(f"\n¡El nombre ha sido actualizado con éxito a {nuevo_nombre}!" \
                                  f"\nViejo nombre: {prod._nombre}")
                            prod._nombre = nuevo_nombre
                        case "s":
                            nuevo_stock = int(input(f"Nuevo stock para '{prod._nombre}': "))
                            prod._stock = nuevo_stock
                            print(f"\n¡El stock para '{prod._nombre}' ha sido actualizado con éxito!" \
                                  f"\nNuevo stock: {prod._stock}")
                            continue
                        case "p":
                            nuevo_precio = float(input(f"Nuevo precio para '{prod._nombre}: '"))
                            prod._precio = nuevo_precio
                            print(f"¡El precio para {prod._nombre} ha sido cambiado con éxito!" \
                                  f"\nNuevo precio: {prod._precio}")
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
    def eliminar_producto(cls, indice):
        producto = cls.obtener_por_id(indice)
        if (producto):
            cls._productos.remove(producto)
            return True
        return False
