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

const products = [
  { id:'prod-1', team:'Manchester United', name:'Home Jersey 25/26', tag:'Home Kit', cat:'club', price:'₦35,000', images:['/images/club/manchester-united-2026-27-home-kit.jpg'] },
  { id:'prod-2', team:'Arsenal', name:'Home Jersey 25/26', tag:'Home Kit', cat:'club', price:'₦35,000', images:['/images/club/arsenal-fc-2026-27-home-kit.jpg'] },
  { id:'prod-3', team:'Real Madrid', name:'Home Jersey 25/26', tag:'Home Kit', cat:'club', price:'₦35,000', images:['/images/club/real-madrid-2026-27-home-kit.png'] },
  { id:'prod-4', team:'Super Eagles', name:'Home Jersey 25/26', tag:'Home Kit', cat:'national', price:'₦30,000', images:['/images/national/nigeria-2026-home-kit.jpg'] },
  { id:'prod-5', team:'FC Barcelona', name:'Home Jersey 25/26', tag:'Home Kit', cat:'club', price:'₦35,000', images:['/images/club/fc-barcelona-2026-27-home-kit.jpg'] },
  { id:'prod-6', team:'Chelsea', name:'Home Jersey 25/26', tag:'Home Kit', cat:'club', price:'₦35,000', images:['/images/club/ChealseaHome.png'] },
];

