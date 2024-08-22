const CACHE_NAME = 'site-cache-v1';
const ASSETS_TO_CACHE = [
    '/support-ukraine/',
    '/support-ukraine/index.html',
    '/support-ukraine/styles/styles.css',
    '/support-ukraine/support ukaraineimage.jpg',
    '/support-ukraine/682740ebd1a43246034be6d4e2d061f0.ico.zip',
    '/support-ukraine/scripts/scripts.js',  // If you have any JavaScript files
    // Add other assets or paths that you want to cache
];

// Install event - caching assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Caching assets');
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

// Fetch event - serving cached assets
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return the cached response if found, otherwise fetch from network
                return response || fetch(event.request);
            })
    );
});

// Activate event - cleaning up old caches
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        // Delete old caches
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
