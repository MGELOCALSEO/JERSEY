// Vercel Web Analytics
import { inject } from '@vercel/analytics';
inject();

window.toggleNav = function(){
  const nav = document.querySelector('.nav');
  nav.classList.toggle('nav-open');
};

document.addEventListener('click', function(e){
  const nav = document.querySelector('.nav');
  if(nav.classList.contains('nav-open') && !nav.contains(e.target)){
    nav.classList.remove('nav-open');
  }
});

(() => {
  const avif = new Image();
  avif.onload = () => document.documentElement.dataset.avif = '1';
  avif.onerror = () => document.documentElement.dataset.avif = '0';
  avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMj8LAfS8PgAWAAQIABmhbBc=';
})();

function trackWA(source){
  try{
    if (typeof gtag === 'function') {
      gtag('event', 'whatsapp_click', { source: source });
    }
    if (typeof fbq === 'function') {
      fbq('trackCustom', 'WhatsAppClick', { source: source });
    }
    console.log('[track] whatsapp_click:', source);
  } catch(e){}
}

function cycleImages(id, list, ms){
  const el = document.getElementById(id);
  if(!el) return;
  let i = 0;
  setInterval(() => { i = (i + 1) % list.length; el.src = list[i]; }, ms);
}

const SITE_NAME = 'Makelele Jerseys';
const DEFAULT_TITLE = 'Makelele Jerseys, Original & Custom Football Jerseys, Lagos';
const DEFAULT_DESC = 'Shop authentic club jerseys, Super Eagles kits, retro collections and custom football shirts. Same-day Lagos delivery, nationwide shipping. Order on WhatsApp.';
let _productSchemaEl = null;

function setProductSEO(product){
  document.title = product.team + ' ' + (product.name || product.kit) + ' | ' + SITE_NAME;
  const metaDesc = document.querySelector('meta[name="description"]');
  if(metaDesc) metaDesc.setAttribute('content', product.description || DEFAULT_DESC);
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if(ogTitle) ogTitle.setAttribute('content', product.team + ' ' + (product.name || product.kit) + ' | ' + SITE_NAME);
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if(ogDesc) ogDesc.setAttribute('content', product.description || DEFAULT_DESC);
  const ogImage = document.querySelector('meta[property="og:image"]');
  if(ogImage && product.images) ogImage.setAttribute('content', 'https://www.makelelejersey.com' + product.images[0]);
  const canonical = document.querySelector('link[rel="canonical"]');
  if(canonical) canonical.setAttribute('href', 'https://www.makelelejersey.com/product/' + product.slug);

  if(_productSchemaEl) _productSchemaEl.remove();
  _productSchemaEl = document.createElement('script');
  _productSchemaEl.type = 'application/ld+json';
  _productSchemaEl.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.team + ' ' + (product.name || product.kit),
    "description": product.description || '',
    "image": product.images ? 'https://www.makelelejersey.com' + product.images[0] : '',
    "brand": { "@type": "Brand", "name": product.team },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "NGN",
      "price": product.price ? product.price.replace(/[^0-9]/g,'') : '35000',
      "availability": product.inStock !== false ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "url": "https://www.makelelejersey.com/product/" + product.slug
    }
  });
  document.head.appendChild(_productSchemaEl);
}

function resetSEO(){
  document.title = DEFAULT_TITLE;
  const metaDesc = document.querySelector('meta[name="description"]');
  if(metaDesc) metaDesc.setAttribute('content', DEFAULT_DESC);
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if(ogTitle) ogTitle.setAttribute('content', DEFAULT_TITLE);
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if(ogDesc) ogDesc.setAttribute('content', DEFAULT_DESC);
  const ogImage = document.querySelector('meta[property="og:image"]');
  if(ogImage) ogImage.setAttribute('content', 'https://www.makelelejersey.com/images/misc/jersey-hero.svg');
  const canonical = document.querySelector('link[rel="canonical"]');
  if(canonical) canonical.setAttribute('href', 'https://www.makelelejersey.com');
  if(_productSchemaEl){ _productSchemaEl.remove(); _productSchemaEl = null; }
}

cycleImages('club-imgs', [
  '/images/club/2026-27 shirts/Liverpool Home Jersey 26_27.png',
  '/images/club/2026-27 shirts/Barcelona Home Jersey 26_27.png',
  '/images/club/2026-27 shirts/Bayern Munich Home Jersey 26_27.png',
  '/images/club/2026-27 shirts/Juventus Home Jersey 26_27.png',
  '/images/club/2026-27 shirts/PSG Home Jersey 26_27.png',
], 7000);

cycleImages('retro-imgs', [
  '/images/retro/manchester-united-1998-99-home-kit.jpg',
  '/images/retro/manchester-united-2007-08-home-kit.jpg',
  '/images/retro/arsenal-fc-2005-06-home-kit.jpg',
  '/images/retro/chelsea-fc-2012-13-home-kit.jpg',
  '/images/retro/fc-barcelona-2010-11-home-kit.jpg',
  '/images/retro/liverpool-fc-2017-18-home-kit.jpg',
  '/images/retro/real-madrid-1998-99-home-kit.jpg',
  '/images/retro/ac-milan-2006-07-home-kit.jpg',
  '/images/retro/nigeria-1994-95-home-kit.jpg',
], 3500);

cycleImages('kids-imgs', [
  '/images/kids/Man u.jpg',
  '/images/kids/Arsenal Kids.jpg',
  '/images/kids/Arsenal away kids.jpg',
  '/images/kids/Barcelona.jpg',
  '/images/kids/Real Madrid  Kids.jpg',
], 3500);

const products = [
  { id:'prod-1', team:'Manchester United', name:'Home Jersey 26/27', tag:'Home Kit', cat:'club', price:'₦35,000', slug:'manchester-united-home-26-27', description:'The 2026/27 Manchester United home kit delivers the classic red devil look with modern performance fabric. Breathable mesh panels and a tailored fit make it match-day ready.', material:'100% Recycled Polyester', features:['Dri-FIT moisture management','Breathable mesh side panels','Authentic club crest','Ribbed crew neck collar'], inStock:true, images:['/images/club/2026-27%20shirts/Manchester%20United%20Home%20Jersey%2026_27.png'] },
  { id:'prod-2', team:'Arsenal', name:'Home Jersey 26/27', tag:'Home Kit', cat:'club', price:'₦35,000', slug:'arsenal-home-26-27', description:'Arsenal\'s 2026/27 home shirt features the iconic red body with white sleeves, updated with a sleek modern cut and premium fabric finish.', material:'100% Recycled Polyester', features:['Aeroready technology','Lightweight woven fabric','Emirates sponsor print','Authentic Arsenal badge'], inStock:true, images:['/images/club/2026-27%20shirts/Arsenal%20Home%20Jersey%2026_27.png'] },
  { id:'prod-3', team:'Real Madrid', name:'Home Jersey 26/27', tag:'Home Kit', cat:'club', price:'₦35,000', slug:'real-madrid-home-26-27', description:'The king of European football returns with a clean white home kit for 2026/27. Subtle detailing and premium construction set this apart.', material:'100% Recycled Polyester', features:['Dri-FIT ADV technology','Structured fit','Gold club crest detailing','UV protection'], inStock:true, images:['/images/club/2026-27%20shirts/Real%20Madrid%20Home%20Jersey%2026_27.png'] },
  { id:'prod-4', team:'Super Eagles', name:'Home Jersey 26/27', tag:'Home Kit', cat:'national', price:'₦30,000', slug:'super-eagles-home-26-27', description:'Rep the Naija spirit with the Super Eagles 2026/27 home kit. Bold green design with intricate pattern details inspired by Nigerian culture.', material:'100% Polyester', features:['Lightweight breathable fabric','NFF official design','Bold cultural pattern','Comfortable regular fit'], inStock:true, images:['/images/national/nigeria-2026-home-kit.jpg'] },
  { id:'prod-5', team:'FC Barcelona', name:'Home Jersey 26/27', tag:'Home Kit', cat:'club', price:'₦35,000', slug:'fc-barcelona-home-26-27', description:'Barcelona\'s 2026/27 home kit blends the traditional blaugrana stripes with a fresh modern twist. Premium quality you can feel.', material:'100% Recycled Polyester', features:['Nike Dri-FIT','Moisture-wicking fabric','Barca crest','Athletic fit'], inStock:true, images:['/images/club/2026-27%20shirts/Barcelona%20Home%20Jersey%2026_27.png'] },
  { id:'prod-6', team:'Chelsea', name:'Home Jersey 26/27', tag:'Home Kit', cat:'club', price:'₦35,000', slug:'chelsea-home-26-27', description:'Chelsea\'s 2026/27 home jersey brings the blues with a sharp, clean design. Built for comfort on and off the pitch.', material:'100% Recycled Polyester', features:['Dri-FIT technology','Breathable construction','Crest heat-transfer','Regular fit'], inStock:true, images:['/images/club/2026-27%20shirts/Chelsea%20Home%20Jersey%2026_27.png'] },
];

(function renderProducts(){
  const grid = document.getElementById('prod-grid');
  if(!grid) return;
  grid.innerHTML = products.map(p => `
    <div class="prod-card" data-id="${p.id}" data-slug="${p.slug || ''}">
      <div class="prod-visual">
        <span class="prod-tag">${p.tag}</span>
        <span class="cat-prod-price">${p.price}</span>
        <img id="${p.id}-img" src="${p.images[0]}" alt="${p.team} ${p.name}" loading="lazy">
      </div>
      <div class="prod-body">
        <div class="team">${p.team}</div>
        <h3>${p.name}</h3>
        <div class="prod-meta"><span>S – XXL</span><span>Custom ✓</span></div>
        <button class="btn btn-primary btn-block" data-custom="${p.id}" data-cat="${p.cat}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg> Order Now</button>
      </div>
    </div>
  `).join('');

  products.forEach(p => cycleImages(p.id + '-img', p.images, 3500));
})();

function openWA(url, label){
  window.open(url, '_blank');
  trackWA(label);
}

