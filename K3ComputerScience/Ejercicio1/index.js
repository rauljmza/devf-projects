//1. Retorno elementos en base a la cantidad
function obtenerElementosPila(pila, cantidad) {
    const elementos = [];
    for (let i = 0; i < cantidad; i++) {
      elementos.push(pila[i]);
    }
    return elementos;
}
  
  const entrada = ['Manzana', 'Cebolla', 'Apio', 'Naranja', 'Papaya', 'Sandía', 'Melón'];
  const cantidad = 4;
  
  const salida = obtenerElementosPila(entrada, cantidad);
  console.log(salida);
  //Mostrar en el html
  document.write(`<h1>1.</h1> Entrada: ${entrada.join(', ')}. <br/> Salida (${cantidad}): ${salida.join(', ')}.`)
/*
___________________________________________________________________________________________________________________________________________________________
2. Remplazar numero en la pila por otro | Nuevo - Viejo*/
function reemplazarViejo(pila, nuevo, viejo) {
    let reemplazado = false; //Aun no se remplaza
  
    for (let i = 0; i < pila.length; i++) {
      if (!reemplazado && pila[i] === viejo) {
        pila[i] = nuevo; // Reemplazar el número "viejo" con el número "nuevo"
        reemplazado = true; //Ya fue remplazado
      }
    }
  }
  
  const pilaNumeros = [1, 2, 3, 4, 5, 3, 6, 7];
  //Antes del cambio
  document.write(`<h1>2.</h1> Entrada: ${pilaNumeros.join(', ')}.`);
  //Remplaza el 5 por el 9 (nuevo, viejo)
  reemplazarViejo(pilaNumeros, 9, 5);
  console.log(pilaNumeros);
  //Después del cambio
  document.write(`<br/> Salida (9 por el 5): ${pilaNumeros.join(', ')}.`)
  /*
  _________________________________________________________________________________________________________________________________________________________
  3. Dar el recorrido de ida e invertir los valores para mostrar el regreso*/
  function recorrido(locaciones) {
    const recorridoIda = [];
    const recorridoRegreso = [];
  
    //Recorrido ida
    for (let i = 0; i < locaciones.length; i++) {
      recorridoIda.push(locaciones[i]);
    }
  
    //Reocorrido regreso
    for (let i = locaciones.length - 1; i >= 0; i--) {
      recorridoRegreso.push(locaciones[i]);
    }
    return{ ida: recorridoIda, regreso: recorridoRegreso}
  }
  
  const recorridoManejo1 = ["Origen", "Pueblo1", "Pueblo2", "Destino"];
  const recorrido1 = recorrido(recorridoManejo1)
  //Recorrido | Ida
  console.log("Recorrido: " + recorrido1.ida.join(" → "));
  document.write(`<h1>3.</h1> Recorrido: ${recorrido1.ida.join(" → ")}.`);
  //Regreso
  document.write(`<br/> Regreso: ${recorrido1.regreso.join(" → ")}.`);
  console.log("Recorrido regreso: " + recorrido1.regreso.join(" → "));
  /*
  _________________________________________________________________________________________________________________________________________________________
  4. */
  function sacarPila(pila, retirarContenedor) {
    if (retirarContenedor <= 0 || retirarContenedor > pila.length) {
      console.log("Número de pila inválido.");
      return;
    }
  
    const pilaOriginal = pila.slice(); //Pila original sin cambios
    const pilaTemporal = [];
    
    // Retiro de los contenedores 1 y 2 en la pila temporal
    for (let i = 0; i < retirarContenedor - 1; i++) {
      pilaTemporal.push(pila.pop());
    }
    
    const contenedorRetirar = pila.pop(); // Retiro del contenedor 3

    console.log("Pila Original:", pilaOriginal);
    document.write(`<h1>4.</h1> Pila Original: ${pilaOriginal.join(",ㅤ")}.`);

    console.log(`Contenedor a sacar: ${retirarContenedor}`)
    document.write(`<br/>Contenedor a sacar: ${retirarContenedor}.<br/>`);

    console.log(`Pila de contenedores retirados para sacar el contenedor ${retirarContenedor}:`,pila);
    document.write(`<br/>Pila de contenedores retirados para sacar el contenedor ${retirarContenedor}:ㅤ${pila.join(",ㅤ")}.`);

    console.log("Pila Temporal:", pilaTemporal);
    document.write(`<br/>Pila Temporal: ${pilaTemporal.join(",ㅤ")}.<br/>`);
    
    while (pilaTemporal.length > 0) {
        pila.push(pilaTemporal.pop());
      }
    console.log(`Pila Final Modificada sin el contenerdor ${retirarContenedor}:`, pila);
    document.write(`<br/>Pila Final Modificada sin el contenerdor ${retirarContenedor}: ${pila.join(",ㅤ")}.`);

    console.log("Contenedor a sacar:", [contenedorRetirar]);
    document.write(`<br/>Contenedor a sacar: ${contenedorRetirar}.`);
  }
  
  const pilaOriginal = [1, 2, 3, 4, 5];
  const retirarContenedor = 3;
  
  sacarPila(pilaOriginal, retirarContenedor);