from models.productos import Producto

class Menu:
    def ver_inventario():
        print("\nMostrando inventario:")
        Producto.mostrar_todos()

    def ver_menu():
        print("[1] Ver inventario\n" \
              "[2] Ver producto\n" \
              "[3] Agregar producto\n" \
              "[4] Cambiar datos de producto\n" \
              "[5] Eliminar producto\n" \
              "[9] Salir de este programa\n")
        