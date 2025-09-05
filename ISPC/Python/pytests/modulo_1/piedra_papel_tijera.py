from random import randint

mano = ("papel", "piedra", "tijera")
puntajeHumano = 0
puntajeCompu = 0

# Una funcion para conseguir un string aleatorio elegido por la computadora
def conseguirRespuestaComputadora():
    rand = randint(0, 2)
    string = mano[rand]
    return string

# Una funcion para conseguir la respuesta de nuestro humano
def conseguirRespuestaHumano():
    decision = input(f"Por favor elige entre {mano} o 'e' o 'exit' para salir del juego: ").lower()

    match decision:
        # Te amo python >:(
        case 'papel': return decision
        case 'piedra': return decision
        case 'tijera': return decision
        case '':
            print(f"Está vacio: Tienes que escribir alguna de las siguientes palabras: {mano}")
        case _:
            if(decision == "e" or decision == "exit"):
                print("Saliste del juego.")
                return "exit" #Salimos del bucle
            print(f"Incorrecto: Tiene que ser alguna de las siguientes palabras: {mano}")

# Una funcion que compara las salidas de las decisiones y devuelve quien ganó
def jugarRonda(decisionCompu, decisionHumano):
    global puntajeHumano
    global puntajeCompu

    # Comparador de decisiones super duper malvado >:D(me encantan los operadores ternarios)
    Ronda = "Computadora" if(
        decisionHumano == mano[0] and decisionCompu == mano[2] or
        decisionHumano == mano[1] and decisionCompu == mano[0] or
        decisionHumano == mano[2] and decisionCompu == mano[1]) else "Humano" if(
        decisionHumano == mano[0] and decisionCompu == mano[1] or
        decisionHumano == mano[1] and decisionCompu == mano[2] or
        decisionHumano == mano[2] and decisionCompu == mano[0]) else "Empate"

    match Ronda:
        case "Humano":
            puntajeHumano += 1
            print(f"Ganaste esta ronda: {decisionHumano} vence a {decisionCompu}\nVas {puntajeHumano} vs {puntajeCompu}.")
        case "Computadora":
            puntajeCompu += 1
            print(f"Perdiste esta ronda: {decisionHumano} pierde contra {decisionCompu}\nVas {puntajeHumano} vs {puntajeCompu}.")
        case _:
            print("Empataste, intentalo de nuevo!")
    return Ronda  

# Jugamos al juego unas tres veces(de acuerdo con el enunciado)
def jugarJuego():
    puntos = 3

    while(True):
        decisionCompu = conseguirRespuestaComputadora()
        decisionHumano = conseguirRespuestaHumano()

        # El humano no nos dio nada útil, volvemos a empezar
        if(decisionHumano == None): continue
        # Salgamos antes si el humano canceló el juego
        if(decisionHumano == "exit"): return

        jugarRonda(decisionCompu, decisionHumano)

        # Si alguno gano al menos la cantidad de puntos, salimos del bucle
        if(max(puntajeHumano, puntajeCompu) >= puntos): break
   
    # fstring para el print no es suficiente asi que creamos una variable que luego imprimimos
    mensaje = "Ganaste!" if puntajeHumano > puntajeCompu else "Perdiste!"
    print(mensaje)

# Iniciamos el juego!
print("Bienvenido al juego de piedra, papel, tijera!"), jugarJuego()