function updatePriceDisplay(){
  const form = document.getElementById('product-form');
  const pref = document.getElementById('pv-preference').value;
  const baseVal = parseInt(form.dataset.baseVal) || 35000;
  const hasCustom = pref === 'customized';
  document.getElementById('pv-custom-row').style.display = hasCustom ? '' : 'none';
  const total = baseVal + (hasCustom ? 5000 : 0);
  document.getElementById('pv-total').textContent = '\u20A6' + total.toLocaleString();
}

function showProductView(btn, productData, fromRouter){
  const card = btn.closest('.prod-card, .cat-prod-card');
  const form = document.getElementById('product-form');
  const isCustom = !card && !productData;

  document.querySelectorAll('.pv-opt-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.pv-opt-btn[data-value="M"]')?.classList.add('active');
  document.getElementById('pv-size').value = 'M';
  document.getElementById('pv-preference').value = 'plain';
  document.getElementById('pv-custom-fields').classList.add('hidden');
  document.getElementById('pv-custom-name').value = '';
  document.getElementById('pv-custom-number').value = '';
  document.getElementById('pv-location').value = '';
  document.getElementById('pv-badge').value = 'None';

  let team, kit, priceText, baseVal, images, cat, description, material, features, inStock, tag, slug;

  if(productData){
    team = productData.team;
    kit = productData.name || productData.kit;
    priceText = productData.price;
    baseVal = parseInt(priceText.replace(/[^0-9]/g,'')) || 35000;
    images = productData.images || (productData.img ? [productData.img] : []);
    cat = productData.cat || '';
    description = productData.description || '';
    material = productData.material || '';
    features = productData.features || [];
    inStock = productData.inStock !== false;
    tag = productData.tag || catConfig[cat]?.label || '';
    slug = productData.slug || '';
  } else if(card){
    team = card.querySelector('.team').textContent;
    kit = card.querySelector('h3').textContent;
    const priceEl = card.querySelector('.cat-prod-price');
    priceText = priceEl ? priceEl.textContent : '';
    baseVal = priceEl ? parseInt(priceEl.textContent.replace(/[^0-9]/g,'')) : 35000;
    images = [card.querySelector('img').src];
    cat = btn.dataset.cat || '';
    slug = card.dataset.slug || '';
    const lookup = slug ? findProductBySlug(slug) : null;
    description = lookup?.description || '';
    material = lookup?.material || '';
    features = lookup?.features || [];
    inStock = lookup?.inStock !== false;
    tag = lookup?.tag || catConfig[cat]?.label || '';
  } else {
    team = 'Custom Order';
    kit = 'Custom Jersey';
    priceText = '\u20A635,000';
    baseVal = 35000;
    images = ['/images/customized/arsenal%20customized.png'];
    cat = '';
    slug = '';
    description = 'Design your own custom jersey with any name, number, and club badge.';
    material = 'Premium Polyester';
    features = ['Custom name & number','Any club badge','Multiple font styles','S – XXL available'];
    inStock = true;
    tag = 'Custom';
  }

  document.getElementById('pv-team').textContent = team;
  document.getElementById('pv-name').textContent = kit;
  document.getElementById('pv-price-display').textContent = priceText;
  const gallery = document.getElementById('pv-gallery-imgs');
  if(gallery){
    gallery.innerHTML = images.map(src =>
      '<img src="' + src + '" alt="' + team + ' ' + kit + '" loading="lazy">'
    ).join('');
  }
  document.getElementById('pv-tag').textContent = tag;

  const catNames = { club:'Club Jerseys', national:'National Teams', retro:'Retro Collection', kids:'Kids Jerseys' };
  const bcCat = document.getElementById('pv-bc-cat');
  if(cat && catNames[cat]){
    bcCat.textContent = catNames[cat];
    bcCat.href = '/category/' + cat;
    bcCat.style.display = '';
  } else if(isCustom || !card){
    bcCat.style.display = 'none';
  }
  document.getElementById('pv-bc-product').textContent = team + ' ' + kit;

  const stockEl = document.getElementById('pv-stock');
  const stockDot = stockEl.querySelector('.pv-stock-dot');
  const stockText = stockEl.querySelector('.pv-stock-text');
  stockEl.classList.remove('in-stock', 'out-of-stock');
  if(inStock){
    stockEl.classList.add('in-stock');
    stockText.textContent = 'In Stock';
  } else {
    stockEl.classList.add('out-of-stock');
    stockText.textContent = 'Out of Stock';
  }

  const descEl = document.getElementById('pv-desc');
  descEl.innerHTML = description ? '<p>' + description + '</p>' : '';
  if(material){ descEl.innerHTML += '<p><strong>Material:</strong> ' + material + '</p>'; }

  const featEl = document.getElementById('pv-features');
  if(features.length){
    featEl.innerHTML = features.map(f =>
      '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" width="14" height="14"><path d="M20 6L9 17l-5-5"/></svg>' + f + '</li>'
    ).join('');
    featEl.style.display = '';
  } else {
    featEl.innerHTML = '';
    featEl.style.display = 'none';
  }

  form.dataset.baseVal = String(baseVal);
  form.dataset.team = team;
  form.dataset.kit = kit;
  form.dataset.cat = cat;
  form.dataset.slug = slug;

  document.getElementById('pv-label').textContent = 'Jersey Price';
  document.getElementById('pv-base').textContent = '\u20A6' + baseVal.toLocaleString();
  updatePriceDisplay();

  document.getElementById('category-view')?.classList.add('hidden');
  homeSections().forEach(el => {
    el.dataset._disp = el.style.display;
    el.style.setProperty('display', 'none', 'important');
  });
  document.getElementById('product-view').classList.remove('hidden');
  document.body.style.overflow = '';

  if(slug && !fromRouter){
    history.pushState(null, '', '/product/' + slug);
  }

  if(productData || (slug && findProductBySlug(slug))){
    setProductSEO(productData || findProductBySlug(slug));
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('click', function(e){
  const optBtn = e.target.closest('.pv-opt-btn');
  if(optBtn && optBtn.closest('.pv-size-group')){
    optBtn.closest('.pv-size-group').querySelectorAll('.pv-opt-btn').forEach(b => b.classList.remove('active'));
    optBtn.classList.add('active');
    document.getElementById('pv-size').value = optBtn.dataset.value;
    return;
  }
  if(optBtn && optBtn.closest('.pv-pref-group')){
    optBtn.closest('.pv-pref-group').querySelectorAll('.pv-opt-btn').forEach(b => b.classList.remove('active'));
    optBtn.classList.add('active');
    const val = optBtn.dataset.value;
    document.getElementById('pv-preference').value = val;
    const cf = document.getElementById('pv-custom-fields');
    if(val === 'customized'){
      cf.classList.remove('hidden');
    } else {
      cf.classList.add('hidden');
    }
    updatePriceDisplay();
    return;
  }
});

document.addEventListener('click', function(e){
  const orderBtn = e.target.closest('[data-order]');
  if(orderBtn && !e.target.closest('[data-custom]')){
    const card = orderBtn.closest('.prod-card');
    if(card){
      const slug = card.dataset.slug;
      const prodData = slug ? findProductBySlug(slug) : null;
      showProductView({ closest: () => card, dataset: {} }, prodData);
    }
    return;
  }
  const customBtn = e.target.closest('[data-custom], [data-order-cat]');
  if(customBtn){
    const card = customBtn.closest('.cat-prod-card, .prod-card');
    if(card && card.dataset.slug){
      const prodData = findProductBySlug(card.dataset.slug);
      showProductView(customBtn, prodData);
    } else {
      showProductView(customBtn);
    }
    return;
  }
  if(e.target.id === 'start-custom-btn' || e.target.closest('#start-custom-btn')){
    const fakeBtn = { closest: () => null, dataset: {} };
    showProductView(fakeBtn);
    return;
  }
  const waBtn = e.target.closest('[data-wa]');
  if(waBtn){ openWA(waBtn.href, waBtn.dataset.wa); return; }

  const pageBtn = e.target.closest('.cv-page-btn');
  if(pageBtn && !pageBtn.disabled){
    const dir = pageBtn.dataset.dir;
    const view = document.getElementById('category-view');
    if(!view || view.classList.contains('hidden')) return;
    const path = window.location.pathname.replace(/\/+$/, '');
    const cat = path.split('/').pop();
    const league = new URLSearchParams(window.location.search).get('league') || undefined;
    const pageKey = cat + (league ? ':' + league : '');
    if(dir === 'prev' && catPage[pageKey] > 1) catPage[pageKey]--;
    if(dir === 'next') catPage[pageKey]++;
    renderCategory(cat, league);
    document.getElementById('cv-grid').scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }
  const pageNum = e.target.closest('.cv-page-num');
  if(pageNum){
    const view = document.getElementById('category-view');
    if(!view || view.classList.contains('hidden')) return;
    const path = window.location.pathname.replace(/\/+$/, '');
    const cat = path.split('/').pop();
    const league = new URLSearchParams(window.location.search).get('league') || undefined;
    const pageKey = cat + (league ? ':' + league : '');
    catPage[pageKey] = parseInt(pageNum.dataset.page);
    renderCategory(cat, league);
    document.getElementById('cv-grid').scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }
});

window.submitProductOrder = function(e){
  e.preventDefault();
  const form = document.getElementById('product-form');
  const team = form.dataset.team || '';
  const kit = form.dataset.kit || '';
  const size = document.getElementById('pv-size').value;
  const badge = document.getElementById('pv-badge').value;
  const pref = document.getElementById('pv-preference').value;
  const name = document.getElementById('pv-custom-name').value.trim();
  const number = document.getElementById('pv-custom-number').value.trim();
  const location = document.getElementById('pv-location').value.trim();
  const total = document.getElementById('pv-total').textContent;

  let msg = 'Hi Makelele Jerseys, I\'d like to order:\n';
  msg += '\nProduct: ' + team + ' ' + kit;
  msg += '\nSize: ' + size;
  if(badge && badge !== 'None') msg += '\nBadge: ' + badge;
  msg += '\nPreference: ' + (pref === 'customized' ? 'Customized' : 'Plain');
  if(pref === 'customized'){
    if(name) msg += '\nName: ' + name;
    if(number) msg += '\nNumber: ' + number;
  }
  msg += '\nDelivery Location: ' + location;
  msg += '\nTotal: ' + total;

  window.open('https://wa.me/2347030112427?text=' + encodeURIComponent(msg), '_blank');
  trackWA('custom-submit');
};



(function heroSlideshow(){
  const container = document.getElementById('hero-slideshow');
  if(!container) return;
  const slides = container.querySelectorAll('.slide');
  const prevBtn = container.querySelector('.slide-arrow-prev');
  const nextBtn = container.querySelector('.slide-arrow-next');
  let current = 0, interval;

  function goTo(idx){
    slides[current].classList.remove('active');
    current = idx;
    slides[current].classList.add('active');
    const ctas = [
      document.querySelector('.liv-cta'),
      document.querySelector('.bar-cta'),
      document.querySelector('.esp-cta'),
      document.querySelector('.che-cta'),
      document.querySelector('.arg-cta'),
      document.querySelector('.rm-cta'),
      document.querySelector('.cov-cta')
    ];
    ctas.forEach((c, i) => { if(c) c.style.display = i === idx ? '' : 'none'; });
  }

  goTo(0);

  function prev(){ goTo((current - 1 + slides.length) % slides.length); }
  function next(){ goTo((current + 1) % slides.length); }

  prevBtn.addEventListener('click', function(){ prev(); reset(); });
  nextBtn.addEventListener('click', function(){ next(); reset(); });

  function start(){ interval = setInterval(next, 7000); }
  function stop(){ clearInterval(interval); }
  function reset(){ stop(); start(); }

  container.addEventListener('mouseenter', stop);
  container.addEventListener('mouseleave', start);

  container.addEventListener('keydown', function(e){
    if(e.key === 'ArrowLeft'){ prev(); reset(); }
    if(e.key === 'ArrowRight'){ next(); reset(); }
  });

  start();
})();

cycleImages('national-imgs', [
  '/images/national/nigeria-2026-home-kit.jpg',
  '/images/national/nigeria-2026-away.png',
  '/images/national/argentina-2026-home-back.webp',
  '/images/national/argentina-2026-away-messi-front.webp',
  '/images/national/england-2026-home-kit.jpg',
  '/images/national/england-2026-away-kit.jpg',
  '/images/national/france-2026-home-kit.jpg',
  '/images/national/france-2026-away-kit.jpg',
  '/images/national/spain-2026-home-front.webp',
  '/images/national/spain-2026-away-kit.jpg',
], 3500);

cycleImages('customized-imgs', [
  '/images/customized/Barcelona_customized.png',
  '/images/customized/Liverpool Customized.png',
], 3500);

cycleImages('custom-gallery-img', [
  '/images/customized/arsenal customized.png',
  '/images/customized/arsenalcustomized.png',
  '/images/customized/Corotiacustomized.png',
  '/images/customized/CUSTOMIZED arsenal customized.png.png',
  '/images/customized/inter customized.png',
  '/images/customized/man u away.png',
  '/images/customized/plain jersey.png',
  '/images/customized/plain.png',
], 3000);

/* ============ CATEGORY PRODUCT DATA ============ */
const clubProducts = [
  { team:'Manchester United', kit:'Home 26/27', img:'/images/club/2026-27 shirts/Manchester United Home Jersey 26_27.png', slug:'man-united-home-26-27', cat:'club', price:'₦35,000', description:'Manchester United\'s 2026/27 home kit — the iconic red devil look for the new season.', material:'100% Recycled Polyester', features:['Dri-FIT moisture management','Breathable mesh panels','Authentic club crest'], inStock:true },
  { team:'Manchester United', kit:'Away 26/27', img:'/images/club/2026-27 shirts/Manchester United Away Jersey 26_27.png', slug:'man-united-away-26-27', cat:'club', price:'₦35,000', description:'Manchester United\'s 2026/27 away kit — a sharp new look on the road.', material:'100% Recycled Polyester', features:['Dri-FIT technology','Distinctive away design','United crest'], inStock:true },
  { team:'Manchester United', kit:'Third 26/27', img:'/images/club/2026-27 shirts/Manchester United 3rd Jersey 26_27.png', slug:'man-united-third-26-27', cat:'club', price:'₦35,000', description:'Manchester United\'s 2026/27 third kit — a bold alternative for cup nights.', material:'100% Recycled Polyester', features:['Dri-FIT ADV','Unique design','Club crest'], inStock:true },
  { team:'Arsenal', kit:'Home 26/27', img:'/images/club/2026-27 shirts/Arsenal Home Jersey 26_27.png', slug:'arsenal-home-26-27', cat:'club', price:'₦35,000', description:'Arsenal\'s 2026/27 home shirt — the iconic red & white for the new campaign.', material:'100% Recycled Polyester', features:['Aeroready technology','Lightweight woven fabric','Authentic Arsenal badge'], inStock:true },
  { team:'Arsenal', kit:'Away 26/27', img:'/images/club/2026-27 shirts/Arsenal Away Jersey 26_27.png', slug:'arsenal-away-26-27', cat:'club', price:'₦35,000', description:'Arsenal\'s 2026/27 away kit — a sleek alternative for the Gunners.', material:'100% Recycled Polyester', features:['Aeroready technology','Striking away colours','Arsenal badge'], inStock:true },
  { team:'Arsenal', kit:'Third 26/27', img:'/images/club/2026-27 shirts/Arsenal 3rd Jersey 26_27.png', slug:'arsenal-third-26-27', cat:'club', price:'₦35,000', description:'Arsenal\'s 2026/27 third kit — a distinctive design for cup competitions.', material:'100% Recycled Polyester', features:['Aeroready technology','Lightweight build','Arsenal badge'], inStock:true },
  { team:'Chelsea', kit:'Home 26/27', img:'/images/club/2026-27 shirts/Chelsea Home Jersey 26_27.png', slug:'chelsea-home-26-27', cat:'club', price:'₦35,000', description:'Chelsea\'s 2026/27 home jersey — the Blues in classic blue for the new season.', material:'100% Recycled Polyester', features:['Dri-FIT technology','Breathable construction','Crest heat-transfer'], inStock:true },
  { team:'Chelsea', kit:'Away 26/27', img:'/images/club/2026-27 shirts/Chelsea Away Jersey 26_27.png', slug:'chelsea-away-26-27', cat:'club', price:'₦35,000', description:'Chelsea\'s 2026/27 away kit — a fresh look for the Blues on the road.', material:'100% Recycled Polyester', features:['Dri-FIT technology','Distinctive design','Chelsea crest'], inStock:true },
  { team:'Liverpool', kit:'Home 26/27', img:'/images/club/2026-27 shirts/Liverpool Home Jersey 26_27.png', slug:'liverpool-home-26-27', cat:'club', price:'₦35,000', description:'Liverpool\'s 2026/27 home kit in iconic red with modern performance technology.', material:'100% Recycled Polyester', features:['Nike Dri-FIT','Crest detailing','Breathable fabric'], inStock:true },
  { team:'Liverpool', kit:'Away 26/27', img:'/images/club/2026-27 shirts/Liverpool Away Jersey 26_27.png', slug:'liverpool-away-26-27', cat:'club', price:'₦35,000', description:'Liverpool\'s 2026/27 away kit — a striking design for the Reds on their travels.', material:'100% Recycled Polyester', features:['Nike Dri-FIT','Distinctive design','LFC crest'], inStock:true },
  { team:'FC Barcelona', kit:'Home 26/27', img:'/images/club/2026-27 shirts/Barcelona Home Jersey 26_27.png', slug:'barcelona-home-26-27', cat:'club', price:'₦35,000', description:'Barcelona\'s 2026/27 home kit — classic blaugrana stripes with a fresh twist.', material:'100% Recycled Polyester', features:['Nike Dri-FIT','Moisture-wicking','Athletic fit'], inStock:true },
  { team:'FC Barcelona', kit:'Away 26/27', img:'/images/club/2026-27 shirts/Barcelona Away Jersey 26_27.png', slug:'barcelona-away-26-27', cat:'club', price:'₦35,000', description:'Barcelona\'s 2026/27 away kit — a sleek alternative with premium construction.', material:'100% Recycled Polyester', features:['Nike Dri-FIT','Lightweight fabric','Barca crest'], inStock:true },
  { team:'FC Barcelona', kit:'Third 26/27', img:'/images/club/2026-27 shirts/Barcelona 3rd Jersey 26_27.png', slug:'barcelona-third-26-27', cat:'club', price:'₦35,000', description:'Barcelona\'s 2026/27 third kit — a fresh look for European nights.', material:'100% Recycled Polyester', features:['Nike Dri-FIT','Unique design','Barca crest'], inStock:true },
  { team:'Real Madrid', kit:'Home 26/27', img:'/images/club/2026-27 shirts/Real Madrid Home Jersey 26_27.png', slug:'real-madrid-home-26-27', cat:'club', price:'₦35,000', description:'Real Madrid\'s 2026/27 home kit — the classic white of the champions.', material:'100% Recycled Polyester', features:['Dri-FIT ADV technology','Gold crest detailing','UV protection'], inStock:true },
  { team:'Real Madrid', kit:'Away 26/27', img:'/images/club/2026-27 shirts/Real Madrid Away Jersey 26_27.png', slug:'real-madrid-away-26-27', cat:'club', price:'₦35,000', description:'Real Madrid\'s 2026/27 away kit — a bold alternative to the classic white.', material:'100% Recycled Polyester', features:['Dri-FIT ADV','Premium construction','Club badge'], inStock:true },
  { team:'Real Madrid', kit:'Third 26/27', img:'/images/club/2026-27 shirts/Real Madrid 3rd Jersey 26_27.png', slug:'real-madrid-third-26-27', cat:'club', price:'₦35,000', description:'Real Madrid\'s 2026/27 third kit — a striking design for cup competitions.', material:'100% Recycled Polyester', features:['Dri-FIT ADV','Unique design','Club badge'], inStock:true },
  { team:'Bayern Munich', kit:'Home 26/27', img:'/images/club/2026-27 shirts/Bayern Munich Home Jersey 26_27.png', slug:'bayern-munich-home-26-27', cat:'club', price:'₦35,000', description:'Bayern Munich\'s 2026/27 home kit — classic red for the German champions.', material:'100% Recycled Polyester', features:['Adidas AEROREADY','Club crest','Athletic fit'], inStock:true },
  { team:'Bayern Munich', kit:'Away 26/27', img:'/images/club/2026-27 shirts/Bayern Munich Away Jersey 26_27.png', slug:'bayern-munich-away-26-27', cat:'club', price:'₦35,000', description:'Bayern Munich\'s 2026/27 away kit — a fresh look for the Bavarians.', material:'100% Recycled Polyester', features:['Adidas AEROREADY','Distinctive design','Club crest'], inStock:true },
  { team:'PSG', kit:'Home 26/27', img:'/images/club/2026-27 shirts/PSG Home Jersey 26_27.png', slug:'psg-home-26-27', cat:'club', price:'₦35,000', description:'Paris Saint-Germain\'s 2026/27 home kit in iconic Parisian style.', material:'100% Recycled Polyester', features:['Nike Dri-FIT','Parisian design','PSG crest'], inStock:true },
  { team:'PSG', kit:'Away 26/27', img:'/images/club/2026-27 shirts/PSG Away Jersey 26_27.png', slug:'psg-away-26-27', cat:'club', price:'₦35,000', description:'PSG\'s 2026/27 away kit — a sleek new look for the Parisians.', material:'100% Recycled Polyester', features:['Nike Dri-FIT','Distinctive design','PSG crest'], inStock:true },
  { team:'PSG', kit:'Third 26/27', img:'/images/club/2026-27 shirts/PSG 3rd Jersey 26_27.png', slug:'psg-third-26-27', cat:'club', price:'₦35,000', description:'PSG\'s 2026/27 third kit — a bold alternative for European nights.', material:'100% Recycled Polyester', features:['Nike Dri-FIT','Unique design','PSG crest'], inStock:true },
  { team:'Manchester City', kit:'Home 26/27', img:'/images/club/2026-27 shirts/Manchester City Home Jersey 26_27.png', slug:'man-city-home-26-27', cat:'club', price:'₦35,000', description:'Manchester City\'s 2026/27 home kit — sky blue for the champions.', material:'100% Recycled Polyester', features:['Puma design','Sky blue','City crest'], inStock:true },
  { team:'Manchester City', kit:'Away 26/27', img:'/images/club/2026-27 shirts/Manchester City Away Jersey 26_27.png', slug:'man-city-away-26-27', cat:'club', price:'₦35,000', description:'Manchester City\'s 2026/27 away kit — a fresh look for the Citizens.', material:'100% Recycled Polyester', features:['Puma design','Distinctive colour','City crest'], inStock:true },
  { team:'Tottenham', kit:'Home 26/27', img:'/images/club/2026-27 shirts/Tottenham Home Jersey 26_27.png', slug:'tottenham-home-26-27', cat:'club', price:'₦35,000', description:'Tottenham\'s 2026/27 home kit — the Lilywhites in classic white.', material:'100% Recycled Polyester', features:['Nike Dri-FIT','Classic white','Spurs crest'], inStock:true },
  { team:'Tottenham', kit:'Away 26/27', img:'/images/club/2026-27 shirts/Tottenham Away Jersey 26_27.png', slug:'tottenham-away-26-27', cat:'club', price:'₦35,000', description:'Tottenham\'s 2026/27 away kit — a sharp alternative for the Lilywhites.', material:'100% Recycled Polyester', features:['Nike Dri-FIT','Striking design','Spurs crest'], inStock:true },
  { team:'Aston Villa', kit:'Home 26/27', img:'/images/club/2026-27 shirts/Aston Villa Home Jersey 26_27.png', slug:'aston-villa-home-26-27', cat:'club', price:'₦35,000', description:'Aston Villa\'s 2026/27 home kit — claret & blue for the Villans.', material:'100% Recycled Polyester', features:['Castore design','Club crest','Athletic fit'], inStock:true },
  { team:'Newcastle', kit:'Home 26/27', img:'/images/club/2026-27 shirts/Newcastle Home Jersey 26_27.png', slug:'newcastle-home-26-27', cat:'club', price:'₦35,000', description:'Newcastle United\'s 2026/27 home kit — the Magpies in black & white.', material:'100% Recycled Polyester', features:['Castore design','Classic stripes','NUFC crest'], inStock:true },
  { team:'Al Nassr', kit:'Home 26/27', img:'/images/club/2026-27 shirts/Al Nassr Home Jersey 27_26.png', slug:'al-nassr-home-26-27', cat:'club', price:'₦35,000', description:'Al Nassr\'s 2026/27 home kit — Ronaldo\'s team in striking yellow & blue.', material:'100% Recycled Polyester', features:['Dri-FIT technology','Bold design','Club crest'], inStock:true },
  { team:'Al Nassr', kit:'Away 25/26', img:'/images/club/2026-27 shirts/Al Nassr Away Jersey 25_26.png', slug:'al-nassr-away-25-26', cat:'club', price:'₦35,000', description:'Al Nassr\'s 2025/26 away kit — an alternative look for the Saudi giants.', material:'100% Recycled Polyester', features:['Dri-FIT technology','Distinctive design','Club crest'], inStock:true },
  { team:'AC Milan', kit:'Home 26/27', img:'/images/club/2026-27 shirts/AC Mi5 Home Jersey 26_27.png', slug:'ac-milan-home-26-27', cat:'club', price:'₦35,000', description:'AC Milan\'s 2026/27 home kit — the Rossoneri in iconic red & black stripes.', material:'100% Recycled Polyester', features:['Puma design','Classic stripes','AC Milan crest'], inStock:true },
  { team:'Inter Milan', kit:'Home 26/27', img:'/images/club/2026-27 shirts/Inter Milan Home Jersey 26_27.png', slug:'inter-milan-home-26-27', cat:'club', price:'₦35,000', description:'Inter Milan\'s 2026/27 home kit — the Nerazzurri in classic blue & black stripes.', material:'100% Recycled Polyester', features:['Nike Dri-FIT','Classic stripes','Inter crest'], inStock:true },
  { team:'Juventus', kit:'Home 26/27', img:'/images/club/2026-27 shirts/Juventus Home Jersey 26_27.png', slug:'juventus-home-26-27', cat:'club', price:'₦35,000', description:'Juventus\' 2026/27 home kit — the Bianconeri in iconic black & white stripes.', material:'100% Recycled Polyester', features:['Adidas design','Classic stripes','Juventus crest'], inStock:true },
  { team:'Dortmund', kit:'Home 26/27', img:'/images/club/2026-27 shirts/Dortmund Home Jersey 26_27.png', slug:'dortmund-home-26-27', cat:'club', price:'₦35,000', description:'Borussia Dortmund\'s 2026/27 home kit — the famous yellow wall.', material:'100% Recycled Polyester', features:['Puma design','Iconic yellow','BVB crest'], inStock:true },
  { team:'Bournemouth', kit:'Home 26/27', img:'/images/club/2026-27 shirts/Bournemouth Home Jersey 26_27.png', slug:'bournemouth-home-26-27', cat:'club', price:'₦35,000', description:'Bournemouth\'s 2026/27 home kit — the Cherries in classic red & black.', material:'100% Recycled Polyester', features:['Umbro design','Club crest','Athletic fit'], inStock:true },
  { team:'Brighton', kit:'Home 26/27', img:'/images/club/2026-27 shirts/Brighton Home Jersey 26_27.png', slug:'brighton-home-26-27', cat:'club', price:'₦35,000', description:'Brighton\'s 2026/27 home kit — the Seagulls in blue & white stripes.', material:'100% Recycled Polyester', features:['Nike Dri-FIT','Stripe design','Brighton crest'], inStock:true },
  { team:'Everton', kit:'Home 26/27', img:'/images/club/2026-27 shirts/Everton Home Jersey 26_27.png', slug:'everton-home-26-27', cat:'club', price:'₦35,000', description:'Everton\'s 2026/27 home kit — the Toffees in classic royal blue.', material:'100% Recycled Polyester', features:['Hummel design','Royal blue','Everton crest'], inStock:true },
];

const nationalProducts = [
  { team:'Nigeria', kit:'Home 26/27', img:'/images/Country/Nigeria Home Jersey 26_27.png', images:['/images/Country/Nigeria Home Jersey 26_27.png','/images/national/nigeria-2026-away.png'], slug:'nigeria-home-26-27', cat:'national', price:'₦30,000', description:'Rep the Naija spirit with the Super Eagles 2026/27 home kit. Bold green with cultural patterns.', material:'100% Polyester', features:['Lightweight breathable fabric','NFF official design','Bold cultural pattern'], inStock:true },
  { team:'Nigeria', kit:'Away 26/27', img:'/images/Country/Nigeria Away Jersey 26_27.png', images:['/images/Country/Nigeria Away Jersey 26_27.png','/images/national/nigeria-2026-away.png'], slug:'nigeria-away-26-27', cat:'national', price:'₦30,000', description:'The Super Eagles away kit for 2026/27 in a clean, sharp design.', material:'100% Polyester', features:['Lightweight fabric','NFF badge','Regular fit'], inStock:true },
  { team:'Argentina', kit:'Home 26/27', img:'/images/Country/2026-27 Argentina Home Shirt back.webp', images:['/images/Country/2026-27 Argentina Home Shirt back.webp','/images/Country/Argentina Home Jersey 26_27.jpg'], slug:'argentina-home-26-27', cat:'national', price:'₦35,000', description:'Argentina\'s 2026/27 home kit in the legendary albiceleste stripes. World Cup champions vibes.', material:'100% Recycled Polyester', features:['AFA badge','Dri-FIT technology','Classic design'], inStock:true },
  { team:'Argentina', kit:'Away 26/27 (Messi)', img:'/images/Country/2026-27 Argentina Away Shirt Messi front.webp', images:['/images/Country/2026-27 Argentina Away Shirt Messi front.webp','/images/Country/2026-27 Argentina Away Shirt Messi back.webp'], slug:'argentina-away-messi-26-27', cat:'national', price:'₦40,000', description:'Argentina\'s 2026/27 away kit featuring Messi\'s name and number front and back. A must-have for fans.', material:'100% Recycled Polyester', features:['Messi 10 printing','AFA badge','Premium fabric'], inStock:true },
  { team:'Argentina', kit:'Polo Jersey 26/27', img:'/images/Country/Argentina Polo Jersey 26_27.jpg', images:['/images/Country/Argentina Polo Jersey 26_27.jpg'], slug:'argentina-polo-26-27', cat:'national', price:'₦35,000', description:'Argentina\'s 2026/27 polo-style jersey. Smart casual for matchday and beyond.', material:'100% Polyester', features:['Polo collar design','AFA crest','Premium cotton blend'], inStock:true },
  { team:'England', kit:'Home 26/27', img:'/images/Country/England Home Jersey 26_27.jpg', images:['/images/Country/England Home Jersey 26_27.jpg','/images/national/england-2026-home-kit.jpg'], slug:'england-home-26-27', cat:'national', price:'₦35,000', description:'England\'s 2026/27 home kit in classic white with the Three Lions crest.', material:'100% Recycled Polyester', features:['Nike Dri-FIT','FA crest','Clean white design'], inStock:true },
  { team:'England', kit:'Away 26/27', img:'/images/Country/England Away Jersey 26_27.jpg', images:['/images/Country/England Away Jersey 26_27.jpg','/images/national/england-2026-away-kit.jpg'], slug:'england-away-26-27', cat:'national', price:'₦35,000', description:'England\'s 2026/27 away kit with a bold new look for the Three Lions.', material:'100% Recycled Polyester', features:['Dri-FIT technology','FA crest','Athletic fit'], inStock:true },
  { team:'France', kit:'Home 26/27', img:'/images/Country/France Home Jersey 26_27.jpg', images:['/images/Country/France Home Jersey 26_27.jpg','/images/national/france-2026-home-kit.jpg'], slug:'france-home-26-27', cat:'national', price:'₦35,000', description:'France\'s 2026/27 home kit in the iconic bleu with modern performance features.', material:'100% Recycled Polyester', features:['Nike Dri-FIT','FFF crest','Lightweight build'], inStock:true },
  { team:'France', kit:'Away 26/27', img:'/images/Country/France Away Jersey 26_27.jpg', images:['/images/Country/France Away Jersey 26_27.jpg','/images/national/france-2026-away-kit.jpg'], slug:'france-away-26-27', cat:'national', price:'₦35,000', description:'France\'s 2026/27 away kit with a sleek alternative design.', material:'100% Recycled Polyester', features:['Dri-FIT technology','FFF badge','Regular fit'], inStock:true },
  { team:'Spain', kit:'Home 26/27', img:'/images/Country/2026-27 Spain Home Shirt Front.webp', images:['/images/Country/2026-27 Spain Home Shirt Front.webp','/images/Country/2026-27 Spain Home Shirt back.webp'], slug:'spain-home-26-27', cat:'national', price:'₦35,000', description:'Spain\'s 2026/27 home kit in classic red. La Roja returns with style.', material:'100% Recycled Polyester', features:['Adidas AEROREADY','RFEF crest','Breathable fabric'], inStock:true },
  { team:'Spain', kit:'Away 26/27', img:'/images/Country/Spain Away Jersey 26_27.webp', images:['/images/Country/Spain Away Jersey 26_27.webp','/images/national/spain-2026-away-kit.jpg'], slug:'spain-away-26-27', cat:'national', price:'₦35,000', description:'Spain\'s 2026/27 away kit offering a fresh look for away fixtures.', material:'100% Recycled Polyester', features:['AEROREADY technology','RFEF badge','Comfortable fit'], inStock:true },
  { team:'Germany', kit:'Home 26/27', img:'/images/Country/Germany Home Jersey 26_27.jpg', images:['/images/Country/Germany Home Jersey 26_27.jpg'], slug:'germany-home-26-27', cat:'national', price:'₦35,000', description:'Germany\'s 2026/27 home kit — the classic white with bold black, red and gold accents.', material:'100% Recycled Polyester', features:['Adidas AEROREADY','DFB crest','Breathable mesh'], inStock:true },
  { team:'Germany', kit:'Away 26/27', img:'/images/Country/Germany Away Jersey 26_27.jpg', images:['/images/Country/Germany Away Jersey 26_27.jpg'], slug:'germany-away-26-27', cat:'national', price:'₦35,000', description:'Germany\'s 2026/27 away kit with a striking alternative design.', material:'100% Recycled Polyester', features:['Adidas design','DFB badge','Athletic fit'], inStock:true },
  { team:'Brazil', kit:'Home 26/27', img:'/images/Country/Brazil Home Jersey 26_27.jpg', images:['/images/Country/Brazil Home Jersey 26_27.jpg'], slug:'brazil-home-26-27', cat:'national', price:'₦35,000', description:'Brazil\'s 2026/27 home kit in the iconic canary yellow. Seleção style for the new season.', material:'100% Recycled Polyester', features:['Nike Dri-FIT','CBF crest','Classic yellow'], inStock:true },
  { team:'Brazil', kit:'Away 26/27', img:'/images/Country/Brazil Away Jersey 26_27.jpg', images:['/images/Country/Brazil Away Jersey 26_27.jpg'], slug:'brazil-away-26-27', cat:'national', price:'₦35,000', description:'Brazil\'s 2026/27 away kit — a fresh alternative for the Seleção.', material:'100% Recycled Polyester', features:['Nike Dri-FIT','CBF badge','Lightweight build'], inStock:true },
  { team:'Portugal', kit:'Home 26/27', img:'/images/Country/Portugal Home Jersey 26_27.jpg', images:['/images/Country/Portugal Home Jersey 26_27.jpg'], slug:'portugal-home-26-27', cat:'national', price:'₦35,000', description:'Portugal\'s 2026/27 home kit in classic red and green. A must for any Seleção fan.', material:'100% Recycled Polyester', features:['Nike Dri-FIT','FPF crest','Bold design'], inStock:true },
  { team:'Portugal', kit:'Away 26/27', img:'/images/Country/Portugal Away Jersey 26_27.jpg', images:['/images/Country/Portugal Away Jersey 26_27.jpg'], slug:'portugal-away-26-27', cat:'national', price:'₦35,000', description:'Portugal\'s 2026/27 away kit — a sleek alternative for the Seleção.', material:'100% Recycled Polyester', features:['Nike Dri-FIT','FPF badge','Regular fit'], inStock:true },
  { team:'Netherlands', kit:'Home 26/27', img:'/images/Country/Netherlands Home Jersey 26_27.jpg', images:['/images/Country/Netherlands Home Jersey 26_27.jpg'], slug:'netherlands-home-26-27', cat:'national', price:'₦35,000', description:'Netherlands\' 2026/27 home kit in iconic orange. The Oranje in full flight.', material:'100% Recycled Polyester', features:['Nike Dri-FIT','KNVB crest','Vibrant orange'], inStock:true },
  { team:'Belgium', kit:'Home 26/27', img:'/images/Country/Belgium Home Jersey 26_27.jpg', images:['/images/Country/Belgium Home Jersey 26_27.jpg'], slug:'belgium-home-26-27', cat:'national', price:'₦30,000', description:'Belgium\'s 2026/27 home kit — the Red Devils in classic red.', material:'100% Recycled Polyester', features:['Adidas design','RBFA crest','Athletic fit'], inStock:true },
  { team:'Italy', kit:'Home 26/27', img:'/images/Country/Italy Home Jersey 26_27.jpg', images:['/images/Country/Italy Home Jersey 26_27.jpg'], slug:'italy-home-26-27', cat:'national', price:'₦35,000', description:'Italy\'s 2026/27 home kit — the Azzurri in iconic blue.', material:'100% Recycled Polyester', features:['Adidas design','FIGC crest','Classic blue'], inStock:true },
  { team:'Croatia', kit:'Home 26/27', img:'/images/Country/Croatia Home Jersey 26_27.png', images:['/images/Country/Croatia Home Jersey 26_27.png'], slug:'croatia-home-26-27', cat:'national', price:'₦30,000', description:'Croatia\'s 2026/27 home kit — the iconic red and white chequers.', material:'100% Recycled Polyester', features:['Nike Dri-FIT','HNS crest','Classic chequers'], inStock:true },
  { team:'Mexico', kit:'Home 26/27', img:'/images/Country/Mexico Home Jersey 26_27.jpg', images:['/images/Country/Mexico Home Jersey 26_27.jpg'], slug:'mexico-home-26-27', cat:'national', price:'₦30,000', description:'Mexico\'s 2026/27 home kit — El Tri in classic green.', material:'100% Recycled Polyester', features:['Adidas design','FMF crest','Bold green'], inStock:true },
  { team:'Mexico', kit:'Away 26/27', img:'/images/Country/Mexico Away Jersey 26_27.jpg', images:['/images/Country/Mexico Away Jersey 26_27.jpg'], slug:'mexico-away-26-27', cat:'national', price:'₦30,000', description:'Mexico\'s 2026/27 away kit — a fresh alternative for El Tri.', material:'100% Recycled Polyester', features:['Adidas design','FMF badge','Clean white'], inStock:true },
  { team:'USA', kit:'Home 26/27', img:'/images/Country/USA Home Jersey 26_27.jpg', images:['/images/Country/USA Home Jersey 26_27.jpg'], slug:'usa-home-26-27', cat:'national', price:'₦30,000', description:'USA\'s 2026/27 home kit — the Stars and Stripes for the new era.', material:'100% Recycled Polyester', features:['Nike Dri-FIT','US Soccer crest','Modern design'], inStock:true },
  { team:'USA', kit:'Away 26/27', img:'/images/Country/USA Away Jersey 26_27.jpg', images:['/images/Country/USA Away Jersey 26_27.jpg'], slug:'usa-away-26-27', cat:'national', price:'₦30,000', description:'USA\'s 2026/27 away kit — a sharp alternative for the USMNT.', material:'100% Recycled Polyester', features:['Nike Dri-FIT','US Soccer badge','Athletic fit'], inStock:true },
  { team:'Uruguay', kit:'Home 26/27', img:'/images/Country/Uruguay Home Jersey 26_27.jpg', images:['/images/Country/Uruguay Home Jersey 26_27.jpg'], slug:'uruguay-home-26-27', cat:'national', price:'₦30,000', description:'Uruguay\'s 2026/27 home kit — La Celeste in iconic sky blue.', material:'100% Recycled Polyester', features:['Puma design','AUF crest','Classic sky blue'], inStock:true },
  { team:'Senegal', kit:'Home 26/27', img:'/images/Country/Senegal Home Jersey 26_27.jpg', images:['/images/Country/Senegal Home Jersey 26_27.jpg'], slug:'senegal-home-26-27', cat:'national', price:'₦30,000', description:'Senegal\'s 2026/27 home kit — the Lions of Teranga in bold green and yellow.', material:'100% Polyester', features:['Puma design','LSF crest','Vibrant colours'], inStock:true },
  { team:'Ivory Coast', kit:'Home 26/27', img:'/images/Country/Ivory Coast Home Jersey 26_27.jpg', images:['/images/Country/Ivory Coast Home Jersey 26_27.jpg'], slug:'ivory-coast-home-26-27', cat:'national', price:'₦30,000', description:'Ivory Coast\'s 2026/27 home kit — Les Éléphants in orange pride.', material:'100% Polyester', features:['Puma design','FIF crest','Bold orange'], inStock:true },
  { team:'Ivory Coast', kit:'Away 26/27', img:'/images/Country/Ivory Coast Away Jersey 26_27.jpg', images:['/images/Country/Ivory Coast Away Jersey 26_27.jpg'], slug:'ivory-coast-away-26-27', cat:'national', price:'₦30,000', description:'Ivory Coast\'s 2026/27 away kit — a clean alternative for Les Éléphants.', material:'100% Polyester', features:['Puma design','FIF badge','Regular fit'], inStock:true },
  { team:'Ghana', kit:'Home 26/27', img:'/images/Country/Ghana Home Jersey 26_27.jpg', images:['/images/Country/Ghana Home Jersey 26_27.jpg'], slug:'ghana-home-26-27', cat:'national', price:'₦30,000', description:'Ghana\'s 2026/27 home kit — the Black Stars in classic white and gold.', material:'100% Polyester', features:['Puma design','GFA crest','Star design'], inStock:true },
  { team:'South Africa', kit:'Away 26/27', img:'/images/Country/South Africa Away Jersey 26_27.jpg', images:['/images/Country/South Africa Away Jersey 26_27.jpg'], slug:'south-africa-away-26-27', cat:'national', price:'₦30,000', description:'South Africa\'s 2026/27 away kit — Bafana Bafana in a fresh design.', material:'100% Polyester', features:['Le Coq Sportif','SAFA crest','Modern look'], inStock:true },
  { team:'Japan', kit:'Away 26/27', img:'/images/Country/Japan Away Jersey 26_27.jpg', images:['/images/Country/Japan Away Jersey 26_27.jpg'], slug:'japan-away-26-27', cat:'national', price:'₦30,000', description:'Japan\'s 2026/27 away kit — the Samurai Blue in a striking design.', material:'100% Recycled Polyester', features:['Adidas design','JFA crest','Unique pattern'], inStock:true },
  { team:'Denmark', kit:'Home 26/27', img:'/images/Country/Denmark Home Jersey 26_27.jpg', images:['/images/Country/Denmark Home Jersey 26_27.jpg'], slug:'denmark-home-26-27', cat:'national', price:'₦30,000', description:'Denmark\'s 2026/27 home kit — the Danes in classic red and white.', material:'100% Recycled Polyester', features:['Hummel design','DBU crest','Classic red'], inStock:true },
  { team:'Scotland', kit:'Home 26/27', img:'/images/Country/Scotland Home Jersey 26_27.png', images:['/images/Country/Scotland Home Jersey 26_27.png'], slug:'scotland-home-26-27', cat:'national', price:'₦30,000', description:'Scotland\'s 2026/27 home kit — the Tartan Army in iconic navy blue.', material:'100% Polyester', features:['Adidas design','SFA crest','Navy blue'], inStock:true },
  { team:'Turkey', kit:'Home 26/27', img:'/images/Country/Turkey Home Jersey 26_27.jpg', images:['/images/Country/Turkey Home Jersey 26_27.jpg'], slug:'turkey-home-26-27', cat:'national', price:'₦30,000', description:'Turkey\'s 2026/27 home kit — the Crescent Stars in bold red.', material:'100% Polyester', features:['Nike Dri-FIT','TFF crest','Vibrant red'], inStock:true },
  { team:'Canada', kit:'Home 26/27', img:'/images/Country/Canada Home Jersey 26_27.jpg', images:['/images/Country/Canada Home Jersey 26_27.jpg'], slug:'canada-home-26-27', cat:'national', price:'₦30,000', description:'Canada\'s 2026/27 home kit — the Maple Leafs in iconic red.', material:'100% Recycled Polyester', features:['Nike Dri-FIT','Canada Soccer crest','Bold red'], inStock:true },
  { team:'Sweden', kit:'Home 26/27', img:'/images/Country/Sweden Home Jersey 26_27.jpg', images:['/images/Country/Sweden Home Jersey 26_27.jpg'], slug:'sweden-home-26-27', cat:'national', price:'₦30,000', description:'Sweden\'s 2026/27 home kit — the Blue and Yellow in classic style.', material:'100% Polyester', features:['Adidas design','SvFF crest','Classic blue'], inStock:true },
  { team:'Panama', kit:'Home 26/27', img:'/images/Country/Panama Home Away Jersey 26_27.jpg', images:['/images/Country/Panama Home Away Jersey 26_27.jpg'], slug:'panama-home-26-27', cat:'national', price:'₦30,000', description:'Panama\'s 2026/27 home kit — La Marea Roja in red and blue.', material:'100% Polyester', features:['Lotto design','FEPAFUT crest','Bold stripes'], inStock:true },
  { team:'Panama', kit:'Away 26/27', img:'/images/Country/Panama Away Jersey 26_27.jpg', images:['/images/Country/Panama Away Jersey 26_27.jpg'], slug:'panama-away-26-27', cat:'national', price:'₦30,000', description:'Panama\'s 2026/27 away kit — a fresh look for the Canal Men.', material:'100% Polyester', features:['Lotto design','FEPAFUT badge','Clean white'], inStock:true },
  { team:'Austria', kit:'Home 26/27', img:'/images/Country/Austria Home Jersey 26_27.png', images:['/images/Country/Austria Home Jersey 26_27.png'], slug:'austria-home-26-27', cat:'national', price:'₦30,000', description:'Austria\'s 2026/27 home kit — the Das Team in iconic red and white.', material:'100% Polyester', features:['Puma design','ÖFB crest','Classic red'], inStock:true },
];

const retroProducts = [
  { team:'Manchester United', kit:'Home 98/99', img:'/images/retro/manchester-united-1998-99-home-kit.jpg', slug:'manchester-united-home-98-99', cat:'retro', price:'₦40,000', description:'The iconic treble-winning season kit. A piece of football history.', material:'100% Polyester', features:['Classic treble design','Sharp sponsor','Embroidered crest'], inStock:true },
  { team:'Manchester United', kit:'Home 07/08', img:'/images/retro/manchester-united-2007-08-home-kit.jpg', slug:'manchester-united-home-07-08', cat:'retro', price:'₦40,000', description:'Champions League winners 2007/08. Ronaldo era classic.', material:'100% Polyester', features:['Champions League winning kit','AIG sponsor','Classic collar'], inStock:true },
  { team:'Arsenal', kit:'Home 05/06', img:'/images/retro/arsenal-fc-2005-06-home-kit.jpg', slug:'arsenal-home-05-06', cat:'retro', price:'₦40,000', description:'The Invincibles era final season. Highbury farewell kit.', material:'100% Polyester', features:['Final Highbury season','O2 sponsor','Gold detailing'], inStock:true },
  { team:'Chelsea', kit:'Home 12/13', img:'/images/retro/chelsea-fc-2012-13-home-kit.jpg', slug:'chelsea-home-12-13', cat:'retro', price:'₦40,000', description:'Champions of Europe 2012. Chelsea\'s historic winning kit.', material:'100% Polyester', features:['UCL winning season','Samsung sponsor','Golden trim'], inStock:true },
  { team:'FC Barcelona', kit:'Home 10/11', img:'/images/retro/fc-barcelona-2010-11-home-kit.jpg', slug:'fc-barcelona-home-10-11', cat:'retro', price:'₦40,000', description:'Peak tiki-taka. Barcelona\'s finest era captured in a kit.', material:'100% Polyester', features:['Historic Barca design','Qatar Foundation','UNICEF'], inStock:true },
  { team:'Liverpool', kit:'Home 17/18', img:'/images/retro/liverpool-fc-2017-18-home-kit.jpg', slug:'liverpool-home-17-18', cat:'retro', price:'₦40,000', description:'Liverpool\'s 2017/18 Champions League final run kit.', material:'100% Polyester', features:['New Balance design','Standard Chartered','Classic red'], inStock:true },
  { team:'Real Madrid', kit:'Home 98/99', img:'/images/retro/real-madrid-1998-99-home-kit.jpg', slug:'real-madrid-home-98-99', cat:'retro', price:'₦40,000', description:'The original Galacticos era begins. Classic white.', material:'100% Polyester', features:['Puma design','Classic construction','Embroidered crest'], inStock:true },
  { team:'AC Milan', kit:'Home 06/07', img:'/images/retro/ac-milan-2006-07-home-kit.jpg', slug:'ac-milan-home-06-07', cat:'retro', price:'₦40,000', description:'Champions League winners 2007. Kaka\'s Milan.', material:'100% Polyester', features:['UCL winning kit','Adidas design','Classic stripes'], inStock:true },
  { team:'Nigeria', kit:'Home 94/95', img:'/images/retro/nigeria-1994-95-home-kit.jpg', slug:'nigeria-home-94-95', cat:'retro', price:'₦45,000', description:'The legendary Super Eagles \'94 World Cup kit. Nigerian football heritage.', material:'100% Polyester', features:['World Cup classic','Iconic green design','NFF badge'], inStock:true },
  { team:'Argentina', kit:'World Cup 1986', img:'/images/retro/argentina-1986-maradona-home.jpg', slug:'argentina-world-cup-1986', cat:'retro', price:'₦45,000', description:'Maradona\'s "Hand of God" & "Goal of the Century". Argentina\'s second World Cup glory.', material:'100% Polyester', features:['Maradona 10 printing','Argentina crest','Historic albiceleste design'], inStock:true },
  { team:'Netherlands', kit:'Euro 1988', img:'/images/retro/netherlands-1988-euro-home.jpg', slug:'netherlands-euro-1988', cat:'retro', price:'₦45,000', description:'Van Basten\'s iconic volley. The Oranje\'s first and only major trophy — Euro 88 champions.', material:'100% Polyester', features:['Oranje classic design','Van Basten era','KNVB crest'], inStock:true },
  { team:'Germany', kit:'World Cup 1990', img:'/images/retro/germany-1990-world-cup-home.jpg', slug:'germany-world-cup-1990', cat:'retro', price:'₦45,000', description:'Matthäus lifting the trophy. The tricolor chevron design — a footballing icon.', material:'100% Polyester', features:['Tricolor chevron design','DFB crest','World Cup champion kit'], inStock:true },
  { team:'France', kit:'World Cup 1998', img:'/images/retro/france-1998-world-cup-home.jpg', slug:'france-world-cup-1998', cat:'retro', price:'₦45,000', description:'Zidane\'s two headers in the final. France\'s first World Cup title on home soil.', material:'100% Polyester', features:['Classic French blue','Zidane era design','World Cup 98 champion'], inStock:true },
  { team:'Italy', kit:'World Cup 1990', img:'/images/retro/italy-1990-world-cup-home.jpg', slug:'italy-world-cup-1990', cat:'retro', price:'₦40,000', description:'Baggio\'s tragic missed penalty. Italy\'s iconic Azzurri kit from their home World Cup.', material:'100% Polyester', features:['Azzurri blue classic','FIGC crest','Baggio era design'], inStock:true },
  { team:'Italy', kit:'World Cup 2006', img:'/images/retro/italy-2006-world-cup-home.jpg', slug:'italy-world-cup-2006', cat:'retro', price:'₦40,000', description:'Italy\'s triumph in Germany. Cannavaro lifts the trophy — the Azzurri\'s fourth World Cup.', material:'100% Polyester', features:['World Cup champion kit','Adidas design','Classic Azzurri blue'], inStock:true },
  { team:'Ajax', kit:'European Cup 1973', img:'/images/retro/ajax_1973_cruyff_european_cup.jpg', slug:'ajax-european-cup-1973', cat:'retro', price:'₦40,000', description:'Cruyff\'s Total Football. Ajax\'s third consecutive European Cup triumph.', material:'100% Polyester', features:['Classic Ajax design','Total Football era','European Cup champion'], inStock:true },
  { team:'Real Madrid', kit:'European Cup 60s', img:'/images/retro/real_madrid_1960s_distefano.jpg', slug:'real-madrid-european-cup-60s', cat:'retro', price:'₦40,000', description:'Di Stéfano\'s era of European dominance. The original white shirt of football royalty.', material:'100% Polyester', features:['Classic all-white design','Di Stéfano era','Real Madrid crest'], inStock:true },
  { team:'Liverpool', kit:'European Cup 1977', img:'/images/retro/liverpool_1977_shankly_european_cup.jpg', slug:'liverpool-european-cup-1977', cat:'retro', price:'₦40,000', description:'First European Cup. The beginning of Liverpool\'s dynasty under Shankly.', material:'100% Polyester', features:['Classic Liverpool red','Shankly era','European Cup champion'], inStock:true },
  { team:'Manchester United', kit:'Treble 98/99', img:'/images/retro/manchester_united_1999_treble_home.jpg', slug:'manchester-united-treble-99', cat:'retro', price:'₦40,000', description:'The Treble — Premier League, FA Cup, Champions League. Ferguson\'s greatest achievement.', material:'100% Polyester', features:['Treble-winning design','Sharp sponsor','Legacy United crest'], inStock:true },
  { team:'AC Milan', kit:'European Cup 1989', img:'/images/retro/ac_milan_1989_sacchi_home.jpg', slug:'ac-milan-european-cup-1989', cat:'retro', price:'₦40,000', description:'Dutch trio: Van Basten, Gullit, Rijkaard. Sacchi\'s dominant Milan side conquers Europe.', material:'100% Polyester', features:['Classic Milan stripes','Dutch trio era','European Cup champion'], inStock:true },
  { team:'Juventus', kit:'Champions League 1996', img:'/images/retro/juventus_1996_champions_league_final.png', slug:'juventus-champions-league-1996', cat:'retro', price:'₦40,000', description:'Del Piero era. Juventus\' Champions League glory in the iconic black & white stripes.', material:'100% Polyester', features:['Bianconeri stripes','Del Piero era','UCL champion design'], inStock:true },
];

const kidsProducts = [
  { team:'Manchester United', kit:'Home 26/27', img:'/images/kids/Man u.jpg', slug:'manchester-united-home-26-27-kids', cat:'kids', price:'₦30,000', description:'Manchester United home kit in kids sizes. Same authentic design, smaller fit.', material:'100% Recycled Polyester', features:['Dri-FIT technology','Kids fit','Authentic crest'], inStock:true },
  { team:'Arsenal', kit:'Home 26/27', img:'/images/kids/Arsenal Kids.jpg', slug:'arsenal-home-26-27-kids', cat:'kids', price:'₦30,000', description:'Arsenal home kit for young Gooners. Quality you can trust.', material:'100% Recycled Polyester', features:['Aeroreadly','Kids sizing','Arsenal badge'], inStock:true },
  { team:'Arsenal', kit:'Away 26/27', img:'/images/kids/Arsenal away kids.jpg', slug:'arsenal-away-26-27-kids', cat:'kids', price:'₦30,000', description:'Arsenal away kit for young Gooners on the road.', material:'100% Recycled Polyester', features:['Aeroreadly','Kids sizing','Arsenal badge'], inStock:true },
  { team:'FC Barcelona', kit:'Home 26/27', img:'/images/kids/Barcelona.jpg', slug:'fc-barcelona-home-26-27-kids', cat:'kids', price:'₦30,000', description:'Barcelona home kit for the next generation of Cules.', material:'100% Recycled Polyester', features:['Nike Dri-FIT','Kids fit','Barca crest'], inStock:true },
  { team:'Real Madrid', kit:'Home 26/27', img:'/images/kids/Real Madrid  Kids.jpg', slug:'real-madrid-home-26-27-kids', cat:'kids', price:'₦30,000', description:'Real Madrid home kit for young Madridistas.', material:'100% Recycled Polyester', features:['Dri-FIT technology','Kids sizing','Club badge'], inStock:true },
];

const leagueConfig = {
  'premier-league': { name:'Premier League', logo:'/images/football_logos/premier_league_logo.png', flag:'/images/football_logos/england_flag.svg' },
  'laliga':         { name:'La Liga',         logo:'/images/football_logos/laliga_logo.png',         flag:'/images/football_logos/spain_flag.svg' },
  'bundesliga':     { name:'Bundesliga',      logo:'/images/football_logos/bundesliga_logo.png',    flag:'/images/football_logos/germany_flag.svg' },
  'serie-a':        { name:'Serie A',         logo:'/images/football_logos/serie_a_logo.png',       flag:'/images/football_logos/italy_flag.svg' },
  'ligue1':         { name:'Ligue 1',         logo:'/images/football_logos/ligue1_logo.png',        flag:'/images/football_logos/france_flag.svg' },
  'saudi-pro-league': { name:'Saudi Pro League', logo:'/images/football_logos/saudi_pro_league_logo.png', flag:'/images/football_logos/saudi_flag.svg' },
  'world-cup':      { name:'World Cup',       logo:'/images/football_logos/england_flag.svg',      flag:'/images/football_logos/england_flag.svg' },
};

const clubLeague = {
  'Manchester United': 'premier-league',
  'Chelsea':           'premier-league',
  'Arsenal':           'premier-league',
  'Liverpool':         'premier-league',
  'Manchester City':   'premier-league',
  'Tottenham':         'premier-league',
  'Aston Villa':       'premier-league',
  'Newcastle':         'premier-league',
  'Bournemouth':       'premier-league',
  'Brighton':          'premier-league',
  'Everton':           'premier-league',
  'FC Barcelona':      'laliga',
  'Real Madrid':       'laliga',
  'Bayern Munich':     'bundesliga',
  'Dortmund':          'bundesliga',
  'AC Milan':          'serie-a',
  'Inter Milan':       'serie-a',
  'Juventus':          'serie-a',
  'PSG':               'ligue1',
  'Al Nassr':          'saudi-pro-league',
};

const retroLeague = {
  'Manchester United': 'premier-league',
  'Arsenal':           'premier-league',
  'Chelsea':           'premier-league',
  'Liverpool':         'premier-league',
  'Real Madrid':       'laliga',
  'FC Barcelona':      'laliga',
  'AC Milan':          'serie-a',
  'Juventus':          'serie-a',
  'Ajax':              'eredivisie',
  'Nigeria':           'world-cup',
  'Brazil':            'world-cup',
  'Argentina':         'world-cup',
  'Netherlands':       'world-cup',
  'Germany':           'world-cup',
  'France':            'world-cup',
  'Italy':             'world-cup',
};

const retroTeamFlag = {
  'Nigeria':     '/images/football_logos/nigeria_flag.svg',
  'Brazil':      '/images/football_logos/brazil_flag.svg',
  'Argentina':   '/images/football_logos/argentina_flag.svg',
  'Netherlands': '/images/football_logos/netherlands_flag.svg',
  'Germany':     '/images/football_logos/germany_flag.svg',
  'France':      '/images/football_logos/france_flag.svg',
  'Italy':       '/images/football_logos/italy_flag.svg',
};

const catConfig = {
  club:  { name:'Club Jerseys', sub: 'Browse our Fans &amp; Player Version club kits.', price:'\u20A635,000', addon:'+ \u20A65,000 Custom', label:'Fans Version', list: clubProducts, versions: { fans:'\u20A635,000', player:'\u20A655,000' } },
  national: { name:'National Teams', sub: 'National Team kits at great prices.', price:'\u20A630,000', addon:'+ \u20A65,000 Custom', label:'Official Kit', list: nationalProducts },
  retro: { name:'Retro Collection', sub: 'Classic designs from football\'s golden era.', price:'\u20A640,000', addon:'+ \u20A65,000 Custom', label:'Retro Classic', list: retroProducts },
  kids: { name:'Kids Jerseys', sub: 'Affordable kids sizes for your little fans.', price:'\u20A630,000', addon:'+ \u20A65,000 Custom', label:'Kids Version', list: kidsProducts },
};

/* Unified product lookup by slug */
const allProducts = [
  ...products,
  ...clubProducts.map(p => ({ ...p, id: p.slug, name: p.kit, tag: catConfig[p.cat]?.label || 'Kit' })),
  ...nationalProducts.map(p => ({ ...p, id: p.slug, name: p.kit, tag: catConfig[p.cat]?.label || 'Kit' })),
  ...retroProducts.map(p => ({ ...p, id: p.slug, name: p.kit, tag: catConfig[p.cat]?.label || 'Kit' })),
  ...kidsProducts.map(p => ({ ...p, id: p.slug, name: p.kit, tag: catConfig[p.cat]?.label || 'Kit' })),
];
function findProductBySlug(slug){ return allProducts.find(p => p.slug === slug); }

const PER_PAGE = 12;
let catPage = {};

function renderCategory(cat, league){
  const view = document.getElementById('category-view');
  const grid = document.getElementById('cv-grid');
  const pagination = document.getElementById('cv-pagination');
  const title = document.getElementById('cv-title');
  const sub = document.getElementById('cv-subtitle');
  const bcTitle = document.getElementById('cv-bc-title');
  const leagueBar = document.getElementById('cv-league-bar');
  if(!view || !grid || !title || !sub || !catConfig[cat]) return false;
  const cfg = catConfig[cat];
  title.textContent = cfg.name;
  if(bcTitle) bcTitle.textContent = cfg.name;
  sub.innerHTML = league && leagueConfig[league]
    ? leagueConfig[league].name + ' Jerseys <a href="/category/' + cat + '" class="league-clear">Show All</a>'
    : cfg.sub;
  let list = cfg.list;
  const teamLeague = cat === 'retro' ? retroLeague : clubLeague;
  if(league && (cat === 'club' || cat === 'retro')){
    list = list.filter(p => teamLeague[p.team] === league);
  }
  if(leagueBar){
    const showBar = cat === 'club' || cat === 'retro';
    leagueBar.style.display = showBar ? '' : 'none';
    if(showBar){
      const presentLeagues = [...new Set(cfg.list.map(p => teamLeague[p.team]).filter(Boolean))];
      leagueBar.innerHTML = '<span class="league-bar-label">Filter by League:</span>' +
        presentLeagues.map(l => {
          const lc = leagueConfig[l];
          if(!lc) return '';
          return '<a class="league-logo' + (l === league ? ' active' : '') + '" href="/category/' + cat + '?league=' + l + '" data-league="' + l + '">' +
            '<img src="' + lc.logo + '" alt="' + lc.name + '">' +
          '</a>';
        }).join('');
    }
  }

  const pageKey = cat + (league ? ':' + league : '');
  const totalPages = Math.ceil(list.length / PER_PAGE);
  if(!catPage[pageKey]) catPage[pageKey] = 1;
  if(catPage[pageKey] > totalPages) catPage[pageKey] = totalPages;
  const page = catPage[pageKey] || 1;
  const start = (page - 1) * PER_PAGE;
  const pageList = list.slice(start, start + PER_PAGE);

  grid.innerHTML = pageList.map(p => {
    const lKey = (cat === 'club' || cat === 'retro') ? teamLeague[p.team] : null;
    const lCfg = lKey ? leagueConfig[lKey] : null;
    const badgeSrc = cat === 'retro' && retroTeamFlag[p.team]
      ? retroTeamFlag[p.team]
      : (lCfg ? (cat === 'retro' ? lCfg.flag : lCfg.logo) : null);
    return `
    <div class="cat-prod-card" data-slug="${p.slug || ''}">
      <div class="cat-prod-visual">
        <span class="cat-prod-price">${cfg.price}</span>
        ${(p.images && p.images.length > 1) ? '<span class="cat-prod-views">2 Views</span>' : ''}
        <img src="${p.images?.[0] || p.img}" alt="${p.team} ${p.kit}" loading="lazy">
      </div>
      <div class="cat-prod-body">
        <div class="team">${badgeSrc ? '<img class="league-badge" src="' + badgeSrc + '" alt="' + lCfg.name + '"> ' : ''}${p.team}</div>
        <h3>${p.kit}</h3>
        <button class="btn btn-primary btn-block" data-order-cat data-cat="${cat}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg> Order Now</button>
      </div>
    </div>`;
  }).join('');

  if(pagination){
    if(totalPages <= 1){
      pagination.innerHTML = '';
    } else {
      let pHtml = '';
      pHtml += '<button class="cv-page-btn" data-dir="prev"' + (page <= 1 ? ' disabled' : '') + '>&larr; Prev</button>';
      for(let i = 1; i <= totalPages; i++){
        pHtml += '<button class="cv-page-num' + (i === page ? ' active' : '') + '" data-page="' + i + '">' + i + '</button>';
      }
      pHtml += '<button class="cv-page-btn" data-dir="next"' + (page >= totalPages ? ' disabled' : '') + '>Next &rarr;</button>';
      pagination.innerHTML = pHtml;
    }
  }
  return true;
}

const homeSections = () => document.querySelectorAll('#top, #collection, #league, #featured, .custom-section, #reviews, #how, .location-section, #faq, .final-cta, footer');

function showHome(){
  resetSEO();
  homeSections().forEach(el => {
    if(el.dataset._disp !== undefined){
      el.style.display = el.dataset._disp;
      delete el.dataset._disp;
    } else {
      el.style.removeProperty('display');
    }
  });
  const cv = document.getElementById('category-view');
  if(cv) cv.classList.add('hidden');
  const pv = document.getElementById('product-view');
  if(pv) pv.classList.add('hidden');
  document.body.style.overflow = '';
}

function showCategory(cat, league){
  resetSEO();
  document.title = catConfig[cat].name + ' | ' + SITE_NAME;
  const pageKey = cat + (league ? ':' + league : '');
  catPage[pageKey] = 1;
  if(!renderCategory(cat, league)) return;
  homeSections().forEach(el => {
    if(el.tagName === 'FOOTER') return;
    el.dataset._disp = el.style.display;
    el.style.setProperty('display', 'none', 'important');
  });
  const ft = document.querySelector('footer');
  if(ft){
    if(ft.dataset._disp !== undefined){
      ft.style.display = ft.dataset._disp;
      delete ft.dataset._disp;
    } else {
      ft.style.removeProperty('display');
    }
  }
  document.getElementById('category-view').classList.remove('hidden');
  document.getElementById('product-view')?.classList.add('hidden');
  document.body.style.overflow = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function getCurrentCategory(){
  const p = window.location.pathname.replace(/\/+$/, '') || '/';
  const pageCatMap = { '/club.html':'club', '/national.html':'national', '/retro.html':'retro', '/kids.html':'kids' };
  return pageCatMap[p] || null;
}

function handlePath(){
  let path = window.location.pathname.replace(/\/+$/, '') || '/';
  const pageCat = getCurrentCategory();
  if(pageCat){
    const league = new URLSearchParams(window.location.search).get('league') || undefined;
    showCategory(pageCat, league);
    return;
  }
  if(path === '/'){
    showHome();
    window.scrollTo({ top: 0 });
    return;
  }
  if(path.startsWith('/product/')){
    const slug = path.replace('/product/', '');
    const prodData = findProductBySlug(slug);
    if(prodData){
      showProductView({ closest: () => null, dataset: {} }, prodData, true);
      return;
    }
    showHome();
    return;
  }
  if(path.startsWith('/category/')){
    const parts = path.split('/');
    const cat = parts[2];
    const league = new URLSearchParams(window.location.search).get('league') || undefined;
    if(cat === 'club' || cat === 'national' || cat === 'retro' || cat === 'kids'){
      showCategory(cat, league);
      return;
    }
  }
  const sectionMap = { '/collection':'collection', '/custom-kits':'custom', '/reviews':'reviews', '/faq':'faq' };
  if(sectionMap[path]){
    showHome();
    requestAnimationFrame(() => {
      const el = document.getElementById(sectionMap[path]);
      if(el) el.scrollIntoView({ behavior: 'smooth' });
    });
    return;
  }
  showHome();
}

function navigateTo(path){
  history.pushState(null, '', path);
  handlePath();
}

document.addEventListener('click', function(e){
  if(getCurrentCategory()) return;
  const link = e.target.closest('a');
  if(!link || link.target === '_blank') return;
  const href = link.getAttribute('href');
  if(!href || href.startsWith('http') || href.startsWith('//') || href.startsWith('#') || href.startsWith('mailto:')) return;
  e.preventDefault();
  navigateTo(href);
});

document.getElementById('cv-back-btn')?.addEventListener('click', function(e){
  e.preventDefault();
  navigateTo('/');
});

window.addEventListener('popstate', handlePath);
handlePath();

(function initBackToTop(){
  const btn = document.getElementById('back-to-top');
  if(!btn) return;
  window.addEventListener('scroll', function(){
    if(window.scrollY > 500){ btn.classList.add('visible'); }
    else { btn.classList.remove('visible'); }
  }, { passive: true });
  btn.addEventListener('click', function(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ============ SIZE GUIDE ============ */
(function(){
  const overlay = document.getElementById('size-guide-modal');
  const openBtn = document.getElementById('sg-open');
  const closeBtn = document.getElementById('sg-close');
  if(!overlay || !openBtn || !closeBtn) return;

  function openSG(){ overlay.classList.remove('hidden'); document.body.style.overflow = 'hidden'; }
  function closeSG(){ overlay.classList.add('hidden'); document.body.style.overflow = ''; }

  openBtn.addEventListener('click', openSG);
  closeBtn.addEventListener('click', closeSG);
  overlay.addEventListener('click', function(e){ if(e.target === overlay) closeSG(); });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape' && !overlay.classList.contains('hidden')) closeSG(); });
})();
