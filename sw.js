self.addEventListener('install', event => {
    event.waitUntil(
      caches.open('v1').then(cache => {
        return cache.addAll([
            '/support-ukraine/',  // Update this path
            '/support-ukraine/index.html',  // Update this path
            '/support-ukraine/styles/styles.css',  // Update this path
            '/support-ukraine/scripts/scripts.js',  // Update this path
            '/support/support ukraine',  // Update this path
            '/support-ukraine/682740ebd1a43246034be6d4e2d061f0.ico.zip'  // Update this path
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  });
  
