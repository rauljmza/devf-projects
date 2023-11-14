class PersonaMSJ{
    constructor(nombre, edad, profesion){
        this.nombre = nombre;
        this.edad = edad;
        this.profesion = profesion;
    }
}

class Notificacion{
    /*Agarra los datos de una persona*/
    constructor(persona){
        this.persona = persona;
    }

    enviarMensaje(mensaje){
        mensaje.enviar(this.persona)
    }
}

class Mensaje{
    constructor(textoMensaje){
        this.textoMensaje = textoMensaje;
    }

    enviar(destinatario){
        console.log(`El mensaje se enviará a ${destinatario.nombre}, de ${destinatario.edad} años y con una profesion de ${destinatario.profesion}. Mensaje: ${this.textoMensaje}`)

    }
}

class Email extends Mensaje{
    enviar(destinatario){
        console.log(`El mensaje se enviará vía correo electrónico a ${destinatario.nombre}, de ${destinatario.edad} años y con una profesion de ${destinatario.profesion}. Mensaje: ${this.textoMensaje}`)
    }

}

class SMS extends Mensaje{
    enviar(destinatario){
        console.log(`El mensaje se enviará vía SMS a ${destinatario.nombre}, de ${destinatario.edad} años y con una profesion de ${destinatario.profesion}. Mensaje: ${this.textoMensaje}`)
    }

}

class WA extends Mensaje{
    enviar(destinatario){
        console.log(`El mensaje se enviará vía WhatsApp a ${destinatario.nombre}, de ${destinatario.edad} años y con una profesion de ${destinatario.profesion}. Mensaje: ${this.textoMensaje}`)
    }
}

const persona1 = new PersonaMSJ('Raúl', 17, 'Programador Junior');

const mensajeNormal = new Mensaje('Hola, este es un mensaje normal.');
const mensajeEmail = new Email('Hola, @mail.com');
const mensajeSMS = new SMS('Hola, puedes recibir SMS?');
const mensajeWA = new WA('Hola, agregame al whats, nuevo número');

const notificacion = new Notificacion(persona1);

notificacion.enviarMensaje(mensajeNormal);
notificacion.enviarMensaje(mensajeEmail);
notificacion.enviarMensaje(mensajeSMS);
notificacion.enviarMensaje(mensajeWA);