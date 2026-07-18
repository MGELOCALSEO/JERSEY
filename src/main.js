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
  '/images/manchester-united-2026-27-home-kit.jpg',
  '/images/fc-barcelona-2026-27-away-kit.jpg',
  '/images/chelsea-fc-2026-27-home-kit.jpg',
  '/images/real-madrid-2026-27-third-kit.jpg',
  '/images/arsenal-fc-2026-27-home-kit.jpg',
  '/images/bayern-munchen-2026-27-home-kit.jpg',
  '/images/fc-barcelona-2026-27-fourth-kit.jpg',
  '/images/liverpool-fc-2026-27-home-kit.jpg',
  '/images/manchester-united-2026-27-away-kit.jpg',
  '/images/real-madrid-2026-27-away-kit.jpg',
  '/images/arsenal-fc-2026-27-away-kit.jpg',
  '/images/fc-barcelona-2026-27-third-kit.jpg',
  '/images/real-madrid-2026-27-home-kit.jpg',
  '/images/arsenal-fc-2026-27-third-kit.jpg',
  '/images/fc-barcelona-2026-27-home-kit.jpg',
], 3500);

cycleImages('retro-imgs', [
  '/images/manchester-united-1998-99-home-kit.jpg',
  '/images/manchester-united-2007-08-home-kit.jpg',
  '/images/arsenal-fc-2005-06-home-kit.jpg',
  '/images/chelsea-fc-2012-13-home-kit.jpg',
  '/images/fc-barcelona-2010-11-home-kit.jpg',
  '/images/liverpool-fc-2017-18-home-kit.jpg',
  '/images/real-madrid-1998-99-home-kit.jpg',
  '/images/ac-milan-2006-07-home-kit.jpg',
  '/images/nigeria-1994-95-home-kit.jpg',
], 3500);

const products = [
  { id:'prod-1', team:'Manchester United', name:'Home Jersey 25/26', tag:'Home Kit', sizes:'S – XXL', images:['/images/manchester-united-2026-27-home-kit.jpg','/images/manchester-united-2026-27-away-kit.jpg'] },
  { id:'prod-2', team:'Arsenal', name:'Home Jersey 25/26', tag:'Home Kit', sizes:'S – XXL', images:['/images/arsenal-fc-2026-27-home-kit.jpg','/images/arsenal-fc-2026-27-away-kit.jpg','/images/arsenal-fc-2026-27-third-kit.jpg'] },
  { id:'prod-3', team:'Madrid White', name:'Away Jersey 25/26', tag:'Away Kit', sizes:'S – XXL', images:['/images/real-madrid-2026-27-home-kit.jpg','/images/real-madrid-2026-27-away-kit.jpg','/images/real-madrid-2026-27-third-kit.jpg'] },
  { id:'prod-4', team:'Super Eagles', name:'Home Jersey 25/26', tag:'Home Kit', sizes:'S – XXL', images:['/images/nigeria-2026-home-kit.jpg','/images/nigeria-2026-away-kit.jpg'] },
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
  const card = btn.closest('.prod-card');
  if(card){
    const team = card.querySelector('.team').textContent;
    const kit = card.querySelector('h3').textContent;
    const img = document.getElementById('modal-preview-img');
    if(img) img.src = card.querySelector('img').src;
    document.getElementById('modal-jersey-label').textContent = team + ' \u2014 ' + kit;
    document.getElementById('custom-form').dataset.team = team;
    document.getElementById('custom-form').dataset.kit = kit;
  } else {
    document.getElementById('modal-jersey-label').textContent = 'Custom Jersey';
    delete document.getElementById('custom-form').dataset.team;
    delete document.getElementById('custom-form').dataset.kit;
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
  const name = document.getElementById('custom-name').value.trim();
  const number = document.getElementById('custom-number').value.trim();
  const size = document.getElementById('custom-size').value;
  const location = document.getElementById('custom-location').value.trim();

  let msg = 'Hi Makelele Jerseys, I\'d like to order:\n';
  if(team) msg += '\nTeam: ' + team;
  if(kit) msg += '\nKit: ' + kit;
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
  '/images/nigeria-2026-home-kit.jpg',
  '/images/nigeria-2026-away-kit.jpg',
  '/images/argentina-2026-home-kit.jpg',
  '/images/argentina-2026-away-kit.jpg',
  '/images/england-2026-home-kit.jpg',
  '/images/england-2026-away-kit.jpg',
  '/images/france-2026-home-kit.jpg',
  '/images/france-2026-away-kit.jpg',
  '/images/spain-2026-home-kit.jpg',
  '/images/spain-2026-away-kit.jpg',
], 3500);
