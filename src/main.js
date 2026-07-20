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
  '/images/club/manchester-united-2026-27-home-kit.jpg',
  '/images/club/fc-barcelona-2026-27-away-kit.jpg',
  '/images/club/ChealseaHome.png',
  '/images/club/arsenal-fc-2026-27-home-kit.jpg',
  '/images/club/bayern-munchen-2026-27-home-kit.jpg',
  '/images/club/liverpool-fc-2026-27-home-kit.jpg',
  '/images/club/real-madrid-2026-27-away-kit.jpg',
  '/images/club/fc-barcelona-2026-27-third-kit.jpg',
  '/images/club/real-madrid-2026-27-home-kit.png',
  '/images/club/arsenal-fc-2026-27-third-kit.jpg',
  '/images/club/fc-barcelona-2026-27-home-kit.jpg',
], 3500);

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
  '/images/club/manchester-united-2026-27-home-kit.jpg',
  '/images/club/arsenal-fc-2026-27-home-kit.jpg',
  '/images/club/fc-barcelona-2026-27-home-kit.jpg',
  '/images/club/real-madrid-2026-27-home-kit.png',
  '/images/club/liverpool-fc-2026-27-home-kit.jpg',
], 3500);

const products = [
  { id:'prod-1', team:'Manchester United', name:'Home Jersey 25/26', tag:'Home Kit', cat:'club', price:'₦35,000', slug:'manchester-united-home-25-26', description:'The 2025/26 Manchester United home kit delivers the classic red devil look with modern performance fabric. Breathable mesh panels and a tailored fit make it match-day ready.', material:'100% Recycled Polyester', features:['Dri-FIT moisture management','Breathable mesh side panels','Authentic club crest','Ribbed crew neck collar'], inStock:true, images:['/images/club/manchester-united-2026-27-home-kit.jpg'] },
  { id:'prod-2', team:'Arsenal', name:'Home Jersey 25/26', tag:'Home Kit', cat:'club', price:'₦35,000', slug:'arsenal-home-25-26', description:'Arsenal\'s 2025/26 home shirt features the iconic red body with white sleeves, updated with a sleek modern cut and premium fabric finish.', material:'100% Recycled Polyester', features:['Aeroready technology','Lightweight woven fabric','Emirates sponsor print','Authentic Arsenal badge'], inStock:true, images:['/images/club/arsenal-fc-2026-27-home-kit.jpg'] },
  { id:'prod-3', team:'Real Madrid', name:'Home Jersey 25/26', tag:'Home Kit', cat:'club', price:'₦35,000', slug:'real-madrid-home-25-26', description:'The king of European football returns with a clean white home kit for 2025/26. Subtle detailing and premium construction set this apart.', material:'100% Recycled Polyester', features:['Dri-FIT ADV technology','Structured fit','Gold club crest detailing','UV protection'], inStock:true, images:['/images/club/real-madrid-2026-27-home-kit.png'] },
  { id:'prod-4', team:'Super Eagles', name:'Home Jersey 25/26', tag:'Home Kit', cat:'national', price:'₦30,000', slug:'super-eagles-home-25-26', description:'Rep the Naija spirit with the Super Eagles 2025/26 home kit. Bold green design with intricate pattern details inspired by Nigerian culture.', material:'100% Polyester', features:['Lightweight breathable fabric','NFF official design','Bold cultural pattern','Comfortable regular fit'], inStock:true, images:['/images/national/nigeria-2026-home-kit.jpg'] },
  { id:'prod-5', team:'FC Barcelona', name:'Home Jersey 25/26', tag:'Home Kit', cat:'club', price:'₦35,000', slug:'fc-barcelona-home-25-26', description:'Barcelona\'s 2025/26 home kit blends the traditional blaugrana stripes with a fresh modern twist. Premium quality you can feel.', material:'100% Recycled Polyester', features:['Nike Dri-FIT','Moisture-wicking fabric','Barca crest','Athletic fit'], inStock:true, images:['/images/club/fc-barcelona-2026-27-home-kit.jpg'] },
  { id:'prod-6', team:'Chelsea', name:'Home Jersey 25/26', tag:'Home Kit', cat:'club', price:'₦35,000', slug:'chelsea-home-25-26', description:'Chelsea\'s 2025/26 home jersey brings the blues with a sharp, clean design. Built for comfort on and off the pitch.', material:'100% Recycled Polyester', features:['Dri-FIT technology','Breathable construction','Crest heat-transfer','Regular fit'], inStock:true, images:['/images/club/ChealseaHome.png'] },
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

  let team, kit, priceText, baseVal, imgSrc, cat, description, material, features, inStock, tag, slug;

  if(productData){
    team = productData.team;
    kit = productData.name || productData.kit;
    priceText = productData.price;
    baseVal = parseInt(priceText.replace(/[^0-9]/g,'')) || 35000;
    imgSrc = productData.images ? productData.images[0] : productData.img;
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
    imgSrc = card.querySelector('img').src;
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
    imgSrc = '/images/customized/arsenal%20customized.png';
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
  document.getElementById('pv-main-img').src = imgSrc;
  document.getElementById('pv-main-img').alt = team + ' ' + kit;
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
      document.querySelector('.che-cta'),
      document.querySelector('.cov-cta'),
      document.querySelector('.esp-cta'),
      document.querySelector('.arg-cta')
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
  { team:'Manchester United', kit:'Home 25/26', img:'/images/club/manchester-united-2026-27-home-kit.jpg', slug:'manchester-united-home-25-26', cat:'club', price:'₦35,000', description:'The 2025/26 Manchester United home kit delivers the classic red devil look with modern performance fabric.', material:'100% Recycled Polyester', features:['Dri-FIT moisture management','Breathable mesh panels','Authentic club crest'], inStock:true },
  { team:'FC Barcelona', kit:'Away 25/26', img:'/images/club/fc-barcelona-2026-27-away-kit.jpg', slug:'fc-barcelona-away-25-26', cat:'club', price:'₦35,000', description:'Barcelona\'s 2025/26 away kit offers a sleek alternative with premium construction.', material:'100% Recycled Polyester', features:['Nike Dri-FIT','Lightweight fabric','Barca crest'], inStock:true },
  { team:'Chelsea', kit:'Home 25/26', img:'/images/club/ChealseaHome.png', slug:'chelsea-home-25-26', cat:'club', price:'₦35,000', description:'Chelsea\'s 2025/26 home jersey brings the blues with a sharp, clean design.', material:'100% Recycled Polyester', features:['Dri-FIT technology','Breathable construction','Crest heat-transfer'], inStock:true },
  { team:'Arsenal', kit:'Home 25/26', img:'/images/club/arsenal-fc-2026-27-home-kit.jpg', slug:'arsenal-home-25-26', cat:'club', price:'₦35,000', description:'Arsenal\'s 2025/26 home shirt features the iconic red body with white sleeves.', material:'100% Recycled Polyester', features:['Aeroready technology','Lightweight woven fabric','Authentic Arsenal badge'], inStock:true },
  { team:'Bayern Munchen', kit:'Home 25/26', img:'/images/club/bayern-munchen-2026-27-home-kit.jpg', slug:'bayern-munchen-home-25-26', cat:'club', price:'₦35,000', description:'Bayern Munich\'s classic red home kit for the 2025/26 season with premium detailing.', material:'100% Recycled Polyester', features:['Adidas AEROREADY','Club crest','Athletic fit'], inStock:true },
  { team:'Liverpool', kit:'Home 25/26', img:'/images/club/liverpool-fc-2026-27-home-kit.jpg', slug:'liverpool-home-25-26', cat:'club', price:'₦35,000', description:'Liverpool\'s 2025/26 home kit in iconic red with modern performance technology.', material:'100% Recycled Polyester', features:['Nike Dri-FIT','Crest detailing','Breathable fabric'], inStock:true },
  { team:'Real Madrid', kit:'Away 25/26', img:'/images/club/real-madrid-2026-27-away-kit.jpg', slug:'real-madrid-away-25-26', cat:'club', price:'₦35,000', description:'Real Madrid\'s 2025/26 away kit offers a bold alternative to the classic white.', material:'100% Recycled Polyester', features:['Dri-FIT ADV','Premium construction','Club badge'], inStock:true },
  { team:'FC Barcelona', kit:'Third 25/26', img:'/images/club/fc-barcelona-2026-27-third-kit.jpg', slug:'fc-barcelona-third-25-26', cat:'club', price:'₦35,000', description:'Barcelona\'s third kit for 2025/26 brings a fresh look for European nights.', material:'100% Recycled Polyester', features:['Nike Dri-FIT','Unique design','Barca crest'], inStock:true },
  { team:'Real Madrid', kit:'Home 25/26', img:'/images/club/real-madrid-2026-27-home-kit.png', slug:'real-madrid-home-25-26', cat:'club', price:'₦35,000', description:'The king of European football returns with a clean white home kit for 2025/26.', material:'100% Recycled Polyester', features:['Dri-FIT ADV technology','Gold crest detailing','UV protection'], inStock:true },
  { team:'Arsenal', kit:'Third 25/26', img:'/images/club/arsenal-fc-2026-27-third-kit.jpg', slug:'arsenal-third-25-26', cat:'club', price:'₦35,000', description:'Arsenal\'s third kit for 2025/26 with a distinctive design for cup competitions.', material:'100% Recycled Polyester', features:['Aeroready technology','Lightweight build','Arsenal badge'], inStock:true },
  { team:'FC Barcelona', kit:'Home 25/26', img:'/images/club/fc-barcelona-2026-27-home-kit.jpg', slug:'fc-barcelona-home-25-26', cat:'club', price:'₦35,000', description:'Barcelona\'s 2025/26 home kit blends traditional blaugrana stripes with a fresh twist.', material:'100% Recycled Polyester', features:['Nike Dri-FIT','Moisture-wicking','Athletic fit'], inStock:true },
];

const nationalProducts = [
  { team:'Nigeria', kit:'Home 25/26', img:'/images/national/nigeria-2026-home-kit.jpg', slug:'super-eagles-home-25-26', cat:'national', price:'₦30,000', description:'Rep the Naija spirit with the Super Eagles 2025/26 home kit. Bold green with cultural patterns.', material:'100% Polyester', features:['Lightweight breathable fabric','NFF official design','Bold cultural pattern'], inStock:true },
  { team:'Nigeria', kit:'Away 25/26', img:'/images/national/nigeria-2026-away.png', slug:'super-eagles-away-25-26', cat:'national', price:'₦30,000', description:'The Super Eagles away kit for 2025/26 in a clean, sharp design.', material:'100% Polyester', features:['Lightweight fabric','NFF badge','Regular fit'], inStock:true },
  { team:'Argentina', kit:'Home 25/26', img:'/images/national/argentina-2026-home-back.webp', slug:'argentina-home-25-26', cat:'national', price:'₦35,000', description:'Argentina\'s 2025/26 home kit in the legendary albiceleste stripes. World Cup champions vibes.', material:'100% Recycled Polyester', features:['AFA badge','Dri-FIT technology','Classic design'], inStock:true },
  { team:'Argentina', kit:'Away 25/26 (Messi)', img:'/images/national/argentina-2026-away-messi-front.webp', slug:'argentina-away-messi-25-26', cat:'national', price:'₦40,000', description:'Argentina\'s 2025/26 away kit featuring Messi\'s name and number. A must-have for fans.', material:'100% Recycled Polyester', features:['Messi 10 printing','AFA badge','Premium fabric'], inStock:true },
  { team:'England', kit:'Home 25/26', img:'/images/national/england-2026-home-kit.jpg', slug:'england-home-25-26', cat:'national', price:'₦35,000', description:'England\'s 2025/26 home kit in classic white with the Three Lions crest.', material:'100% Recycled Polyester', features:['Nike Dri-FIT','FA crest','Clean white design'], inStock:true },
  { team:'England', kit:'Away 25/26', img:'/images/national/england-2026-away-kit.jpg', slug:'england-away-25-26', cat:'national', price:'₦35,000', description:'England\'s 2025/26 away kit with a bold new look for the Three Lions.', material:'100% Recycled Polyester', features:['Dri-FIT technology','FA crest','Athletic fit'], inStock:true },
  { team:'France', kit:'Home 25/26', img:'/images/national/france-2026-home-kit.jpg', slug:'france-home-25-26', cat:'national', price:'₦35,000', description:'France\'s 2025/26 home kit in the iconic bleu with modern performance features.', material:'100% Recycled Polyester', features:['Nike Dri-FIT','FFF crest','Lightweight build'], inStock:true },
  { team:'France', kit:'Away 25/26', img:'/images/national/france-2026-away-kit.jpg', slug:'france-away-25-26', cat:'national', price:'₦35,000', description:'France\'s 2025/26 away kit with a sleek alternative design.', material:'100% Recycled Polyester', features:['Dri-FIT technology','FFF badge','Regular fit'], inStock:true },
  { team:'Spain', kit:'Home 25/26', img:'/images/national/spain-2026-home-front.webp', slug:'spain-home-25-26', cat:'national', price:'₦35,000', description:'Spain\'s 2025/26 home kit in classic red. La Roja returns with style.', material:'100% Recycled Polyester', features:['Adidas AEROREADY','RFEF crest','Breathable fabric'], inStock:true },
  { team:'Spain', kit:'Away 25/26', img:'/images/national/spain-2026-away-kit.jpg', slug:'spain-away-25-26', cat:'national', price:'₦35,000', description:'Spain\'s 2025/26 away kit offering a fresh look for away fixtures.', material:'100% Recycled Polyester', features:['AEROREADY technology','RFEF badge','Comfortable fit'], inStock:true },
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
  { team:'Brazil', kit:'World Cup 1970', img:'/images/retro/brazil_1970_world_cup_home.png', slug:'brazil-world-cup-1970', cat:'retro', price:'₦45,000', description:'Pelé\'s legendary canary yellow. Brazil\'s third World Cup triumph — the greatest team ever.', material:'100% Polyester', features:['Classic canary yellow','Iconic Brazil crest','Pelé era design'], inStock:true },
  { team:'Argentina', kit:'World Cup 1986', img:'/images/retro/argentina_1986_maradona_world_cup.png', slug:'argentina-world-cup-1986', cat:'retro', price:'₦45,000', description:'Maradona\'s "Hand of God" & "Goal of the Century". Argentina\'s second World Cup glory.', material:'100% Polyester', features:['Maradona 10 printing','Argentina crest','Historic albiceleste design'], inStock:true },
  { team:'Netherlands', kit:'Euro 1988', img:'/images/retro/netherlands_1988_euro_van_basten.png', slug:'netherlands-euro-1988', cat:'retro', price:'₦45,000', description:'Van Basten\'s iconic volley. The Oranje\'s first and only major trophy — Euro 88 champions.', material:'100% Polyester', features:['Oranje classic design','Van Basten era','KNVB crest'], inStock:true },
  { team:'Germany', kit:'World Cup 1990', img:'/images/retro/germany_1990_world_cup_home.png', slug:'germany-world-cup-1990', cat:'retro', price:'₦45,000', description:'Matthäus lifting the trophy. The tricolor chevron design — a footballing icon.', material:'100% Polyester', features:['Tricolor chevron design','DFB crest','World Cup champion kit'], inStock:true },
  { team:'France', kit:'World Cup 1998', img:'/images/retro/france_1998_zidane_world_cup.png', slug:'france-world-cup-1998', cat:'retro', price:'₦45,000', description:'Zidane\'s two headers in the final. France\'s first World Cup title on home soil.', material:'100% Polyester', features:['Classic French blue','Zidane era design','World Cup 98 champion'], inStock:true },
  { team:'Italy', kit:'World Cup 1990', img:'/images/retro/italy_1990_world_cup_bagio.png', slug:'italy-world-cup-1990', cat:'retro', price:'₦40,000', description:'Baggio\'s tragic missed penalty. Italy\'s iconic Azzurri kit from their home World Cup.', material:'100% Polyester', features:['Azzurri blue classic','FIGC crest','Baggio era design'], inStock:true },
  { team:'Ajax', kit:'European Cup 1973', img:'/images/retro/ajax_1973_cruyff_european_cup.png', slug:'ajax-european-cup-1973', cat:'retro', price:'₦40,000', description:'Cruyff\'s Total Football. Ajax\'s third consecutive European Cup triumph.', material:'100% Polyester', features:['Classic Ajax design','Total Football era','European Cup champion'], inStock:true },
  { team:'Real Madrid', kit:'European Cup 60s', img:'/images/retro/real_madrid_1960s_distefano.png', slug:'real-madrid-european-cup-60s', cat:'retro', price:'₦40,000', description:'Di Stéfano\'s era of European dominance. The original white shirt of football royalty.', material:'100% Polyester', features:['Classic all-white design','Di Stéfano era','Real Madrid crest'], inStock:true },
  { team:'Liverpool', kit:'European Cup 1977', img:'/images/retro/liverpool_1977_shankly_european_cup.png', slug:'liverpool-european-cup-1977', cat:'retro', price:'₦40,000', description:'First European Cup. The beginning of Liverpool\'s dynasty under Shankly.', material:'100% Polyester', features:['Classic Liverpool red','Shankly era','European Cup champion'], inStock:true },
  { team:'Manchester United', kit:'Treble 98/99', img:'/images/retro/manchester_united_1999_treble_home.png', slug:'manchester-united-treble-99', cat:'retro', price:'₦40,000', description:'The Treble — Premier League, FA Cup, Champions League. Ferguson\'s greatest achievement.', material:'100% Polyester', features:['Treble-winning design','Sharp sponsor','Legacy United crest'], inStock:true },
  { team:'AC Milan', kit:'European Cup 1989', img:'/images/retro/ac_milan_1989_sacchi_home.png', slug:'ac-milan-european-cup-1989', cat:'retro', price:'₦40,000', description:'Dutch trio: Van Basten, Gullit, Rijkaard. Sacchi\'s dominant Milan side conquers Europe.', material:'100% Polyester', features:['Classic Milan stripes','Dutch trio era','European Cup champion'], inStock:true },
  { team:'Juventus', kit:'Champions League 1996', img:'/images/retro/juventus_1996_champions_league_final.png', slug:'juventus-champions-league-1996', cat:'retro', price:'₦40,000', description:'Del Piero era. Juventus\' Champions League glory in the iconic black & white stripes.', material:'100% Polyester', features:['Bianconeri stripes','Del Piero era','UCL champion design'], inStock:true },
];

const kidsProducts = [
  { team:'Manchester United', kit:'Home 26/27', img:'/images/club/manchester-united-2026-27-home-kit.jpg', slug:'manchester-united-home-25-26-kids', cat:'kids', price:'₦30,000', description:'Manchester United home kit in kids sizes. Same authentic design, smaller fit.', material:'100% Recycled Polyester', features:['Dri-FIT technology','Kids fit','Authentic crest'], inStock:true },
  { team:'Arsenal', kit:'Home 26/27', img:'/images/club/arsenal-fc-2026-27-home-kit.jpg', slug:'arsenal-home-25-26-kids', cat:'kids', price:'₦30,000', description:'Arsenal home kit for young Gooners. Quality you can trust.', material:'100% Recycled Polyester', features:['Aeroreadly','Kids sizing','Arsenal badge'], inStock:true },
  { team:'FC Barcelona', kit:'Home 26/27', img:'/images/club/fc-barcelona-2026-27-home-kit.jpg', slug:'fc-barcelona-home-25-26-kids', cat:'kids', price:'₦30,000', description:'Barcelona home kit for the next generation of Cules.', material:'100% Recycled Polyester', features:['Nike Dri-FIT','Kids fit','Barca crest'], inStock:true },
  { team:'Real Madrid', kit:'Home 26/27', img:'/images/club/real-madrid-2026-27-home-kit.png', slug:'real-madrid-home-25-26-kids', cat:'kids', price:'₦30,000', description:'Real Madrid home kit for young Madridistas.', material:'100% Recycled Polyester', features:['Dri-FIT technology','Kids sizing','Club badge'], inStock:true },
  { team:'Chelsea', kit:'Home 26/27', img:'/images/club/ChealseaHome.png', slug:'chelsea-home-25-26-kids', cat:'kids', price:'₦30,000', description:'Chelsea home kit for the little Blues.', material:'100% Recycled Polyester', features:['Dri-FIT','Kids fit','Chelsea crest'], inStock:true },
  { team:'Liverpool', kit:'Home 26/27', img:'/images/club/liverpool-fc-2026-27-home-kit.jpg', slug:'liverpool-home-25-26-kids', cat:'kids', price:'₦30,000', description:'Liverpool home kit for young Reds fans.', material:'100% Recycled Polyester', features:['Nike Dri-FIT','Kids sizing','LFC crest'], inStock:true },
];

const leagueConfig = {
  'premier-league': { name:'Premier League', logo:'/images/football_logos/premier_league_logo.png', flag:'/images/football_logos/england_flag.svg' },
  'laliga':         { name:'La Liga',         logo:'/images/football_logos/laliga_logo.png',         flag:'/images/football_logos/spain_flag.svg' },
  'bundesliga':     { name:'Bundesliga',      logo:'/images/football_logos/bundesliga_logo.png',    flag:'/images/football_logos/germany_flag.svg' },
  'serie-a':        { name:'Serie A',         logo:'/images/football_logos/serie_a_logo.png',       flag:'/images/football_logos/italy_flag.svg' },
  'ligue1':         { name:'Ligue 1',         logo:'/images/football_logos/ligue1_logo.png',        flag:'/images/football_logos/france_flag.svg' },
};

const clubLeague = {
  'Manchester United': 'premier-league',
  'Chelsea':           'premier-league',
  'Arsenal':           'premier-league',
  'Liverpool':         'premier-league',
  'FC Barcelona':      'laliga',
  'Real Madrid':       'laliga',
  'Bayern Munchen':    'bundesliga',
  'AC Milan':          'serie-a',
  'Juventus':          'serie-a',
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

function renderCategory(cat, league){
  const view = document.getElementById('category-view');
  const grid = document.getElementById('cv-grid');
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
  if(league && cat === 'club'){
    list = list.filter(p => clubLeague[p.team] === league);
  }
  if(leagueBar){
    leagueBar.style.display = cat === 'club' ? '' : 'none';
    leagueBar.querySelectorAll('.league-logo').forEach(el => {
      const l = el.dataset.league;
      el.classList.toggle('active', l === league);
    });
  }
  grid.innerHTML = list.map(p => {
    const lKey = cat === 'club' ? clubLeague[p.team] : null;
    const lCfg = lKey ? leagueConfig[lKey] : null;
    return `
    <div class="cat-prod-card" data-slug="${p.slug || ''}">
      <div class="cat-prod-visual">
        ${lCfg ? '<img class="league-badge" src="' + lCfg.logo + '" alt="' + lCfg.name + '" title="' + lCfg.name + '">' : ''}
        <span class="cat-prod-price">${cfg.price}</span>
        <span class="cat-prod-addon">${cfg.addon}</span>
        <img src="${p.img}" alt="${p.team} ${p.kit}" loading="lazy">
      </div>
      <div class="cat-prod-body">
        <div class="team">${p.team}</div>
        <h3>${p.kit}</h3>
        <button class="btn btn-primary btn-block" data-order-cat data-cat="${cat}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg> Order Now</button>
      </div>
    </div>`;
  }).join('');
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
  if(!renderCategory(cat, league)) return;
  resetSEO();
  document.title = catConfig[cat].name + ' | ' + SITE_NAME;
  homeSections().forEach(el => {
    el.dataset._disp = el.style.display;
    el.style.setProperty('display', 'none', 'important');
  });
  document.getElementById('category-view').classList.remove('hidden');
  document.body.style.overflow = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handlePath(){
  let path = window.location.pathname.replace(/\/+$/, '') || '/';
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
