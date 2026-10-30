const PREFIX='trident-'+new URL(self.registration.scope).pathname+'-';
const CACHE=PREFIX+"62a808029da3e1d9";
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png']))));
self.addEventListener('message',e=>{if(e.data?.type==='ACTIVATE_UPDATE')self.skipWaiting();});
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const k of await caches.keys())if(k.startsWith(PREFIX)&&k!==CACHE)await caches.delete(k);await self.clients.claim();})()));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin||!u.href.startsWith(self.registration.scope))return;
e.respondWith((async()=>{const c=await caches.open(CACHE);if(e.request.mode==='navigate')return (await c.match('./index.html'))||fetch(e.request);return (await c.match(e.request))||fetch(e.request);})());});
