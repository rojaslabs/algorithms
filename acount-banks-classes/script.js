const prompt = require('prompt-sync')()
const colors = require('colors')

class Cuenta {
    constructor(numero, rut){
        this.numero = numero
        this.rut = rut
        this.tipo = 'vista'
        this.saldo = 0
        this.vigencia = true
        this.transacciones = []
    }

    depositar(monto) {
        if (this.vigencia === true && monto > 0) {
            this.saldo += monto
            const transaccion = {fecha: this.marcaDeTiempo(), deposito: monto, saldo: this.saldo}
            this.transacciones.push(transaccion)
            console.log(`¡Ha depositado $${monto} pesos a la cuenta N° ${this.numero}!\n`.brightGreen)
        } else if (monto < 1) {
            console.log(`El monto a transferir debe ser mayor a 0.\n`.brightRed)
        } else {
            console.log(`No es posible realizar operaciones, porque la cuenta N° ${this.numero} está desactivada.\n`.brightRed)
        }
    }

    girar(monto) {
        if (monto <= this.saldo && this.vigencia === true && monto > 0) {
            this.saldo -= monto
            const transaccion = {fecha: this.marcaDeTiempo(), giro: monto, saldo: this.saldo}
            this.transacciones.push(transaccion)
            console.log(`¡Ha girado $${monto} pesos desde la cuenta N° ${this.numero}!\n`.brightGreen)
        } else if (this.vigencia === false) {
            console.log(`No es posible realizar operaciones, porque la cuenta N° ${this.numero} está desactivada.\n`.brightRed)
        } else if (monto < 1) {
            console.log(`El monto a girar debe ser mayor a 0.\n`.brightRed)
        } else {
            console.log('Saldo insuficiente.\n'.brightRed)
        }
    }

    transferir(CuentaDeOrigen, CuentaDeDestino, monto){
        if (CuentaDeOrigen.saldo >= monto && CuentaDeOrigen.saldo > 0 && CuentaDeOrigen.vigencia === true && CuentaDeDestino.vigencia === true && monto > 0 && CuentaDeOrigen !== CuentaDeDestino) {
            CuentaDeOrigen.saldo -= monto
            CuentaDeDestino.saldo += monto
            const transaccionDeOrigen = {fecha: this.marcaDeTiempo(), transferencia: monto, saldo: CuentaDeOrigen.saldo}
            CuentaDeOrigen.transacciones.push(transaccionDeOrigen)
            const transaccionDeDestino = {fecha: this.marcaDeTiempo(), abono: monto, saldo: CuentaDeDestino.saldo}
            CuentaDeDestino.transacciones.push(transaccionDeDestino)
            console.log(`¡Se han transferido $${monto} pesos, desde la cuenta N° ${CuentaDeOrigen.numero} a la N° ${CuentaDeDestino.numero}!`.brightGreen)
        } else if (CuentaDeOrigen === CuentaDeDestino) {
            console.log('La cuenta de destino debe ser distinta a la cuenta de origen.\n'.brightRed)
        } else if (monto < 1) {
            console.log('El monto a transferir debe ser mayor a 0.\n'.brightRed)
        } else if (CuentaDeOrigen.saldo < monto) {
            console.log('La cuenta de origen no tiene saldo suficiente.\n'.brightRed)
        } else if (CuentaDeOrigen.vigencia === false) {
            console.log('La cuenta de origen está desactivada.\n'.brightRed)
        } else if (CuentaDeDestino.vigencia === false) {
            console.log('La cuenta de destino está desactivada.\n'.brightRed)
        } else {
            console.log('La operación no se pudo realizar.\n'.brightRed)
        }
    }

    estadoDeCuenta() {
        console.log(this)
    }

    modificarVigencia() {
        if (this.vigencia === true) {
            this.vigencia = false
            console.log(`¡La cuenta N° ${this.numero} ha sido desactivada!\n`.brightRed)
        } else {
            this.vigencia = true
            console.log(`¡La cuenta N° ${this.numero} ha sido activada!\n`.brightGreen)
        }
    }

    mostrarTransacciones() {
        console.log(`Cuenta N° ${this.numero}, RUT: ${this.rut}`)
        console.log('\n')
        for(let i = 0; i < this.transacciones.length; i++) {
            console.log(this.transacciones[i])
        }
    }

    marcaDeTiempo(){
        const fecha = new Date().toLocaleString()
        return fecha
    }

}

class Persona {
    constructor(rut, nombre) {
        this.rut = rut
        this.nombre = nombre
    }

    mostrarPersona() {
        console.log(this)
    }
}

function idGenerator() {
    let i = 0
    return function() {
        return i++
    }
}

var numeroDeCuenta = idGenerator()

// Generación de objetos Persona y Cuenta

const persona1 = new Persona('16235058-7', 'Jorge Rojas')
const persona2 = new Persona('15893681-K', 'Karen Silva')
const persona3 = new Persona('24508765-9', 'Isabella Rojas')
const cuenta1 = new Cuenta(numeroDeCuenta(), persona1.rut)
const cuenta2 = new Cuenta(numeroDeCuenta(), persona2.rut)
const cuenta3 = new Cuenta(numeroDeCuenta(), persona3.rut)

