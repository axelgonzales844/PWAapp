// js/app.js

console.log('App Shell de DevConnect inicializado correctamente.');

// Registro del Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registro => {
                console.log('¡Éxito! Service Worker registrado correctamente.', registro);
            })
            .catch(error => {
                console.warn('Error al registrar el Service Worker:', error);
            });
    });
}

// Datos para el renderizado dinámico (CSR)
const publicacionesDinamicas = [
    {
        autor: "María López",
        tiempo: "Hace 10 minutos",
        contenido: "¡Hola a todos! Acabo de configurar mi PWA y funciona increíble sin conexión. 📱✨"
    },
    {
        autor: "Carlos Pérez",
        tiempo: "Hace 45 minutos",
        contenido: "Compartiendo mi nuevo componente en Tailwind CSS. ¡El diseño responsivo va excelente! 💻"
    },
    {
        autor: "Ana Gómez",
        tiempo: "Hace 2 horas",
        contenido: "Recordatorio: Mañana revisamos la implementación de Service Workers en clase. ¡No falten! 🚀"
    }
];

function renderizarPublicaciones() {
    const feedContainer = document.getElementById('feed');
    if (!feedContainer) return;

    // Limpiamos o agregamos las tarjetas dinámicas
    publicacionesDinamicas.forEach(pub => {
        const initial = pub.autor.charAt(0);
        const article = document.createElement('article');
        article.className = 'bg-white p-4 rounded-lg shadow mb-4';
        
        article.innerHTML = `
            <div class="flex items-center mb-3">
                <div class="w-10 h-10 rounded-full bg-blue-300 flex items-center justify-center text-white font-bold mr-3">
                    ${initial}
                </div>
                <div>
                    <h2 class="font-bold text-gray-800">${pub.autor}</h2>
                    <p class="text-xs text-gray-500">${pub.tiempo}</p>
                </div>
            </div>
            <p class="text-gray-700">${pub.contenido}</p>
        `;
        feedContainer.appendChild(article);
    });
}

// Ejecutamos al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    renderizarPublicaciones();
});