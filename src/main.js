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
  '/images/club/chelsea-fc-2026-27-home-kit.jpg',
  '/images/club/real-madrid-2026-27-third-kit.jpg',
  '/images/club/arsenal-fc-2026-27-home-kit.jpg',
  '/images/club/bayern-munchen-2026-27-home-kit.jpg',
  '/images/club/fc-barcelona-2026-27-fourth-kit.jpg',
  '/images/club/liverpool-fc-2026-27-home-kit.jpg',
  '/images/club/manchester-united-2026-27-away-kit.jpg',
  '/images/club/real-madrid-2026-27-away-kit.jpg',
  '/images/club/arsenal-fc-2026-27-away-kit.jpg',
  '/images/club/fc-barcelona-2026-27-third-kit.jpg',
  '/images/club/real-madrid-2026-27-home-kit.jpg',
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
  { id:'prod-1', team:'Manchester United', name:'Home Jersey 25/26', tag:'Home Kit', sizes:'S – XXL', images:['/images/club/manchester-united-2026-27-home-kit.jpg','/images/club/manchester-united-2026-27-away-kit.jpg'] },
  { id:'prod-2', team:'Arsenal', name:'Home Jersey 25/26', tag:'Home Kit', sizes:'S – XXL', images:['/images/club/arsenal-fc-2026-27-home-kit.jpg','/images/club/arsenal-fc-2026-27-away-kit.jpg','/images/club/arsenal-fc-2026-27-third-kit.jpg'] },
  { id:'prod-3', team:'Madrid White', name:'Away Jersey 25/26', tag:'Away Kit', sizes:'S – XXL', images:['/images/club/real-madrid-2026-27-home-kit.jpg','/images/club/real-madrid-2026-27-away-kit.jpg','/images/club/real-madrid-2026-27-third-kit.jpg'] },
  { id:'prod-4', team:'Super Eagles', name:'Home Jersey 25/26', tag:'Home Kit', sizes:'S – XXL', images:['/images/national/nigeria-2026-home-kit.jpg','/images/national/nigeria-2026-away-kit.jpg'] },
  { id:'prod-5', team:'FC Barcelona', name:'Home Jersey 25/26', tag:'Home Kit', sizes:'S – XXL', images:['/images/club/fc-barcelona-2026-27-home-kit.jpg','/images/club/fc-barcelona-2026-27-away-kit.jpg','/images/club/fc-barcelona-2026-27-third-kit.jpg'] },
  { id:'prod-6', team:'Chelsea', name:'Home Jersey 25/26', tag:'Home Kit', sizes:'S – XXL', images:['/images/club/chelsea-fc-2026-27-home-kit.jpg'] },
];

(function renderProducts(){
  const grid = document.getElementById('prod-grid');
  if(!grid) return;
  grid.innerHTML = products.map(p => `
    <div class="prod-card" data-id="${p.id}">
      <div class="prod-visual">
        <span class="prod-tag">${p.tag}</span>
        <img id="${p.id}-img" src="${p.images[0]}" alt="${p.team} ${p.name}" loading="lazy">
      </div>
      <div class="prod-body">
        <div class="team">${p.team}</div>
        <h3>${p.name}</h3>
        <div class="prod-meta"><span>${p.sizes}</span><span>Custom ✓</span></div>
        <a class="btn btn-primary btn-block" href="https://wa.me/2347030112427?text=Hi%2C%20I%27d%20like%20to%20buy%20the%20${encodeURIComponent(p.team + ' ' + p.name)}" target="_blank" rel="noopener" data-wa="prod-${p.id}">Buy On WhatsApp</a>
        <button class="btn btn-ghost btn-block" data-custom="${p.id}">Custom</button>
      </div>
    </div>
  `).join('');

  products.forEach(p => cycleImages(p.id + '-img', p.images, 3500));
})();

function openWA(url, label){
  window.open(url, '_blank');
  trackWA(label);
}

