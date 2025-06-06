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
        __e = "N/D" if self.__edad == -1 else self.__edad
        __d = "N/D" if self.__dni == -1 else self.__dni
        __m = self.esMayorDeEdad()
            
        if(__d != "N/D" and isinstance(__d, int)):
            __d = '{:,}'.format(self.__dni).replace(',', '.') # Formateamos dni para que tenga el punto cada mil 

        return self.__nombre, __e, __d, __m
    
    def eliminar_persona(self):
        del self
    
    def esMayorDeEdad(self):
        __e = False if self.__edad == -1 else self.__edad
        es_mayor = True if __e >= 18 and __e != False else False
        return es_mayor

# Una funcion para agregar a una persona a una lista
def agregar_persona(nombre, edad, dni):
    print(f"Se ha agregado una persona: {nombre}, edad: {edad}, DNI: {dni}, con éxito")
    personas.append(Persona(nombre, edad, dni))
    return Persona(nombre, edad, dni)

# Una funcion para eliminar a una persona de la lista
def eliminar_persona(indice):
    for persona in personas:
        if(indice == personas.index(persona)):
            Persona.eliminar_persona(persona), personas.pop(indice) # Borramos el objeto y su referencia de la lista
            print(f"Se ha eliminado a {persona.nombre} con éxito.")
            return persona
    print("¡No se ha encontrado a ninguna persona con ese índice!")

# Una funcion para mostrar todas las personas almacenadas en una lista
def mostrar_todo(ppss):
    if(len(ppss) != 0):
        for persona in ppss:
            index = ppss.index(persona)
            print({index: Persona.mostrar_persona(persona)})
        return True
    else: print("  *Desierto*  ")
    return False
 
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
                            print("La edad que ingresaste no es un número, intentalo de nuevo.")
                            continue

                    if(dni == ""):
                        print("No ingresaste ningun número de DNI, por defecto se le ha asignado un identificador de -1.")
                        dni = -1
                    elif(not isinstance(dni, int)):
                        try:
                            dni = int(dni)
                        except:
                            print("El DNI que ingresaste no es un número.")
                            continue   

                    agregar_persona(nombre, edad, dni)
                    break
            case "d":
                print("Vas a borrar a una persona del registro.\n" \
                      " I | Nombre | Edad | DNI | Mayor")
                if(mostrar_todo(personas)): 
                    persona = int(input("¿Que persona vas a eliminar? Escribe su índice: "))
                    eliminar_persona(persona)
                else: print("No se encuentra ninguna persona para borrar.")
            case "e":
                while True:
                    print("Vas a editar los datos de una persona. \n" \
                          " I | Nombre | Edad | DNI | Mayor")
                    if(mostrar_todo(personas)):
                        try:
                            indice = int(input("Selecciona un índice: "))
                            if(personas[indice]):
                                persona = personas[indice]
                                match(str(input("¿Que dato deseas editar? Selecciona entre N(nombre), E(edad) o D(DNI); Q para salir: ")).lower()):
                                    case "n":
                                        nom = str(input(f"{persona.nombre} es ahora: "))
                                        persona.Nombre = nom
                                        print(f"Nombre de persona en indice {indice} fue cambiada por {persona.nombre}")
                                        continue
                                    case "e":
                                        edad = input(f"{persona.nombre} tiene ahora: ")
                                        if(not isinstance(edad, int)): 
                                            raise print("¡El dato de edad ingresado no es un número!") 
                                        else:
                                            persona.Edad = edad
                                            print(f"Edad de persona en indice {indice} fue cambiada por {persona.edad}")
                                            continue
                                    case "d":
                                        dni = input(f"El DNI en {persona.nombre} tiene ahora: ")
                                        if(not isinstance(dni, int)): 
                                            raise print("¡El dato de DNI ingresado no es un número!") 
                                        else:
                                            persona.Dni = dni
                                            print(f"Edad de persona en indice {indice} fue cambiada por {persona.dni}")
                                            continue
                                    case "q":
                                        break
                                    case _:
                                        print("No has seleccionado una opción válida, intentalo de nuevo.")
                                        continue
                        except Exception as e:
                            if IndexError:
                                print("¡No se ha encontrado a ninguna persona con ese índice!")
                            else:
                                print(e)
                            break
                    else: 
                        print("No se encuentra ninguna persona para editar.")
                        break
            case "s":
                print("Mostrar todo: \n" \
                      " I | Nombre | Edad | DNI | Mayor")
                mostrar_todo(personas)
            case "q":
                print("Has salido del programa.")
                break
            case _:
                print("La opción seleccionada es incorrecta. Por favor escribe una de las siguientes: ")
                continue
        pass

print("Programa salido con éxito.")
