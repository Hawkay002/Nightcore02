const CACHE_NAME = 'nightcore-dream-v1';

const urlsToCache = [
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'Dp/+91 87778 45713 20241201_101310.jpg',

  'Game ss/Pokémon Unite/2025-07-14_29730202.jpg',
  'Game ss/Pokémon Unite/2025-07-18_4693071.jpg',
  'Game ss/Pokémon Unite/2025-03-08_17477891.jpg',
  'Game ss/Pokémon Unite/2025-03-12_12707321.jpg',
  'Game ss/Pokémon Unite/2025-03-12_35904791.jpg',

  'Game ss/Brawl Stars/Screenshot_20250719_150518_Brawl Stars.jpg',
  'Game ss/Brawl Stars/ns1.jpg',
  'Game ss/Brawl Stars/ns2.jpg',
  'Game ss/Brawl Stars/ns3.jpg',
  'Game ss/Brawl Stars/ns4.jpg',

  'Game ss/Pokémon TCG Pocket/Screenshot_20250719_151215_Pokmon TCGP.jpg',
  'Game ss/Pokémon TCG Pocket/Screenshot_20250524_142955_Pokmon TCGP.jpg',
  'Game ss/Pokémon TCG Pocket/Screenshot_20250524_143334_Pokmon TCGP.jpg',
  'Game ss/Pokémon TCG Pocket/Screenshot_20250417_172527_Pokmon TCGP.jpg',
  'Game ss/Pokémon TCG Pocket/Screenshot_20250417_172609_Pokmon TCGP.jpg',

  'Game ss/Clash of Clans/Picsart_25-05-07_21-23-53-179.png',
  'Game ss/Clash of Clans/sk1.jpg',
  'Game ss/Clash of Clans/sk2.jpg',
  'Game ss/Clash of Clans/sk3.jpg',
  'Game ss/Clash of Clans/sk4.jpg',

  'Game ss/Clash Royale/Picsart_25-05-07_01-29-52-431.png',
  'Game ss/Clash Royale/Screenshot_20250507_005841_Clash Royale.jpg',
  'Game ss/Clash Royale/Screenshot_20250507_005519_Clash Royale.jpg',
  'Game ss/Clash Royale/Screenshot_20250507_005203_Clash Royale.jpg',
  'Game ss/Clash Royale/Screenshot_20250507_011157_Clash Royale.jpg'
];

// Install Service Worker and cache files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[ServiceWorker] Caching app shell and content');
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Activate and clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Serve cached content when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
