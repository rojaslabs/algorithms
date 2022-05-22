class Ninja {
    constructor(nombre, salud) {
        this.nombre = nombre;
        this.salud = salud;
        this.velocidad = 3;
        this.fuerza = 3;
    }

    sayName() {
        console.log(`El nombre del ninja es ${this.nombre}!`);
    }

    showStats() {
        console.log(`Nombre: ${this.nombre}, Fuerza: ${this.fuerza}, Velocidad: ${this.velocidad}, Salud ${this.salud}`);
    }

    drinkSake() {
        this.salud += 10;
        console.log(`La salud de ${this.nombre} subió +10, y ahora es ${this.salud}!`);
    }

}

class SuperNinja extends Ninja {
    constructor(nombre) {
        super(nombre);
        this.salud = 200;
        this.velocidad = 10;
        this.fuerza = 10;
        this.sabiduria = 10;
    }

    speakWisdom() {
        super.drinkSake();
        console.log('"Lo que un programador puede hacer en un mes, dos programadores pueden hacerlo en dos meses."');
    }
    
}

// Se crea un objeto ninja
const ninja = new Ninja('Ninja Gaiden', 100);

// Se imprime el estado inicial del objeto ninja
console.table(ninja);

// Se ejecuta el método sayName()
ninja.sayName();

// Se ejecuta el método showStats()
ninja.showStats();

// Se ejecuta el método drinkSake()
ninja.drinkSake();

// Se imprime el estado actualizado del objeto
console.table(ninja);

// Se crea un objeto superNinja
const superNinja = new SuperNinja('Sensei Splinter');

// Se imprime el estado inicial del objeto superNinja
console.table(superNinja);

// Se ejecuta el método speakWisdom(), el cual ejecuta el método heredado drinkSake()
superNinja.speakWisdom();