import { NodeIO } from '@gltf-transform/core'
import { writeFileSync } from 'node:fs'
const N = 12000, TAU = Math.PI * 2
const R = Math.random
// ---------- shoe: area-weighted surface sampling of the glTF mesh ----------
const doc = await new NodeIO().read('shoe.glb')
const tris = []
for (const node of doc.getRoot().listNodes()) {
  const mesh = node.getMesh(); if (!mesh) continue
  const m = node.getWorldMatrix()
  for (const prim of mesh.listPrimitives()) {
    const pos = prim.getAttribute('POSITION'), idx = prim.getIndices()
    const v = (i) => { const p = pos.getElement(i, []); return [m[0]*p[0]+m[4]*p[1]+m[8]*p[2]+m[12], m[1]*p[0]+m[5]*p[1]+m[9]*p[2]+m[13], m[2]*p[0]+m[6]*p[1]+m[10]*p[2]+m[14]] }
    const n = idx ? idx.getCount() : pos.getCount()
    for (let i = 0; i < n; i += 3) { const a = v(idx ? idx.getScalar(i) : i), b = v(idx ? idx.getScalar(i+1) : i+1), c = v(idx ? idx.getScalar(i+2) : i+2)
      const ab = [b[0]-a[0],b[1]-a[1],b[2]-a[2]], ac = [c[0]-a[0],c[1]-a[1],c[2]-a[2]]
      const cr = [ab[1]*ac[2]-ab[2]*ac[1], ab[2]*ac[0]-ab[0]*ac[2], ab[0]*ac[1]-ab[1]*ac[0]]
      tris.push([a,b,c,Math.hypot(...cr)/2]) }
  }
}
const total = tris.reduce((s,t)=>s+t[3],0); const cum=[]; let acc=0; for (const t of tris){acc+=t[3];cum.push(acc)}
const pick = () => { const r=R()*total; let lo=0,hi=cum.length-1; while(lo<hi){const mid=(lo+hi)>>1; cum[mid]<r?lo=mid+1:hi=mid} return tris[lo] }
let shoe = []
for (let i=0;i<N;i++){ const [a,b,c]=pick(); let u=R(),w=R(); if(u+w>1){u=1-u;w=1-w} shoe.push([a[0]+(b[0]-a[0])*u+(c[0]-a[0])*w, a[1]+(b[1]-a[1])*u+(c[1]-a[1])*w, a[2]+(b[2]-a[2])*u+(c[2]-a[2])*w]) }
// ---------- heart: anatomical — ventricles, atria, aortic arch with branches, pulmonary trunk, vena cava, coronaries ----------
const heart = []
const rotZ = (p, a) => [p[0]*Math.cos(a)-p[1]*Math.sin(a), p[0]*Math.sin(a)+p[1]*Math.cos(a), p[2]]
const ventricle = () => { // tilted, tapered ellipsoid shell pointing down-left to the apex
  const u=R()*2-1, a=R()*TAU, s=Math.sqrt(1-u*u); let x=s*Math.cos(a)*0.85, y=u*1.05, z=s*Math.sin(a)*0.72
  const k = y<0 ? 1+y*0.42 : 1; x*=k; z*=k; return rotZ([x, y-0.25, z], 0.42) }
