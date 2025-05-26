"""
2. Área y Perímetro. Crea una clase Rectángulo que permita calcular su área y su
perímetro. Además, crea en una aplicación de consola que permita al usuario
crear un objeto Perímetro y realizar los cálculos. .
"""
class Forma:
    def calcular_area():
        pass
    def calcular_perimetro():
        pass

class Rectangulo(Forma):
    def __init__(self, alto, ancho):
        self.__ancho__ = ancho
        self.__alto__ = alto

    def calcular_area(self):
        return self.__alto__ * self.__ancho__

    def calcular_perimetro(self):
        return 2 * (self.__alto__ + self.__ancho__)
    
def agregar_forma(tipo, /, alto, ancho, lista):
    if(tipo == "Rect"): pass # Sin implementar
    print(f"Se ha creado un {tipo} de dimensiones alto:{alto} por ancho:{ancho}, con éxito.")
    return lista.append(Rectangulo(alto, ancho))
    
if __name__ == "__main__":
    print("Bienvenido al calculador de área y perímetro. Por favor selecciona una de las siguientes opciones:\n")
    objetos = []
    while True:
        sel_opcion = str(input(f"\n[A] Crear un objeto.  \
                                 \n[E] Editar un objeto. \
                                 \n[S] Mostrar todos los objetos.  \
                                 \n[Q] Salir de este programa. \n")).lower()
        match(sel_opcion):
            case "a":
                while True:
                    try:
                        print("Vas a crear un nuevo objeto: TIPO RECTANGULO")
                        #tipo = str(input("")) # Sin implementar
                        alto = int(input("Alto: "))
                        ancho = int(input("Ancho: "))

                        agregar_forma("Rect", alto, ancho, objetos)
                        break
                    except: 
                        print("¡El dato que ingresaste no es válido!")
                        continue
            case "e":
                pass
            case "s":
                pass
            case "q":
                print("Estas saliendo del programa...")           
                break
        pass

print("Programa finalizado con éxito.")