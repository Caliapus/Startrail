const CACHE_NAME = 'journal-cache-v2';

const staticAssets = [
  './',
  './index.html',
  './manifest.json',
  './service-worker.js',
  './styles/style.css',
  './scripts/main.js',
  './scripts/city.js',
  './data/cities5000.csv',
  './assets/icons/favicon-16x16.png',
  './assets/icons/favicon-32x32.png',
  './assets/icons/icon.png',
  './assets/icons/icon-512.png'
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
