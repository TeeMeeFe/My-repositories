"""
4. Cuenta Bancaria. Crea una clase CuentaBancaria con los siguientes atributos
obligatorios: número de cuenta, nombre y apellido. El saldo debe comenzar con
100.000. Agrega e implementa métodos para: 1- depositar (debe aceptar un
valor entero y sumarlo al saldo), 2- retirar (debe aceptar un valor entero y
restarlo al saldo sólo si hay dinero suficiente para retirar en la cuenta) y 3- ver
saldo. Además, escribe una aplicación de consola que permita al usuario
depositar, retirar o ver saldo hasta que decida detenerse. Al finalizar deberá
mostrar los datos de la cuenta y el saldo.
"""
from menu.menu import Menu
from models.usuario import Usuario

if (Usuario.__len__ == 0):
    usuario = Usuario.crearUsuario("Tomas")

def main():
    print(f"Bienvenido al nuestro cajero automatico\n" \
          "========================================\n")
    while True:
        Menu.ver_menu()
        opcion = int(input("Opcion: "))

        match(opcion):
            case 1:
                pass
            case 2:
                pass
            case 3:
                pass
            case 4:
                break
            case _:
                print("Opcion incorrecta, intentalo de nuevo")
                continue

if __name__ == "__main__":
    main()

print("Saliendo del sistema.")