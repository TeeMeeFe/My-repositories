"""
3. Producto. Crea una clase Producto con los siguientes atributos: Nombre, Precio
y Stock siendo obligatorios sólo los atributos Nombre y Precio. El Stock debe
comenzar con 0. Define métodos para actualizar el stock, para calcular el total
del inventario y para ver los datos. Además, escribe una aplicación de consola
que permita al usuario: 1- actualizar el stock y 2- calcular inventario hasta que
decida detenerse. Al finalizar deberá mostrar los datos del producto, stock e
inventario final.
"""
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
        if(len(cls._productos) != 0):
            return [
                {
                "Índice": u._id_producto,
                "Nombre": u._nombre,
                "Precio": u._precio,
                "Stock" : u._stock
                }
                for u in cls._productos
            ]
        print("¡El catalogo de productos está desierto!")
        return None

    @classmethod
    def obtener_por_id(cls, id_prod):
        for u in cls._productos:
            if (u._id_producto == id_prod):
                return u
        return None
    
    @classmethod
    def agregar_producto(cls, nom, pre, sto):
        try:
            cls._id_producto += 1
            nuevo_producto = Producto(cls._id_producto, nom, pre, sto)
            cls._productos.append(nuevo_producto)
            print(f"El producto {nom} fue agregado con éxito en Índice {cls._id_producto}")
            return True
        except Exception as e:
            print(f"[Error]: {e}")
            return False
    
    @classmethod
    def actualizar_producto(cls):
        print("Actualizar stock de productos")
        if (cls.mostrar_todos() != None): 
            print(cls.mostrar_todos())
            try:
                while True:
                    prod = cls.obtener_por_id(int(input("\n¿Qué producto vas a actualizar? Selecciona su índice: ")))
                    if (prod):
                        cambio = str(input("\n¿Qué deseas cambiar? Presiona las siguientes teclas:" \
                                           "\n[S] para actualizar stock" \
                                           "\n[P] para actualizar precio" \
                                           "\n[Q] para salir de este programa")).lower()
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
                print(f"[Error]: Has ingresado un valor que es inválido, intentalo de nuevo.")
            except Exception as e:
                print(f"[Error]: Hubo un error: {e}")

    @classmethod
    def eliminar_producto(cls, id_producto):
        producto = cls.obtener_por_id(id_producto)
        if (producto):
            cls._productos.remove(producto)
            return True
        return False

if __name__ == "__main__":


    pass