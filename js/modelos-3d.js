/* =========================================================
   MICHI COFFEE · modelos 3D de las comidas del menú (three.js)
   Son los mismos modelos con los que se hicieron los GIF de las tarjetas.
   ========================================================= */

(() => {
if (!window.THREE) return;      // si three.js no carga, las tarjetas siguen con sus GIF

const M = (color, o={}) => new THREE.MeshStandardMaterial(Object.assign({ color, roughness:.55, metalness:0 }, o));
const add = (g, geo, mat, x=0,y=0,z=0) => { const m = new THREE.Mesh(geo, mat); m.position.set(x,y,z); g.add(m); return m; };
const rnd = (a,b) => a + Math.random()*(b-a);

function plato(color='#ffffff', r=1.45){
  const g = new THREE.Group();
  add(g, new THREE.CylinderGeometry(r, r*.82, .1, 48), M(color,{roughness:.3}), 0,.05,0);
  add(g, new THREE.TorusGeometry(r*.97, .045, 10, 48), M(color,{roughness:.3}), 0,.11,0).rotation.x = Math.PI/2;
  return g;
}
function tabla(){
  const g = new THREE.Group();
  add(g, new THREE.BoxGeometry(2.9,.14,1.25), M('#C99A6B',{roughness:.8}), 0,.07,0);
  [-1.15,1.15].forEach(x => add(g, new THREE.BoxGeometry(.18,.12,1.25), M('#B5865A',{roughness:.8}), x,-.04,0));
  return g;
}
function bowl(colorExt, caldo){
  const g = new THREE.Group();
  const pts = [[0.45,0],[0.5,0.06],[0.9,0.3],[1.25,0.75],[1.32,0.9],[1.26,0.92],[1.18,0.8],[0.85,0.4],[0.0,0.32]].map(p => new THREE.Vector2(p[0],p[1]));
  const b = add(g, new THREE.LatheGeometry(pts, 64), M(colorExt,{roughness:.35, side:THREE.DoubleSide}));
  add(g, new THREE.TorusGeometry(1.0, .03, 8, 64), M('#E7547A'), 0,.48,0).rotation.x = Math.PI/2; // franja decorativa
  add(g, new THREE.CylinderGeometry(1.17,1.1,.04,64), M(caldo,{roughness:.15}), 0,.76,0);
  return g;
}
function fideos(g, color='#F4D27A', y=.79){
  for(let i=0;i<9;i++){
    const pts = []; const x0 = rnd(-.7,.1), z0 = rnd(-.7,.7);
    for(let k=0;k<6;k++) pts.push(new THREE.Vector3(x0 + k*.14, y + Math.sin(k*1.7+i)*.02, z0 + Math.sin(k*1.3+i)*.12));
    add(g, new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 24, .035, 6), M(color,{roughness:.4}));
  }
}
function huevo(g, x, z, rot=0){
  const h = new THREE.Group();
  const clara = add(h, new THREE.SphereGeometry(.26, 32, 16, 0, Math.PI*2, 0, Math.PI/2), M('#F7EBD8',{roughness:.35}));
  clara.rotation.x = Math.PI; clara.scale.set(1,.7,1.35);
  add(h, new THREE.CircleGeometry(.26, 32), M('#F7EBD8'), 0,.001,0).rotation.x = -Math.PI/2;
  const yema = add(h, new THREE.CircleGeometry(.14, 32), M('#F59E2B',{roughness:.25}), 0,.006,0); yema.rotation.x = -Math.PI/2;
  h.children[1].scale.set(1,1.35,1); yema.scale.set(1,1.2,1);
  h.position.set(x,.83,z); h.rotation.set(-.25,rot,.1); g.add(h);
}
function chashu(g, x, z){
  const c = add(g, new THREE.CylinderGeometry(.3,.3,.07,32), M('#E8B596',{roughness:.6}), x,.82,z);
  c.rotation.set(-.15,0,.12);
  add(g, new THREE.TorusGeometry(.3,.035,8,32), M('#8B4A2B'), x,.82,z).rotation.set(Math.PI/2-.15,.12,0);
}
function nori(g, x, z, ry){
  const n = add(g, new THREE.BoxGeometry(.55,.75,.02), M('#1F3A2A',{roughness:.9}), x,1.05,z); n.rotation.set(-.35,ry,0);
}
function cebollin(g, n=14, color='#7CC46A'){
  for(let i=0;i<n;i++){ const t = add(g, new THREE.TorusGeometry(.045,.018,6,12), M(color), rnd(-.4,.4), .815, rnd(-.4,.4)); t.rotation.x = Math.PI/2; }
}
function ramen(tipo){
  const caldos = { miso:'#E9A85A', shoyu:'#A45A2A', tantan:'#E2552B' };
  const g = bowl(tipo==='tantan' ? '#2E2A2A' : '#FFFFFF', caldos[tipo]);
  fideos(g);
  if(tipo==='miso'){
    huevo(g,.45,.35,.4); huevo(g,.2,.6,-.3);
    for(let i=0;i<26;i++) add(g, new THREE.SphereGeometry(.05,8,8), M('#FFD23F',{roughness:.3}), rnd(-.75,-.25),.8,rnd(-.6,-.1));
    add(g, new THREE.BoxGeometry(.25,.12,.25), M('#FFF1B0',{roughness:.3}), -.1,.84,.15).rotation.y = .5;
    chashu(g, .5,-.35); cebollin(g); nori(g,-.2,-.8,0);
  } else if(tipo==='shoyu'){
    chashu(g,-.4,.25); chashu(g,-.1,.5); huevo(g,.45,.25,.3); huevo(g,.5,-.15,-.4);
    for(let i=0;i<6;i++) add(g, new THREE.BoxGeometry(.06,.04,.38), M('#D8A04A'), rnd(-.2,.2),.8,rnd(-.6,-.2)).rotation.y = rnd(-.4,.4); // menma
    const naruto = add(g, new THREE.CylinderGeometry(.16,.16,.04,32), M('#FFFFFF'), .05,.81,-.05);
    add(g, new THREE.TorusGeometry(.08,.02,6,24,Math.PI*1.6), M('#F06A8F'), .05,.835,-.05).rotation.x = Math.PI/2;
    cebollin(g,12); nori(g,.1,-.85,.2); nori(g,-.4,-.75,-.3);
  } else {
    for(let i=0;i<40;i++) add(g, new THREE.SphereGeometry(.055,6,6), M('#7A3B1F'), rnd(-.2,.3),.82,rnd(-.25,.25));
    for(let i=0;i<3;i++){ const h = add(g, new THREE.SphereGeometry(.28,16,12), M('#5CA94B',{roughness:.5}), -.55+i*.05,.82,-.4+i*.3); h.scale.set(1,.18,.55); h.rotation.y = i*.6; }
    for(let i=0;i<60;i++) add(g, new THREE.SphereGeometry(.018,4,4), M('#F3E3C3'), rnd(-.9,.9),.79,rnd(-.9,.9));
    huevo(g,.55,.3,0); cebollin(g,16,'#8BD36F');
  }
  return g;
}
function pieza(exterior, capas, sesamo=false){
  const g = new THREE.Group();
  add(g, new THREE.CylinderGeometry(.33,.33,.36,32), M(exterior,{roughness: exterior==='#1F3A2A' ? .9 : .7}));
  let r = .31;
  capas.forEach((c,i)=>{ const d = add(g, new THREE.CircleGeometry(c.r ?? r, 32), M(c.color,{roughness:.5}), c.x||0, .181+i*.001, c.z||0); d.rotation.x = -Math.PI/2; });
  if(sesamo) for(let i=0;i<22;i++){ const a = rnd(0,Math.PI*2); add(g, new THREE.SphereGeometry(.025,5,5), M(i%3?'#F5EBD5':'#222'), Math.cos(a)*.335, rnd(-.15,.15), Math.sin(a)*.335).scale.set(1,.6,1); }
  return g;
}
function sushi(tipo){
  const g = new THREE.Group(); g.add(tabla());
  const pos = [[-.9,-.3],[-.2,-.3],[.5,-.3],[-.55,.32],[.15,.32],[.85,.32]];
  pos.forEach(([x,z],i)=>{
    let p;
    if(tipo==='california'){
      p = pieza('#1F3A2A', [{color:'#FAFAF5'},{color:'#E2553E',r:.08,x:-.07},{color:'#86B94C',r:.07,x:.08,z:.04},{color:'#BFE29A',r:.06,x:.02,z:-.09}]);
    } else if(tipo==='salmon'){
      p = pieza('#FAF6EE', [{color:'#FAF6EE'},{color:'#1F3A2A',r:.2},{color:'#FFFFFF',r:.18},{color:'#FF8A5C',r:.08,x:-.05},{color:'#86B94C',r:.06,x:.07}], true);
      const s = add(p, new THREE.BoxGeometry(.62,.05,.42), M('#FF7F50',{roughness:.35}), 0,.21,0); s.rotation.z = .08;
      for(let k=0;k<4;k++) add(p, new THREE.BoxGeometry(.6,.052,.02), M('#FFD2BC'), 0,.212,-.15+k*.1).rotation.z = .08;
    } else {
      p = pieza('#FAF6EE', [{color:'#FAF6EE'},{color:'#1F3A2A',r:.2},{color:'#F4D29A',r:.12,x:-.03},{color:'#86B94C',r:.06,x:.09}], true);
      add(p, new THREE.TorusGeometry(.2,.022,6,20,Math.PI), M('#4A2416',{roughness:.2}), 0,.2,0).rotation.set(-Math.PI/2,0,i);
      if(i===0||i===5){ const cola = add(p, new THREE.ConeGeometry(.1,.4,12), M('#FF6A3D'), 0,.36,0); cola.rotation.z = i? -.5 : .5; }
    }
    p.position.set(x,.32,z); p.rotation.y = rnd(-.3,.3); g.add(p);
  });
  add(g, new THREE.SphereGeometry(.16,16,12), M('#9BCB5A'), 1.1,.25,-.3).scale.set(1,.6,1); // wasabi
  for(let i=0;i<4;i++){ const j = add(g, new THREE.SphereGeometry(.13,12,8), M('#FFC1B0'), -1.1+i*.04,.2,-.35+i*.05); j.scale.set(1,.25,.7); } // jengibre
  g.position.y = -.1; g.scale.setScalar(.82); return g;
}
function bebida(tipo){
  const g = new THREE.Group();
  add(g, new THREE.CylinderGeometry(.62,.6,.06,40), M('#FFFFFF',{roughness:.3}), 0,.03,0); // posavasos
  const capas = { matcha:[['#F7F1E3',.75],['#8DBF5A',.55]], fresa:[['#F7A7B8',.65],['#FBEFF0',.15],['#8DBF5A',.5]], hojicha:[['#B36E3A',.7],['#E9C9A0',.35],['#FFF5E6',.18]],
                  winter:[['#3B2418',.45],['#F6F1EA',.5],['#4C63D8',.5]], te:[['#93A23C',1.25]] }[tipo];
  let y = .08;
  capas.forEach(([c,h])=>{ add(g, new THREE.CylinderGeometry(.5+ (y+h)*.03, .5+y*.03, h, 40), M(c,{roughness:.25}), 0, y+h/2, 0); y += h; });
  add(g, new THREE.CylinderGeometry(.57,.52,1.75,40,1,true), new THREE.MeshPhysicalMaterial({color:'#ffffff',transparent:true,opacity:.28,roughness:.05,side:THREE.DoubleSide}), 0,.95,0);
  add(g, new THREE.TorusGeometry(.565,.018,8,48), new THREE.MeshPhysicalMaterial({color:'#ffffff',transparent:true,opacity:.6,roughness:.05}), 0,1.82,0).rotation.x = Math.PI/2;
  if(tipo!=='hojicha' && tipo!=='winter') for(let i=0;i<4;i++){ const c = add(g, new THREE.BoxGeometry(.28,.28,.28), new THREE.MeshPhysicalMaterial({color:'#E6F6FF',transparent:true,opacity:.55,roughness:.1}), rnd(-.2,.2), y - .1 + rnd(-.1,.05), rnd(-.2,.2)); c.rotation.set(rnd(0,1),rnd(0,1),rnd(0,1)); }
  const pajita = add(g, new THREE.CylinderGeometry(.05,.05,2.1,12), M({ matcha:'#7DB35A', te:'#7DB35A', winter:'#7B8CF0' }[tipo] || '#F27EA6'), .2,1.35,0); pajita.rotation.z = -.22;
  if(tipo==='winter'){
    add(g, new THREE.SphereGeometry(.48,32,16,0,Math.PI*2,0,Math.PI/2), M('#FFFFFF',{roughness:.6}), 0,y-.02,0).scale.set(1,.5,1);
    const flor = new THREE.Group();
    for(let i=0;i<5;i++){ const p = add(flor, new THREE.SphereGeometry(1,16,10), M('#3F4FC9',{roughness:.6}), Math.cos(i*1.257)*.12, 0, Math.sin(i*1.257)*.12); p.scale.set(.13,.03,.09); p.rotation.y = -i*1.257; }
    add(flor, new THREE.SphereGeometry(.05,10,8), M('#F3E7B0'));
    flor.position.set(-.1, y+.24, .05); flor.rotation.set(.25,0,-.2); g.add(flor);
  }
  if(tipo==='fresa'){
    const f = add(g, new THREE.SphereGeometry(.2,20,16), M('#E8344E',{roughness:.3}), -.48,1.85,0); f.scale.set(1,1.25,1);
    for(let i=0;i<5;i++){ const h = add(g, new THREE.ConeGeometry(.05,.18,4), M('#4E9A3A'), -.48,2.1,0); h.rotation.z = Math.cos(i*1.26)*.9; h.rotation.x = Math.sin(i*1.26)*.9; }
  }
  if(tipo==='hojicha'){
    add(g, new THREE.SphereGeometry(.48,32,16,0,Math.PI*2,0,Math.PI/2), M('#FFF8EE',{roughness:.6}), 0,y-.02,0).scale.set(1,.45,1);
    add(g, new THREE.TorusGeometry(.25,.025,6,40), M('#A0522D',{roughness:.2}), 0,y+.17,0).rotation.x = Math.PI/2;
  }
  if(tipo==='matcha') for(let i=0;i<30;i++) add(g, new THREE.SphereGeometry(.02,4,4), M('#5E8F3A'), rnd(-.3,.3), y+.01, rnd(-.3,.3));
  g.scale.setScalar(.82); g.position.y = -.2; return g;
}
function fresa(g, x, y, z, s=1){
  const f = add(g, new THREE.ConeGeometry(.13*s,.3*s,16), M('#E8344E',{roughness:.3}), x,y,z); f.rotation.x = Math.PI;
  add(g, new THREE.SphereGeometry(.13*s,16,8,0,Math.PI*2,0,Math.PI/2), M('#E8344E',{roughness:.3}), x,y+.0,z);
  for(let i=0;i<5;i++){ const h = add(g, new THREE.ConeGeometry(.04*s,.13*s,4), M('#4E9A3A'), x,y+.1*s,z); h.rotation.z = Math.cos(i*1.26)*1.1; h.rotation.x = Math.sin(i*1.26)*1.1; }
}
/* Ichigo daifuku: gota redondita de mochi; partido muestra crema y el corte de la fresa */
function mochiFresa(completo){
  const g = new THREE.Group();
  const perfil = [[0,0],[.4,0],[.5,.07],[.53,.2],[.5,.34],[.4,.52],[.26,.68],[.12,.79],[0,.83]];
  add(g, new THREE.LatheGeometry(perfil.map(([r,y]) => new THREE.Vector2(r,y)), 56, 0, completo ? Math.PI*2 : Math.PI), M('#FCE4EA',{roughness:.85, side:THREE.DoubleSide}));
  // polvito blanco en la parte de arriba
  for(let i=0;i<12;i++){ const ph = rnd(0, completo ? 6.28 : 3.14), h = rnd(.55,.72), rr = .4 - (h-.52)*.9;
    add(g, new THREE.SphereGeometry(.03,6,4), M('#FFFFFF',{roughness:1}), rr*Math.sin(ph), h, rr*Math.cos(ph)).scale.set(1,.4,1); }
  if(completo) return g;
  // cara del corte (en el plano x = 0, mirando hacia -x)
  const silueta = (pts, s, cy, dy=0) => {
    const contorno = [...pts, ...pts.slice(1,-1).reverse().map(([r,y]) => [-r,y])];
    return new THREE.ShapeGeometry(new THREE.Shape(contorno.map(([r,y]) => new THREE.Vector2(r*s, (y-cy)*s + cy + dy))), 32);
  };
  const fresaPerfil = [[0,0],[.19,.01],[.26,.08],[.27,.2],[.21,.33],[.11,.43],[0,.47]];
  const cara = new THREE.Group(); cara.rotation.y = -Math.PI/2; g.add(cara);
  [[silueta(perfil,1,.4), '#FFF1F2'], [silueta(perfil,.86,.4,-.01), '#FFFDF6'],
   [silueta(fresaPerfil,1,.24,.14), '#E5304A'], [silueta(fresaPerfil,.74,.24,.15), '#FF8796'], [silueta(fresaPerfil,.3,.24,.17), '#FFE3E7']]
    .forEach(([geo,c],i) => add(cara, geo, M(c,{roughness: i>1 ? .35 : .8}), 0,0,.002*(i+1)));
  return g;
}
function postre(tipo){
  const g = new THREE.Group();
  if(tipo==='mochi'){
    g.add(plato('#B9D2B0', 1.3));
    const entero = mochiFresa(true); entero.position.set(-.5,.1,-.4); entero.scale.setScalar(1.15); g.add(entero);
    const a = mochiFresa(false); a.position.set(.1,.1,.3); a.rotation.y = Math.PI/2 + .3; a.scale.setScalar(1.15); g.add(a);
    const b = mochiFresa(false); b.position.set(.7,.1,-.1); b.rotation.y = Math.PI/2 - .55; b.scale.setScalar(1.15); g.add(b);
    for(let i=0;i<30;i++) add(g, new THREE.SphereGeometry(.025,6,4), M('#FFFFFF',{roughness:1}), rnd(-1,1), .11, rnd(-.9,.9)).scale.set(1,.3,1); // polvo de almidón
  } else if(tipo==='dorayaki'){
    g.add(plato('#2F2A2A'));
    const uno = (x,z,ry,rz,y) => {
      const d = new THREE.Group();
      const tapa = (yy, flip) => { const t = add(d, new THREE.SphereGeometry(.62,40,20), M('#B5642A',{roughness:.55}), 0,yy,0); t.scale.set(1,.2,1); if(flip) t.rotation.x = Math.PI;
        add(d, new THREE.TorusGeometry(.6,.05,8,40), M('#E7B46A',{roughness:.6}), 0,yy,0).rotation.x = Math.PI/2; };
      tapa(0,false); add(d, new THREE.CylinderGeometry(.5,.5,.12,32), M('#5A1E1E',{roughness:.7}), 0,.12,0); tapa(.24,true);
      d.position.set(x,y,z); d.rotation.set(0,ry,rz); g.add(d);
    };
    uno(-.35,.1,0,0,.24); uno(.55,-.2,.4,-.55,.5);
    for(let i=0;i<24;i++) add(g, new THREE.SphereGeometry(.05,8,6), M('#7A1F2B',{roughness:.3}), rnd(-1,1),.13,rnd(.6,1)).scale.set(1,.7,1.3);
  } else {
    g.add(plato('#33363C'));
    const s = new THREE.Shape();
    s.moveTo(-1.1,0); s.quadraticCurveTo(-1.05,.55,-.25,.58); s.quadraticCurveTo(.45,.58,.72,.16);
    s.lineTo(1.15,.5); s.quadraticCurveTo(1.0,0,1.15,-.5); s.lineTo(.72,-.16);
    s.quadraticCurveTo(.45,-.58,-.25,-.58); s.quadraticCurveTo(-1.05,-.55,-1.1,0);
    const geo = new THREE.ExtrudeGeometry(s, { depth:.18, bevelEnabled:true, bevelThickness:.12, bevelSize:.1, bevelSegments:6, curveSegments:24 });
    const pez = (x,z,ry,sc) => {
      const f = new THREE.Group();
      const cuerpo = add(f, geo, M('#D9913F',{roughness:.6})); cuerpo.rotation.x = -Math.PI/2;
      for(let i=0;i<4;i++) for(let j=0;j<3;j++){ const e = add(f, new THREE.SphereGeometry(.09,10,6,0,Math.PI*2,0,Math.PI/2), M('#B36E2A',{roughness:.6}), -.35+i*.22,.3,-.22+j*.22); e.scale.set(1,.4,1); }
      add(f, new THREE.SphereGeometry(.07,12,8), M('#5A2A10'), -.78,.3,-.15).scale.set(1,.5,1);
      add(f, new THREE.TorusGeometry(.12,.025,6,16,Math.PI), M('#B36E2A'), -.6,.3,0).rotation.set(-Math.PI/2,0,Math.PI/2);
      f.position.set(x,.2,z); f.rotation.y = ry; f.scale.setScalar(sc); g.add(f);
    };
    pez(0,-.3,.15,.85); pez(.1,.45,-.1,.75);
    add(g, new THREE.SphereGeometry(.18,16,12), M('#FFF2B8',{roughness:.3}), -.95,.2,.55).scale.set(1,.5,1);
  }
  return g;
}

/* ---------- TÉ DE HIERBAS (taza de porcelana blanca y azul) ---------- */
function teHierbas(){
  const g = new THREE.Group();
  add(g, new THREE.CylinderGeometry(.95,.85,.08,48), M('#FFFFFF',{roughness:.3}), 0,.04,0);              // platito
  add(g, new THREE.TorusGeometry(.9,.025,8,48), M('#2F55A4',{roughness:.3}), 0,.085,0).rotation.x = Math.PI/2;
  const perfil = [[0,.08],[.32,.08],[.36,.12],[.5,.35],[.62,.72],[.66,.95],[.62,.96],[.57,.74],[.45,.38],[.3,.15],[0,.15]];
  add(g, new THREE.LatheGeometry(perfil.map(([r,y]) => new THREE.Vector2(r,y)), 64), M('#FBFBF8',{roughness:.2, side:THREE.DoubleSide}));
  [.3,.55,.85].forEach((y,i) => add(g, new THREE.TorusGeometry(.38 + y*.3, i===1 ? .035 : .015, 8, 64), M('#2F55A4',{roughness:.3}), 0,y,0).rotation.x = Math.PI/2);
  for(let i=0;i<8;i++){ const a = i*.785; const f = add(g, new THREE.SphereGeometry(.06,10,8), M('#3B66C4',{roughness:.3}), Math.cos(a)*.565, .55, Math.sin(a)*.565); f.scale.set(1,1.4,.4); f.lookAt(0,.55,0); }
  add(g, new THREE.CylinderGeometry(.6,.6,.02,48), M('#8C9A36',{roughness:.1}), 0,.82,0);               // té
  for(let i=0;i<7;i++){ const h = add(g, new THREE.SphereGeometry(1,12,8), M(i%2 ? '#4E8A3A' : '#6FA34A',{roughness:.6}), rnd(-.35,.35), .835, rnd(-.35,.35)); h.scale.set(.13,.015,.05); h.rotation.y = rnd(0,3); }
  return g;
}

/* ---------- CAPUCHINO con arte latte de conejito ---------- */
function capuchino(){
  const g = new THREE.Group();
  add(g, new THREE.CylinderGeometry(1.05,.9,.08,56), M('#FFFFFF',{roughness:.25}), 0,.04,0);               // platito
  add(g, new THREE.TorusGeometry(1.0,.04,8,56), M('#FFFFFF',{roughness:.25}), 0,.09,0).rotation.x = Math.PI/2;
  const perfil = [[0,.08],[.3,.08],[.34,.12],[.5,.3],[.62,.6],[.66,.82],[.62,.83],[.57,.62],[.45,.33],[.3,.15],[0,.15]];
  add(g, new THREE.LatheGeometry(perfil.map(([r,y]) => new THREE.Vector2(r,y)), 64), M('#FFFFFF',{roughness:.2, side:THREE.DoubleSide}));
  const asa = add(g, new THREE.TorusGeometry(.2,.055,12,32,Math.PI*1.3), M('#FFFFFF',{roughness:.2}), .66,.5,0); asa.rotation.z = -Math.PI*.65;
  // café y espuma
  add(g, new THREE.CircleGeometry(.6,56), M('#8A4E26',{roughness:.5}), 0,.76,0).rotation.x = -Math.PI/2;
  add(g, new THREE.CircleGeometry(.5,56), M('#C99566',{roughness:.6}), 0,.762,0).rotation.x = -Math.PI/2;
  // conejito de espuma
  const leche = M('#FFF8EC',{roughness:.7}), cafe = M('#6B3A1E',{roughness:.4});
  const plano = (geo, mat, x, z, sx=1, sz=1, rz=0, dy=0) => { const m = add(g, geo, mat, x, .765 + dy, z); m.rotation.set(-Math.PI/2, 0, rz); m.scale.set(sx, sz, 1); return m; };
  plano(new THREE.CircleGeometry(.24,40), leche, 0, .06, 1.1, .9);                          // cara
  plano(new THREE.CircleGeometry(.09,24), leche, -.12, -.2, .7, 1.6, -.25);                  // orejas
  plano(new THREE.CircleGeometry(.09,24), leche,  .12, -.2, .7, 1.6,  .25);
  plano(new THREE.CircleGeometry(.12,24), leche, .26, .24, 1.2, .6, .5);                     // patita saludando
  plano(new THREE.CircleGeometry(.026,12), cafe, -.09, .04, 1, 1, 0, .002);                  // ojos
  plano(new THREE.CircleGeometry(.026,12), cafe,  .09, .04, 1, 1, 0, .002);
  plano(new THREE.RingGeometry(.025,.04,16,1,0,Math.PI), cafe, 0, .12, 1, 1, Math.PI, .002); // boquita
  plano(new THREE.CircleGeometry(.035,12), M('#F2B8A8',{roughness:.7}), -.16, .11, 1.3, 1, 0, .002); // cachetes
  plano(new THREE.CircleGeometry(.035,12), M('#F2B8A8',{roughness:.7}),  .16, .11, 1.3, 1, 0, .002);
  // cucharita
  const cuch = new THREE.Group(), metal = M('#C9CDD3',{roughness:.25, metalness:.6});
  add(cuch, new THREE.SphereGeometry(1,20,12), metal).scale.set(.16,.04,.1);
  add(cuch, new THREE.BoxGeometry(.75,.025,.05), metal, .45,.02,0);
  cuch.position.set(.15,.13,.72); cuch.rotation.y = .35; g.add(cuch);
  return g;
}

/* ---------- CHOCOGATO: chocolate caliente con gatito de espuma ---------- */
function chocogato(){
  const g = new THREE.Group(), azul = M('#4A8FC9',{roughness:.3});
  // taza ancha blanca con borde azul y puntitos
  const perfil = [[0,0],[.4,0],[.45,.05],[.62,.25],[.78,.55],[.82,.78],[.78,.79],[.74,.57],[.58,.28],[.4,.07],[0,.07]];
  add(g, new THREE.LatheGeometry(perfil.map(([r,y]) => new THREE.Vector2(r,y)), 64), M('#FAFBFC',{roughness:.25, side:THREE.DoubleSide}));
  add(g, new THREE.TorusGeometry(.8,.03,8,64), azul, 0,.785,0).rotation.x = Math.PI/2;
  add(g, new THREE.TorusGeometry(.79,.012,6,64), azul, 0,.7,0).rotation.x = Math.PI/2;
  const ext = [[.45,.05],[.62,.25],[.78,.55],[.82,.78]];   // radio exterior de la taza según la altura
  const radio = y => { for(let i=1;i<ext.length;i++) if(y <= ext[i][1]){ const [r0,y0] = ext[i-1], [r1,y1] = ext[i]; return r0 + (r1-r0)*(y-y0)/(y1-y0); } return .82; };
  for(let i=0;i<32;i++){ const a = i*Math.PI*2/32, y = .62, r = radio(y) + .008; const d = add(g, new THREE.SphereGeometry(.026,8,6), azul, Math.cos(a)*r, y, Math.sin(a)*r); d.scale.set(1,1,.45); d.lookAt(0,y,0); }
  for(let i=0;i<120;i++){ const a = rnd(0,6.28), y = rnd(.12,.52), r = radio(y) + .004; const d = add(g, new THREE.SphereGeometry(.014,6,4), M('#8FB7E0'), Math.cos(a)*r, y, Math.sin(a)*r); d.scale.set(1,1,.4); d.lookAt(0,y,0); }
  const asa = add(g, new THREE.TorusGeometry(.24,.06,12,32,Math.PI*1.3), M('#FAFBFC',{roughness:.25}), .85,.45,0); asa.rotation.z = -Math.PI*.65;
  // chocolate y espuma
  add(g, new THREE.CircleGeometry(.76,64), M('#4E2A16',{roughness:.45}), 0,.74,0).rotation.x = -Math.PI/2;
  add(g, new THREE.CircleGeometry(.68,64), M('#8E5A34',{roughness:.6}), 0,.742,0).rotation.x = -Math.PI/2;
  const leche = M('#FFF6E8',{roughness:.7}), cafe = M('#6B3A20',{roughness:.4});
  const plano = (geo, mat, x, z, sx=1, sz=1, rz=0, dy=0) => { const m = add(g, geo, mat, x, .745 + dy, z); m.rotation.set(-Math.PI/2, 0, rz); m.scale.set(sx, sz, 1); return m; };
  const oreja = new THREE.Shape([new THREE.Vector2(-.11,0), new THREE.Vector2(.11,0), new THREE.Vector2(0,.2)]);
  plano(new THREE.CircleGeometry(.3,48), leche, 0, -.02, 1.15, .9);                              // cara
  plano(new THREE.ShapeGeometry(oreja), leche, -.21, -.2, 1, 1, .35);                            // orejas
  plano(new THREE.ShapeGeometry(oreja), leche,  .21, -.2, 1, 1, -.35);
  plano(new THREE.RingGeometry(.035,.055,16,1,0,Math.PI), cafe, -.12, -.04, 1, 1, Math.PI, .002); // ojitos felices
  plano(new THREE.RingGeometry(.035,.055,16,1,0,Math.PI), cafe,  .12, -.04, 1, 1, Math.PI, .002);
  plano(new THREE.CircleGeometry(.03,3), M('#E8A0A0',{roughness:.6}), 0, .04, 1.3, 1, Math.PI/2, .002); // naricita
  plano(new THREE.RingGeometry(.025,.04,12,1,0,Math.PI), cafe, -.032, .085, 1, 1, Math.PI, .002);  // boquita "w"
  plano(new THREE.RingGeometry(.025,.04,12,1,0,Math.PI), cafe,  .032, .085, 1, 1, Math.PI, .002);
  [[-1,-.04],[-1,.04],[1,-.04],[1,.04]].forEach(([s,dz]) => plano(new THREE.PlaneGeometry(.2,.012), cafe, s*.36, .05+dz*1.5, 1, 1, s*dz*2.5, .002)); // bigotes
  // patitas de espuma asomando (en relieve)
  [-.13,.13].forEach(x => {
    add(g, new THREE.SphereGeometry(.11,24,16,0,Math.PI*2,0,Math.PI/2), leche, x,.742,.42).scale.set(1,.55,.85);
    [-.05,0,.05].forEach(dx => add(g, new THREE.SphereGeometry(.018,8,6), M('#E8C9A8'), x+dx,.795,.47).scale.set(1,.5,1));
  });
  // granos de café alrededor
  for(let i=0;i<9;i++){ const a = rnd(.3,2.6), r = rnd(1.0,1.35); const b = add(g, new THREE.SphereGeometry(.06,12,8), M('#4A2416',{roughness:.4}), Math.cos(a)*r, .03, Math.sin(a)*r); b.scale.set(1,.6,1.4); b.rotation.y = rnd(0,3); }
  return g;
}

/* =========================================================
   VISOR 3D INTERACTIVO
   Normalmente la tarjeta muestra el GIF girando. Al hacer clic (o tocar) la foto,
   el GIF se cambia por el modelo 3D real sobre el mismo fondo y se puede arrastrar
   para girarlo. Se usa un solo visor que "salta" a la tarjeta activa.
   ========================================================= */
const MODELOS = {
  'shoyu-ramen': () => ramen('shoyu'), 'miso-ramen': () => ramen('miso'), 'spicy-ramen': () => ramen('tantan'),
  'salmon-roll': () => sushi('salmon'), 'california-roll': () => sushi('california'), 'tempura-roll': () => sushi('ebi'),
  'capuchino': capuchino, 'matcha-latte': () => bebida('matcha'), 'choco-gato': chocogato, 'te-de-hierbas': teHierbas,
  'mochi-de-fresa': () => postre('mochi'), 'dorayaki': () => postre('dorayaki'), 'taiyaki': () => postre('taiyaki')
};
const sinMovimiento3D = matchMedia('(prefers-reduced-motion: reduce)').matches;
const GIRO_AUTO = sinMovimiento3D ? 0 : 0.03;     // misma velocidad aproximada del GIF
let renderer, escena, camara, pivote, activa = null, animando = false;
let rotY = 0.4, vel = GIRO_AUTO, elev = 0.53, centro = new THREE.Vector3(), distancia = 6, arrastrando = false;

function crearVisor() {
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.domElement.className = 'plato__3d';
  renderer.domElement.setAttribute('aria-hidden', 'true');
  escena = new THREE.Scene();
  escena.add(new THREE.HemisphereLight('#FFF6F0', '#E9A0B4', 0.65));
  const sol = new THREE.DirectionalLight('#ffffff', 0.75); sol.position.set(3, 6, 4); escena.add(sol);
  const rel = new THREE.DirectionalLight('#FFD1DC', 0.35); rel.position.set(-4, 2, -3); escena.add(rel);
  camara = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  pivote = new THREE.Group(); escena.add(pivote);
}

function limpiar() {
  while (pivote.children.length) {
    const c = pivote.children.pop();
    c.traverse(o => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose(); });
  }
}

