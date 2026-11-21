/* =========================================================
   MICHI COFFEE · interacciones (las mismas del prototipo de Figma)
   ========================================================= */
const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Aparecer al bajar: títulos, textos y tarjetas suben suavemente ---------- */
const REVELAR = '.hero__titulo, .hero__bajada, .titulo, .nosotros__texto p, .gato, .promos__lista > li, .pestanas, .platos > li, .adopta__texto, .galeria, .paso, .sala, .ubicacion__info, .mapa';
const revelables = [...document.querySelectorAll(REVELAR)];
if (!('IntersectionObserver' in window)) revelables.forEach(el => el.classList.add('visible'));   // navegadores viejos: todo visible
revelables.forEach(el => {
  // los hermanos aparecen uno detrás del otro (efecto cascada)
  const hermanos = [...el.parentElement.children].filter(h => h.matches(REVELAR));
  el.style.setProperty('--retraso', Math.min(hermanos.indexOf(el) * 0.12, 0.6) + 's');
});
const observadorRevelar = new IntersectionObserver(entradas => {
  entradas.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('visible');
    observadorRevelar.unobserve(e.target);
  });
}, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
revelables.forEach(el => {
  // lo que ya se ve en pantalla al cargar aparece de una vez
  const caja = el.getBoundingClientRect();
  if (caja.top < innerHeight && caja.bottom > 0 && caja.height) el.classList.add('visible');
  else observadorRevelar.observe(el);
});

