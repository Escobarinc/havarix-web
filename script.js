const menuButton=document.querySelector('.menu-toggle');
const mobileNav=document.querySelector('#mobile-nav');
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));mobileNav.hidden=!open;});
mobileNav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{mobileNav.hidden=true;menuButton.setAttribute('aria-expanded','false');}));
const dialog=document.querySelector('#info-dialog');
if(dialog){document.querySelectorAll('[data-dialog]').forEach(button=>button.addEventListener('click',()=>{document.querySelector('#dialog-title').textContent=button.dataset.dialog;dialog.showModal();mobileNav.hidden=true;menuButton.setAttribute('aria-expanded','false');}));dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});}
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!mobileNav.hidden){mobileNav.hidden=true;menuButton.setAttribute('aria-expanded','false');}});
