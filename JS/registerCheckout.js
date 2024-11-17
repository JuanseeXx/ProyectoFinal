document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que el formulario se envíe de la forma predeterminada

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Valida y registra el administrador
    if (validateEmail(email) && validatePassword(password)) {
        //SE ENVÍAN LOS DATOS AL SERVIDOR (PRÓXIMO SEMESTRE)
        document.getElementById('message').textContent = "Registro exitoso. Se ha enviado un correo de confirmación.";
        document.getElementById('message').style.color = 'green'; // Cambia el color a verde

        // Recargar la página después de un breve retraso para permitir al usuario leer el mensaje
        setTimeout(() => {
            window.location.reload(); // Recargar la página para limpiar los inputs
        }, 4000); // Retraso de 4 segundos (4000 ms)
    } else {
        document.getElementById('message').textContent = "Error en los datos proporcionados. (La contraseña debe tener mínimo 8 dígitos, al menos una letra mayúscula, una minúscula y un número)";
    }
});

function validateEmail(email) {
    // LÓGICA PARA VALIDAR SI EL CORREO ELECTRONICO YA ESTÁ REGISTRADO (PRÓXIMO SEMESTRE)
    return true; // Cambiar según lógica
}

function validatePassword(password) {
    return password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password);
}

function verificarCodigos() {
    // Obtiene los valores ingresados en los campos de código
    const adminCode = document.getElementById("adminCode").value;
    const deliveryCode = document.getElementById("deliveryCode").value;
    const feedbackMessage = document.getElementById("feedbackMessage");
    const adminOption = document.getElementById("admin-option");
    const deliveryOption = document.getElementById("repartidor-option");
    const roleSelect = document.getElementById("role");

    // Limpiar el mensaje de feedback antes de mostrar uno nuevo
    feedbackMessage.innerHTML = "";

    // Verifica el código de Administrador
    if (adminCode === "ADMIN1234") { // Valida si el código de administrador es correcto
        adminOption.style.display = "block"; // Muestra la opción de Administrador si el código es correcto
        feedbackMessage.innerHTML = "Rol de Administrador desbloqueado.<br>"; // Muestra mensaje de éxito
        feedbackMessage.style.color = "green"; // Cambiar color a verde para el código correcto
    } else if (adminCode) { // Si el código no es correcto pero se ingresó un valor
        feedbackMessage.innerHTML = "Código de Administrador incorrecto.<br>"; // Muestra mensaje de error
        feedbackMessage.style.color = "red"; // Cambiar color a rojo para el código incorrecto
    }

    // Verifica el código de Repartidor
    if (deliveryCode === "DELIVERY5678") { // Valida si el código de repartidor es correcto
        deliveryOption.style.display = "block"; // Mostrar la opción de Repartidor si el código es correcto
        feedbackMessage.innerHTML = "Rol de Repartidor desbloqueado.<br>"; // Muestra mensaje de éxito
        feedbackMessage.style.color = "green"; // Cambiar color a verde para el código correcto
    } else if (deliveryCode) { // Si el código no es correcto pero se ingresó un valor
        feedbackMessage.innerHTML = "Código de Repartidor incorrecto.<br>"; // Muestra mensaje de error
        feedbackMessage.style.color = "red"; // Cambiar color a rojo para el código incorrecto
    }

    // Habilita el select de rol solo si hay feedback (sin importar si es correcto o incorrecto)
    if (feedbackMessage.innerHTML) {
        roleSelect.disabled = false; // Habilitar el select de rol
    }
}