/* ---------- Datos de las ventanas de detalle ---------- */
const DETALLES = {
  'temporada-michi': { img: 'img/promos/temporada-michi.jpg', alt: 'Dos flanes japoneses amarillos con forma de gatito, con orejitas y carita, bañados en caramelo sobre platos con flores rosadas', etiqueta: 'NUEVO', cat: '✦ Edición limitada · noviembre – febrero ✦', nombre: 'Neko Purin x2', jp: 'ねこプリン', desc: '2 flanes japoneses en forma de gatito con orejitas de caramelo.', precio: '$24.000', antes: '$32.000' },
  'combo-ramen':     { img: 'img/promos/combo-ramen.jpg', alt: 'Tazón de ramen shoyu con huevo, cerdo asado, cebollín y alga nori, junto a un plato de gyozas y un vaso de té verde frío', etiqueta: '−30%', cat: 'Promo de los lunes · 30% de descuento', nombre: 'Combo Ramen + Té', jp: 'ラーメンセット', desc: 'Ramen shoyu + té verde frío + gyozas · Solo los lunes.', precio: '$33.000', antes: '$47.000' },
  'matcha-lovers':   { img: 'img/promos/matcha-lovers.jpg', alt: 'Dos tazas de vidrio con matcha latte verde y una carita de gatito dibujada en la espuma, sobre una mesa de madera', etiqueta: '2x1', cat: 'Promo de la tarde · lleva 2 y paga 1', nombre: 'Matcha Lovers', jp: '抹茶', desc: 'Dos matcha lattes, calientes o helados, al precio de uno. Todos los días · 15:00 – 18:00.', precio: '$23.000', antes: '$26.000' },
  'shoyu-ramen':     { img: 'img/platos/shoyu-ramen.jpg', alt: 'Foto real del shoyu ramen: tazón de caldo de soja con fideos japoneses, huevo y rodajas de cerdo asado', cat: 'Ramen · ラーメン', nombre: 'Shoyu Ramen', jp: '醤油ラーメン', desc: 'Caldo a base de salsa de soja, noodles japoneses, huevo y cerdo asado.', precio: '$27.000' },
  'miso-ramen':      { img: 'img/platos/miso-ramen.jpg', alt: 'Foto real del miso ramen: tazón de caldo cremoso de miso con fideos, maíz, vegetales y huevo', cat: 'Ramen · ラーメン', nombre: 'Miso Ramen', jp: '味噌ラーメン', desc: 'Caldo cremoso de miso con noodles, maíz, vegetales y huevo.', precio: '$30.000' },
  'spicy-ramen':     { img: 'img/platos/spicy-ramen.jpg', alt: 'Foto real del spicy tantan ramen: tazón de caldo rojo picante de sésamo con fideos y carne sazonada', cat: 'Ramen · ラーメン', nombre: 'Spicy Tantan Ramen', jp: 'ピリ辛担々麺', desc: 'Una deliciosa combinación de caldo de sésamo picante, noodles y carne sazonada.', precio: '$33.000' },
  'salmon-roll':     { img: 'img/platos/salmon-roll.jpg', alt: 'Foto real del salmon lover roll: piezas de sushi con salmón fresco, aguacate y queso crema, cubiertas con semillas de sésamo', cat: 'Sushi · 寿司', nombre: 'Salmon Lover Roll', jp: 'サーモンロール', desc: 'Roll de salmón fresco, aguacate y queso crema, cubierto con delicadas semillas de sésamo.', precio: '$28.000' },
  'california-roll': { img: 'img/platos/california-roll.jpg', alt: 'Foto real del california roll: piezas de sushi de cangrejo, aguacate y pepino envueltas en arroz y alga nori', cat: 'Sushi · 寿司', nombre: 'California Roll', jp: 'カリフォルニアロール', desc: 'Una combinación de cangrejo, aguacate y pepino, envuelta en arroz y alga nori.', precio: '$24.000' },
  'tempura-roll':    { img: 'img/platos/tempura-roll.jpg', alt: 'Foto real del ebi tempura roll: rollos de sushi con langostino en tempura y aguacate, bañados en salsa de anguila y ajonjolí', cat: 'Sushi · 寿司', nombre: 'Ebi Tempura Roll', jp: '天ぷらロール', desc: 'Roll de langostino en tempura crujiente con aguacate, bañado en salsa de anguila y ajonjolí.', precio: '$30.000' },
  'capuchino':       { img: 'img/platos/capuchino.jpg', alt: 'Foto real del capuchino: taza blanca con un conejito dibujado en la espuma, sobre un platito con cucharita', cat: 'Bebidas · 飲み物', nombre: 'Capuchino Arte Latte', jp: 'カプチーノ', desc: 'Suave y cremoso espresso combinado con leche vaporizada, coronado con una tierna ilustración hecha a mano en la espuma.', precio: '$9.000' },
  'matcha-latte':    { img: 'img/platos/matcha-latte.jpg', alt: 'Foto real del matcha latte: bebida de té matcha verde con leche', cat: 'Bebidas · 飲み物', nombre: 'Matcha Latte', jp: '抹茶ラテ', desc: 'Té matcha tradicional combinado con leche, suave y delicioso. Un clásico.', precio: '$13.000' },
  'choco-gato':      { img: 'img/platos/choco-gato.jpg', alt: 'Foto real del choco-gato: taza azul de chocolate caliente con un gatito hecho de espuma, junto a muffins y granos de café sobre una mesa de madera', cat: 'Bebidas · 飲み物', nombre: 'Choco-Gato', jp: 'ねこココア', desc: 'Delicioso chocolate caliente preparado con cacao fino y leche espumosa, coronado con un tierno gatito hecho a mano en la espuma.', precio: '$8.000' },
  'te-de-hierbas':   { img: 'img/platos/te-de-hierbas.jpg', alt: 'Foto real del té de hierbas: taza de porcelana con té de manzanilla y una florecita flotando, rodeada de flores de manzanilla', cat: 'Bebidas · 飲み物', nombre: 'Té de Hierbas', jp: 'ハーブティー', desc: 'Selección reconfortante de hierbas naturales y flores aromáticas (manzanilla, menta y hierbaluisa).', precio: '$3.000' },
  'mochi-de-fresa':  { img: 'img/platos/mochi-de-fresa.jpg', alt: 'Foto real del mochi de fresa: bolitas de masa de arroz rellenas de crema y fresa fresca', cat: 'Postres · デザート', nombre: 'Mochi de Fresa', jp: 'いちご大福', desc: 'Suaves masas de arroz rellenas de crema y fresa fresca.', precio: '$9.000' },
  'dorayaki':        { img: 'img/platos/dorayaki.jpg', alt: 'Foto real del dorayaki: dos pancakes japoneses dorados rellenos de pasta dulce de frijol rojo', cat: 'Postres · デザート', nombre: 'Dorayaki', jp: 'どら焼き', desc: 'Dos suaves pancakes japoneses rellenos de dulce pasta de frijol rojo.', precio: '$11.000' },
  'taiyaki':         { img: 'img/platos/taiyaki.jpg', alt: 'Foto real del taiyaki: pastelito japonés dorado con forma de pez, relleno de crema dulce', cat: 'Postres · デザート', nombre: 'Taiyaki', jp: 'たい焼き', desc: 'Tradicional pastelito japonés con forma de pez, relleno de crema dulce.', precio: '$13.000' }
};

