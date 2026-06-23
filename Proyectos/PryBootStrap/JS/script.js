document.addEventListener("DOMContentLoaded", function () {
    
    // 1. Manejo del Formulario de Suscripción
    const formSuscripcion = document.getElementById("form-suscripcion");
    if (formSuscripcion) {
        formSuscripcion.addEventListener("submit", function (e) {
            e.preventDefault();
            const email = document.getElementById("email-input").value;
            
            // Simulación de guardado o feedback
            alert(`¡Gracias por suscribirte! Se ha enviado un cupón de descuento a: ${email}`);
            formSuscripcion.reset();
        });
    }

    // 2. Eventos en los Botones "Comprar"
    const contenedorProductos = document.getElementById("contenedor-productos");
    if (contenedorProductos) {
        contenedorProductos.addEventListener("click", function (e) {
            // Validamos que el click venga de un botón comprar
            if (e.target.closest(".btn-comprar")) {
                const tarjeta = e.target.closest(".card");
                const nombreProducto = tarjeta.querySelector(".card-title").textContent;
                
                // Muestra de alerta interactiva
                alert(`¡${nombreProducto} se ha agregado con éxito a tu carrito de compras!`);
            }
        });
    }
});