document.querySelectorAll('.state-route-btn').forEach(button => {
    button.addEventListener('click', function() {
        // Encuentra el contenedor de la ruta del estado correspondiente al botón
        const appContainer = button.closest('.app-container'); // Encuentra el contenedor de la app
        const stateRoute = appContainer.querySelector('.state-route'); // Encuentra la ruta del estado dentro del contenedor de la app
        stateRoute.classList.toggle('hidden'); // Alterna la visibilidad de la ruta del estado

        // Selecciona todos los pasos de la ruta de estado
        const stateSteps = appContainer.querySelectorAll('.state-step');
        let showNextStep = true; // Se inicia con el primer paso para mostrar

        stateSteps.forEach((step, index) => {
            const stateText = step.querySelector('.state-text');
            const loadingCircle = step.querySelector('.loading-circle');
            const errorElement = step.querySelector('.error');

            // Si el paso tiene "✅", oculta el círculo de carga y muestra el paso completado
            if (stateText.textContent.includes('✅')) {
                loadingCircle.style.display = 'none'; // Ocultamos el círculo de carga
                step.classList.add('completed'); // Añadir la clase de paso completado
                step.style.backgroundColor = 'rgba(0, 255, 0, 0.1)'; // Capa verde para el paso completado
                if (errorElement) errorElement.style.display = 'none'; // Oculta el error si existe
            } else {
                // Si el paso no está completado, mostramos el círculo de carga
                loadingCircle.style.display = 'block'; // Mostrar el círculo de carga

                // Si el paso está fallando, mostrar el "✖️"
                if (stateText.textContent.includes('✖️')) {
                    if (!errorElement) {
                        const redX = document.createElement('span'); // Creamos un nuevo elemento <span>
                        redX.textContent = '✖️'; // Texto "✖️"
                        redX.style.color = 'red'; // Establecemos el color rojo
                        step.appendChild(redX); // Añadimos el "✖️" al paso si no existe
                    }
                } else {
                    if (errorElement) errorElement.style.display = 'none'; // Eliminar el "✖️" si no hay error
                }

                // El círculo de carga del paso siguiente solo se muestra si el paso anterior está completado
                loadingCircle.style.display = showNextStep ? 'block' : 'none';
                showNextStep = false; // Aseguramos que solo el primer paso se muestre con el círculo
            }
        });
    });
});