/* Versión en japonés de las ventanas de detalle */
const DETALLES_JA = {
  'temporada-michi': { etiqueta: '新作', cat: '✦ 期間限定・11月〜2月 ✦', nombre: 'ねこプリン 2個', desc: 'ねこの形をした日本のプリン2個。キャラメルの耳つき。' },
  'combo-ramen':     { cat: '月曜日のプロモ・30%オフ', nombre: 'ラーメン＋お茶セット', desc: '醤油ラーメン＋冷たい緑茶＋餃子・月曜日限定。' },
  'matcha-lovers':   { cat: '午後のプロモ・1杯分の値段で2杯', nombre: '抹茶ラバーズ', desc: '抹茶ラテ2杯（ホットまたはアイス）が1杯分の値段で。毎日 15:00〜18:00。' },
  'shoyu-ramen':     { cat: 'ラーメン', desc: '醤油ベースのスープに日本の麺、卵、チャーシュー。' },
  'miso-ramen':      { cat: 'ラーメン', desc: '濃厚な味噌スープに麺、コーン、野菜、卵。' },
  'spicy-ramen':     { cat: 'ラーメン', desc: 'ピリ辛のごまスープに、麺と味付けひき肉を合わせた一杯。' },
  'salmon-roll':     { cat: '寿司', desc: '新鮮なサーモン、アボカド、クリームチーズを巻き、白ごまをまぶしたロール。' },
  'california-roll': { cat: '寿司', desc: 'カニ、アボカド、きゅうりをご飯と海苔で巻いたロール。' },
  'tempura-roll':    { cat: '寿司', desc: 'サクサクの海老天とアボカドを巻き、うなぎのタレとごまをかけたロール。' },
  'capuchino':       { cat: '飲み物', desc: 'なめらかなエスプレッソにスチームミルクを合わせ、泡に手描きのかわいいイラストを添えました。' },
  'matcha-latte':    { cat: '飲み物', desc: '伝統的な抹茶とミルクを合わせた、まろやかでおいしい定番ドリンク。' },
  'choco-gato':      { cat: '飲み物', desc: '上質なカカオと泡立てたミルクで作るホットチョコレート。泡の上には手作りの子ねこがのっています。' },
  'te-de-hierbas':   { cat: '飲み物', desc: 'カモミール、ミント、レモンバーベナなど、ほっとするハーブと花のブレンド。' },
  'mochi-de-fresa':  { cat: 'デザート', desc: 'クリームと新鮮ないちごを包んだ、やわらかいお餅。' },
  'dorayaki':        { cat: 'デザート', desc: 'ふわふわの生地2枚で、甘いあんこをはさんだ和菓子。' },
  'taiyaki':         { cat: 'デザート', desc: '魚の形をした伝統的なお菓子。中には甘いクリームが入っています。' }
};

/* ---------- Header: se encoge a un circulito al bajar (como Puka Puka Park) ----------
   Arriba del todo se ve completo. Al bajar queda solo el logo en un círculo;
   un clic en el logo lo vuelve a alargar, y al seguir bajando se encoge otra vez. */
const header = document.getElementById('header');
const logoNav = header.querySelector('.nav__logo');
const UMBRAL = 160;                 // px bajados para que el header se encoja
const esMovil = window.matchMedia('(max-width: 1023px)');   // misma medida que en el CSS
let abiertoAMano = false, yApertura = 0;
function actualizarHeader() {
  const y = scrollY;
  if (esMovil.matches) {            // en el celular el header no se encoge (tiene su menú ☰)
    header.classList.remove('mini', 'con-sombra');
    logoNav.removeAttribute('aria-expanded');
    logoNav.setAttribute('aria-label', 'Michi Coffee, volver al inicio');
    return;
  }
  if (abiertoAMano && Math.abs(y - yApertura) > 90) abiertoAMano = false;   // al seguir bajando, se cierra solo
  const mini = y > UMBRAL && !abiertoAMano;
  header.classList.toggle('mini', mini);
  header.classList.toggle('con-sombra', y > 40);
  if (y > UMBRAL) {
    logoNav.setAttribute('aria-expanded', String(!mini));
    logoNav.setAttribute('aria-label', mini ? 'Abrir el menú de navegación' : 'Michi Coffee, volver al inicio');
  } else {
    logoNav.removeAttribute('aria-expanded');
    logoNav.setAttribute('aria-label', 'Michi Coffee, volver al inicio');
  }
}
logoNav.addEventListener('click', e => {
  if (!header.classList.contains('mini')) return;     // header completo: el logo lleva al inicio
  e.preventDefault();                                  // header encogido: el logo lo vuelve a alargar
  abiertoAMano = true; yApertura = scrollY;
  actualizarHeader();
});
addEventListener('scroll', actualizarHeader, { passive: true });
esMovil.addEventListener('change', actualizarHeader);
actualizarHeader();

