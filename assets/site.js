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
})();
