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
    
if __name__ == "__main__":
    
    pass