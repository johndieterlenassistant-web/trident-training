const PREFIX='trident-'+new URL(self.registration.scope).pathname+'-';
const CACHE=PREFIX+"4cfef9974fee6670";
self.addEventListener('install',e=>e.waitUntil((async()=>{
const old=await caches.keys();
const cache=await caches.open(CACHE);await cache.addAll(['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png']);
// Repair only the original manifest-blocked shell. Normal healthy updates still wait.
for(const key of old){if(!key.startsWith(PREFIX)||key===CACHE)continue;const previous=await caches.open(key);const page=await previous.match('./index.html');if(page&&!(await page.text()).includes("manifest-src 'self'")){await self.skipWaiting();break;}}
})()));
self.addEventListener('message',e=>{if(e.data?.type==='ACTIVATE_UPDATE')self.skipWaiting();});
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const k of await caches.keys())if(k.startsWith(PREFIX)&&k!==CACHE)await caches.delete(k);await self.clients.claim();})()));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin||!u.href.startsWith(self.registration.scope))return;
e.respondWith((async()=>{const c=await caches.open(CACHE);if(e.request.mode==='navigate')return (await c.match('./index.html'))||fetch(e.request);return (await c.match(e.request))||fetch(e.request);})());});
