const V="planim-v1",PAGE="./index.html";
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll([PAGE])).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
const r=e.request;if(r.method!=="GET")return;
const u=new URL(r.url);
if(r.mode==="navigate"){
e.respondWith(fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(V).then(c=>c.put(PAGE,cp))}return res}).catch(()=>caches.match(PAGE)));
return}
if(u.origin===location.origin||/(^|\.)(googleapis|gstatic)\.com$/.test(u.hostname)){
e.respondWith(caches.match(r).then(h=>h||fetch(r).then(res=>{if(res.ok||res.type==="opaque"){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res})))}
});
