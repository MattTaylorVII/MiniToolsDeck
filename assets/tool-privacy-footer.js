/* Shared homepage footer dialogs on tool pages. No dependency on tool scripts. */
(function(){
  'use strict';
  var previousFocus=null;
  function visibleModal(){return document.querySelector('.mtd-tool-legal-overlay[style*="display: flex"]');}
  function close(){
    var current=visibleModal();
    if(!current)return;
    current.style.display='none';
    document.body.classList.remove('mtd-legal-open');
    if(previousFocus && previousFocus.isConnected && previousFocus.focus)previousFocus.focus();
    previousFocus=null;
  }
  document.querySelectorAll('footer.mtd-signature-footer [data-mtd-open]').forEach(function(btn){
    btn.addEventListener('click',function(){
      var modal=document.getElementById(btn.getAttribute('data-mtd-open'));
      if(!modal)return;
      previousFocus=btn;
      modal.style.display='flex';
      modal.querySelector('.modal-close')?.focus();
    });
  });
  document.querySelectorAll('.mtd-tool-legal-overlay').forEach(function(modal){
    modal.querySelector('.modal-close')?.addEventListener('click',close);
    modal.addEventListener('click',function(e){if(e.target===modal)close();});
  });
  document.addEventListener('keydown',function(e){
    var current=visibleModal();
    if(!current)return;
    if(e.key==='Escape'){e.preventDefault();close();return;}
    if(e.key==='Tab'){
      var items=Array.from(current.querySelectorAll('button:not([disabled]),a[href],input:not([disabled])')).filter(function(x){return x.offsetParent!==null;});
      if(!items.length)return;
      var first=items[0],last=items[items.length-1];
      if(e.shiftKey && document.activeElement===first){e.preventDefault();last.focus();}
      else if(!e.shiftKey && document.activeElement===last){e.preventDefault();first.focus();}
    }
  });
})();