// encuadre: la comida ocupa más o menos el mismo espacio que en el GIF
function encuadrar() {
  const caja = renderer.domElement.parentElement.getBoundingClientRect();
  if (!caja.width) return;
  renderer.setSize(caja.width, caja.height, false);
  camara.aspect = caja.width / caja.height; camara.updateProjectionMatrix();
  const b = new THREE.Box3().setFromObject(pivote), tam = b.getSize(new THREE.Vector3());
  b.getCenter(centro);
  const radio = Math.max(tam.x, tam.z) / 2 * 1.05;            // medio ancho (un poquito más por la vuelta)
  const tanV = Math.tan(THREE.MathUtils.degToRad(15)), tanH = tanV * camara.aspect;
  distancia = Math.max(radio / (0.64 * tanH), tam.y / (1.2 * tanV), radio / (0.9 * tanV));
}

function ubicarCamara() {
  camara.position.set(centro.x, centro.y + Math.sin(elev) * distancia, centro.z + Math.cos(elev) * distancia);
  camara.lookAt(centro);
}

function cuadro() {
  if (!activa) { animando = false; return; }
  if (!arrastrando) { vel += (GIRO_AUTO - vel) * 0.04; rotY += vel; }
  pivote.rotation.y = rotY;
  ubicarCamara();
  renderer.render(escena, camara);
  requestAnimationFrame(cuadro);
}

