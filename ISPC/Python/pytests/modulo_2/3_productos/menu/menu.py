from models.productos import Producto

class Menu:
    def ver_inventario():
        resultado = [0, 0]
        print("\nMostrando inventario:")
        if (len(Producto._productos) != 0):
            for p in Producto.obtener_todos():
                resultado[0] += p["Stock"]
                resultado[1] += p["Precio"] * p["Stock"]
                print(p)
            print("====================================\n" \
                 f"STOCK TOTAL: {resultado[0]} || VALOR INVENTARIO: {resultado[1]}")

        else: print("¡El catalogo de productos está desierto!")

    def ver_producto():
        print("Sin implementar.")
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
        print("\nEstas por eliminar un producto:\n")
        if (len(Producto._productos) != 0):
            print(Producto.obtener_todos())
            prod = int(input("¿Qué producto deseas eliminar? Selecciona su índice: "))
            if (Producto.obtener_por_id(prod)):
                while True:
                    confirmacion = str(input(f"Estas por eliminar '{Producto.obtener_por_id(prod)._nombre}'. ¿Estás seguro? Presiona (s/n) para confirmar: "))
                    if (confirmacion == "s"):
                        if (Producto.eliminar_producto(prod)): 
                            print("El producto se ha eliminado con éxito.")
                        else: print("Ocurrió un error al eliminar el producto.")
                        break
                    elif (confirmacion == "n"):
                        break
                    else: 
                        print("¡Debes elegir 's' o 'n' para continuar!")
                        continue
            else: print("¡Ese producto no existe!")
        else: print("¡El catalogo de productos está desierto!")

    def ver_menu():
        print("\n[1] Ver inventario\n" \
              "[2] Ver producto\n" \
              "[3] Agregar producto\n" \
              "[4] Cambiar datos de producto\n" \
              "[5] Eliminar producto\n" \
              "[9] Salir de este programa\n")
        