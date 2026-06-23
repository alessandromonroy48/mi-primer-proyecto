document.addEventListener("DOMContentLoaded", function () {
    const nombreInput = document.getElementById("nombre");
    const telefonoInput = document.getElementById("telefono");
    const guardarButton = document.getElementById("guardarBtn");
    const buscarButton = document.getElementById("buscarBtn");
    const eliminarButton = document.getElementById("eliminarBtn");
    const eliminarTodosButton = document.getElementById("eliminarTodosBtn");
    const listaContactos = document.getElementById("listaContactos");

    function guardarDatos() {
        const nombre = nombreInput.value.trim();
        const telefono = telefonoInput.value.trim();

        if(nombre === "" || telefono ===""){
            alert("Por favor, completa ambos campos para guardar");
            return;
        }

        localStorage.setItem(nombre, telefono);
        nombreInput.value="";
        telefonoInput.value ="";

        actualizarDatos();

    }

    function buscarDatos() {
        const nombreABuscar = nombreInput.value.trim();

        if (nombreABuscar ===""){
            alert("Escribe un nombre en el campo para poder buscar su telefono");
            return;
        }

        const telefonoEncontrado = localStorage.getItem(nombreABuscar);

        if (telefonoEncontrado) {
            telefonoInput.value =telefonoEncontrado;
        } else {
            alert("No se encontro ningún contacto con ese nombre");
             telefonoInput.value ="";
        }
        
    }

    function eliminarDatos() {
        const nombreAEliminar = nombreInput.value.trim();

        if (nombreAEliminar ===""){
            alert("Escribe un nombre en el campo para poder eliminarlo");
            return;
        }

        if (localStorage.getItem(nombreAEliminar)) {

                localStorage.removeItem(nombreAEliminar);
                nombreInput.value="";
                telefonoInput.value ="";
                actualizarDatos();
        }else{
            alert("El nombre especificado no existe en la agenda");
        }
    }

    function eliminarTodos() {
        if (localStorage.length ===0) {
            alert("La agenda está vacia");
            return;
        }

        if (confirm("¿Estás seguro de eliminar todo la agenda?")) {
            localStorage.clear();
            nombreInput.value="";
            telefonoInput.value ="";
            actualizarDatos();
        }
    }

    function actualizarDatos() {
        listaContactos.innerHTML="";

        for (let i = 0; i < localStorage.length; i++) {
            const nombre = localStorage.key(i);
            const telefono = localStorage.getItem(nombre);

            const fila = document.createElement("tr");
            fila.innerHTML = "<td>" + nombre + "</td><td>" + telefono + "</td>";

            listaContactos.appendChild(fila);
            
        }
    }

    guardarButton.addEventListener("click", guardarDatos);
    buscarButton.addEventListener("click", buscarDatos);
    eliminarButton.addEventListener("click", eliminarDatos);
    eliminarTodosButton.addEventListener("click", eliminarTodos);

    actualizarDatos();
})