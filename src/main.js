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

(function cycleClub(){
  const img = document.getElementById('club-imgs');
  if(!img) return;
  const images = [
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
  ];
  let idx = 0;
  setInterval(() => {
    idx = (idx + 1) % images.length;
    img.src = images[idx];
  }, 2000);
})();

(function cycleRetro(){
  const img = document.getElementById('retro-imgs');
  if(!img) return;
  const images = [
    '/images/manchester-united-1998-99-home-kit.jpg',
    '/images/manchester-united-2007-08-home-kit.jpg',
    '/images/arsenal-fc-2005-06-home-kit.jpg',
    '/images/chelsea-fc-2012-13-home-kit.jpg',
    '/images/fc-barcelona-2010-11-home-kit.jpg',
    '/images/liverpool-fc-2017-18-home-kit.jpg',
    '/images/real-madrid-1998-99-home-kit.jpg',
    '/images/ac-milan-2006-07-home-kit.jpg',
    '/images/nigeria-1994-95-home-kit.jpg'
  ];
  let idx = 0;
  setInterval(() => {
    idx = (idx + 1) % images.length;
    img.src = images[idx];
  }, 2000);
})();

(function cycleProd1(){
  const img = document.getElementById('prod-1-img');
  if(!img) return;
  const images = [
    '/images/manchester-united-2026-27-home-kit.jpg',
    '/images/manchester-united-2026-27-away-kit.jpg'
  ];
  let idx = 0;
  setInterval(() => {
    idx = (idx + 1) % images.length;
    img.src = images[idx];
  }, 2000);
})();

(function cycleProd2(){
  const img = document.getElementById('prod-2-img');
  if(!img) return;
  const images = [
    '/images/arsenal-fc-2026-27-home-kit.jpg',
    '/images/arsenal-fc-2026-27-away-kit.jpg',
    '/images/arsenal-fc-2026-27-third-kit.jpg'
  ];H
  let idx = 0;
  setInterval(() => {
    idx = (idx + 1) % images.length;
    img.src = images[idx];
  }, 2000);
})();

(function cycleProd3(){
  const img = document.getElementById('prod-3-img');
  if(!img) return;
  const images = [
    '/images/real-madrid-2026-27-home-kit.jpg',
    '/images/real-madrid-2026-27-away-kit.jpg',
    '/images/real-madrid-2026-27-third-kit.jpg'
  ];
  let idx = 0;
  setInterval(() => {
    idx = (idx + 1) % images.length;
    img.src = images[idx];
  }, 2000);
})();

(function cycleProd4(){
  const img = document.getElementById('prod-4-img');
  if(!img) return;
  const images = [
    '/images/nigeria-2026-home-kit.jpg',
    '/images/nigeria-2026-away-kit.jpg'
  ];
  let idx = 0;
  setInterval(() => {
    idx = (idx + 1) % images.length;
    img.src = images[idx];
  }, 2000);
})();

window.openCustomModal = function(team, kit){
  document.getElementById('modal-jersey-label').textContent = team + ' \u2014 ' + kit;
  document.getElementById('custom-form').dataset.team = team;
  document.getElementById('custom-form').dataset.kit = kit;
  document.getElementById('custom-modal').classList.remove('hidden');
};

window.closeCustomModal = function(e){
  if(e && e.target !== e.currentTarget && !e.key) return;
  document.getElementById('custom-modal').classList.add('hidden');
};

document.addEventListener('keydown', function(e){
  if(e.key === 'Escape') window.closeCustomModal(e);
});

window.submitCustomOrder = function(e){
  e.preventDefault();
  const team = e.target.dataset.team;
  const kit = e.target.dataset.kit;
  const name = document.getElementById('custom-name').value.trim();
  const number = document.getElementById('custom-number').value.trim();
  const size = document.getElementById('custom-size').value;
  const location = document.getElementById('custom-location').value.trim();

  let msg = 'Hi Makelele Jerseys, I\'d like to order:\n'
    + '\nTeam: ' + team
    + '\nKit: ' + kit
    + '\nName: ' + (name || 'N/A')
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

  start();
})();

(function livePreview(){
  const nameInput = document.getElementById('preview-name');
  const numInput = document.getElementById('preview-number');
  const clubInput = document.getElementById('preview-club');
  const sizeInput = document.getElementById('preview-size');
  const nameEl = document.querySelector('.jersey-nameset .name');
  const numEl = document.querySelector('.jersey-nameset .num');
  const ctaBtn = document.querySelector('.custom-copy .btn-primary');
  if(!nameInput || !nameEl) return;

  function updatePreview(){
    nameEl.textContent = nameInput.value.toUpperCase() || 'YOUR NAME';
    numEl.textContent = numInput.value || '07';
    nameEl.classList.add('preview-update');
    numEl.classList.add('preview-update');
    clearTimeout(nameEl._timer);
    nameEl._timer = setTimeout(() => nameEl.classList.remove('preview-update'), 200);
    clearTimeout(numEl._timer);
    numEl._timer = setTimeout(() => numEl.classList.remove('preview-update'), 200);
  }

  function updateCTA(){
    if(!ctaBtn) return;
    const club = clubInput ? clubInput.value : 'a jersey';
    const name = nameInput.value.trim();
    const number = numInput.value.trim();
    const size = sizeInput ? sizeInput.value : '';
    let msg = 'Hi Makelele Jerseys, I\'d like to create a custom jersey:'
      + '\nClub: ' + club
      + '\nName: ' + (name || 'N/A')
      + '\nNumber: ' + (number || 'N/A')
      + '\nSize: ' + (size || 'N/A');
    ctaBtn.href = 'https://wa.me/2347030112427?text=' + encodeURIComponent(msg);
  }

  nameInput.addEventListener('input', function(){ updatePreview(); updateCTA(); });
  numInput.addEventListener('input', function(){ updatePreview(); updateCTA(); });
  if(clubInput) clubInput.addEventListener('change', updateCTA);
  if(sizeInput) sizeInput.addEventListener('change', updateCTA);
  updatePreview();
})();

(function cycleNational(){
  const img = document.getElementById('national-imgs');
  if(!img) return;
  const images = [
    '/images/nigeria-2026-home-kit.jpg',
    '/images/nigeria-2026-away-kit.jpg',
    '/images/argentina-2026-home-kit.jpg',
    '/images/argentina-2026-away-kit.jpg',
    '/images/england-2026-home-kit.jpg',
    '/images/england-2026-away-kit.jpg',
    '/images/france-2026-home-kit.jpg',
    '/images/france-2026-away-kit.jpg',
    '/images/spain-2026-home-kit.jpg',
    '/images/spain-2026-away-kit.jpg'
  ];
  let idx = 0;
  setInterval(() => {
    idx = (idx + 1) % images.length;
    img.src = images[idx];
  }, 2000);
})();
