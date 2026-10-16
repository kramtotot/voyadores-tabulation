/* Voyadores Festival Tabulation service worker.
   Own files: network first (so a new version shows up right after you update), cache as the offline fallback.
   Fonts and libraries: cached copy first, refreshed in the background.
   Firebase / Google API calls are never touched. */
const CACHE='voyadores-v38';
const CDN=['fonts.googleapis.com','fonts.gstatic.com','www.gstatic.com','cdnjs.cloudflare.com'];
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{
  const ks=await caches.keys();await Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)));await self.clients.claim()})())});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const u=new URL(r.url);
  if(u.searchParams.has('vcheck'))return;                       // version check always goes to the network
  if(u.hostname.endsWith('googleapis.com')&&u.hostname!=='fonts.googleapis.com')return;
  if(u.hostname.endsWith('firebaseio.com')||u.hostname.includes('firestore')||u.hostname.includes('identitytoolkit')||u.hostname.includes('securetoken'))return;
  if(u.origin===location.origin){
    e.respondWith((async()=>{const c=await caches.open(CACHE);
      try{const n=await fetch(r);if(n&&n.ok)c.put(r,n.clone());return n}
      catch(err){const m=await c.match(r,{ignoreSearch:true})||(r.mode==='navigate'?await c.match('./')||await c.match('index.html'):null);if(m)return m;throw err}})());
    return}
  if(CDN.includes(u.hostname)){
    e.respondWith((async()=>{const c=await caches.open(CACHE);const m=await c.match(r);
      const f=fetch(r).then(n=>{if(n&&(n.ok||n.type==='opaque'))c.put(r,n.clone());return n}).catch(()=>m);
      return m||f})())}
});
