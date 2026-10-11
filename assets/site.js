/* Header: dark once the page scrolls (as on Google Sites); menu button on narrow screens. */
(function(){
  var h=document.querySelector('.site-header');
  if(!h) return;
  var btn=h.querySelector('.menu-btn');
  var queued=false;
  function update(){ queued=false; h.classList.toggle('scrolled', window.scrollY>8); }
  window.addEventListener('scroll', function(){ if(!queued){ queued=true; requestAnimationFrame(update); } }, {passive:true});
  update();
  if(btn) btn.addEventListener('click', function(){
    var open=h.classList.toggle('open');
    btn.setAttribute('aria-expanded', open?'true':'false');
  });
  /* language drop-down: close on a click outside or on Escape */
  var lang=h.querySelector('details.lang');
  if(lang){
    document.addEventListener('click', function(e){ if(lang.open && !lang.contains(e.target)) lang.open=false; });
    document.addEventListener('keydown', function(e){ if(e.key==='Escape' && lang.open){ lang.open=false; lang.querySelector('summary').focus(); } });
  }
})();
/* Dark mode button: flips between light and dark and remembers the choice. Without a stored
   choice the page follows the device setting (prefers-color-scheme in site.css). */
(function(){
  var btn=document.querySelector('.theme-btn');
  if(!btn) return;
  var root=document.documentElement, mq=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)');
  function isDark(){ var t=root.getAttribute('data-theme'); return t ? t==='dark' : !!(mq&&mq.matches); }
  function sync(){ btn.setAttribute('aria-pressed', isDark()?'true':'false'); }
  btn.addEventListener('click', function(){
    var next=isDark()?'light':'dark';
    root.setAttribute('data-theme', next);
    try{ localStorage.setItem('theme', next); }catch(e){}
    sync();
  });
  if(mq&&mq.addEventListener) mq.addEventListener('change', sync);
  sync();
})();
