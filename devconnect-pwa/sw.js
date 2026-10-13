// sw.js - Service Worker con Cache API

// 1. Definimos el nombre y la versión de la caché estática
const CACHE_NAME = 'devconnect-shell-v1';

// 2. Listamos todos los recursos estáticos esenciales que forman el App Shell
const STATIC_ASSETS = [
    './',
    './index.html',
    './css/style.css',
    './js/app.js',
    './manifest.json',
    './images/templo(192x192).png',
//    'https://cdn.tailwindcss.com',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'

];

// FASE DE INSTALACIÓN: Guardando recursos estáticos
self.addEventListener('install', event => {
    console.log('SW: Guardando recursos estáticos...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return Promise.all(
                    STATIC_ASSETS.map(url => {
                        return cache.add(url).catch(err => {
                            console.error('Fallo al cachear el recurso:', url, err);
                        });
                    })
                );
            })
            .then(() => self.skipWaiting())
    );
});

// FASE DE ACTIVACIÓN
self.addEventListener('activate', event => {
    console.log('SW: Activado y listo.');
    return self.clients.claim();
});

// FASE FETCH: Estrategia Cache First
self.addEventListener('fetch', event => {
    // Por ahora solo monitoreamos en consola
    console.log('SW pidiendo:', event.request.url);

    // Estrategia: Cache First, fallback a Network
    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                // 1. Si existe en la caché, se entrega directamente desde la caché
                if (cachedResponse) {
                    console.log('SW: Sirviendo desde Caché:', event.request.url);
                    return cachedResponse;
                }

                // 2. Si no está en caché, se pide a la red
                console.log('SW: Buscando en la red:', event.request.url);
                return fetch(event.request);
            })
            .catch(err => {
                console.error('SW: Error en fetch:', err);
            })
    );
});