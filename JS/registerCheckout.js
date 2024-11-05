document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que el formulario se envíe de la forma predeterminada

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validar y registrar el administrador aquí
    if (validateEmail(email) && validatePassword(password)) {
        // Aquí deberías enviar los datos al servidor, omitiendo en este ejemplo
        document.getElementById('message').textContent = "Registro exitoso. Se ha enviado un correo de confirmación.";

        // Recargar la página después de un breve retraso para permitir al usuario leer el mensaje
        setTimeout(() => {
            window.location.reload(); // Recargar la página para limpiar los inputs
        }, 2000); // Retraso de 2 segundos (2000 ms)
    } else {
        document.getElementById('message').textContent = "Error en los datos proporcionados. (La contraseña debe tener mínimo 8 dígitos, al menos una letra mayúscula, una minúscula y un número)";
    }
});

function validateEmail(email) {
    // Lógica para validar si el correo electrónico ya está registrado
    return true; // Cambiar según lógica real
}

function validatePassword(password) {
    return password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password);
}

function verificarCodigos() {
    const adminCode = document.getElementById("adminCode").value;
    const deliveryCode = document.getElementById("deliveryCode").value;
    const feedbackMessage = document.getElementById("feedbackMessage");
    const adminOption = document.getElementById("admin-option");
    const deliveryOption = document.getElementById("repartidor-option");
    const roleSelect = document.getElementById("role");

    // Limpiar mensajes previos
    feedbackMessage.innerHTML = "";

    // Comprobar el código de administrador
    if (adminCode === "ADMIN1234") { // Cambia "ADMIN1234" por tu código seguro
        adminOption.style.display = "block"; // Mostrar la opción de Administrador
        feedbackMessage.innerHTML += "Rol de Administrador desbloqueado.<br>";
    } else if (adminCode) {
        feedbackMessage.innerHTML += "Código de Administrador incorrecto.<br>";
    }

    // Comprobar el código de repartidor
    if (deliveryCode === "DELIVERY5678") { // Cambia "DELIVERY5678" por tu código seguro
        deliveryOption.style.display = "block"; // Mostrar la opción de Repartidor
        feedbackMessage.innerHTML += "Rol de Repartidor desbloqueado.<br>";
    } else if (deliveryCode) {
        feedbackMessage.innerHTML += "Código de Repartidor incorrecto.<br>";
    }

    // Mostrar el feedback y habilitar la selección de rol
    if (feedbackMessage.innerHTML) {
        feedbackMessage.style.color = "green";
        roleSelect.disabled = false; // Habilitar el select de rol
    }

    // Cerrar el modal
    $('#codeModal').modal('hide');
}