/* ---------- Menú ☰ del celular ---------- */
const botonMenu = document.getElementById('menu-movil');
function menuMovil(abrir) {
  header.classList.toggle('abierto', abrir);
  botonMenu.setAttribute('aria-expanded', String(abrir));
  botonMenu.setAttribute('aria-label', abrir ? (japones ? 'メニューを閉じる' : 'Cerrar menú') : (japones ? 'メニューを開く' : 'Abrir menú'));
}
botonMenu.addEventListener('click', () => menuMovil(!header.classList.contains('abierto')));
document.querySelectorAll('#menu-panel a').forEach(a => a.addEventListener('click', () => menuMovil(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape' && header.classList.contains('abierto')) { menuMovil(false); botonMenu.focus(); } });
document.addEventListener('click', e => { if (header.classList.contains('abierto') && !header.contains(e.target)) menuMovil(false); });
esMovil.addEventListener('change', () => menuMovil(false));
// ancho de la barra de scroll, para que el menú quede exacto dentro del header
const medirBarra = () => document.documentElement.style.setProperty('--barra', (innerWidth - document.documentElement.clientWidth) + 'px');
addEventListener('resize', medirBarra); medirBarra();

/* ---------- Selector de idioma ES / 日本語 ---------- */
// Textos largos en japonés: [selector, HTML en japonés]. El español se guarda solo al cargar.
const TEXTOS_JA = [
  ['.hero__bajada', 'カリにあるねこカフェ。和食と、里親を待つねこたちがいます。'],
  ['.nosotros__texto p:nth-of-type(1)', '私たちは、ご来店のひとときを特別な時間にしたいと考えています。日本の文化からインスピレーションを受け、おいしい料理、こだわりのドリンク、そして魅力あふれる空間をお届けします。'],
  ['.nosotros__texto p:nth-of-type(2)', '幸せは小さなことの中にあると信じています。丁寧に点てた抹茶、あたたかいラーメン、そしてそばでゴロゴロと喉を鳴らすねこ。'],
  ['.nosotros__texto p:nth-of-type(3)', 'だから私たちは、小さな保護ねこの譲渡センターでもあります。保護された子ねこたちは、ずっとのおうちが見つかるまで「ねこ部屋」で暮らしています。'],
  ['.promos__lista li:nth-child(1) .etiqueta', '新作'],
  ['.promos__lista li:nth-child(1) .promo__nombre', 'ミチの季節限定'],
  ['.promos__lista li:nth-child(1) .promo__desc', '期間限定・11月〜2月'],
  ['.promos__lista li:nth-child(2) .promo__nombre', 'ラーメンセット'],
  ['.promos__lista li:nth-child(2) .promo__desc', '醤油ラーメン＋冷たい緑茶＋餃子・月曜日'],
  ['.promos__lista li:nth-child(3) .promo__nombre', '抹茶ミチラバーズ'],
  ['.promos__lista li:nth-child(3) .promo__desc', '毎日 15:00〜18:00'],
  ['.adopta__texto', '保護された子ねこたちは、新しい家族が見つかるまで私たちの「ねこ部屋」で暮らしています。抹茶を飲みに来て、一緒に遊んで…もしかしたら新しい親友に出会えるかもしれません。'],
  ['.paso:nth-child(1) .paso__titulo', '会いに来る'],
  ['.paso:nth-child(1) p', 'ねこ部屋でドリンクを楽しみながら、ねこたちとのんびり過ごしてください。'],
  ['.paso:nth-child(2) .paso__titulo', '申し込み'],
  ['.paso:nth-child(2) p', 'カフェのスタッフと一緒に譲渡申込書を記入します。'],
  ['.paso:nth-child(3) .paso__titulo', '面談'],
  ['.paso:nth-child(3) p', 'あなたのおうちにぴったりのねこを一緒に探します。'],
  ['.paso:nth-child(4) .paso__titulo', 'おうちへ！'],
  ['.paso:nth-child(4) p', 'ワクチン接種・避妊去勢済みで、たくさんの愛情と一緒にお迎えできます。'],
  ['.sala__titulo', 'ねこ部屋'],
  ['.sala__sub', 'キッチンとは別の、ねこたちが快適に過ごせるための空間です。'],
  ['.sala__reglas li:nth-child(1)', '月〜金・12:00〜21:00'],
  ['.sala__reglas li:nth-child(2)', '入室前に手を洗ってください'],
  ['.sala__reglas li:nth-child(3)', '食べ物をあげないでください'],
  ['.sala__reglas li:nth-child(4)', 'ねこから近づいてくるのを待ちましょう'],
  ['.datos div:nth-child(1) dt', '営業日'],
  ['.datos div:nth-child(1) dd', '月曜日〜土曜日'],
  ['.datos div:nth-child(2) dt', '営業時間'],
  ['.datos div:nth-child(3) dt', '住所'],
  ['.datos div:nth-child(3) dd', 'Cl. 29 Nte. #6bis norte<br>コロンビア、バジェ・デル・カウカ県カリ'],
  ['.footer__datos p:nth-child(1) span', '住所：Cl. 3 #10 - 18, Comuna 3 (San Antonio)<br>コロンビア、バジェ・デル・カウカ県カリ'],
  ['.footer__datos p:nth-child(2) span', 'メール：<a href="mailto:michicoffee@gmail.com">michicoffee@gmail.com</a>'],
  ['.footer__datos p:nth-child(3) span', '営業時間：月曜日〜土曜日 12:00〜21:00'],
  ['#enlaces-titulo', '便利なリンク'],
  ['.footer__enlaces li:nth-child(1) a', 'メニュー'],
  ['.footer__enlaces li:nth-child(2) a', 'プロモーション'],
  ['.footer__enlaces li:nth-child(3) a', '私たちについて'],
  ['.footer__enlaces li:nth-child(4) a', 'よくある質問'],
  ['.footer__enlaces li:nth-child(5) a', '利用規約'],
  ['.footer__enlaces li:nth-child(6) a', 'プライバシーポリシー'],
  ['.footer__redes h2.footer__titulo', 'フォローしてね <span aria-hidden="true">🌸</span>'],
  ['.footer__legal', '© 2026 MICHI COFFEE. 無断転載を禁じます。'],
  // formulario de adopción
  ['.solicitud__intro', 'ねこに恋しましたか？ご連絡先を残していただければ、ねこ部屋の見学日程を決めるためにご連絡します。'],
  ['label[for="f-nombre"]', 'お名前 <span class="obligatorio" aria-hidden="true">*</span>'],
  ['label[for="f-correo"]', 'メールアドレス <span class="obligatorio" aria-hidden="true">*</span>'],
  ['label[for="f-telefono"]', '電話番号 <span class="opcional">（任意）</span>'],
  ['label[for="f-michi"]', '会いたいねこは？ <span class="obligatorio" aria-hidden="true">*</span>'],
  ['#f-michi option:nth-child(1)', '選んでください'],
  ['#f-michi option:nth-child(2)', '子ねこ'],
  ['#f-michi option:nth-child(3)', '大人のねこ'],
  ['#f-michi option:nth-child(4)', 'まだ決めていない、みんなに会いたい'],
  ['.opciones legend', 'ほかにペットを飼っていますか？'],
  ['label[for="f-mensaje"]', 'おうちのことを教えてください <span class="opcional">（任意）</span>'],
  ['.formulario__nota', '<span aria-hidden="true">*</span> 必須項目']
];
const bloques = TEXTOS_JA.flatMap(([sel, ja]) => [...document.querySelectorAll(sel)].map(el => ({ el, ja, es: el.innerHTML })));
const traducibles = [...document.querySelectorAll('[data-ja]')];      // textos cortos: títulos, menú y botones
traducibles.forEach(el => { el.dataset.es = el.firstChild.textContent; });
document.querySelectorAll('.plato__ver').forEach(b => { b.dataset.es = b.firstChild.textContent; b.dataset.ja = '本物の写真を見る '; traducibles.push(b); });
const PISTA = { es: ['¡Tócalo para que te salude!', '¡Michi te saluda! ♥'], ja: ['タッチするとあいさつするよ！', 'ミチがあいさつしてるよ！♥'] };
const botonIdioma = document.getElementById('idioma');
let japones = false;
botonIdioma.addEventListener('click', () => {
  japones = !japones;
  traducibles.forEach(el => { el.firstChild.textContent = japones ? el.dataset.ja : el.dataset.es; });
  bloques.forEach(b => { b.el.innerHTML = japones ? b.ja : b.es; });
  document.getElementById('gato-pista').textContent = PISTA[japones ? 'ja' : 'es'][saludando ? 1 : 0];
  botonIdioma.textContent = japones ? '日本語' : 'ES';
  botonIdioma.setAttribute('aria-label', japones ? 'Cambiar idioma a español' : 'Cambiar idioma a japonés');
  document.documentElement.lang = japones ? 'ja' : 'es';
  // los errores que estén a la vista en el formulario también cambian de idioma
  validables.forEach(c => { if (c.hasAttribute('aria-invalid')) revisar(c); });
});

/* ---------- Pestañas del menú (con teclado: flechas, Inicio, Fin) ---------- */
const pestanas = [...document.querySelectorAll('.pestana')];
function activar(pestana, enfocar) {
  pestanas.forEach(p => {
    const si = p === pestana;
    p.setAttribute('aria-selected', si);
    p.tabIndex = si ? 0 : -1;
    document.getElementById(p.getAttribute('aria-controls')).hidden = !si;
  });
  if (enfocar) pestana.focus();
}
pestanas.forEach((p, i) => {
  p.addEventListener('click', () => activar(p));
  p.addEventListener('keydown', e => {
    const mapa = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: pestanas.length - 1 };
    if (!(e.key in mapa)) return;
    e.preventDefault();
    activar(pestanas[(mapa[e.key] + pestanas.length) % pestanas.length], true);
  });
});

/* ---------- Ventana de detalle (overlay) ---------- */
const dialogo = document.getElementById('detalle');
const $ = id => document.getElementById(id);
let disparador = null;
document.querySelectorAll('[data-detalle]').forEach(b => b.addEventListener('click', () => {
  const d = DETALLES[b.dataset.detalle];
  if (!d) return;
  const ja = japones ? (DETALLES_JA[b.dataset.detalle] || {}) : {};
  disparador = b;
  $('detalle-img').src = d.img; $('detalle-img').alt = d.alt;
  $('detalle-cat').textContent = ja.cat || d.cat;
  $('detalle-nombre').textContent = ja.nombre || d.nombre;
  $('detalle-jp').textContent = d.jp;
  $('detalle-desc').textContent = ja.desc || d.desc;
  $('detalle-cerrar').setAttribute('aria-label', japones ? '閉じる' : 'Cerrar');
  $('detalle-precio').textContent = d.precio;
  $('detalle-antes').textContent = d.antes || '';
  // etiqueta rosada de la promo (NUEVO, −30%, 2x1); los platos del menú no la llevan
  $('detalle-etiqueta').textContent = ja.etiqueta || d.etiqueta || '';
  $('detalle-etiqueta').hidden = !d.etiqueta;
  dialogo.showModal();
}));
$('detalle-cerrar').addEventListener('click', () => dialogo.close());
dialogo.addEventListener('click', e => { if (e.target === dialogo) dialogo.close(); });   // clic afuera
dialogo.addEventListener('close', () => { if (disparador) disparador.focus(); });

/* ---------- Formulario de solicitud de adopción ----------
   Valida cada campo, muestra el error debajo (y lo anuncia al lector de pantalla)
   y, si todo está bien, muestra un mensaje de confirmación. La página no tiene
   servidor, así que la solicitud no se envía a ningún lado: es una maqueta. */
const formulario = $('formulario-adopcion');
const exito = $('formulario-exito');
const ERRORES = {
  es: { nombre: 'Escribe tu nombre.', nombreCorto: 'Escribe tu nombre completo.', correo: 'Escribe tu correo.',
        correoMal: 'Revisa tu correo, debe verse así: sofia@correo.com', telefono: 'Escribe solo números (de 7 a 15).',
        michi: 'Elige una opción.', acepto: 'Debes aceptar para poder enviar la solicitud.' },
  ja: { nombre: 'お名前を入力してください。', nombreCorto: 'フルネームを入力してください。', correo: 'メールアドレスを入力してください。',
        correoMal: 'メールアドレスを確認してください（例：sofia@correo.com）。', telefono: '数字のみで入力してください（7〜15桁）。',
        michi: '選択してください。', acepto: '送信するには同意が必要です。' }
};
function errorDe(campo) {
  const t = ERRORES[japones ? 'ja' : 'es'], v = campo.validity;
  switch (campo.id) {
    case 'f-nombre': return v.valueMissing || !campo.value.trim() ? t.nombre : (campo.value.trim().length < 3 ? t.nombreCorto : '');
    case 'f-correo': return v.valueMissing ? t.correo : (v.typeMismatch ? t.correoMal : '');
    case 'f-telefono': {                      // opcional, pero si lo escriben: solo números, espacios, + ( ) -
      const tel = campo.value.trim();
      return tel && !/^[0-9 +()-]{7,15}$/.test(tel) ? t.telefono : '';
    }
    case 'f-michi': return v.valueMissing ? t.michi : '';
    case 'f-acepto': return v.valueMissing ? t.acepto : '';
  }
  return '';
}
const validables = ['f-nombre', 'f-correo', 'f-telefono', 'f-michi', 'f-acepto'].map($);
function revisar(campo) {
  const msj = errorDe(campo);
  $(campo.id + '-error').textContent = msj;
  if (msj) campo.setAttribute('aria-invalid', 'true'); else campo.removeAttribute('aria-invalid');
  return !msj;
}
validables.forEach(c => {
  c.addEventListener('blur', () => { if (c.value || c.type === 'checkbox') revisar(c); });
  c.addEventListener(c.tagName === 'SELECT' || c.type === 'checkbox' ? 'change' : 'input', () => { if (c.hasAttribute('aria-invalid')) revisar(c); });
});
formulario.addEventListener('submit', e => {
  e.preventDefault();
  exito.hidden = true;
  const malos = validables.filter(c => !revisar(c));
  if (malos.length) { malos[0].focus(); return; }
  const nombre = $('f-nombre').value.trim().split(/\s+/)[0], correo = $('f-correo').value.trim();
  exito.textContent = japones
    ? `ありがとうございます、${nombre}さん！お申し込みを受け付けました。ねこ部屋の見学について ${correo} にご連絡します。🐾`
    : `¡Gracias, ${nombre}! Recibimos tu solicitud. Te escribiremos a ${correo} para agendar tu visita a la sala de michis. 🐾`;
  exito.hidden = false;
  formulario.reset();
});

/* ---------- Gato barista: reposo → saludo → reposo ---------- */
const gato = $('gato'), gatoImg = $('gato-img'), pista = $('gato-pista');
const REPOSO = 'img/gato/reposo.gif', SALUDO = 'img/gato/saludo.gif', DURACION = 2500;
let saludoBlob = null, saludando = false;
fetch(SALUDO).then(r => r.blob()).then(b => { saludoBlob = b; }).catch(() => {});
/* Maullidos sintetizados con Web Audio (sin archivos de audio).
   Una voz "diente de sierra" pasa por dos filtros que imitan la boca del gato
   abriéndose y cerrándose (m-i-a-u), con un tono que sube y baja. */
let audio = null, turnoMaullido = 0;
const MAULLIDOS = [
  { // 1) "¡Miau!" agudo de gatito
    dur: 0.78, vol: 0.55,
    tono: [[0, 560], [0.1, 900], [0.34, 820], [0.78, 470]],
    f1: [[0, 320], [0.12, 520], [0.32, 950], [0.78, 380]],
    f2: [[0, 1700], [0.12, 2400], [0.32, 1550], [0.78, 850]],
    vol_: [[0, 0], [0.06, 1], [0.55, 0.85], [0.78, 0]]
  },
  { // 2) "Mrrr… miau": trino contento y un miau más grave
    dur: 1.0, vol: 0.95, trino: 0.34,
    tono: [[0, 400], [0.3, 470], [0.46, 720], [0.62, 690], [1.0, 420]],
    f1: [[0, 300], [0.32, 380], [0.48, 880], [1.0, 360]],
    f2: [[0, 1300], [0.32, 1500], [0.48, 1650], [1.0, 800]],
    vol_: [[0, 0], [0.04, 0.8], [0.32, 0.6], [0.44, 1], [0.8, 0.8], [1.0, 0]]
  }
];
function curva(param, puntos, t0) {
  param.setValueAtTime(puntos[0][1] || 0.0001, t0);
  puntos.slice(1).forEach(([t, v]) => param.linearRampToValueAtTime(v || 0.0001, t0 + t));
}
function maullar() {
  try {
    audio = audio || new (window.AudioContext || window.webkitAudioContext)();
    if (audio.state === 'suspended') audio.resume();
  } catch (e) { return; }                       // navegador sin audio: el saludo sigue igual
  const m = MAULLIDOS[turnoMaullido++ % MAULLIDOS.length];
  const t = audio.currentTime + 0.02, fin = t + m.dur;
  const salida = audio.createGain(); salida.gain.value = m.vol; salida.connect(audio.destination);
  const suave = audio.createBiquadFilter(); suave.type = 'lowpass'; suave.frequency.value = 3800; suave.connect(salida);
  const envolvente = audio.createGain(); envolvente.connect(suave); curva(envolvente.gain, m.vol_, t);
  // voz
  const voz = audio.createOscillator(); voz.type = 'sawtooth'; curva(voz.frequency, m.tono, t);
  const vozSuave = audio.createOscillator(); vozSuave.type = 'triangle'; curva(vozSuave.frequency, m.tono, t);
  const vibrato = audio.createOscillator(), vibratoG = audio.createGain();
  vibrato.frequency.value = 6; vibratoG.gain.value = 14;
  vibrato.connect(vibratoG); vibratoG.connect(voz.frequency); vibratoG.connect(vozSuave.frequency);
  // "boca" del gato: dos filtros que se mueven (formantes)
  const boca1 = audio.createBiquadFilter(); boca1.type = 'bandpass'; boca1.Q.value = 5; curva(boca1.frequency, m.f1, t);
  const boca2 = audio.createBiquadFilter(); boca2.type = 'bandpass'; boca2.Q.value = 7; curva(boca2.frequency, m.f2, t);
  const g1 = audio.createGain(), g2 = audio.createGain(), g3 = audio.createGain();
  g1.gain.value = 1; g2.gain.value = 0.7; g3.gain.value = 0.35;
  voz.connect(boca1); voz.connect(boca2); vozSuave.connect(g3);
  boca1.connect(g1); boca2.connect(g2);
  // trino: la voz "vibra" rápido al principio (mrrr)
  let destino = envolvente;
  if (m.trino) {
    const trino = audio.createGain(); trino.gain.value = 0.55; trino.connect(envolvente);
    const lfo = audio.createOscillator(), lfoG = audio.createGain();
    lfo.type = 'square'; lfo.frequency.value = 27;
    lfoG.gain.setValueAtTime(0.45, t); lfoG.gain.setValueAtTime(0.45, t + m.trino); lfoG.gain.linearRampToValueAtTime(0, t + m.trino + 0.08);
    lfo.connect(lfoG); lfoG.connect(trino.gain);
    lfo.start(t); lfo.stop(fin + 0.05);
    destino = trino;
  }
  [g1, g2, g3].forEach(g => g.connect(destino));
  [voz, vozSuave, vibrato].forEach(o => { o.start(t); o.stop(fin + 0.05); });
}

gato.addEventListener('click', () => {
  if (saludando) return;
  saludando = true;
  maullar();
  // una URL nueva hace que el GIF empiece siempre desde el primer cuadro
  const url = saludoBlob ? URL.createObjectURL(saludoBlob) : SALUDO + '?t=' + Date.now();
  const altReposo = gatoImg.alt;
  gatoImg.src = url;
  // el texto alternativo también cambia, para que el lector de pantalla describa el saludo
  gatoImg.alt = 'Michi, el gato barista en 3D, da un saltito de emoción, saluda con la patita, cierra los ojitos feliz, mueve la cola y le salen corazoncitos';
  pista.textContent = PISTA[japones ? 'ja' : 'es'][1];
  setTimeout(() => {
    gatoImg.src = REPOSO;
    gatoImg.alt = altReposo;
    if (saludoBlob) URL.revokeObjectURL(url);
    pista.textContent = PISTA[japones ? 'ja' : 'es'][0];
    saludando = false;
  }, DURACION);
});

/* ---------- Galería de adopción en loop infinito ---------- */
const pista2 = document.querySelector('.galeria__pista');
if (pista2) {
  [...pista2.children].forEach(li => {
    const copia = li.cloneNode(true);
    copia.setAttribute('aria-hidden', 'true');
    copia.querySelector('img').alt = '';
    pista2.appendChild(copia);
  });
}

/* ---------- Promos: parallax horizontal guiado por el scroll ----------
   Mientras bajas por la sección (que se queda fija), las tarjetas avanzan de lado.
   La del centro se ve grande y nítida; las de los lados, pequeñas y borrosas. */
const secPromos = document.getElementById('promos');
if (secPromos && !sinMovimiento) {
  const lista = secPromos.querySelector('.promos__lista');
  const items = [...lista.children];
  const tarjetas = items.map(li => li.querySelector('.promo'));
  const palabras = [...secPromos.querySelectorAll('.promos__palabras span')];
  const huellas = secPromos.querySelector('.promos__huellas');
  const puntos = [...secPromos.querySelectorAll('.promos__puntos button')];
  const contador = document.getElementById('promo-actual');
  const n = items.length;
  const suave = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
  let ultimo = -1;

  function promosMover() {
    const caja = secPromos.getBoundingClientRect();
    const recorrido = secPromos.offsetHeight - innerHeight;
    const r = Math.min(1, Math.max(0, -caja.top / recorrido)) * (n - 1);
    // cada tarjeta se "queda" un momento en el centro antes de pasar a la siguiente
    const seg = Math.min(Math.floor(r), n - 2), p = seg + suave(0.2, 0.8, r - seg);
    const escenario = lista.parentElement;
    if (esMovil.matches) {          // celular: las tarjetas suben (vertical)
      const paso = items[1].offsetTop - items[0].offsetTop;
      const centro = escenario.clientHeight / 2 - (items[0].offsetTop + items[0].offsetHeight / 2);
      lista.style.transform = `translate3d(0, ${(centro - p * paso).toFixed(1)}px, 0)`;
      if (huellas) huellas.style.transform = `translate3d(0, ${(-p * paso * 0.3).toFixed(1)}px, 0)`;
    } else {                        // computador: las tarjetas avanzan de lado (horizontal)
      const paso = items[1].offsetLeft - items[0].offsetLeft;
      const centro = escenario.clientWidth / 2 - (items[0].offsetLeft + items[0].offsetWidth / 2);
      lista.style.transform = `translate3d(${(centro - p * paso).toFixed(1)}px, 0, 0)`;
      if (huellas) huellas.style.transform = `translate3d(${(-p * paso * 0.3).toFixed(1)}px, 0, 0)`;
    }
    tarjetas.forEach((t, i) => {
      const d = Math.min(1, Math.abs(i - p));
      t.style.transform = `scale(${(1 - 0.24 * d).toFixed(3)})`;
      t.style.filter = d > 0.01 ? `blur(${(5 * d).toFixed(1)}px) saturate(${(1 - 0.35 * d).toFixed(2)})` : 'none';
      t.style.opacity = (1 - 0.35 * d).toFixed(2);
      items[i].style.zIndex = d < 0.5 ? 2 : 1;
    });
    palabras.forEach((w, i) => { w.style.opacity = (0.11 * (1 - Math.min(1, Math.abs(i - p) * 1.6))).toFixed(3); });
    const activa = Math.round(p);
    if (activa !== ultimo) {
      ultimo = activa;
      contador.textContent = String(activa + 1).padStart(2, '0');
      puntos.forEach((b, i) => b.setAttribute('aria-current', i === activa ? 'true' : 'false'));
    }
  }
  // ir a una promo: bajar hasta el punto del scroll donde queda en el centro
  const irA = i => {
    const recorrido = secPromos.offsetHeight - innerHeight;
    scrollTo({ top: secPromos.offsetTop + recorrido * (i / (n - 1)), behavior: 'smooth' });
  };
  puntos.forEach((b, i) => b.addEventListener('click', () => irA(i)));
  items.forEach((li, i) => li.addEventListener('focusin', () => { if (Math.round(ultimo) !== i) irA(i); }));
  let pendientePromo = false;
  const pedirPromo = () => { if (!pendientePromo) { pendientePromo = true; requestAnimationFrame(() => { pendientePromo = false; promosMover(); }); } };
  addEventListener('scroll', pedirPromo, { passive: true });
  addEventListener('resize', pedirPromo);
  promosMover();
}

/* ---------- Parallax: cada capa se mueve a distinta velocidad ---------- */
if (!sinMovimiento) {
  const capas = [...document.querySelectorAll('[data-parallax]')];
  const fondos = [...document.querySelectorAll('[data-parallax-fondo]')];
  let pendiente = false;
  function mover() {
    pendiente = false;
    const mitad = innerHeight / 2;
    capas.forEach(el => {
      const caja = el.parentElement.getBoundingClientRect();
      if (caja.bottom < -200 || caja.top > innerHeight + 200) return;
      const distancia = caja.top + caja.height / 2 - mitad;
      let y = distancia * parseFloat(el.dataset.parallax);
      if ('parallaxLimite' in el.dataset) {          // la foto nunca se corre más que su sobrante
        const sobra = Math.max(0, (el.offsetHeight - caja.height) / 2);
        y = Math.max(-sobra, Math.min(sobra, y));
      }
      el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
    });
    fondos.forEach(el => {
      const caja = el.parentElement.getBoundingClientRect();
      if (caja.bottom < 0 || caja.top > innerHeight) return;
      el.style.backgroundPosition = `0 ${(caja.top * parseFloat(el.dataset.parallaxFondo)).toFixed(1)}px`;
    });
  }
  const pedir = () => { if (!pendiente) { pendiente = true; requestAnimationFrame(mover); } };
  addEventListener('scroll', pedir, { passive: true });
  addEventListener('resize', pedir);
  mover();
}
