/* Adorn servis çalışanı: uygulamayı önbelleğe alır, internetsiz de açılır. */
const CACHE = 'adorn-v11';
const FILES = ['./', 'index.html', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png', 'icons/apple-touch-icon.png', 'icons/favicon-64.png'];

self.addEventListener('install', (e) => {
  // Tarayıcının HTTP önbelleğini atla: kurulumda her zaman güncel dosyaları al
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(FILES.map((f) => new Request(f, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;
  // Sayfa: önce ağ ve sunucuya mutlaka sor (GitHub Pages'in 10 dakikalık önbelleğine takılma); internet yoksa önbellek
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req.url, { cache: 'no-cache', credentials: 'same-origin' })
        .then((res) => { if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put('index.html', copy)); } return res; })
        .catch(() => caches.match('index.html'))
    );
    return;
  }
  // Diğer dosyalar: önbellekten ver, arkada sunucuya sorarak güncelle
  e.respondWith(caches.match(req).then((hit) => {
    const net = fetch(req, { cache: 'no-cache' }).then((res) => { if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); } return res; }).catch(() => hit);
    return hit || net;
  }));
});
