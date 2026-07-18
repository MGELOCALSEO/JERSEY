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
  ];
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
