"""
3. Producto. Crea una clase Producto con los siguientes atributos: Nombre, Precio
y Stock siendo obligatorios sólo los atributos Nombre y Precio. El Stock debe
comenzar con 0. Define métodos para actualizar el stock, para calcular el total
del inventario y para ver los datos. Además, escribe una aplicación de consola
que permita al usuario: 1- actualizar el stock y 2- calcular inventario hasta que
decida detenerse. Al finalizar deberá mostrar los datos del producto, stock e
inventario final.
"""
from menu.menu import Menu

def main():
    print("Bienvenido al catalogo de productos!\n" \
          "====================================")
    while True:
        try:
            Menu.ver_menu()
            opcion = int(input("\nOpción: "))

            match(opcion):
                case 1:
                    Menu.ver_inventario()
                    continue
                case 2:
                    Menu.ver_producto()
                    continue
                case 3:
                    Menu.agregar_producto()
                    continue
                case 4:
                    Menu.actualizar_producto()
                    continue
                case 5:
                    Menu.eliminar_producto()
                    continue
                case 9:
                    break
                case _:
                    raise ValueError
        except ValueError:
            print(f"[Error]: El valor que has ingresado es incorrecto")
            continue
        except Exception as e:
            print(f"[Error]: {e}")
            continue
    print("Saliendo del sistema.")

if __name__ == "__main__":
    main()
    