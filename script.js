const menuButton=document.querySelector('.menu-toggle');
const mobileNav=document.querySelector('#mobile-nav');
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));mobileNav.hidden=!open;});
mobileNav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{mobileNav.hidden=true;menuButton.setAttribute('aria-expanded','false');}));
const dialog=document.querySelector('#info-dialog');
if(dialog){document.querySelectorAll('[data-dialog]').forEach(button=>button.addEventListener('click',()=>{document.querySelector('#dialog-title').textContent=button.dataset.dialog;dialog.showModal();mobileNav.hidden=true;menuButton.setAttribute('aria-expanded','false');}));dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});}
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!mobileNav.hidden){mobileNav.hidden=true;menuButton.setAttribute('aria-expanded','false');}});

/* zvětšení certifikátu (lightbox) */
document.addEventListener('click',e=>{const a=e.target.closest('[data-lightbox]');if(!a)return;e.preventDefault();let d=document.getElementById('lightbox');if(!d){d=document.createElement('dialog');d.id='lightbox';d.className='lightbox';d.innerHTML='<button class="lightbox-close" aria-label="Zavřít">×</button><img alt="">';document.body.appendChild(d);d.addEventListener('click',ev=>{if(ev.target===d||ev.target.closest('.lightbox-close'))d.close();});}d.querySelector('img').src=a.getAttribute('href');d.querySelector('img').alt=a.getAttribute('aria-label')||'Certifikát';d.showModal();});
