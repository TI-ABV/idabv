const CACHE_NAME = "qr-scanner-cache-v1";
const FILES_TO_CACHE = [
    "/index.html",
    "/sw.js",
    "https://cdn.jsdelivr.net/npm/jsqr/dist/jsQR.js"
];

// Instala o Service Worker e armazena os arquivos no cache
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

// Ativação do Service Worker - Remove caches antigos
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

// Intercepta requisições e serve arquivos do cache quando offline
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
