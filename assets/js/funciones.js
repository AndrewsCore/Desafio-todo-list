/* Arreglo con menos 3 tareas */
let tareas = [
    {
        id: 16,
        descripcion: "Hacer mercado",
        completado: false
    },
    {
        id: 60,
        descripcion: "Estudiar para la prueba",
        completado: false
    },
    {
        id: 24,
        descripcion: "Sacar a pasear a Tobby",
        completado: false
    }
];

/* elementos del DOM */
const inputTarea = document.querySelector("#input-tarea");
const btnAgregar = document.querySelector("#boton-agregar");
const cuerpoTabla = document.querySelector("#cuerpo-tabla");
const totalTareasSpan = document.querySelector("#total-tareas");
const realizadasSpan = document.querySelector("#tareas-realizadas");

/*Función para la lista de tareas en el HTML */
function renderizarTareas() {
    let html = "";
    
    /* Recorrer el arreglo usando forEach */
    tareas.forEach((tarea) => {
        html += `
            <tr>
                <td>${tarea.id}</td>
                <td class="${tarea.completado ? 'texto-completado' : ''}">
                    ${tarea.descripcion}
                </td>
                <td>
                    <!-- Requerimiento 4: Checkbox para marcar completada -->
                    <input type="checkbox" ${tarea.completado ? 'checked' : ''} 
                            onclick="cambiarEstado(${tarea.id})">
                </td>
                <td>
                    <!-- Requerimiento 2: Botón para borrar tarea -->
                    <button class="boton-eliminar" onclick="borrarTarea(${tarea.id})">X</button>
                </td>
            </tr>
        `;
    });

    cuerpoTabla.innerHTML = html;
    actualizarContadores();
}

/* Agregar tarea */
btnAgregar.addEventListener("click", () => {
    const descripcion = inputTarea.value.trim();
    
    if (descripcion === "") {
        return; /* No agregar tareas si el campo esta vacío */
    }

    /* Generar un ID aleatorio */
    const nuevaTarea = {
        id: Math.floor(Math.random() * 100),
        descripcion: descripcion,
        completado: false
    };

    tareas.push(nuevaTarea);
    inputTarea.value = ""; /* Limpiar input */
    renderizarTareas();
});

/* Borrar una tarea por su ID */
function borrarTarea(id) {
    const index = tareas.findIndex((t) => t.id === id);
    tareas.splice(index, 1);
    renderizarTareas();
}

/* Cambiar estado (completado: true/false) */
function cambiarEstado(id) {
    const index = tareas.findIndex((t) => t.id === id);
    /* Invertir el estado actual */
    tareas[index].completado = !tareas[index].completado;
    renderizarTareas();
}

/* Actualizar contadores (Total y Realizadas) */
function actualizarContadores() {
    /* Total */
    totalTareasSpan.innerHTML = tareas.length;

    /* Realizadas usando filter */
    const realizadas = tareas.filter(t => t.completado === true).length;
    realizadasSpan.innerHTML = realizadas;
}

/* Llamada inicial para mostrar las 3 tareas de ejemplo */
renderizarTareas();