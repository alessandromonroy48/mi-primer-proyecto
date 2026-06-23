document.addEventListener("DOMContentLoaded", function () {
    // 1. Referencias HTML
    const listaCarrito = document.getElementById("items-carrito");
    const totalCompra = document.getElementById("total-compra");
    const btnVaciar = document.getElementById("btn-vaciar");
    const botonesAgregar = document.querySelectorAll(".btn-agregar");

    // 2. Estado del Carrito (se recupera de localStorage si existe)
    let carrito = JSON.parse(localStorage.getItem("carrito_compras")) || [];

    // 3. Funciones
    function guardarEnStorage() {
        localStorage.setItem("carrito_compras", JSON.stringify(carrito));
        renderizarCarrito();
    }

    function agregarProducto(e) {
        const tarjeta = e.target.closest(".tarjeta-producto");
        const id = tarjeta.getAttribute("data-id");
        const nombre = tarjeta.getAttribute("data-nombre");
        const precio = parseFloat(tarjeta.getAttribute("data-precio"));
        const cantidad = parseInt(tarjeta.querySelector(".cantidad-input").value);

        // Validar cantidad válida
        if (isNaN(cantidad) || cantidad <= 0) {
            alert("Por favor, ingresa una cantidad válida.");
            return;
        }

        // Comprobar si el producto ya existe en el carrito
        const existe = carrito.find(item => item.id === id);

        if (existe) {
            existe.cantidad += cantidad; // Sumar la nueva cantidad
        } else {
            carrito.push({ id, nombre, precio, cantidad }); // Agregar nuevo objeto
        }

        // Resetear el input a 1
        tarjeta.querySelector(".cantidad-input").value = 1;

        guardarEnStorage();
    }

    function eliminarProducto(id) {
        carrito = carrito.filter(item => item.id !== id);
        guardarEnStorage();
    }

    function vaciarCarrito() {
        if (carrito.length === 0) {
            alert("El carrito ya está vacío.");
            return;
        }
        if (confirm("¿Estás seguro de que deseas vaciar el carrito por completo?")) {
            carrito = [];
            guardarEnStorage();
        }
    }

    function renderizarCarrito() {
        // Limpiar contenido previo para evitar duplicaciones
        listaCarrito.innerHTML = "";
        let total = 0;

        carrito.forEach(item => {
            const subtotal = item.precio * item.cantidad;
            total += subtotal;

            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${item.nombre}</td>
                <td>S/. ${item.precio.toFixed(2)}</td>
                <td>${item.cantidad}</td>
                <td>S/. ${subtotal.toFixed(2)}</td>
                <td><button class="btn-eliminar" data-id="${item.id}">X</button></td>
            `;
            listaCarrito.appendChild(fila);
        });

        // Actualizar el total en la UI
        totalCompra.textContent = total.toFixed(2);
    }

    // 4. Asignación de Eventos
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarProducto);
    });

    // Delegación de eventos para los botones de eliminar individuales
    listaCarrito.addEventListener("click", function (e) {
        if (e.target.classList.contains("btn-eliminar")) {
            const id = e.target.getAttribute("data-id");
            eliminarProducto(id);
        }
    });

    btnVaciar.addEventListener("click", vaciarCarrito);

    // Renderizado inicial al cargar la página
    renderizarCarrito();
});