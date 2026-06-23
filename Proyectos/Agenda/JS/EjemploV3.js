document.addEventListener("DOMContentLoaded", function () {
    const nombreInput = document.getElementById("nombre");
    const telefonoInput = document.getElementById("telefono");
    const emailInput = document.getElementById("email");
    const direccionInput = document.getElementById("direccion");

    const guardarButton = document.getElementById("guardarBtn");
    const buscarButton = document.getElementById("buscarBtn");
    const eliminarButton = document.getElementById("eliminarBtn");
    const eliminarTodosButton = document.getElementById("eliminarTodosBtn");
    const modificarButton = document.getElementById("modificarBtn"); // Cambiado a modificarBtn
    const listaContactos = document.getElementById("listaContactos");

    // FUNCIÓN GUARDAR: Estructura los datos en un objeto JSON
    function guardarDatos() {
        const nombre = nombreInput.value.trim();
        const telefono = telefonoInput.value.trim();
        const email = emailInput.value.trim();
        const direccion = direccionInput.value.trim();

        if (nombre === "" || telefono === "" || email === "" || direccion === "") {
            alert("Por favor, completa todos los campos para guardar");
            return;
        }

        if (localStorage.getItem(nombre)) {
            alert("Este contacto ya existe. Si deseas cambiar sus datos, usa el botón Modificar.");
            return;
        }

        const datosContacto = {
            telefono: telefono,
            email: email,
            direccion: direccion
        };

        localStorage.setItem(nombre, JSON.stringify(datosContacto));
        
        limpiarFormulario();
        actualizarDatos();
    }

    // FUNCIÓN BUSCAR: Extrae el JSON y separa sus propiedades
    function buscarDatos() {
        const nombreABuscar = nombreInput.value.trim();

        if (nombreABuscar === "") {
            alert("Escribe un nombre en el campo para poder buscar");
            return;
        }

        const datosGuardados = localStorage.getItem(nombreABuscar);

        if (datosGuardados) {
            const contacto = JSON.parse(datosGuardados);
            
            telefonoInput.value = contacto.telefono;
            emailInput.value = contacto.email;
            direccionInput.value = contacto.direccion;
        } else {
            alert("No se encontró ningún contacto con ese nombre");
            limpiarCamposMenosNombre();
        }
    }

    // FUNCIÓN MODIFICAR
    function modificarDatosContacto() {
        const nombre = nombreInput.value.trim();
        const telefono = telefonoInput.value.trim();
        const email = emailInput.value.trim();
        const direccion = direccionInput.value.trim();

        if (nombre === "") {
            alert("Escribe el nombre del contacto que deseas modificar");
            return;
        }

        if (localStorage.getItem(nombre)) {
            const datosContacto = {
                telefono: telefono,
                email: email,
                direccion: direccion
            };

            localStorage.setItem(nombre, JSON.stringify(datosContacto));
            alert("Contacto modificado con éxito");
            limpiarFormulario();
            actualizarDatos();
        } else {
            alert("El contacto no existe, no se puede modificar. Primero guárdalo.");
        }
    }

    function eliminarDatos() {
        const nombreAEliminar = nombreInput.value.trim();

        if (nombreAEliminar === "") {
            alert("Escribe un nombre en el campo para poder eliminarlo");
            return;
        }

        if (localStorage.getItem(nombreAEliminar)) {
            localStorage.removeItem(nombreAEliminar);
            limpiarFormulario();
            actualizarDatos();
        } else {
            alert("El nombre especificado no existe en la agenda");
        }
    }

    function eliminarTodos() {
        if (localStorage.length === 0) {
            alert("La agenda está vacía");
            return;
        }

        if (confirm("¿Estás seguro de eliminar toda la agenda?")) {
            localStorage.clear();
            limpiarFormulario();
            actualizarDatos();
        }
    }

    // FUNCIÓN ACTUALIZAR TABLA: Procesa el JSON para pintar las celdas correctamente
    function actualizarDatos() {
        listaContactos.innerHTML = "";

        for (let i = 0; i < localStorage.length; i++) {
            const nombre = localStorage.key(i);
            const datosGuardados = localStorage.getItem(nombre);

            try {
                const contacto = JSON.parse(datosGuardados);

                const fila = document.createElement("tr");
                fila.innerHTML = "<td>" + nombre + "</td>" +
                                 "<td>" + contacto.telefono + "</td>" +
                                 "<td>" + contacto.email + "</td>" +
                                 "<td>" + contacto.direccion + "</td>";

                listaContactos.appendChild(fila);
            } catch (e) {
                continue; 
            }
        }
    }

    function limpiarFormulario() {
        nombreInput.value = "";
        telefonoInput.value = "";
        emailInput.value = "";
        direccionInput.value = "";
    }

    function limpiarCamposMenosNombre() {
        telefonoInput.value = "";
        emailInput.value = "";
        direccionInput.value = "";
    }

    // Event Listeners
    guardarButton.addEventListener("click", guardarDatos);
    buscarButton.addEventListener("click", buscarDatos);
    eliminarButton.addEventListener("click", eliminarDatos);
    eliminarTodosButton.addEventListener("click", eliminarTodos);
    modificarButton.addEventListener("click", modificarDatosContacto); // Evento asignado al botón Modificar

    actualizarDatos();
});