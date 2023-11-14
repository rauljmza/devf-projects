/*CLASE PADRE*/
class Persona{
    constructor(nombre, genero, edad, colorDePiel){
        this.colorDePiel = colorDePiel;
        this.nombre = nombre;
        this.genero = genero;
        this.edad = edad;
    }
    saludar(){
        console.log(`Hola, soy ${this.nombre} y tengo ${this.edad} años.`)
    }
    platicar(persona){
        this.saludar();
        if(persona instanceof Doctor){
            persona.saludarComoDoctor();
            }else if(persona instanceof Artista){
                persona.saludarComoArtista();
            }else{
                persona.saluar();
            }
        }
    
    platicarConPolimorfismo(persona){
        this.saludar();
        persona.saludar();
    }
    
}
/*Clase hijo*/
class Doctor extends Persona{
    constructor(nombre, genero, edad, colorDePiel, especialidad){
        super(nombre, genero, edad, colorDePiel);
        this.especialidad = especialidad;
    }
    inyectar(persona){
        console.log(`Estoy inyectando a ${persona.nombre}`)
    }

    saludar(){
        console.log(`Hola, soy ${this.nombre} y mi especialidad es: ${this.especialidad}-POLIMORFISMO`);
    }

    saludarComoDoctor(){
        console.log(`Hola, soy ${this.nombre} y mi especialidad es: ${this.especialidad}`);
    }
}

/*Clase hijo*/
class Artista extends Persona{
    constructor(nombre, genero, edad, colorDePiel, numeroDeObras){
        super(nombre, genero, edad, colorDePiel);
        this.numeroDeObras = numeroDeObras;
    }
    crearUnaObra(){
        console.log(`Estoy creando mi obra número ${this.numeroDeObras+1}`);
        this.numeroDeObras++;
    }

    saludar(){
        console.log(`Hola, soy ${this.nombre} y tengo: ${this.numeroDeObras} obras.-POLIMORFISMO`);
    }

    saludarComoArtista(){
        console.log(`Hola, soy ${this.nombre} y tengo: ${this.numeroDeObras} obras.`);
    }
}

const persona1 = new Persona('Raul', 'Masculino', 17, 'Blanca');

const doctor1 = new Doctor('Doc. Chikis', 'Masculino', 23, 'Oscura','Medico internista')

const artista1 = new Artista('Mike', 'Masculino', 40, 'Amarilla', 102)

persona1.saludar();
doctor1.saludar();
doctor1.inyectar(persona1);

persona1.platicar(doctor1);
persona1.platicar(artista1);

persona1.platicarConPolimorfismo(doctor1);
persona1.platicarConPolimorfismo(artista1);