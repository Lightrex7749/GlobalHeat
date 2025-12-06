// Service Worker for GlobalHeat PWA
const CACHE_NAME = 'globalheat-v1';
const urlsToCache = [
  '/GlobalHeat/',
  '/GlobalHeat/index.html',
  '/GlobalHeat/styles.css',
  '/GlobalHeat/main.js',
  '/GlobalHeat/script.js',
  '/GlobalHeat/scripts.js',
  '/GlobalHeat/data-features.js',
  '/GlobalHeat/assect/images/planet-earth.png',
  '/GlobalHeat/assect/images/earth-warming.jpg',
  '/GlobalHeat/assect/images/navbar2.jpg'
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.log('Cache failed:', err))
  );
  self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then(response => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            // Clone and cache the response
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            return response;
          });
      })
      .catch(() => {
        // Offline fallback
        if (event.request.destination === 'document') {
          return caches.match('/GlobalHeat/index.html');
        }
      })
  );
});