function openCustomModal(btn){
  const card = btn.closest('.prod-card, .cat-prod-card');
  if(card){
    const team = card.querySelector('.team').textContent;
    const kit = card.querySelector('h3').textContent;
    const priceEl = card.querySelector('.cat-prod-price');
    const priceText = priceEl ? ' \u2014 ' + priceEl.textContent : '';
    const img = document.getElementById('modal-preview-img');
    if(img) img.src = card.querySelector('img').src;
    document.getElementById('modal-jersey-label').textContent = team + ' \u2014 ' + kit + priceText;
    const form = document.getElementById('custom-form');
    form.dataset.team = team;
    form.dataset.kit = kit;
    if(priceEl) form.dataset.price = priceEl.textContent;
  } else {
    document.getElementById('modal-jersey-label').textContent = 'Custom Jersey';
    const form = document.getElementById('custom-form');
    delete form.dataset.team;
    delete form.dataset.kit;
    delete form.dataset.price;
  }
  document.getElementById('custom-modal').classList.remove('hidden');
}

window.closeCustomModal = function(e){
  if(e && e.target !== e.currentTarget && !e.key) return;
  document.getElementById('custom-modal').classList.add('hidden');
};

document.addEventListener('keydown', function(e){
  if(e.key === 'Escape') window.closeCustomModal(e);
});

document.addEventListener('click', function(e){
  const orderCatBtn = e.target.closest('[data-order-cat]');
  if(orderCatBtn){ openCustomModal(orderCatBtn); return; }
  const orderBtn = e.target.closest('[data-order]');
  if(orderBtn){
    const card = orderBtn.closest('.prod-card');
    const team = card.querySelector('.team').textContent;
    const kit = card.querySelector('h3').textContent;
    const msg = 'Hi Makelele Jerseys, I\'d like to order the ' + team + ' ' + kit;
    window.open('https://wa.me/2347030112427?text=' + encodeURIComponent(msg), '_blank');
    trackWA('order-now');
    return;
  }
  const customBtn = e.target.closest('[data-custom]');
  if(customBtn){ openCustomModal(customBtn); return; }
  if(e.target.id === 'start-custom-btn' || e.target.closest('#start-custom-btn')){ openCustomModal(e.target); return; }
  const waBtn = e.target.closest('[data-wa]');
  if(waBtn){ openWA(waBtn.href, waBtn.dataset.wa); return; }
});

window.submitCustomOrder = function(e){
  e.preventDefault();
  const team = e.target.dataset.team;
  const kit = e.target.dataset.kit;
  const price = e.target.dataset.price;
  const name = document.getElementById('custom-name').value.trim();
  const number = document.getElementById('custom-number').value.trim();
  const size = document.getElementById('custom-size').value;
  const location = document.getElementById('custom-location').value.trim();

  let msg = 'Hi Makelele Jerseys, I\'d like to order:\n';
  if(team) msg += '\nTeam: ' + team;
  if(kit) msg += '\nKit: ' + kit;
  if(price) msg += '\nPrice: ' + price;
  msg += '\nName: ' + (name || 'N/A')
    + '\nNumber: ' + (number || 'N/A')
    + '\nSize: ' + size
    + '\nDelivery Location: ' + location;

  window.open('https://wa.me/2347030112427?text=' + encodeURIComponent(msg), '_blank');
  trackWA('custom-submit');
  window.closeCustomModal();
};

