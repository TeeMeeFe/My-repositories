from usuario import Usuario

class ATM:
    def operacion(self, tipo, digCuenta):
        user = Usuario.verUsuarioPorDigCuenta(digCuenta)
        match(tipo):
            case 1:
                print("Tenes un saldo de:\n" \
                     f"${user._dinero:.2f}")
            case 2:
                pass
            case 3:
                pass
        return False
    