function activar(media) {
  if (activa === media) return;
  desactivar();
  const id = media.dataset.modelo;
  if (!MODELOS[id]) return;
  if (!renderer) crearVisor();
  limpiar();
  pivote.add(MODELOS[id]());
  pivote.rotation.y = 0;
  rotY = 0.4; elev = 0.53; vel = GIRO_AUTO;
  media.appendChild(renderer.domElement);
  encuadrar();
  activa = media;
  media.classList.add('en-3d');
  if (!animando) { animando = true; requestAnimationFrame(cuadro); }
}

function desactivar() {
  if (!activa) return;
  activa.classList.remove('en-3d');
  renderer.domElement.remove();
  activa = null;
}

// cada foto de comida se vuelve interactiva
document.querySelectorAll('.plato__media').forEach(media => {
  // para lectores de pantalla: la foto se describe con el mismo texto alternativo de la imagen
  media.setAttribute('role', 'img');
  media.setAttribute('aria-label', media.querySelector('img').alt);
  let ultX = 0, ultY = 0;
  media.addEventListener('pointerdown', e => {
    activar(media);
    arrastrando = true; ultX = e.clientX; ultY = e.clientY;
    try { media.setPointerCapture(e.pointerId); } catch (err) { /* sin captura: igual se puede arrastrar */ }
  });
  media.addEventListener('pointermove', e => {
    if (!arrastrando || activa !== media) return;
    const dx = e.clientX - ultX, dy = e.clientY - ultY; ultX = e.clientX; ultY = e.clientY;
    rotY += dx * 0.012; vel = dx * 0.0015;
    elev = Math.min(1.25, Math.max(0.05, elev + dy * 0.008));   // de frente ↔ desde arriba
  });
  const soltar = () => { arrastrando = false; };
  media.addEventListener('pointerup', soltar);
  media.addEventListener('pointercancel', soltar);
  // con teclado: Enter lo activa y las flechas lo giran
  media.addEventListener('keydown', e => {
    const giro = { ArrowLeft: -0.3, ArrowRight: 0.3 }[e.key], incl = { ArrowUp: 0.15, ArrowDown: -0.15 }[e.key];
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activar(media); return; }
    if (giro === undefined && incl === undefined) return;
    e.preventDefault(); activar(media);
    if (giro) { rotY += giro; vel = 0; }
    if (incl) elev = Math.min(1.25, Math.max(0.05, elev + incl));
  });
});

// vuelve al GIF si la tarjeta se esconde (otra pestaña del menú) o sale de la pantalla
const vigia = new IntersectionObserver(entradas => entradas.forEach(en => {
  if (!en.isIntersecting && en.target === activa) desactivar();
}), { threshold: 0.05 });
document.querySelectorAll('.plato__media').forEach(m => vigia.observe(m));
document.querySelectorAll('.pestana').forEach(p => p.addEventListener('click', desactivar));
addEventListener('resize', () => { if (activa) encuadrar(); });

})();