(function countdown(){
  const finalDate = new Date('2026-07-19T18:00:00-04:00').getTime();
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

  function goTo(idx){
    slides[current].classList.remove('active');
    if(texts[current]) texts[current].classList.remove('active');
    current = idx;
    slides[current].classList.add('active');
    if(texts[current]) texts[current].classList.add('active');
  }

  function prev(){ goTo((current - 1 + slides.length) % slides.length); }
  function next(){ goTo((current + 1) % slides.length); }

  prevBtn.addEventListener('click', function(){ prev(); reset(); });
  nextBtn.addEventListener('click', function(){ next(); reset(); });

  function start(){ interval = setInterval(next, 3000); }
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
  '/images/national/nigeria-2026-away-kit.jpg',
  '/images/national/argentina-2026-home-kit.jpg',
  '/images/national/argentina-2026-away-kit.jpg',
  '/images/national/england-2026-home-kit.jpg',
  '/images/national/england-2026-away-kit.jpg',
  '/images/national/france-2026-home-kit.jpg',
  '/images/national/france-2026-away-kit.jpg',
  '/images/national/spain-2026-home-kit.jpg',
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
  { team:'Chelsea', kit:'Home 25/26', img:'/images/club/chelsea-fc-2026-27-home-kit.jpg' },
  { team:'Real Madrid', kit:'Third 25/26', img:'/images/club/real-madrid-2026-27-third-kit.jpg' },
  { team:'Arsenal', kit:'Home 25/26', img:'/images/club/arsenal-fc-2026-27-home-kit.jpg' },
  { team:'Bayern Munchen', kit:'Home 25/26', img:'/images/club/bayern-munchen-2026-27-home-kit.jpg' },
  { team:'FC Barcelona', kit:'Fourth 25/26', img:'/images/club/fc-barcelona-2026-27-fourth-kit.jpg' },
  { team:'Liverpool', kit:'Home 25/26', img:'/images/club/liverpool-fc-2026-27-home-kit.jpg' },
  { team:'Manchester United', kit:'Away 25/26', img:'/images/club/manchester-united-2026-27-away-kit.jpg' },
  { team:'Real Madrid', kit:'Away 25/26', img:'/images/club/real-madrid-2026-27-away-kit.jpg' },
  { team:'Arsenal', kit:'Away 25/26', img:'/images/club/arsenal-fc-2026-27-away-kit.jpg' },
  { team:'FC Barcelona', kit:'Third 25/26', img:'/images/club/fc-barcelona-2026-27-third-kit.jpg' },
  { team:'Real Madrid', kit:'Home 25/26', img:'/images/club/real-madrid-2026-27-home-kit.jpg' },
  { team:'Arsenal', kit:'Third 25/26', img:'/images/club/arsenal-fc-2026-27-third-kit.jpg' },
  { team:'FC Barcelona', kit:'Home 25/26', img:'/images/club/fc-barcelona-2026-27-home-kit.jpg' },
];

const nationalProducts = [
  { team:'Nigeria', kit:'Home 25/26', img:'/images/national/nigeria-2026-home-kit.jpg' },
  { team:'Nigeria', kit:'Away 25/26', img:'/images/national/nigeria-2026-away-kit.jpg' },
  { team:'Argentina', kit:'Home 25/26', img:'/images/national/argentina-2026-home-kit.jpg' },
  { team:'Argentina', kit:'Away 25/26', img:'/images/national/argentina-2026-away-kit.jpg' },
  { team:'England', kit:'Home 25/26', img:'/images/national/england-2026-home-kit.jpg' },
  { team:'England', kit:'Away 25/26', img:'/images/national/england-2026-away-kit.jpg' },
  { team:'France', kit:'Home 25/26', img:'/images/national/france-2026-home-kit.jpg' },
  { team:'France', kit:'Away 25/26', img:'/images/national/france-2026-away-kit.jpg' },
  { team:'Spain', kit:'Home 25/26', img:'/images/national/spain-2026-home-kit.jpg' },
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
  club:  { name:'Club Jerseys', sub: 'Browse our Player Version club kits.', price:'\u20A655,000', addon:'+ \u20A65,000 Custom', label:'Player Version', list: clubProducts },
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
        <button class="btn btn-primary btn-block" data-order-cat><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg> Order Now</button>
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
  document.body.style.overflow = '';
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

window.addEventListener('hashchange', handleHash);
window.addEventListener('load', handleHash);
document.addEventListener('DOMContentLoaded', handleHash);