const blob = (c, r) => { const u=R()*2-1, a=R()*TAU, s=Math.sqrt(1-u*u); return [c[0]+s*Math.cos(a)*r, c[1]+u*r*0.85, c[2]+s*Math.sin(a)*r] }
const tubes = []
const curve = (pts, r, w) => { for (let i=0;i<pts.length-1;i++) tubes.push([pts[i],pts[i+1],r,w*Math.hypot(pts[i+1][0]-pts[i][0],pts[i+1][1]-pts[i][1],pts[i+1][2]-pts[i][2])]) }
const arc = (c, rad, a0, a1, z, n=16) => Array.from({length:n+1},(_,i)=>{const a=a0+(a1-a0)*i/n; return [c[0]+Math.cos(a)*rad, c[1]+Math.sin(a)*rad, z]})
curve([[0.05,0.45,0],[0.08,0.95,0.02],[0.1,1.15,0]],0.2,1)                                   // ascending aorta
curve(arc([-0.2,1.15,0],0.32,0,Math.PI,-0.05),0.17,1)                                       // aortic arch
curve([[-0.52,1.15,-0.1],[-0.55,0.75,-0.25],[-0.55,0.3,-0.35]],0.15,1)                       // descending aorta
for (const x of [0.02,-0.2,-0.4]) curve([[x,1.42,-0.03],[x+0.04,1.78,-0.03]],0.065,1)        // arch branches
curve([[0.3,0.5,0.3],[0.38,0.9,0.28],[0.4,1.02,0.22]],0.16,1)                                // pulmonary trunk
curve([[0.4,1.02,0.22],[0.75,1.08,0.1]],0.11,1); curve([[0.4,1.02,0.22],[0.2,1.05,-0.25]],0.1,1) // pulmonary arteries
curve([[-0.62,0.75,0.15],[-0.64,1.2,0.12],[-0.64,1.55,0.1]],0.14,1)                          // superior vena cava
curve([[-0.7,0.2,0.05],[-0.75,-0.25,0.0]],0.12,0.7)                                          // inferior vena cava
const tTot = tubes.reduce((s,t)=>s+t[3],0)
const tube = () => { let r=R()*tTot, t=tubes[0]; for (const x of tubes){ if((r-=x[3])<=0){t=x;break} }
  const [a,b,rad]=t, k=R(), ang=R()*TAU; return [a[0]+(b[0]-a[0])*k+Math.cos(ang)*rad, a[1]+(b[1]-a[1])*k+Math.sin(ang)*rad*0.4, a[2]+(b[2]-a[2])*k+Math.sin(ang)*rad] }
const coronary = () => { // vessels running over the ventricle surface
  const line = (R()*4)|0, s = R()
  let u, a
  if (line===0) { u = 0.8-s*1.6; a = 1.25 + Math.sin(s*6)*0.12 }          // anterior descending
  else if (line===1) { u = 0.45; a = s*TAU }                               // circumflex ring
  else if (line===2) { u = 0.6-s*1.2; a = 2.6 + s*0.6 }
  else { u = 0.7-s*1.3; a = 0.2 - s*0.5 }
  const sq=Math.sqrt(1-u*u); let x=sq*Math.cos(a)*0.88, y=u*1.08, z=sq*Math.sin(a)*0.75
  const k = y<0 ? 1+y*0.42 : 1; x*=k; z*=k; return rotZ([x, y-0.25, z], 0.42) }
while (heart.length < N) { const r=R()
  heart.push(r<0.44 ? ventricle() : r<0.52 ? blob([-0.58,0.5,0.12],0.42) : r<0.6 ? blob([0.48,0.55,-0.28],0.36) : r<0.9 ? tube() : coronary()) }
// ---------- road bike: tubes, wheels with spokes, drop bars ----------
const segs = [], add = (a,b,r,w=1) => segs.push([a,b,r,w*Math.hypot(b[0]-a[0],b[1]-a[1],b[2]-a[2])])
const rear=[-1,0,0], front=[1.02,0,0], bb=[-0.3,-0.02,0], seatTop=[-0.48,0.78,0], headTop=[0.66,0.72,0], headBot=[0.72,0.5,0]
add(bb,seatTop,0.03); add(seatTop,headTop,0.028); add(bb,headBot,0.035); add(headBot,headTop,0.035)
for (const s of [-1,1]) { add([rear[0],0,s*0.06],bb,0.018); add([rear[0],0,s*0.06],[seatTop[0]+0.03,seatTop[1]-0.08,0],0.016); add([front[0],0,s*0.05],headBot,0.02) }
add(seatTop,[-0.52,0.9,0],0.02); add([-0.68,0.93,0],[-0.38,0.93,0],0.03,1.5)                       // seatpost + saddle
add(headTop,[0.6,0.84,0],0.022)                                                                     // stem
for (let k=0;k<24;k++){ const a=k/24*Math.PI, b=(k+1)/24*Math.PI                                    // drop bars
  for (const s of [-1,1]) add([0.66+Math.sin(a)*0.13,0.84-(1-Math.cos(a))*0.11,s*0.2],[0.66+Math.sin(b)*0.13,0.84-(1-Math.cos(b))*0.11,s*0.2],0.014) }
