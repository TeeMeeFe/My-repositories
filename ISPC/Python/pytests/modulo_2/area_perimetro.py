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
    def mostrar_forma():
        pass

class Rectangulo(Forma):
    def __init__(self, alto, ancho):
        self.__ancho__ = ancho
        self.__alto__ = alto

    tipo = "Rectangulo"

    def calcular_area(self):
        return self.__alto__ * self.__ancho__

    def calcular_perimetro(self):
        return 2 * (self.__alto__ + self.__ancho__)
    
    def mostrar_forma(self):
        return self.tipo, self.__alto__, self.__ancho__
    
def agregar_forma(tipo, /, alto, ancho, lista):
    if(tipo == "Rect"): pass # Sin implementar
    print(f"Se ha creado un {tipo} de dimensiones alto:{alto} por ancho:{ancho}, con éxito.")
    return lista.append(Rectangulo(alto, ancho))

def mostrar_todo(lista):
    if(len(lista) != 0):
        print("|I|    Tipo    |Alto|Ancho|Área|Perímetro|")
        for forma in lista:
            indice = lista.index(forma)
            print(f"{[indice, Rectangulo.mostrar_forma(forma)[0], Rectangulo.mostrar_forma(forma)[1], Rectangulo.mostrar_forma(forma)[2], 
                      Rectangulo.calcular_area(forma), Rectangulo.calcular_perimetro(forma)]}")
        return True
    else: print("¡No se encontró ningun objeto en esta lista!")
    return False
    
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
                pass # Sin implementar
            case "s":
                print("Mostrando todos los objetos:")
                mostrar_todo(objetos)
            case "q":
                print("Estas saliendo del programa...")           
                break
        pass

print("Programa finalizado con éxito.")
