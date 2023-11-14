class Alumno {
    constructor(nombre, apellidos, edad) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.edad = edad;
        this.materias = {
            Espanol: [],
            Matematicas: [],
            Quimica: [],
            Fisica: [],
            Programacion: []
        };
    }
}
//Arrays o almacenes de datos, la lista de los alumnos y la lista de los alumnos que hay inscritos en cada materia.
    const alumnos = [];

    const alumnosPorMateria = {
        Espanol: [],
        Matematicas: [],
        Quimica: [],
        Fisica: [],
        Programacion: []
    };

class Grupos {
    constructor(semestre, letra) {
        this.semestre = semestre;
        this.letra = letra;
        this.alumnos = [];
    }
}
const grupos = [];

function altaAlumno() {
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const edad = document.getElementById('edad').value;

    if (nombre && apellidos && edad) {
        const alumno = new Alumno(nombre, apellidos, edad);
        alumnos.push(alumno);
        actualizarDropdownAlumnos(); // Asegúrate de llamar a esta función
        limpiarFormularioAlumno();

        actualizarListaAlumnos();//Lista General
    }
}

function actualizarListaAlumnos(filtrados) {
    const listaAlumnos = document.getElementById('lista-alumnos');
    listaAlumnos.innerHTML = '';

    const alumnosAListar = filtrados || alumnos;

    for (let i = 0; i < alumnosAListar.length; i++) {
        const alumno = alumnosAListar[i];
        const promedio = calcularPromedioAlumno(alumno);

        const li = document.createElement('li');
        li.innerHTML = `<span>${alumno.nombre} ${alumno.apellidos} (Edad: ${alumno.edad})</span><span> | Promedio: ${promedio.toFixed(2)}</span>`;
        listaAlumnos.appendChild(li);
    }
}

