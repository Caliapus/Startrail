const CACHE_NAME = 'journal-cache-v1';

const staticAssets = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './service-worker.js',
  './icon.png',
  './icon-512.png',
  './cities/city.js',
  './cities/cities5000.csv'
];

// Install: Cache all required assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(staticAssets);
    })
  );
});

// Activate: Cleanup old caches (optional but good practice)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
});

// Fetch: Serve from cache if available, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