(function renderProducts(){
  const grid = document.getElementById('prod-grid');
  if(!grid) return;
  grid.innerHTML = products.map(p => `
    <div class="prod-card" data-id="${p.id}">
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

function showProductView(btn){
  const card = btn.closest('.prod-card, .cat-prod-card');
  const form = document.getElementById('product-form');
  const isCustom = !card;

  document.querySelectorAll('.pv-opt-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.pv-opt-btn[data-value="M"]')?.classList.add('active');
  document.getElementById('pv-size').value = 'M';
  document.getElementById('pv-preference').value = 'plain';
  document.getElementById('pv-custom-fields').classList.add('hidden');
  document.getElementById('pv-custom-name').value = '';
  document.getElementById('pv-custom-number').value = '';
  document.getElementById('pv-location').value = '';
  document.getElementById('pv-badge').value = 'None';

  if(card){
    const team = card.querySelector('.team').textContent;
    const kit = card.querySelector('h3').textContent;
    document.getElementById('pv-team').textContent = team;
    document.getElementById('pv-name').textContent = kit;
    const priceEl = card.querySelector('.cat-prod-price');
    const priceText = priceEl ? priceEl.textContent : '';
    document.getElementById('pv-price-display').textContent = priceText;
    document.getElementById('pv-main-img').src = card.querySelector('img').src;
    const baseVal = priceEl ? parseInt(priceEl.textContent.replace(/[^0-9]/g,'')) : 35000;
    form.dataset.baseVal = String(baseVal);
    form.dataset.team = team;
    form.dataset.kit = kit;
    form.dataset.cat = btn.dataset.cat || '';
  } else {
    document.getElementById('pv-team').textContent = 'Custom Order';
    document.getElementById('pv-name').textContent = 'Custom Jersey';
    document.getElementById('pv-price-display').textContent = '\u20A635,000';
    document.getElementById('pv-main-img').src = '/images/customized/arsenal%20customized.png';
    form.dataset.baseVal = '35000';
    form.dataset.team = 'Custom';
    form.dataset.kit = 'Custom Order';
    form.dataset.cat = '';
  }

  document.getElementById('pv-label').textContent = 'Jersey Price';
  document.getElementById('pv-base').textContent = '\u20A6' + parseInt(form.dataset.baseVal).toLocaleString();
  updatePriceDisplay();

  document.getElementById('category-view')?.classList.add('hidden');
  homeSections().forEach(el => {
    el.dataset._disp = el.style.display;
    el.style.setProperty('display', 'none', 'important');
  });
  document.getElementById('product-view').classList.remove('hidden');
  document.body.style.overflow = '';
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
    const fakeBtn = { closest: (s) => card ? card.closest(s) : null, dataset: {} };
    showProductView(fakeBtn);
    return;
  }
  const customBtn = e.target.closest('[data-custom], [data-order-cat]');
  if(customBtn){ showProductView(customBtn); return; }
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

(function countdown(){
  const finalDate = new Date('2026-07-19T20:00:00+01:00').getTime();
  const dEl = document.getElementById('cd-days');
  const hEl = document.getElementById('cd-hours');
  const mEl = document.getElementById('cd-mins');
  const sEl = document.getElementById('cd-secs');
  if(!dEl) return;

  function tick(){
    const now = Date.now();
    let diff = finalDate - now;
    if(diff < 0) diff = 0;
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    dEl.textContent = d;
    hEl.textContent = String(h).padStart(2,'0');
    mEl.textContent = String(m).padStart(2,'0');
    sEl.textContent = String(s).padStart(2,'0');
  }
  tick();
  setInterval(tick, 1000);
})();

(function heroSlideshow(){
  const container = document.getElementById('hero-slideshow');
  if(!container) return;
  const slides = container.querySelectorAll('.slide');
  const prevBtn = container.querySelector('.slide-arrow-prev');
  const nextBtn = container.querySelector('.slide-arrow-next');
  const texts = document.querySelectorAll('.slide-text');
  let current = 0, interval;

  function showOverlay(slideIdx){
    const isSpecial = slideIdx === 0 || slideIdx === 2;
    document.querySelector('.hero-copy h1').style.display = isSpecial ? 'none' : '';
    document.querySelector('.hero-sub').style.display = isSpecial ? 'none' : '';
    document.querySelector('.hero-ctas').style.display = isSpecial ? 'none' : '';
    document.querySelector('.badges').style.display = isSpecial ? 'none' : '';
    document.querySelector('.wc-cta').style.display = slideIdx === 0 ? '' : 'none';
    document.querySelector('.arg-cta').style.display = slideIdx === 2 ? '' : 'none';
  }

  function goTo(idx){
    slides[current].classList.remove('active');
    if(texts[current]) texts[current].classList.remove('active');
    current = idx;
    slides[current].classList.add('active');
    if(texts[current]) texts[current].classList.add('active');
    showOverlay(current);
  }

  showOverlay(0);

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
  { team:'Manchester United', kit:'Home 25/26', img:'/images/club/manchester-united-2026-27-home-kit.jpg' },
  { team:'FC Barcelona', kit:'Away 25/26', img:'/images/club/fc-barcelona-2026-27-away-kit.jpg' },
  { team:'Chelsea', kit:'Home 25/26', img:'/images/club/ChealseaHome.png' },
  { team:'Arsenal', kit:'Home 25/26', img:'/images/club/arsenal-fc-2026-27-home-kit.jpg' },
  { team:'Bayern Munchen', kit:'Home 25/26', img:'/images/club/bayern-munchen-2026-27-home-kit.jpg' },
  { team:'Liverpool', kit:'Home 25/26', img:'/images/club/liverpool-fc-2026-27-home-kit.jpg' },
  { team:'Real Madrid', kit:'Away 25/26', img:'/images/club/real-madrid-2026-27-away-kit.jpg' },
  { team:'FC Barcelona', kit:'Third 25/26', img:'/images/club/fc-barcelona-2026-27-third-kit.jpg' },
  { team:'Real Madrid', kit:'Home 25/26', img:'/images/club/real-madrid-2026-27-home-kit.png' },
  { team:'Arsenal', kit:'Third 25/26', img:'/images/club/arsenal-fc-2026-27-third-kit.jpg' },
  { team:'FC Barcelona', kit:'Home 25/26', img:'/images/club/fc-barcelona-2026-27-home-kit.jpg' },
];

const nationalProducts = [
  { team:'Nigeria', kit:'Home 25/26', img:'/images/national/nigeria-2026-home-kit.jpg' },
  { team:'Nigeria', kit:'Away 25/26', img:'/images/national/nigeria-2026-away.png' },
  { team:'Argentina', kit:'Home 25/26', img:'/images/national/argentina-2026-home-back.webp' },
  { team:'Argentina', kit:'Away 25/26 (Messi)', img:'/images/national/argentina-2026-away-messi-front.webp' },
  { team:'England', kit:'Home 25/26', img:'/images/national/england-2026-home-kit.jpg' },
  { team:'England', kit:'Away 25/26', img:'/images/national/england-2026-away-kit.jpg' },
  { team:'France', kit:'Home 25/26', img:'/images/national/france-2026-home-kit.jpg' },
  { team:'France', kit:'Away 25/26', img:'/images/national/france-2026-away-kit.jpg' },
  { team:'Spain', kit:'Home 25/26', img:'/images/national/spain-2026-home-front.webp' },
  { team:'Spain', kit:'Away 25/26', img:'/images/national/spain-2026-away-kit.jpg' },
];

const retroProducts = [
  { team:'Manchester United', kit:'Home 98/99', img:'/images/retro/manchester-united-1998-99-home-kit.jpg' },
  { team:'Manchester United', kit:'Home 07/08', img:'/images/retro/manchester-united-2007-08-home-kit.jpg' },
  { team:'Arsenal', kit:'Home 05/06', img:'/images/retro/arsenal-fc-2005-06-home-kit.jpg' },
  { team:'Chelsea', kit:'Home 12/13', img:'/images/retro/chelsea-fc-2012-13-home-kit.jpg' },
  { team:'FC Barcelona', kit:'Home 10/11', img:'/images/retro/fc-barcelona-2010-11-home-kit.jpg' },
  { team:'Liverpool', kit:'Home 17/18', img:'/images/retro/liverpool-fc-2017-18-home-kit.jpg' },
  { team:'Real Madrid', kit:'Home 98/99', img:'/images/retro/real-madrid-1998-99-home-kit.jpg' },
  { team:'AC Milan', kit:'Home 06/07', img:'/images/retro/ac-milan-2006-07-home-kit.jpg' },
  { team:'Nigeria', kit:'Home 94/95', img:'/images/retro/nigeria-1994-95-home-kit.jpg' },
];

const catConfig = {
  club:  { name:'Club Jerseys', sub: 'Browse our Fans &amp; Player Version club kits.', price:'\u20A635,000', addon:'+ \u20A65,000 Custom', label:'Fans Version', list: clubProducts, versions: { fans:'\u20A635,000', player:'\u20A655,000' } },
  national: { name:'National Teams', sub: 'National Team kits at great prices.', price:'\u20A630,000', addon:'+ \u20A65,000 Custom', label:'Official Kit', list: nationalProducts },
  retro: { name:'Retro Collection', sub: 'Classic designs from football\'s golden era.', price:'\u20A640,000', addon:'+ \u20A65,000 Custom', label:'Retro Classic', list: retroProducts },
};

function renderCategory(cat){
  const view = document.getElementById('category-view');
  const grid = document.getElementById('cv-grid');
  const title = document.getElementById('cv-title');
  const sub = document.getElementById('cv-subtitle');
  if(!view || !grid || !title || !sub || !catConfig[cat]) return false;
  const cfg = catConfig[cat];
  title.textContent = cfg.name;
  sub.textContent = cfg.sub;
  grid.innerHTML = cfg.list.map(p => `
    <div class="cat-prod-card">
      <div class="cat-prod-visual">
        <span class="cat-prod-price">${cfg.price}</span>
        <span class="cat-prod-addon">${cfg.addon}</span>
        <img src="${p.img}" alt="${p.team} ${p.kit}" loading="lazy">
      </div>
      <div class="cat-prod-body">
        <div class="team">${p.team}</div>
        <h3>${p.kit}</h3>
        <button class="btn btn-primary btn-block" data-order-cat data-cat="${cat}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg> Order Now</button>
      </div>
    </div>
  `).join('');
  return true;
}

const homeSections = () => document.querySelectorAll('#top, #trust, #collection, #featured, .custom-section, #reviews, #how, .location-section, #faq, .final-cta, footer');

function showHome(){
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
  const champSlide = document.querySelector('.hero .slide.active');
  if(champSlide){
    const idx = [...document.querySelectorAll('.hero .slide')].indexOf(champSlide);
    const isSpecial = idx === 0 || idx === 2;
    document.querySelector('.hero-copy h1').style.display = isSpecial ? 'none' : '';
    document.querySelector('.hero-sub').style.display = isSpecial ? 'none' : '';
    document.querySelector('.hero-ctas').style.display = isSpecial ? 'none' : '';
    document.querySelector('.badges').style.display = isSpecial ? 'none' : '';
    const wcCTA = document.querySelector('.wc-cta');
    if(wcCTA) wcCTA.style.display = idx === 0 ? '' : 'none';
    const argCTA = document.querySelector('.arg-cta');
    if(argCTA) argCTA.style.display = idx === 2 ? '' : 'none';
  }
}

function showCategory(cat){
  if(!renderCategory(cat)) return;
  homeSections().forEach(el => {
    el.dataset._disp = el.style.display;
    el.style.setProperty('display', 'none', 'important');
  });
  document.getElementById('category-view').classList.remove('hidden');
  document.body.style.overflow = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleHash(){
  const hash = location.hash.slice(1);
  console.log('handleHash:', hash);
  if(hash === 'club' || hash === 'national' || hash === 'retro'){
    showCategory(hash);
  } else {
    const wasHidden = document.getElementById('hero').style.display === 'none';
    showHome();
    if(wasHidden && hash){
      requestAnimationFrame(() => {
        const el = document.getElementById(hash);
        if(el) el.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }
}

document.getElementById('cv-back-btn').addEventListener('click', function(e){
  e.preventDefault();
  history.replaceState(null, '', window.location.pathname + window.location.search);
  showHome();
});

document.getElementById('pv-back-btn').addEventListener('click', function(e){
  e.preventDefault();
  history.replaceState(null, '', window.location.pathname + window.location.search);
  showHome();
});

window.addEventListener('hashchange', handleHash);
window.addEventListener('load', handleHash);
document.addEventListener('DOMContentLoaded', handleHash);
