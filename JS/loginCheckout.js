document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validamos y autenticamos el administrador
    if (authenticateUser(email, password)) {
        // Redirigir a la interfaz de administrador (próximo semestre)
        alert("Bienvenido al panel de administrador.");
    } else {
        document.getElementById('loginMessage').textContent = "Correo o contraseña incorrectos.";
    }
});

function authenticateUser(email, password) {
    // Lógica para autenticar el usuario
    return true; // Cambiamos según la lógica real
}
