// S define un array de objetos con los rangos de números de pedido y su estado correspondiente
const statuses = [
    { range: [1, 250000], status: "En preparación", class: "pending" }, // Estado "En preparación" para pedidos entre 1 y 250000
    { range: [250001, 500000], status: "En camino", class: "pending" },  // Estado "En camino" para pedidos entre 250001 y 500000
    { range: [500001, 750000], status: "Entregado", class: "completed" }, // Estado "Entregado" para pedidos entre 500001 y 750000
    { range: [750001, 999999], status: "Cancelado", class: "canceled" }  // Estado "Cancelado" para pedidos entre 750001 y 999999
];

// Obtiene referencias a los elementos del DOM
const orderNumberInput = document.getElementById('orderNumber'); // Campo de entrada para el número de pedido
const trackButton = document.getElementById('trackButton'); // Botón para hacer el seguimiento del pedido

// Activa o desactiva el botón de seguimiento según si el campo de número de pedido está vacío o no
orderNumberInput.addEventListener('input', () => {
    trackButton.disabled = orderNumberInput.value.trim() === ''; // Si el campo está vacío, deshabilita el botón
});

// Función para realizar el seguimiento de un pedido
function trackOrder() {
    const orderNumber = parseInt(orderNumberInput.value); // Obtiene el número de pedido como número entero
    const statusMessage = document.getElementById('statusMessage'); // Elemento donde se mostrará el estado del pedido
    const reviewSection = document.querySelector('.review-section'); // Sección de la reseña que aparece si el pedido es encontrado

    // Busca el estado del pedido en el array 'statuses' utilizando el rango correspondiente
    const orderStatus = statuses.find(order => order.range[0] <= orderNumber && order.range[1] >= orderNumber);

    // Si el pedido se encuentra en el rango de los estados definidos, mostrar el estado del pedido
    if (orderStatus) {
        statusMessage.style.display = 'block'; // Hace visible el mensaje de estado
        statusMessage.textContent = `Estado del pedido ${orderNumber}: ${orderStatus.status}`; // Muestra el estado del pedido
        statusMessage.className = `status ${orderStatus.class}`; // Agrega la clase correspondiente al estado (para estilizarlo)
        reviewSection.style.display = 'block'; // Hace visible la sección de reseñas
    } else {
        // Si no se encuentra el pedido, muestra mensaje de error
        statusMessage.style.display = 'block'; // Hace visible el mensaje de estado
        statusMessage.textContent = `Número de pedido ${orderNumber} no encontrado.`; // Mensaje de error
        statusMessage.className = `status`; // Quita las clases de estado (para no mostrar colores específicos)
        reviewSection.style.display = 'none'; // Oculta la sección de reseñas si no se encuentra el pedido
    }
}

// Función para enviar una reseña después de verificar el estado del pedido
function submitReview() {
    const rating = document.getElementById('rating').value; // Obtiene la calificación ingresada
    const review = document.getElementById('review').value;   // Obtiene la reseña escrita
    const reviewMessage = document.getElementById('reviewMessage'); // Elemento para mostrar el mensaje de confirmación o error

    // Verifica que tanto la calificación como la reseña estén completas
    if (rating && review) {
        reviewMessage.style.display = 'block'; // Muestra el mensaje de agradecimiento
        reviewMessage.textContent = "Gracias por tu reseña!"; // Mensaje de agradecimiento
        document.getElementById('reviewForm').reset(); // Limpia el formulario de reseña
        orderNumberInput.value = ''; // Limpia el campo de número de pedido
        trackButton.disabled = true; // Deshabilita el botón de seguimiento

        // Recargar la página después de 4 segundos para permitir al usuario ver el mensaje de confirmación
        setTimeout(() => {
            location.reload(); // Recarga la página
        }, 4000);
    } else {
        // Si no se completan todos los campos, mostrar un mensaje de error
        reviewMessage.style.display = 'block'; // Muestra el mensaje de error
        reviewMessage.textContent = 'Por favor, completa todos los campos.'; // Mensaje de error
    }
}
