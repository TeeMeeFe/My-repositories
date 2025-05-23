"""
1. Persona. crear una clase llamada Persona. Sus atributos son: nombre, edad y
DNI. Construye los siguientes métodos para la clase:
    a. Un constructor, donde los datos pueden estar vacíos.
    b. Los setters y getters para cada uno de los atributos. Hay que validar las
    entradas de datos.
    c. mostrar(): Muestra los datos de la persona.
    d. esMayorDeEdad(): Devuelve un valor lógico indicando si es mayor de
    edad.
Además, crea en una aplicación de consola que permita al usuario crear un
objeto Persona y evaluar si es mayo o menor de edad
"""
class Persona:
    def __init__(self, nombre, edad, dni):
        self.__nombre = nombre
        self.__edad = edad
        self.__dni = dni

    # Getters y setters
    @property
    def nombre(self):
        return self.__nombre
    
    @nombre.setter
    def Nombre(self, nombre):
        self.__nombre = nombre
    
    @property
    def edad(self):
        return self.__edad
        
    @edad.setter
    def Edad(self, edad):
        self.__edad = edad
        
    @property
    def dni(self):
        return self.__dni
        
    @dni.setter
    def Dni(self, dni):
        self.__dni = dni

    # Otros metodos
    def mostrar_persona(self):
        # Mostramos N/D si no hay datos
        e = "N/D" if self.__edad == -1 else self.__edad
        d = "N/D" if self.__dni == -1 else self.__dni
            
        if(d != "N/D" and isinstance(d, int)):
            d = '{:,}'.format(self.__dni).replace(',', '.') # Formateamos dni para que tenga el punto cada mil 

        return f"{self.__nombre} tiene {e} años. Su DNI es: {d}"
    
    def esMayorDeEdad(self):
        es_mayor = True if(self.__edad >= 18) else False
        return es_mayor

# Una funcion para agregar a una persona a una lista
def agregar_persona(nombre, edad, dni):
    print(f"Se ha agregado una persona: {nombre}, edad: {edad}, DNI: {dni}")
    return personas.append(Persona(nombre, edad, dni))

# Una funcion para mostrar todas las personas almacenadas en una lista
def mostrar_todo(ppss):
    for persona in ppss:
        personas = Persona.mostrar_persona(persona)
        print(personas)
 
if __name__ == "__main__":
    print("Bienvenido al buscador de personas, por favor escribe una de las opciones para seleccionarlas:")
    personas = []
    
    while True:
        sel_opcion = input(str(
            "\nA: Agregar una persona." \
            "\nD: Eliminar una persona." \
            "\nE: Editar los datos de una persona." \
            "\nS: Mostrar todas las personas." \
            "\nQ: Salir de este programa.\n")).lower()
        
        match(sel_opcion):
            case "a":
                while True:
                    print(f"Vas a agregar una persona, debes ingresar los siguientes datos: Nombre, Edad, DNI")
                    nombre = input("Nombre: ")
                    edad = input("Edad: ")
                    dni = input("Numero de DNI: ")
                    
                    if(edad == ""):
                        print("No ingresaste ninguna edad, por defecto se le ha asignado un identificador de -1.")
                        edad = -1
                    elif(not isinstance(edad, int)):
                        try:
                            edad = int(edad)
                        except:
                            print("La edad que ingresaste no es un numero, intentalo de nuevo.")
                            continue

                    if(dni == ""):
                        print("No ingresaste ningun número de DNI, por defecto se le ha asignado un identificador de -1.")
                        dni = -1
                    elif(not isinstance(dni, int)):
                        try:
                            dni = int(dni)
                        except:
                            print("El DNI que ingresaste no es un numero")
                            continue   

                    agregar_persona(nombre, edad, dni)
                    break
            case "d":
                pass
            case "e":
                pass
            case "s":
                print("Mostrar todo: \n")
                mostrar_todo(personas)
            case "q":
                print("Has salido del programa.")
                break
            case _:
                print("La opción seleccionada es incorrecta. Por favor escribe una de las siguientes: ")
                continue
        pass

print("Programa salido con exito.")
