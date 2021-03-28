const cacheName = 'v1';

const resourcesToPrecache = [
'/lavajato/',
'/lavajato/index.html',
'/lavajato/css/styles.css',
'/lavajato/carplates.html',
'/lavajato/contacts.html',
'/lavajato/dashboard.html',
'/lavajato/list.html',
'/lavajato/js/functions.js',
'/lavajato/js/chart.js',
'/lavajato/js/main.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => (cache.addAll(resourcesToPrecache)))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(cacheResponse => (cacheResponse || fetch(event.request))),
  );
});