add([0.6,0.84,-0.2],[0.6,0.84,0.2],0.016)
for (let k=0;k<32;k++){ const a=k/32*TAU,b=(k+1)/32*TAU; add([bb[0]+Math.cos(a)*0.17,bb[1]+Math.sin(a)*0.17,0.07],[bb[0]+Math.cos(b)*0.17,bb[1]+Math.sin(b)*0.17,0.07],0.012) } // chainring
add([bb[0],bb[1],0.07],[bb[0]+0.12,bb[1]-0.14,0.09],0.015)
for (const c of [rear,front]) {
  for (let k=0;k<72;k++){ const a=k/72*TAU,b=(k+1)/72*TAU
    add([c[0]+Math.cos(a)*0.66,c[1]+Math.sin(a)*0.66,0],[c[0]+Math.cos(b)*0.66,c[1]+Math.sin(b)*0.66,0],0.03,1.4)   // tyre
    add([c[0]+Math.cos(a)*0.6,c[1]+Math.sin(a)*0.6,0],[c[0]+Math.cos(b)*0.6,c[1]+Math.sin(b)*0.6,0],0.02,0.8) }    // rim
  for (let k=0;k<20;k++){ const a=k/20*TAU; add([c[0],c[1],(k%2?1:-1)*0.04],[c[0]+Math.cos(a)*0.6,c[1]+Math.sin(a)*0.6,0],0.004,0.35) } }
const sTot=segs.reduce((s,x)=>s+x[3],0)
const bike=[]
for (const [a,b,r,w] of segs){ const n=Math.round(w/sTot*N); for(let i=0;i<n;i++){ const t=R(), ang=R()*TAU, rr=r*Math.sqrt(R())
  bike.push([a[0]+(b[0]-a[0])*t+Math.cos(ang)*rr, a[1]+(b[1]-a[1])*t+Math.sin(ang)*rr*0.8, a[2]+(b[2]-a[2])*t+Math.sin(ang)*rr]) } }
while (bike.length<N) bike.push(bike[(R()*bike.length)|0]); bike.length=N
// ---------- normalise each shape to fit a ~2.6 unit box, centred ----------
const norm = (pts, size) => { const mn=[1e9,1e9,1e9], mx=[-1e9,-1e9,-1e9]; for(const p of pts) for(let k=0;k<3;k++){mn[k]=Math.min(mn[k],p[k]);mx[k]=Math.max(mx[k],p[k])}
  const c=mn.map((v,k)=>(v+mx[k])/2), s=size/Math.max(mx[0]-mn[0],mx[1]-mn[1],mx[2]-mn[2]); return pts.map(p=>p.map((v,k)=>(v-c[k])*s)) }
shoe = shoe.sort(()=>R()-0.5)
const shapes=[norm(heart,2.6), norm(shoe,2.9), norm(bike,3.0)]
const out=new Int16Array(shapes.length*N*3); shapes.forEach((sh,s)=>sh.forEach((p,i)=>{ for(let k=0;k<3;k++) out[(s*N+i)*3+k]=Math.round(p[k]*8000) }))
writeFileSync('/home/claude/site-v6/public/shapes.bin', Buffer.from(out.buffer))
console.log('ok', out.byteLength, 'tris', tris.length)
