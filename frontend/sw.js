/* eslint-disable no-restricted-globals */
const CACHE_VERSION = 'v1.0.0';
const STATIC_CACHE  = `static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `dynamic-${CACHE_VERSION}`;
const MAX_DYNAMIC_ITEMS = 60;

/* ---------- 1. Lista plików do wstępnego zbuforowania ---------- */
const PRECACHE_ASSETS = [
  '/',                   // index.html
  '/index.html',
  '/app.js',
  '/style.css',
  '/manifest.webmanifest',
  '/icons/icon-192.png', // przykładowe ikony w manifest.json
  '/icons/icon-512.png',
  // Bootstrap CSS & JS z CDN – zamiast precache, pobierzemy “on-install”
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
];

/* ---------- 2. Instalacja: precache ---------- */
self.addEventListener('install', event => {
  self.skipWaiting(); // Od razu aktywuj nową wersję
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => cache.addAll(PRECACHE_ASSETS))
  );
});

/* ---------- 3. Aktywacja: czyszczenie starych cache’ów ---------- */
self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter(k => ![STATIC_CACHE, DYNAMIC_CACHE].includes(k))
          .map(k => caches.delete(k))
      );
      // Powiadom otwarte karty, że SW zaktualizowano
      const clients = await self.clients.matchAll();
      clients.forEach(c => c.postMessage({ type: 'sw-updated' }));
    })()
  );
});

/* ---------- 4. Strategie ———— obsługa fetch ---------- */
self.addEventListener('fetch', event => {
  const { request } = event;

  // 4a. API – Stale-While-Revalidate
  if (request.url.includes('/api/')) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  // 4b. Zasoby statyczne + HTML – Cache-First z fallbackiem offline
  if (request.method === 'GET' && (request.headers.get('accept')?.includes('text/html') ||
                                   PRECACHE_ASSETS.some(a => request.url.endsWith(a)))) {
    event.respondWith(
      caches.match(request).then(
        resp => resp || fetch(request).catch(() => caches.match('/offline.html'))
      )
    );
    return;
  }

  // 4c. Obrazy / inne zasoby – Cache-First + limit wielkości
  if (request.destination === 'image' || request.destination === 'style' ||
      request.destination === 'script' || request.destination === 'font') {
    event.respondWith(cacheFirstLimit(request));
  }
});

/* ---------- 5. Implementacje strategii ---------- */
async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cached = await cache.match(request);

  const networkFetch = fetch(request)
    .then(async res => {
      if (res.ok) {
        await cache.put(request, res.clone());
        trimCache(cache); // kontrola wielkości
      }
      return res.clone();
    })
    .catch(() => cached || Response.error());

  // Jeżeli mamy wersję z cache – zwróć natychmiast
  return cached || networkFetch;
}

async function cacheFirstLimit(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
      trimCache(cache);
    }
    return response;
  } catch (e) {
    // Offline i brak w cache
    if (request.destination === 'image') return offlineSvg();
    throw e;
  }
}

/* ---------- 6. Helpers ---------- */
async function trimCache(cache) {
  const keys = await cache.keys();
  if (keys.length > MAX_DYNAMIC_ITEMS) {
    await cache.delete(keys[0]); // usuń najstarszy
  }
}

function offlineSvg() {
  return new Response(
    `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
       <rect width="100%" height="100%" fill="#F8F9FA"/>
       <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
             font-family="sans-serif" font-size="24" fill="#6c757d">
             Offline
       </text>
     </svg>`,
    { headers: { 'Content-Type': 'image/svg+xml' } }
  );
}

/* ---------- 7. Push / sync (opcjonalnie) ---------- */
// self.addEventListener('push', …);
// self.addEventListener('sync', …);
