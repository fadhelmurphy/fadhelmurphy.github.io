// Boot screen: the hero's silk ribbon is woven left→right and doubles as the progress bar.
// Cyberpunk-2077-style decode text stays small; exit dissolves into the hero.
import experience from './experience.json'
import meta from './sync-meta.json'

const roles = experience.reduce((n, c) => n + c.roles.length, 0)
const lines = [
  'ESTABLISHING UPLINK',
  `SYNCING LINKEDIN FEED // ${roles} RECORDS`,
  'COMPILING DAG: WORK_HISTORY',
  'WEAVING SILK SHADER',
  'RENDERING INTERFACE'
]

export const bootHtml = `
<style>
#boot{position:fixed;inset:0;z-index:9999;background:#fff;color:#2e3e6a;font-family:Poppins,system-ui,sans-serif;overflow:hidden}
html.booted #boot{display:none}
#boot canvas{position:absolute;inset:0;width:100%;height:100%}
#boot #boot-glow{filter:blur(18px);opacity:.75}
#boot .mono{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.06em}
#boot .top{position:absolute;left:0;right:0;top:0;display:flex;justify-content:space-between;align-items:center;padding:clamp(20px,3.5vw,44px);font-size:11px;color:#94a3b8}
#boot .chip{display:inline-flex;align-items:center;gap:10px;font-family:Poppins,system-ui,sans-serif;letter-spacing:0;font-weight:600;font-size:15px;color:#2e3e6a}
#boot .chip i{width:8px;height:8px;border-radius:50%;background:#10b981;animation:bp 1.2s ease-in-out infinite}
@keyframes bp{50%{box-shadow:0 0 0 6px rgba(16,185,129,.18)}}
#boot .hud{position:absolute;left:0;right:0;top:0;transform:translateY(72vh);will-change:transform;padding:0 20px;display:flex;flex-direction:column;align-items:center;gap:10px;text-align:center}
#boot .status{display:flex;align-items:center;justify-content:center;gap:8px;font-size:12px;color:#475569;white-space:nowrap;overflow:hidden;max-width:100%}
#boot .status b{color:#10b981;font-weight:600}
#boot .caret{display:inline-block;width:.55em;height:1.05em;background:#2563eb;animation:bc .9s steps(1) infinite;flex:none}
@keyframes bc{50%{opacity:0}}
#boot .pct{font-size:13px;letter-spacing:.12em;color:#2e3e6a;font-weight:600;font-variant-numeric:tabular-nums;flex:none}
#boot .pct.glitch{text-shadow:2px 0 rgba(16,185,129,.8),-2px 0 rgba(37,99,235,.8)}
#boot.out{transition:opacity .7s ease,filter .7s ease,transform .7s cubic-bezier(.32,.72,0,1);opacity:0;filter:blur(12px);transform:scale(1.04)}
@media (max-width:520px){#boot .status{font-size:11px}}
@media (prefers-reduced-motion:reduce){#boot{display:none}}
</style>
<div id="boot" role="status" aria-live="polite" aria-label="Loading">
  <canvas id="boot-glow"></canvas><canvas id="boot-c"></canvas>
  <div class="top mono"><span class="chip"><i></i>Fadhel</span><span>SYNC ${meta.source.toUpperCase()} · ${meta.syncedAt.slice(0, 10)}</span></div>
  <div class="hud mono" id="boot-hud"><span class="pct" id="boot-pct">000%</span><div class="status"><span>&gt;</span><span id="boot-status"></span><span class="caret"></span></div></div>
</div>
<script>
(function(){
  var root=document.getElementById('boot'); var seen=false;
  try{seen=!!sessionStorage.getItem('booted')}catch(e){}
  if(!root||seen||matchMedia('(prefers-reduced-motion: reduce)').matches){root&&root.remove();window.__booted=true;return}
  document.documentElement.style.overflow='hidden';
  var fin=false;function finish(){if(fin)return;fin=true;root.remove();document.documentElement.style.overflow='';window.__booted=true;document.dispatchEvent(new Event('boot:done'))}
  setTimeout(function(){root.classList.add('out');setTimeout(finish,750)},6000);

  // ── silk ribbon: drawn in a worker (OffscreenCanvas) so the loader never blocks the main thread ──
  function R(c,g){
    var x=c.getContext('2d'),gx=g.getContext('2d'),W=1,H=1,N=40,shown=0,prog=0,t0=-1,last=0;
    function frame(now){
      if(t0<0){t0=now;last=now}
      var t=(now-t0)/1000,vert=W<640;
      var dt=Math.min(.1,(now-last)/1000);last=now;shown+=(prog-shown)*(1-Math.exp(-dt*9));
      x.clearRect(0,0,W,H);
      // horizontal on desktop, vertical (top→bottom) on mobile; s = position along the ribbon
      var Y0=vert?64:0,L=vert?H*.8-Y0:W,c0=vert?W*.5:H*.44,amp=vert?W*.15:H*.13,band=vert?W*.36:Math.min(H*.42,W*.26),
          f1=vert?4.4:5.2,f2=vert?1.7:2.1,f3=vert?4.2:5.2,head=shown*(L+80)-40;
      var gr=vert?x.createLinearGradient(0,Y0,0,Y0+L):x.createLinearGradient(0,0,W,0);
      gr.addColorStop(0,'#2563eb');gr.addColorStop(.35,'#0ea5e9');gr.addColorStop(.6,'#22d3ee');gr.addColorStop(.8,'#14b8a6');gr.addColorStop(1,'#10b981');
      x.strokeStyle=gr;x.lineCap='round';
      for(var i=0;i<N;i++){
        var k=i/(N-1)-.5;x.beginPath();
        for(var sp=-20;sp<=head;sp+=6){
          var u=sp/L,env=.6+.4*Math.pow(Math.sin(Math.PI*Math.min(1,Math.max(0,(sp+20)/(L+40)))),.7);
          var tq=Math.min(1,Math.max(0,(head-sp)/(L*.3))),tip=tq*tq*(3-2*tq),taper=env*(.75+.25*tip);
          var twist=.8+.2*Math.sin(u*f3-t*1.1+1.3);
          var o=c0+Math.sin(u*f1+t*1.4)*amp+Math.sin(u*f2-t*.7)*amp*.6+k*band*taper*twist;
          var px=vert?o:sp,py=vert?Y0+sp:o;
          sp===-20?x.moveTo(px,py):x.lineTo(px,py)}
        x.globalAlpha=.22+.5*(1-Math.abs(k)*2);x.lineWidth=vert?1.2:1.4;x.stroke()}
      x.globalAlpha=1;
      // soft, feathered tip instead of a hard cut
      var fd=vert?140:240,eg=vert?x.createLinearGradient(0,Y0+head-fd,0,Y0+head+2):x.createLinearGradient(head-fd,0,head+2,0);
      eg.addColorStop(0,'rgba(0,0,0,0)');eg.addColorStop(1,'rgba(0,0,0,1)');
      x.globalCompositeOperation='destination-out';x.fillStyle=eg;
      vert?x.fillRect(0,Y0+head-fd,W,fd+H):x.fillRect(head-fd,0,fd+W,H);if(vert){var sg=x.createLinearGradient(0,Y0-20,0,Y0+90);sg.addColorStop(0,'rgba(0,0,0,1)');sg.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=sg;x.fillRect(0,0,W,Y0+90)}
      x.globalCompositeOperation='source-over';
      gx.setTransform(1,0,0,1,0,0);gx.clearRect(0,0,g.width,g.height);gx.drawImage(c,0,0)}
    return {rs:function(w,h,d){W=w;H=h;c.width=g.width=Math.round(w*d);c.height=g.height=Math.round(h*d);x.setTransform(d,0,0,d,0,0)},set:function(p){prog=p},frame:frame}
  }
  var c=document.getElementById('boot-c'),g=document.getElementById('boot-glow'),hud=document.getElementById('boot-hud');
  var dpr=Math.min(devicePixelRatio||1,2),prog=0,t0=performance.now(),send;
  function place(){var W=innerWidth,H=innerHeight,vert=W<640,Y0=vert?64:0,L=vert?H*.8-Y0:W,c0=vert?W*.5:H*.44,amp=vert?W*.15:H*.13,band=vert?W*.36:Math.min(H*.42,W*.26);
    hud.style.transform='translateY('+(vert?Math.min(H-80,Y0+L+18):Math.min(H-90,c0+amp*1.25+band*.5+28))+'px)'}
  place();
  try{
    if(!c.transferControlToOffscreen||!window.Worker)throw 0;
    var wsrc=R.toString()+';var r,on=1,raf=self.requestAnimationFrame?function(f){self.requestAnimationFrame(f)}:function(f){setTimeout(function(){f(performance.now())},16)};'+
      'function loop(n){if(!on)return;r.frame(n);raf(loop)}'+
      'onmessage=function(e){var m=e.data;if(m.init){r=R(m.c,m.g);r.rs(m.w,m.h,m.d);raf(loop)}else if(m.rs)r.rs(m.w,m.h,m.d);else if(m.stop)on=0;else r.set(m.p)}';
    var url=URL.createObjectURL(new Blob([wsrc],{type:'text/javascript'})),wk=new Worker(url);
    var oc=c.transferControlToOffscreen(),og=g.transferControlToOffscreen();
    wk.postMessage({init:1,c:oc,g:og,w:innerWidth,h:innerHeight,d:dpr},[oc,og]);
    send=function(m){wk.postMessage(m)};
    document.addEventListener('boot:done',function(){wk.terminate();URL.revokeObjectURL(url)},{once:true});
  }catch(e){
    // fallback: same drawing on the main thread
    var rr=R(c,g);rr.rs(innerWidth,innerHeight,dpr);
    (function lp(n){if(fin)return;rr.frame(n);requestAnimationFrame(lp)})(t0);
    send=function(m){if(m.rs)rr.rs(m.w,m.h,m.d);else if(!m.stop)rr.set(m.p)};
  }
  addEventListener('resize',function(){place();send({rs:1,w:innerWidth,h:innerHeight,d:dpr})});
  var sentP=-1;function setProg(p){if(p!==sentP){sentP=p;send({p:p})}}

  // ── cyberpunk text ──
  var G='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&@<>/|=+*';
  function decode(el,text,dur){return new Promise(function(done){var s=performance.now();(function tick(now){
    var p=Math.min(1,(now-s)/dur),n=Math.floor(text.length*p),out=text.slice(0,n);
    for(var i=n;i<text.length;i++)out+=text[i]===' '?' ':G[(Math.random()*G.length)|0];
    el.textContent=out;p<1?requestAnimationFrame(tick):done()})(s)})}
  var lines=${JSON.stringify(lines)},st=document.getElementById('boot-status'),pct=document.getElementById('boot-pct');
  var TOTAL=2200,done=false;
  (function pc(now){var p=Math.min(1,(now-t0)/TOTAL);prog=done?1:Math.min(.96,1-Math.pow(1-p,2.2));setProg(prog);
    var v=String(Math.round(prog*100)).padStart(3,'0');
    if(!done&&Math.random()<.12){pct.classList.add('glitch');v=v.slice(0,2)+((Math.random()*10)|0)}else pct.classList.remove('glitch');
    pct.textContent=v+'%';if(!fin)requestAnimationFrame(pc)})(t0);
  (async function(){
    for(var i=0;i<lines.length;i++){st.innerHTML='<span></span> <b></b>';await decode(st.children[0],lines[i],260);st.children[1].textContent='[OK]';await new Promise(function(r){setTimeout(r,150)})}
    var left=TOTAL-(performance.now()-t0);if(left>0)await new Promise(function(r){setTimeout(r,left)});
    done=true;st.innerHTML='<span></span> <b></b>';await decode(st.children[0],'SYSTEM ONLINE',260);st.children[1].textContent='[READY]';
    await new Promise(function(r){setTimeout(r,450)});
    try{sessionStorage.setItem('booted','1')}catch(e){}
    root.classList.add('out');setTimeout(finish,720);
  })()
})()
</script>`
