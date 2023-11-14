// Dividir Colas
function dividirCola(colaOriginal) {
    const colaPares = [];
    const colaImpares = [];
  
    for (let i = 0; i < colaOriginal.length; i++) {
    //Calcula el residuo de la división entre 2 del indice (posición). Si da 0 es par y si no es 0 es impar
      if (i % 2 === 0) {
        colaPares.push(colaOriginal[i]);
      } else {
        colaImpares.push(colaOriginal[i]);
      }
    }
  
    return { colaPares, colaImpares };
  }
  
  const colaOriginal = ["Amarillo", "Rosa", "Rojo", "Verde", "Azul", "Negro", "Morado", "Blanco"];
  
  const resultado = dividirCola(colaOriginal);
  console.log("Cola 1:", resultado.colaPares);
  document.write(`<h1>1.</h1>Cola 1: ${resultado.colaPares.join(', ')}.<br/>`);

  console.log("Cola 2:", resultado.colaImpares);
  document.write(`<br/>Cola 2: ${resultado.colaImpares.join(', ')}.`);
  
  /*
  _________________________________________________________________________________________________________________________________________________________
 Filtrar Usuarios que cuenten con tickets o boletos o no */
  function filtrarFilaConTickets(fila) {
    const filaFiltrada = [];
    const filaUsuariosRetirados = [];
    
    for (let i = 0; i < fila.length; i++) {
    //Si tiene un ticket, lo agregamos a la nueva cola
      if (fila[i].ticket) {
        filaFiltrada.push(fila[i]);
      }else{
        filaUsuariosRetirados.push(fila[i])
      }
    }  
    // Elementos retirados
    const elementosRetirados = fila.length - filaFiltrada.length;
    console.log(`Número de usuarios retirados: ${elementosRetirados}`);
    return{filaFinal: filaFiltrada, filaUsuariosRetirados: filaUsuariosRetirados, numeroElementosRetirados: elementosRetirados}
  }
 
  const fila = [
    { user: 'Usuario 1', ticket: true },
    { user: 'Usuario 2', ticket: true },
    { user: 'Usuario 3', ticket: false },
    { user: 'Usuario 4', ticket: true },
    { user: 'Usuario 5', ticket: false },
    { user: 'Usuario 6', ticket: false },
    { user: 'Usuario 7', ticket: true },
    { user: 'Usuario 8', ticket: true },
    { user: 'Usuario 9', ticket: true },
    { user: 'Usuario 10', ticket: false },
    { user: 'Usuario 11', ticket: true },
  ];

  document.write(`<h1>2.</h1><div id="ulListado"></div>`);

  //Va a contar las veces que se ejecutó una función
  var ejecuciones = 0;

  function imprimirLista(array) {
    var Lista = document.getElementById("ulListado");

    //Dependiendo las veces que se haya ejecutado cambiará lo que está arriba de la lista, para identificar que lista es.
    var texto = ejecuciones === 0 ? 'Fila Inicial' : ejecuciones === 1 ? 'Usuarios retirados de la fila' : 'Fila final filtrada';

    //Div creado para ponerse sobre las listas, para que tengan una separación
    var divSeparador = document.createElement("div");
    //Toma como "hijo" al div separador para ponerse debajo de el div listado y antes de las listas
    Lista.appendChild(divSeparador);
    //Se crea el texto que irá dentro del div, dependiendo las veces que se haya ejecutado será la lista que se habrá mandado a llamar
    var textoSeparador = document.createTextNode(texto);
    //Se pone dentro del div el texto
    divSeparador.appendChild(textoSeparador);

    //Se ejecuta un array (lista) forEach para tomar los datos, escribirlos dentro de una lista (li)
    array.forEach(function (element, index) {
      var linew = document.createElement("li");
      var contenido = document.createTextNode(element.user + ' - ' + (element.ticket ? 'con boleto' : 'sin boleto'));
      Lista.appendChild(linew);
      linew.appendChild(contenido);
    });
    var brEnter = document.createElement("br");
    Lista.appendChild(brEnter);
  }

//Se imprime la primera lista, así mismo se incrementa el numero de ejecuciones de 0 a 1
  imprimirLista(fila);
  ejecuciones++;

//Se filtra la lista y se imprime en consola
  filtrarFilaConTickets(fila);
//Se imprime la lista de los usuarios retirados por no tener boleto
  imprimirLista(filtrarFilaConTickets(fila).filaUsuariosRetirados);
  ejecuciones++;

//Se filtra la lista y se imprime en consola
  filtrarFilaConTickets(fila);
//Se imprime la lista de los usuarios retirados por no tener boleto
  imprimirLista(filtrarFilaConTickets(fila).filaFinal);

  document.write(`Numero Usuarios retirados de la fila por no tener boleto: ${filtrarFilaConTickets(fila).numeroElementosRetirados}`)

  
 