const cuentas = [cuenta1, cuenta2, cuenta3]
const personas = [persona1, persona2, persona3]


// Menú principal

console.clear()
let salir = false
while (salir === false) {
    console.log('\n')
    console.log(' -- BIENVENIDO AL SISTEMA BANCARIO -- '.bgBrightGreen.black)
    console.log('\n')
    console.log('1. Depositar')
    console.log('2. Girar')
    console.log('3. Transferir')
    console.log('4. Estado de cuenta')
    console.log('5. Ver transacciones')
    console.log('6. Modificar vigencia')
    console.log('7. Clientes')
    console.log('8. Salir')
    console.log('\n')
    const input = parseInt(prompt('Ingrese una opción: '.brightCyan))
    console.log('\n')
    switch (input) {
        case 1:
            console.log(' -- DEPOSITAR -- '.bgBrightWhite.black)
            console.log('\n')
            for(let i = 0; i < cuentas.length; i++){
                console.log(`N° ${cuentas[i].numero} / rut: ${cuentas[i].rut}`)
            }
            console.log('\n')
            const cuentaParaDepositar = parseInt(prompt('Ingrese el número de cuenta: '.brightCyan))
            const depósito = parseInt(prompt('¿Cuánto depositará?: '.brightCyan))
            console.log(cuentas[cuentaParaDepositar].depositar(depósito))
            break
        case 2:
            console.log(' -- GIRAR -- '.bgBrightWhite.black)
            console.log('\n')
            for(let i = 0; i < cuentas.length; i++){
                console.log(`N° ${cuentas[i].numero} / rut: ${cuentas[i].rut}`)
            }
            console.log('\n')
            const cuentaParaGirar = parseInt(prompt('Ingrese el número de cuenta: '.brightCyan))
            const giro = parseInt(prompt('¿Cuánto monto girará?: '.brightCyan))
            console.log(cuentas[cuentaParaGirar].girar(giro))
            break
        case 3:
            console.log(' -- TRANSFERIR -- '.bgBrightWhite.black)
            console.log('\n')
            for(let i = 0; i < cuentas.length; i++){
                console.log(`N° ${cuentas[i].numero} / rut: ${cuentas[i].rut} / saldo: $${cuentas[i].saldo}`)
            }
            console.log('\n')
            const cuentaDeOrigen = parseInt(prompt('Ingrese el número de cuenta de origen: '.brightCyan))
            const cuentaDeDestino = parseInt(prompt('Ingrese el número de cuenta de destino: '.brightCyan))
            const montoATransferir = parseInt(prompt('Ingrese el monto a transferir: '.brightCyan))
            console.log(cuentas[cuentaDeOrigen].transferir(cuentas[cuentaDeOrigen], cuentas[cuentaDeDestino], montoATransferir))
            break
        case 4:
            console.log(' -- ESTADO DE CUENTA -- '.bgBrightWhite.black)
            console.log('\n')
            for(let i = 0; i < cuentas.length; i++){
                console.log(`N° ${cuentas[i].numero} / rut: ${cuentas[i].rut}`)
            }
            console.log('\n')
            const cuentaParaVer = parseInt(prompt('Ingrese el número de cuenta: '.brightCyan))
            console.log('\n')
            console.log(cuentas[cuentaParaVer].estadoDeCuenta())
            break
        case 5:
            console.log(' -- VER TRANSACCIONES -- '.bgBrightWhite.black)
            console.log('\n')
            for(let i = 0; i < cuentas.length; i++){
                console.log(`N° ${cuentas[i].numero} / rut: ${cuentas[i].rut} / vigente: ${cuentas[i].vigencia}`)
            }
            console.log('\n')
            const cuentaParaVerTranssacciones = parseInt(prompt('Ingrese el número de cuenta: '.brightCyan))
            console.log('\n')
            console.log(cuentas[cuentaParaVerTranssacciones].mostrarTransacciones())
            break
        case 6:
            console.log(' -- MODIFICAR VIGENCIA -- '.bgBrightWhite.black)
            console.log('\n')
            for(let i = 0; i < cuentas.length; i++){
                console.log(`N° ${cuentas[i].numero} / rut: ${cuentas[i].rut} / vigente: ${cuentas[i].vigencia}`)
            }
            console.log('\n')
            const cuentaParaModificar = parseInt(prompt('Ingrese el número de cuenta: '.brightCyan))
            console.log(cuentas[cuentaParaModificar].modificarVigencia())
            break
        case 7:
            console.log(' -- CLIENTES -- '.bgBrightWhite.black)
            console.log('\n')
            for(let i = 0; i < personas.length; i++){
                personas[i].mostrarPersona()
            }
            break
        default:
            salir = true
            console.log('¡Hasta luego!'.brightGreen)
            console.log('\n')
    }
}