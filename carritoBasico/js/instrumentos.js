/* Esta lista podría ser reemplazada por la respuesta de un backend
Entonces la web se construye según los elementos cargados en la 
base de datos */

// const ejemplo = ["Guitarra", "Batería", "Bajo", "Teclado", "Saxofón", "Flauta"];
const ejemplo = [{nombre: "Guitarra", tipo: "Cuerda", numeroCuerdas: 6},
    {nombre: "Batería", tipo: "Percusion", tamaño: "Grande"},
    {nombre: "Bajo", tipo: "Cuerda", numeroCuerdas: 4},
    {nombre: "Teclado", tipo: "Percusion", tamaño: "Grande"},
    {nombre: "Saxofón", tipo: "Viento", material: "Metal"},
    {nombre: "Flauta", tipo: "Viento", material: "Plástico"},
    {nombre: "Violín", tipo: "Cuerda", numeroCuerdas: "Madera"},
    {nombre: "Timbales", tipo: "Percusion", tamaño: "Mediano"},
    {nombre: "Ukelele", tipo: "Cuerda", numeroCuerdas: 4},
    {nombre: "Maracas", tipo: "Percusion", tamaño: "Pequeño"},
    {nombre: "Pandereta", tipo: "Percusion", tamaño: "Pequeño"}];

class Instrumento {
    constructor(id, nombre, precio, tipo) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.tipo = tipo;
    }
};

// Implementación de herencia

class InstrumentoCuerda extends Instrumento {
    constructor(id, nombre, precio, tipo, numeroCuerdas) {
        super(id, nombre, precio, tipo);
        this.numeroCuerdas = numeroCuerdas;
    }
}

class InstrumentoViento extends Instrumento {
    constructor(id, nombre, precio, tipo, material) {
        super(id, nombre, precio, tipo);
        this.material = material;
    }
}

class InstrumentoPercusion extends Instrumento {
    constructor(id, nombre, precio, tipo, tamaño) {
        super(id, nombre, precio, tipo);
        this.tamaño = tamaño;
    }
}

function addInst (names, iden = 1, precio = 11111, arr = [], tipo = "Instrumento") {
    // names.forEach(element => {
    //     arr.push(new Instrumento(iden, element, precio));
    //     iden++;
    //     precio+= 11111; 
    // });
    names.forEach(element => {
        let nuevoInstrumento;
        
        switch (element.tipo) {
            case "Cuerda":
                nuevoInstrumento = new InstrumentoCuerda(iden, element.nombre, precio, element.tipo, element.numeroCuerdas);
                break;
            case "Viento":
                nuevoInstrumento = new InstrumentoViento(iden, element.nombre, precio, element.tipo, element.material);
                break;
            case "Percusion":
                nuevoInstrumento = new InstrumentoPercusion(iden, element.nombre, precio, element.tipo, element.tamaño);
                break;
            default:
                nuevoInstrumento = new Instrumento(iden, element.nombre, precio, tipo);
        }
        arr.push(nuevoInstrumento);
        iden++;
        precio += 11111;
    });
    return arr;
};

const instrumentos = addInst(ejemplo);
