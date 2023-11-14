class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

// Definimos la clase para la lista enlazada
class LinkedList {
    constructor() {
        this.head = null;
    }

    insert(data) {
        // Verificamos si el dato ya existe en la lista
        if (this.exists(data)) {
            console.log(`El dato ${data} ya está en la lista, no se permiten duplicados.`);
            return;
        }

        // Creamos un nuevo nodo
        const newNode = new Node(data);

        // Si la lista está vacía, el nuevo nodo será la cabeza
        if (!this.head) {
            this.head = newNode;
        } else {
            // Recorremos la lista para encontrar el último nodo
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            // Enlazamos el último nodo con el nuevo nodo
            current.next = newNode;
        }
    }

    exists(data) {
        // Verifica si un dato ya existe en la lista
        let current = this.head;
        while (current) {
            if (current.data === data) {
                return true;
            }
            current = current.next;
        }
        return false;
    }
}

function insertUniqueData(dataList, data) {
    for (let i = 0; i < data.length; i++) {
        dataList.insert(data[i]);
    }
}

// Ejemplo de uso
const lista = new LinkedList();
const datos = [1, 2, 3, 2, 4, 3]; // Ejemplo de datos con duplicados

insertUniqueData(lista, datos);

/*
___________________________________________________________________________________________________________________________________________________________
*/
function createRandomLinkedList(length) {
    const randomList = new LinkedList();
    for (let i = 0; i < length; i++) {
        const randomNumber = Math.floor(Math.random() * 100); // Números enteros positivos hasta 99
        randomList.insert(randomNumber);
    }
    return randomList;
}

function printNodesAboveValue(linkedList, threshold) {
    let current = linkedList.head;
    while (current) {
        if (current.data > threshold) {
            console.log(current.data);
        }
        current = current.next;
    }
}

// Crear dos listas con números aleatorios
const list1 = createRandomLinkedList(10);
const list2 = createRandomLinkedList(15);

// Mostrar nodos que superen un valor determinado en la primera lista
console.log("Nodos en list1 que superan 50:");
printNodesAboveValue(list1, 50);

// Mostrar nodos que superen un valor determinado en la segunda lista
console.log("Nodos en list2 que superan 70:");
printNodesAboveValue(list2, 70);

