/*
Persona
    Caracteristicas
        -Nombre
        -Edad
        -Género
        -Nacionalidad
        -Horas de sueño
        -Mejor amigo
    Acciones
        -Saludar
        -Saltar
        -Dormir
        -Platicar

    PONER TILDE BACKTICK ALTGR + }
*/

class Persona{

    #edad;
    #mejorAmigo;

    constructor(nombre, edad, genero, nacionalidad){
        this.nombre = nombre;
        this.#edad = edad;
        this.genero = genero;
        this.nacionalidad = nacionalidad;
        this.horasSuenio = 0;
        this.#mejorAmigo = null;
    }

    get Edad(){
        return this.#edad;

    }

    set Edad(edad){
        this.#edad = edad;
    }

    set mejorAmigo(mejorAmigo){
        this.#mejorAmigo = mejorAmigo;
    }

    get mejorAmigo(){
        return this.#mejorAmigo;
    }

    saludar(){
        console.log(`Hola, mi nombre es ${this.nombre} y tengo ${this.#edad} años`);
    }
    dormir(horasDormidas){
        console.log(`Ayer dormí ${this.horasSuenio} y hoy dormí ${horasDormidas} horas`);
        this.horasSuenio = horasDormidas;
    }

    platicar(interlocutor){
        console.log(`Estoy platicando con ${interlocutor.nombre}`)
        interlocutor.saludar();
    }
}

const personaA = new Persona('Tona', 24, 'Masculino', 'Mexicana');

personaA.saludar();
console.log(personaA.horasSuenio);
personaA.dormir(8);
console.log(personaA.horasSuenio);

const personaB = new Persona('Juan', 23, 'Masculino', 'Colombiana');
personaA.platicar(personaB);

console.log(`La edad de ${personaA.nombre} es ${personaA.Edad}`);
personaA.Edad = 25;
console.log(`La nueva edad de ${personaA.nombre} es ${personaA.Edad}`);

personaA.MejorAmigo = personaB; // Establecer a personaB como el mejor amigo de personaA
console.log(`El mejor amigo de ${personaA.nombre} es ${personaA.MejorAmigo.nombre}`);

class Contacto{
    constructor(nombre, apellidos, telefono){
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.telefono = telefono;
    }
}

class ListaContactos{
    constructor(){
        this.contactos = [];
    }
    agregarContacto(contacto){
        this.contactos.push(contacto);
    }
    buscarContactoPorNombre(nombre) {
        const contactosEncontrados = [];
        for (const contacto of this.contactos) {
            if (contacto.nombre === nombre) {
                contactosEncontrados.push(contacto);
            }
        }
        return contactosEncontrados;
    }
}

// Ejemplo de uso
const listaDeContactos = new ListaContactos();

const contacto1 = new Contacto('Juan', 'Pérez', '555-123-4567');
const contacto2 = new Contacto('María', 'López', '555-987-6543');
const contacto3 = new Contacto('Pedro', 'García', '555-111-2222');

listaDeContactos.agregarContacto(contacto1);
listaDeContactos.agregarContacto(contacto2);
listaDeContactos.agregarContacto(contacto3);

const contactosEncontrados = listaDeContactos.buscarContactoPorNombre('María');
console.log(contactosEncontrados);

if (contactosEncontrados.length > 0) {
    console.log('Contactos encontrados:');
    for (const contacto of contactosEncontrados) {
        console.log(`Nombre: ${contacto.nombre}, Apellidos: ${contacto.apellidos}, Teléfono: ${contacto.telefono}`);
    }
} else {
    console.log('nel')
    //console.log(`No se encontraron contactos con el nombre ${nombreABuscar}.`);
}