function actualizarDropdownAlumnos() {
    const alumnosDropdown = document.getElementById('alumnos-dropdown');
    alumnosDropdown.innerHTML = '<option value="">Selecciona un Alumno</option>';

    for (let i = 0; i < alumnos.length; i++) {
        const alumno = alumnos[i];
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${alumno.nombre} ${alumno.apellidos}`; // Asegúrate de concatenar el nombre y apellidos
        alumnosDropdown.appendChild(option);
    }
}

function buscarAlumno() {
    const busqueda = document.getElementById('busqueda').value.toLowerCase();
    const resultados = alumnos.filter(alumno => {
        const nombreApellidoMatch = alumno.nombre.toLowerCase().includes(busqueda) || alumno.apellidos.toLowerCase().includes(busqueda);
        const promedioMatch = buscarPorPromedio(alumno, busqueda);
        return nombreApellidoMatch || promedioMatch;
    });

    actualizarResultadosBusqueda(resultados);
}

function buscarPorPromedio(alumno, busqueda) {
    // Comprueba si la búsqueda coincide con el promedio del alumno
    const promedioAlumno = calcularPromedioAlumno(alumno);
    return promedioAlumno.toFixed(2).includes(busqueda);
}

function actualizarResultadosBusqueda(resultados) {
    const resultadosBusqueda = document.getElementById('resultados-busqueda');
    resultadosBusqueda.innerHTML = '';

    for (let i = 0; i < resultados.length; i++) {
        const alumno = resultados[i];
        const calificaciones = alumno.materias;
    
        const li = document.createElement('li');
        li.innerHTML = `<span>${alumno.nombre} ${alumno.apellidos} (Edad: ${alumno.edad})</span>`;
    
        for (const materia in calificaciones) {
            if (calificaciones[materia].length > 0) {
                li.innerHTML += `<span>ㅤ|ㅤCalificación ${materia}: ${calificaciones[materia][calificaciones[materia].length - 1]}</span>`;
            }
        }
    
        resultadosBusqueda.appendChild(li);
    }

    if (resultados.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No se encontraron resultados.';
        resultadosBusqueda.appendChild(li);
    }
}



//Inscribir alumnos en materias
    function inscribirAlumno() {
        const selectedAlumnoIndex = document.getElementById('alumnos-dropdown').value;
        const materiaDropdown = document.getElementById('materia-dropdown');
        const materia = materiaDropdown.value;

        if (selectedAlumnoIndex && materia) {
            const alumno = alumnos[selectedAlumnoIndex];
            alumno.materias[materia].push(null);
            alumnosPorMateria[materia].push(alumno);
            actualizarListaAlumnos();
            actualizarListasPorMateria(materia);
            limpiarFormularioClases();
            //Actualizar el dropdown de la asignación de calificación para solo poder seleccionar alumnos inscritos en materias
            actualizarDropdownAlumnosCalificacion();
            //Actualizar alumnos cuando se hayan inscrito en una materia
            actualizarDropdownAlumnosInscripcionGrupo();
        
        }
    }
    
    
    function actualizarDropdownAlumnosCalificacion() {
        const alumnosDropdownCalificacion = document.getElementById('alumno-calificacion-dropdown');
        alumnosDropdownCalificacion.innerHTML = '<option value="">Selecciona un Alumno</option>';
    
        for (let i = 0; i < alumnos.length; i++) {
            const alumno = alumnos[i];
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `${alumno.nombre} ${alumno.apellidos}`;
            alumnosDropdownCalificacion.appendChild(option);
        }
    }

    function asignarCalificacion() {
        const selectedAlumnoIndex = document.getElementById('alumno-calificacion-dropdown').value;
        const selectedMateria = document.getElementById('materia-calificacion-dropdown').value;
        const calificacion = document.getElementById('calificacion-input').value;
    
        if (selectedAlumnoIndex && selectedMateria && calificacion) {
            const alumno = alumnos[selectedAlumnoIndex];
            const materiaIndex = alumno.materias[selectedMateria].length - 1;
    
            if (materiaIndex >= 0) {
                alumno.materias[selectedMateria][materiaIndex] = parseFloat(calificacion);
                actualizarListasPorMateria(selectedMateria);
                limpiarFormularioCalificacion();
                actualizarDropdownAlumnos();

                actualizarListaAlumnos();//Lista General
            }
        }
    }
    

    function actualizarListasPorMateria(materia) {
        const materias = ["Espanol", "Matematicas", "Quimica", "Fisica", "Programacion"];
        materias.forEach(m => {
            if (m !== materia) {
                const listaMateria = document.getElementById(`lista-${m.toLowerCase()}`);
                listaMateria.innerHTML = '';
            }
        });

        const listaMateria = document.getElementById(`lista-${materia.toLowerCase()}`);
        listaMateria.innerHTML = '';

        const alumnosMateria = alumnosPorMateria[materia];

        for (let i = 0; i < alumnosMateria.length; i++) {
            const alumno = alumnosMateria[i];
            const calificaciones = alumno.materias[materia];

            let calificacion = calificaciones.reduce((a, b) => a + b, 0);

            const li = document.createElement('li');
            li.innerHTML = `<span>${alumno.nombre} ${alumno.apellidos} (Edad: ${alumno.edad})</span><span> | Calificación ${materia}: ${calificacion.toFixed(2)}</span>`;
            listaMateria.appendChild(li);
        }
    }

    function crearGrupo() {
        const semestre = document.getElementById('semestre-dropdown').value;
        const letra = document.getElementById('letra-dropdown').value;

        if (semestre && letra) {
            const grupo = new Grupos(semestre, letra);
            grupos.push(grupo);
            actualizarDropdownGrupos();
            limpiarFormularioGrupo();
        }
    }

    function actualizarDropdownGrupos() {
        const gruposDropdown = document.getElementById('grupo-dropdown');
        gruposDropdown.innerHTML = '<option value="">Selecciona un Semestre y Grupo</option>';

        for (let i = 0; i < grupos.length; i++) {
            const grupo = grupos[i];
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `Semestre ${grupo.semestre}, Grupo ${grupo.letra}`;
            gruposDropdown.appendChild(option);
        }
    }

    function actualizarDropdownAlumnosInscripcionGrupo() {
        const alumnosDropdownGrupo = document.getElementById('alumnos-dropdown-grupo');

        for (let i = 0; i < alumnos.length; i++) {
            const alumno = alumnos[i];
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `${alumno.nombre} ${alumno.apellidos}`;
            alumnosDropdownGrupo.appendChild(option);

        }
    }

    function inscribirAlumnoEnGrupo() {
        const selectedAlumnoIndex = document.getElementById('alumnos-dropdown-grupo').value;
        const selectedGrupoIndex = document.getElementById('grupo-dropdown').value;

        if (selectedAlumnoIndex && selectedGrupoIndex) {
            const alumno = alumnos[selectedAlumnoIndex];
            const grupo = grupos[selectedGrupoIndex];
            alumno.grupo = grupo;
            grupo.alumnos.push(alumno);
            limpiarFormularioAlumnoGrupo();
            actualizarListaAlumnos();
            console.log('Chikis');
            actualizarListaGrupos();
        }
    }

    function actualizarListaGrupos() {
        const listaGrupos = document.getElementById('lista-grupos');
        listaGrupos.innerHTML = '';

        for (let i = 0; i < grupos.length; i++) {
            const grupo = grupos[i];

            const li = document.createElement('li');
            li.textContent = `Semestre ${grupo.semestre}, Grupo ${grupo.letra}, Alumnos: ${grupo.alumnos.length}`;

            //Agrega un botón para ver los alumnos del grupo
            const verAlumnosBtn = document.createElement('button');
            verAlumnosBtn.textContent = 'Ver Alumnos';
            verAlumnosBtn.addEventListener('click', () => verAlumnosEnGrupo(i));
            li.appendChild(verAlumnosBtn);


            //Agrega un botón para ocultar los alumnos del grupo
            const ocultarAlumnosBtn = document.createElement('button');
            ocultarAlumnosBtn.textContent = 'Ocultar Alumnos';
            ocultarAlumnosBtn.addEventListener('click', () => ocultarAlumnosEnGrupo(i));
            li.appendChild(ocultarAlumnosBtn);


            //Agrega un botón para obtener el promedio del grupo
            const promedioGrupoBtn = document.createElement('button');
            promedioGrupoBtn.textContent = 'Promedio del Grupo';
            promedioGrupoBtn.addEventListener('click', () => obtenerPromedioGrupo(i));
            li.appendChild(promedioGrupoBtn);


            listaGrupos.appendChild(li);
        }
    }

    function verAlumnosEnGrupo(grupoIndex) {
        const grupo = grupos[grupoIndex];
        const listaAlumnosGrupo = document.getElementById('lista-alumnos-grupo');
        listaAlumnosGrupo.innerHTML = '';

        for (let i = 0; i < grupo.alumnos.length; i++) {
            const alumno = grupo.alumnos[i];
            const promedioAlumno = calcularPromedioAlumno(alumno);
            const li = document.createElement('li');
            li.textContent = `${alumno.nombre} ${alumno.apellidos} (Edad: ${alumno.edad}) | Promedio: ${promedioAlumno.toFixed(2)}`;
            listaAlumnosGrupo.appendChild(li);
        }
    }

    function ocultarAlumnosEnGrupo(grupoIndex) {
        const listaAlumnosGrupo = document.getElementById('lista-alumnos-grupo');
        listaAlumnosGrupo.innerHTML = '';
    }


    function obtenerPromedioGrupo(grupoIndex) {
        const grupo = grupos[grupoIndex];
        const listaAlumnosGrupo = grupo.alumnos;

        if (listaAlumnosGrupo.length === 0) {
            alert('No hay alumnos en el grupo.');
            return;
        }

        const promediosAlumnos = listaAlumnosGrupo.map(alumno => calcularPromedioAlumno(alumno));
        const promedioGrupo = promediosAlumnos.reduce((a, b) => a + b, 0) / listaAlumnosGrupo.length;

        alert(`Promedio del Grupo: ${promedioGrupo.toFixed(2)}`);
    }


//Agrega un elemento para mostrar los alumnos del grupo seleccionado
const listaAlumnosGrupo = document.createElement('ul');
listaAlumnosGrupo.id = 'lista-alumnos-grupo';
document.body.appendChild(listaAlumnosGrupo);

document.getElementById('inscribir-en-grupo-btn').addEventListener('click', inscribirAlumnoEnGrupo);

function calcularPromedioAlumno(alumno) {
    let totalCalificaciones = 0;
    let totalMaterias = 0;

    for (const materia in alumno.materias) {
        const calificacionesMateria = alumno.materias[materia];
        if (calificacionesMateria.length > 0) {
            // Sumar todas las calificaciones de la materia
            totalCalificaciones += calificacionesMateria.reduce((a, b) => a + b, 0);
            totalMaterias += calificacionesMateria.length;
        }
    }

    if (totalMaterias === 0) {
        return 0;
    }

    return totalCalificaciones / totalMaterias;
}

function ordenarAlumnos(ascendente) {
    alumnos.sort((a, b) => {
        const promedioA = calcularPromedioAlumno(a);
        const promedioB = calcularPromedioAlumno(b);
        return ascendente ? promedioA - promedioB : promedioB - promedioA;
    });
    actualizarListaAlumnos();
}

function limpiarFormularioAlumno() {
    document.getElementById('nombre').value = '';
    document.getElementById('apellidos').value = '';
    document.getElementById('edad').value = '';
}

function limpiarFormularioCalificacion() {
    document.getElementById('alumno-calificacion-dropdown').value = '';
    document.getElementById('materia-calificacion-dropdown').value = '';
    document.getElementById('calificacion-input').value = '';
}


function limpiarFormularioClases() {
    document.getElementById('alumnos-dropdown').value = '';
    document.getElementById('materia-dropdown').value = '';
}

function limpiarFormularioGrupo() {
    document.getElementById('semestre-dropdown').value = '';
    document.getElementById('letra-dropdown').value = '';
}

function limpiarFormularioAlumnoGrupo() {
    document.getElementById('alumnos-dropdown-grupo').value = '';
    document.getElementById('grupo-dropdown').value = '';
}

actualizarListaAlumnos();
actualizarDropdownAlumnos();

document.getElementById('alta-btn').addEventListener('click', altaAlumno);
document.getElementById('inscribir-btn').addEventListener('click', inscribirAlumno);

document.getElementById('asignar-calificacion-btn').addEventListener('click', () => {
    asignarCalificacion();
    limpiarFormularioCalificacion();
});

document.getElementById('crear-grupo-btn').addEventListener('click', crearGrupo);

document.getElementById('inscribir-en-grupo-btn').addEventListener('click', inscribirAlumnoEnGrupo);

document.getElementById('buscar-btn').addEventListener('click', buscarAlumno);

document.getElementById("espanol-btn").addEventListener('click', () => actualizarListasPorMateria('Espanol'));
document.getElementById("matematicas-btn").addEventListener('click', () => actualizarListasPorMateria('Matematicas'));
document.getElementById("quimica-btn").addEventListener('click', () => actualizarListasPorMateria('Quimica'));
document.getElementById("fisica-btn").addEventListener('click', () => actualizarListasPorMateria('Fisica'));
document.getElementById("programacion-btn").addEventListener('click', () => actualizarListasPorMateria('Programacion'));

document.getElementById('ordenar-asc-btn').addEventListener('click', () => ordenarAlumnos(true));
document.getElementById('ordenar-desc-btn').addEventListener('click', () => ordenarAlumnos(false));
