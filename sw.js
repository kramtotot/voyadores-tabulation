/* Voyadores Festival Tabulation: lets the app open with no signal.
   Scores are stored by Firebase itself; this only keeps the app files. */
const CACHE='voyadores-v1';
const SHELL=['./','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
const HOSTS=['www.gstatic.com','cdnjs.cloudflare.com','fonts.googleapis.com','fonts.gstatic.com'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const u=new URL(r.url);
  const own=u.origin===self.location.origin,ext=HOSTS.includes(u.hostname);
  if(!own&&!ext)return;   /* Firestore and sign-in calls are never touched */
  /* show the saved copy at once, refresh it in the background */
  e.respondWith(caches.open(CACHE).then(async c=>{
    const hit=await c.match(r,{ignoreSearch:r.mode==='navigate'});
    const net=fetch(r).then(res=>{if(res&&(res.ok||res.type==='opaque'))c.put(r,res.clone());return res}).catch(()=>null);
    if(hit){e.waitUntil(net);return hit}
    const res=await net;
    return res||(r.mode==='navigate'?c.match('./'):Response.error())}));
});
