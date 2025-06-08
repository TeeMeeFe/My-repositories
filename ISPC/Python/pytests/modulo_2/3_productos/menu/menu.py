from models.productos import Producto

class Menu:
    def ver_inventario():
        resultado = []
        print("\nMostrando inventario:")
        if (len(Producto._productos) != 0):
            print(Producto.mostrar_todos())
            for p in Producto.mostrar_todos():
                resultado.append({
                    "Índice": p["Índice"],
                    "Nombre": p["Nombre"],
                    "Precio": p["Precio"],
                    "Stock" : p["Stock"]
                }), print(resultado)
        else: print("¡El catalogo de productos está desierto!")

    def ver_producto():
        pass

    def agregar_producto():
        print("\nEstas por agregar un producto:\n")
        nom = input("Nombre: ")
        pre = float(input("Precio: "))
        Producto.agregar_producto(nom, pre)

    def actualizar_producto():
        print("\nEstas por actualizar un producto:\n")
        if (len(Producto._productos) != 0): 
            Producto.actualizar_productos()
        else: print("¡El catalogo de productos está desierto!")

    def eliminar_producto():
        pass

    def ver_menu():
        print("\n[1] Ver inventario\n" \
              "[2] Ver producto\n" \
              "[3] Agregar producto\n" \
              "[4] Cambiar datos de producto\n" \
              "[5] Eliminar producto\n" \
              "[9] Salir de este programa\n")
        