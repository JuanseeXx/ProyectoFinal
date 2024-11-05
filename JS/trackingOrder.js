const statuses = [
    { range: [1, 250000], status: "En preparación", class: "pending" },
    { range: [250001, 500000], status: "En camino", class: "pending" },
    { range: [500001, 750000], status: "Entregado", class: "completed" },
    { range: [750001, 999999], status: "Cancelado", class: "canceled" },
];

const orderNumberInput = document.getElementById('orderNumber');
const trackButton = document.getElementById('trackButton');

// Activa o desactiva el botón en función del campo de entrada
orderNumberInput.addEventListener('input', () => {
    trackButton.disabled = orderNumberInput.value.trim() === '';
});

function trackOrder() {
    const orderNumber = parseInt(orderNumberInput.value);
    const statusMessage = document.getElementById('statusMessage');
    const reviewSection = document.querySelector('.review-section');

    const orderStatus = statuses.find(order => order.range[0] <= orderNumber && order.range[1] >= orderNumber);

    if (orderStatus) {
        statusMessage.style.display = 'block';
        statusMessage.textContent = `Estado del pedido ${orderNumber}: ${orderStatus.status}`;
        statusMessage.className = `status ${orderStatus.class}`;
        reviewSection.style.display = 'block';
    } else {
        statusMessage.style.display = 'block';
        statusMessage.textContent = `Número de pedido ${orderNumber} no encontrado.`;
        statusMessage.className = `status`;
        reviewSection.style.display = 'none';
    }
}

function submitReview() {
    const rating = document.getElementById('rating').value;
    const review = document.getElementById('review').value;
    const reviewMessage = document.getElementById('reviewMessage');

    if (rating && review) {
        reviewMessage.style.display = 'block';
        reviewMessage.textContent = "Gracias por tu reseña!";
        document.getElementById('reviewForm').reset(); // Resetea el formulario
        orderNumberInput.value = ''; // Limpia el número de pedido
        trackButton.disabled = true; // Deshabilita el botón nuevamente

        // Recargar la página después de 5 segundos
        setTimeout(() => {
            location.reload();
        }, 5000);
    } else {
        reviewMessage.style.display = 'block';
        reviewMessage.textContent = 'Por favor, completa todos los campos.';
    }
}