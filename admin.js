/* HAVARIX – administrace půjčovny (stroje, kategorie, služby, poptávky, záloha). */
(() => {
  'use strict';
  const S = window.HavarixStore;
  const main = document.getElementById('adm-main');
  let d = S.get();
  let tab = 'stroje', editing = null, filter = {cat:'', state:'', q:''}, inqFilter = '';

  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));
  const num = v => { const n = parseFloat(String(v).replace(/\s/g, '').replace(',', '.')); return isFinite(n) ? n : null; };
  const slug = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'stroj';
  const catName = id => (d.categories.find(c => c.id === id) || {}).name || '—';
  const ICONS = {drop:'Kapka', wind:'Vítr', heat:'Topení', turbine:'Turbína', tools:'Nářadí'};
  const STATUS = {nova:'Nová', resi:'Vyřizuje se', hotovo:'Vyřízeno'};

  function toast(msg, bad) { const t = document.getElementById('toast'); t.textContent = msg; t.className = 'toast show' + (bad ? ' bad' : ''); clearTimeout(t._h); t._h = setTimeout(() => t.className = 'toast', 2600); }
  function persist(msg = 'Uloženo') { if (S.save(d)) toast(msg); else toast('Uložení se nezdařilo – úložiště prohlížeče je plné (zmenšete nebo odeberte fotografie).', true); }
  function updateCount() { const n = S.inquiries().filter(i => i.status === 'nova').length; document.getElementById('inq-count').textContent = n || ''; }

  document.querySelectorAll('.adm-nav button').forEach(b => b.addEventListener('click', () => { tab = b.dataset.tab; editing = null; render(); }));
  function render() {
    document.querySelectorAll('.adm-nav button').forEach(b => b.classList.toggle('on', b.dataset.tab === tab));
    main.innerHTML = editing ? itemForm() : ({stroje:itemList, kategorie:catList, sluzby:serviceList, poptavky:inqList, nastaveni:settings}[tab])();
    bind(); updateCount(); main.focus({preventScroll:true});
  }

  /* ---------------- STROJE ---------------- */
  function itemList() {
    const items = d.items.filter(i => (!filter.cat || i.category === filter.cat) && (!filter.state || (filter.state === 'on' ? i.active : !i.active)) && (!filter.q || i.name.toLowerCase().includes(filter.q.toLowerCase())));
    return `<div class="head"><div><h1>Stroje</h1><p>${d.items.length} strojů · na webu ${d.items.filter(i => i.active).length} · skryté ${d.items.filter(i => !i.active).length}</p></div><button class="btn red" data-act="new">+ Přidat stroj</button></div>
      <div class="filters"><input type="search" id="f-q" placeholder="Hledat stroj…" value="${esc(filter.q)}"><select id="f-cat"><option value="">Všechny kategorie</option>${d.categories.map(c => `<option value="${c.id}"${filter.cat === c.id ? ' selected' : ''}>${esc(c.name)}</option>`).join('')}</select><select id="f-state"><option value="">Vše</option><option value="on"${filter.state === 'on' ? ' selected' : ''}>Na webu</option><option value="off"${filter.state === 'off' ? ' selected' : ''}>Skryté</option></select></div>
      <div class="table-card"><table class="list"><thead><tr><th></th><th>Stroj</th><th>Kategorie</th><th>Ks</th><th>Cena od / den</th><th>Na webu</th><th></th></tr></thead><tbody>
      ${items.map(i => { const p = S.fromPrice(i); const idx = d.items.indexOf(i); return `<tr${i.active ? '' : ' class="off"'}><td>${i.photos && i.photos.length ? `<img class="thumb" src="${i.photos[0]}" alt="">` : '<span class="thumb none">bez fotky</span>'}</td><td><b>${esc(i.name)}</b><small>${esc(i.short).slice(0, 80)}${i.short.length > 80 ? '…' : ''}</small></td><td>${esc(catName(i.category))}</td><td>${i.count ?? '—'}</td><td>${p == null ? '<span class="muted">na dotaz</span>' : `${S.fmt(p)} <small>bez DPH</small>`}</td>
        <td><label class="switch" title="${i.active ? 'Zobrazeno na webu' : 'Skryto'}"><input type="checkbox" data-act="toggle" data-id="${i.id}"${i.active ? ' checked' : ''}><span></span></label></td>
        <td class="actions"><button class="icon-btn" data-act="up" data-i="${idx}" title="Posunout výš"${idx ? '' : ' disabled'}>▲</button><button class="icon-btn" data-act="down" data-i="${idx}" title="Posunout níž"${idx < d.items.length - 1 ? '' : ' disabled'}>▼</button><button class="btn small" data-act="edit" data-id="${i.id}">Upravit</button><button class="btn small ghost-red" data-act="del" data-id="${i.id}">Smazat</button></td></tr>`; }).join('') || '<tr><td colspan="7" class="empty">Žádný stroj neodpovídá filtru.</td></tr>'}
      </tbody></table></div><p class="hint">Skryté stroje (např. technika, kterou teprve pořizujete) na webu nejsou vidět. Zapnete je přepínačem „Na webu“.</p>`;
  }
  function blankItem() { return {id:'', name:'', category:d.categories[0]?.id || '', active:false, count:null, deposit:null, short:'', description:'', params:[], prices:[{from:1,to:10,price:null},{from:11,to:20,price:null},{from:21,to:30,price:null},{from:31,to:null,price:null}], photos:[]}; }
  function itemForm() {
    const i = editing;
    return `<div class="head"><div><button class="back" data-act="cancel">← Zpět na seznam</button><h1>${i.id ? 'Upravit stroj' : 'Nový stroj'}</h1></div><div class="head-btns">${i.id && i.active ? `<a class="btn ghost" href="page.html?view=stroj&id=${encodeURIComponent(i.id)}" target="_blank" rel="noopener">Náhled na webu ↗</a>` : ''}<button class="btn red" data-act="save">Uložit stroj</button></div></div>
    <form id="item-form" class="form-grid" novalidate>
     <section class="card"><h2>Základní údaje</h2>
      <label class="field wide">Název stroje *<input name="name" required maxlength="120" value="${esc(i.name)}"></label>
      <label class="field">Kategorie<select name="category">${d.categories.map(c => `<option value="${c.id}"${c.id === i.category ? ' selected' : ''}>${esc(c.name)}</option>`).join('')}</select></label>
      <label class="field">Počet kusů<input name="count" inputmode="numeric" value="${i.count ?? ''}" placeholder="neuvedeno"></label>
      <label class="field">Vratná kauce (Kč)<input name="deposit" inputmode="numeric" value="${i.deposit ?? ''}" placeholder="bez kauce"></label>
      <label class="field check"><input type="checkbox" name="active"${i.active ? ' checked' : ''}> Zobrazit na webu</label>
      <label class="field wide">Krátký popis (zobrazí se v katalogu)<textarea name="short" rows="2" maxlength="220">${esc(i.short)}</textarea></label>
      <label class="field wide">Podrobný popis<textarea name="description" rows="5" maxlength="2000">${esc(i.description)}</textarea></label>
     </section>
     <section class="card"><h2>Fotografie</h2><p class="hint">První fotografie je hlavní. Fotky se automaticky zmenší.</p>
      <div class="photos" id="photos">${i.photos.map((p, n) => `<figure><img src="${p}" alt=""><figcaption>${n ? `<button type="button" class="icon-btn" data-act="ph-main" data-n="${n}" title="Nastavit jako hlavní">★</button>` : '<span class="main-tag">Hlavní</span>'}<button type="button" class="icon-btn" data-act="ph-del" data-n="${n}" title="Odebrat">✕</button></figcaption></figure>`).join('')}<label class="photo-add"><input type="file" accept="image/*" multiple id="ph-input"><span>+ Přidat fotky</span></label></div>
     </section>
     <section class="card"><h2>Ceník pronájmu <small>(ceny bez DPH za den)</small></h2>
      <table class="rows"><thead><tr><th>Od (dní)</th><th>Do (dní)</th><th>Cena bez DPH</th><th>S DPH ${d.vatRate} %</th><th></th></tr></thead><tbody>${i.prices.map((t, n) => `<tr><td><input data-pr="from" data-n="${n}" inputmode="numeric" value="${t.from ?? ''}"></td><td><input data-pr="to" data-n="${n}" inputmode="numeric" value="${t.to ?? ''}" placeholder="a více"></td><td><input data-pr="price" data-n="${n}" inputmode="decimal" value="${t.price ?? ''}" placeholder="na dotaz"></td><td class="vat" id="vat-${n}">${t.price == null ? '—' : S.fmt(S.withVat(t.price, d))}</td><td><button type="button" class="icon-btn" data-act="pr-del" data-n="${n}" title="Odebrat řádek">✕</button></td></tr>`).join('')}</tbody></table>
      <button type="button" class="btn small ghost" data-act="pr-add">+ Přidat cenové pásmo</button><p class="hint">Prázdná cena = na webu se zobrazí „Cena na dotaz“. Prázdné „Do“ = a více dní.</p>
     </section>
     <section class="card"><h2>Technické parametry</h2>
      <table class="rows params"><tbody>${i.params.map(([k, v], n) => `<tr><td><input data-pa="0" data-n="${n}" value="${esc(k)}" placeholder="Parametr"></td><td><input data-pa="1" data-n="${n}" value="${esc(v)}" placeholder="Hodnota"></td><td><button type="button" class="icon-btn" data-act="pa-up" data-n="${n}"${n ? '' : ' disabled'}>▲</button><button type="button" class="icon-btn" data-act="pa-del" data-n="${n}">✕</button></td></tr>`).join('')}</tbody></table>
      <button type="button" class="btn small ghost" data-act="pa-add">+ Přidat parametr</button>
     </section>
    </form>`;
  }
  function readForm() {
    const f = document.getElementById('item-form'); if (!f) return;
    const i = editing;
    i.name = f.name.value.trim(); i.category = f.category.value; i.count = num(f.count.value); i.deposit = num(f.deposit.value);
    i.active = f.active.checked; i.short = f.short.value.trim(); i.description = f.description.value.trim();
    f.querySelectorAll('[data-pr]').forEach(inp => { const t = i.prices[+inp.dataset.n]; t[inp.dataset.pr] = num(inp.value); });
    f.querySelectorAll('[data-pa]').forEach(inp => { i.params[+inp.dataset.n][+inp.dataset.pa] = inp.value; });
  }
  function saveItem() {
    readForm(); const i = editing;
    if (!i.name) { toast('Vyplňte název stroje.', true); document.querySelector('[name=name]').focus(); return; }
    i.params = i.params.filter(([k, v]) => String(k).trim() || String(v).trim()).map(([k, v]) => [String(k).trim(), String(v).trim()]);
    i.prices = i.prices.filter(t => t.from != null).sort((a, b) => a.from - b.from);
    if (!i.id) { let base = slug(i.name), id = base, n = 2; while (d.items.some(x => x.id === id)) id = `${base}-${n++}`; i.id = id; d.items.push(i); }
    else { const k = d.items.findIndex(x => x.id === i.id); d.items[k] = i; }
    persist('Stroj uložen'); editing = null; render();
  }
  function resize(file) {
    return new Promise((ok, bad) => {
      const r = new FileReader();
      r.onload = () => { const img = new Image(); img.onload = () => { const m = 1200, k = Math.min(1, m / Math.max(img.width, img.height)); const c = document.createElement('canvas'); c.width = Math.round(img.width * k); c.height = Math.round(img.height * k); const x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, c.width, c.height); x.drawImage(img, 0, 0, c.width, c.height); ok(c.toDataURL('image/jpeg', 0.82)); }; img.onerror = bad; img.src = r.result; };
      r.onerror = bad; r.readAsDataURL(file);
    });
  }

  /* ---------------- KATEGORIE ---------------- */
  function catList() {
    return `<div class="head"><div><h1>Kategorie</h1><p>Kategorie bez strojů na webu se v katalogu nezobrazí.</p></div><button class="btn red" data-act="cat-add">+ Přidat kategorii</button></div>
      <div class="table-card"><table class="list"><thead><tr><th>Název</th><th>Úvodní text</th><th>Ikona</th><th>Strojů</th><th></th></tr></thead><tbody>
      ${d.categories.map((c, n) => { const cnt = d.items.filter(i => i.category === c.id).length; return `<tr><td><input data-cat="name" data-n="${n}" value="${esc(c.name)}"></td><td><input data-cat="intro" data-n="${n}" value="${esc(c.intro || '')}"></td><td><select data-cat="icon" data-n="${n}">${Object.entries(ICONS).map(([k, v]) => `<option value="${k}"${c.icon === k ? ' selected' : ''}>${v}</option>`).join('')}</select></td><td>${cnt}</td><td class="actions"><button class="icon-btn" data-act="cat-up" data-n="${n}"${n ? '' : ' disabled'}>▲</button><button class="btn small ghost-red" data-act="cat-del" data-n="${n}"${cnt ? ' disabled title="Kategorie obsahuje stroje"' : ''}>Smazat</button></td></tr>`; }).join('')}
      </tbody></table></div><div class="foot-btns"><button class="btn red" data-act="cat-save">Uložit kategorie</button></div>`;
  }
  /* ---------------- SLUŽBY ---------------- */
  function serviceList() {
    return `<div class="head"><div><h1>Doplňkové služby</h1><p>Zobrazují se v katalogu a v poptávkovém formuláři. Prázdná cena = „dle dohody“.</p></div><button class="btn red" data-act="sv-add">+ Přidat službu</button></div>
      <div class="table-card"><table class="list"><thead><tr><th>Služba</th><th>Cena bez DPH</th><th>Jednotka</th><th></th></tr></thead><tbody>
      ${d.services.map((s, n) => `<tr><td><input data-sv="name" data-n="${n}" value="${esc(s.name)}"></td><td><input data-sv="price" data-n="${n}" inputmode="decimal" value="${s.price ?? ''}" placeholder="dle dohody"></td><td><input data-sv="unit" data-n="${n}" value="${esc(s.unit || '')}" placeholder="např. km"></td><td class="actions"><button class="btn small ghost-red" data-act="sv-del" data-n="${n}">Smazat</button></td></tr>`).join('')}
      </tbody></table></div><div class="foot-btns"><button class="btn red" data-act="sv-save">Uložit služby</button></div>`;
  }
  /* ---------------- POPTÁVKY ---------------- */
  function inqList() {
    const all = S.inquiries(), list = all.filter(q => !inqFilter || q.status === inqFilter);
    const date = s => s ? new Date(s).toLocaleDateString('cs-CZ') : '';
    return `<div class="head"><div><h1>Poptávky</h1><p>${all.length} celkem · nových ${all.filter(q => q.status === 'nova').length}</p></div><select id="inq-f"><option value="">Všechny stavy</option>${Object.entries(STATUS).map(([k, v]) => `<option value="${k}"${inqFilter === k ? ' selected' : ''}>${v}</option>`).join('')}</select></div>
      ${list.length ? list.map(q => `<article class="inq card st-${q.status}"><header><div><span class="badge st-${q.status}">${STATUS[q.status]}</span><h2>${esc(q.itemName)}</h2><small>${new Date(q.createdAt).toLocaleString('cs-CZ')} · ${esc(q.id)}</small></div><div class="inq-ctl"><select data-act="inq-st" data-id="${q.id}">${Object.entries(STATUS).map(([k, v]) => `<option value="${k}"${q.status === k ? ' selected' : ''}>${v}</option>`).join('')}</select><button class="btn small ghost-red" data-act="inq-del" data-id="${q.id}">Smazat</button></div></header>
        <dl><div><dt>Termín</dt><dd>${date(q.from)} – ${date(q.to)} (${q.days} dní) · ${q.count} ks</dd></div><div><dt>Převzetí</dt><dd>${esc(q.delivery)}${q.address ? ` – ${esc(q.address)}` : ''}</dd></div>${q.services && q.services.length ? `<div><dt>Služby</dt><dd>${q.services.map(esc).join(', ')}</dd></div>` : ''}<div><dt>Kontakt</dt><dd>${esc(q.name)} · <a href="tel:${esc(q.phone)}">${esc(q.phone)}</a>${q.email ? ` · <a href="mailto:${esc(q.email)}">${esc(q.email)}</a>` : ''}${q.company ? ` · ${esc(q.company)}` : ''}</dd></div>${q.note ? `<div><dt>Poznámka</dt><dd>${esc(q.note)}</dd></div>` : ''}</dl></article>`).join('') : '<div class="card empty">Zatím žádné poptávky.</div>'}`;
  }
  /* ---------------- NASTAVENÍ ---------------- */
  function settings() {
    return `<div class="head"><div><h1>Nastavení a záloha</h1></div></div>
      <section class="card"><h2>DPH</h2><label class="field">Sazba DPH (%)<input id="vat" inputmode="decimal" value="${d.vatRate}"></label><button class="btn red" data-act="vat-save">Uložit</button></section>
      <section class="card"><h2>Záloha dat</h2><p class="hint">Stáhne všechny stroje, kategorie, služby a poptávky do jednoho souboru. Ze souboru je lze zase obnovit.</p><div class="foot-btns left"><button class="btn" data-act="export">Stáhnout zálohu</button><label class="btn ghost">Obnovit ze zálohy<input type="file" accept="application/json,.json" id="import" hidden></label></div></section>
      <section class="card danger"><h2>Výchozí stav</h2><p class="hint">Vrátí katalog do původní podoby (stroje od klienta). Poptávky zůstanou zachovány.</p><button class="btn ghost-red" data-act="reset">Obnovit výchozí katalog</button></section>`;
  }

  /* ---------------- události ---------------- */
  function bind() {
    const q = id => document.getElementById(id);
    if (q('f-q')) { q('f-q').addEventListener('input', e => { filter.q = e.target.value; const pos = e.target.selectionStart; render(); q('f-q').focus(); q('f-q').setSelectionRange(pos, pos); }); q('f-cat').addEventListener('change', e => { filter.cat = e.target.value; render(); }); q('f-state').addEventListener('change', e => { filter.state = e.target.value; render(); }); }
    if (q('inq-f')) q('inq-f').addEventListener('change', e => { inqFilter = e.target.value; render(); });
    if (q('ph-input')) q('ph-input').addEventListener('change', async e => {
      readForm(); const files = [...e.target.files];
      try { for (const f of files) editing.photos.push(await resize(f)); toast(`Přidáno fotografií: ${files.length} (nezapomeňte uložit)`); } catch { toast('Fotografii se nepodařilo načíst.', true); }
      render();
    });
    main.querySelectorAll('[data-pr="price"]').forEach(inp => inp.addEventListener('input', () => { const v = num(inp.value); document.getElementById('vat-' + inp.dataset.n).textContent = v == null ? '—' : S.fmt(S.withVat(v, d)); }));
    if (q('import')) q('import').addEventListener('change', e => {
      const f = e.target.files[0]; if (!f) return; const r = new FileReader();
      r.onload = () => { try { const j = JSON.parse(r.result); if (!j.data || !Array.isArray(j.data.items)) throw 0; if (!confirm('Opravdu nahradit současná data zálohou?')) return; d = j.data; persist('Data obnovena ze zálohy'); if (Array.isArray(j.inquiries)) S.saveInquiries(j.inquiries); render(); } catch { toast('Soubor není platná záloha HAVARIX.', true); } };
      r.readAsText(f);
    });
  }
  main.addEventListener('change', e => {
    const t = e.target;
    if (t.dataset.act === 'toggle') { const i = d.items.find(x => x.id === t.dataset.id); i.active = t.checked; persist(i.active ? 'Stroj je na webu' : 'Stroj skryt'); render(); }
    if (t.dataset.act === 'inq-st') { const l = S.inquiries(); l.find(x => x.id === t.dataset.id).status = t.value; S.saveInquiries(l); toast('Stav změněn'); render(); }
  });
  main.addEventListener('click', e => {
    const b = e.target.closest('[data-act]'); if (!b || b.tagName === 'INPUT' || b.tagName === 'SELECT') return;
    const a = b.dataset.act, n = +b.dataset.n;
    const sync = () => { if (tab === 'kategorie') main.querySelectorAll('[data-cat]').forEach(i => d.categories[+i.dataset.n][i.dataset.cat] = i.value); if (tab === 'sluzby') main.querySelectorAll('[data-sv]').forEach(i => d.services[+i.dataset.n][i.dataset.sv] = i.dataset.sv === 'price' ? num(i.value) : i.value); };
    switch (a) {
      case 'new': editing = blankItem(); render(); break;
      case 'edit': editing = JSON.parse(JSON.stringify(d.items.find(x => x.id === b.dataset.id))); render(); break;
      case 'cancel': editing = null; render(); break;
      case 'save': saveItem(); break;
      case 'del': if (confirm('Opravdu smazat tento stroj? Tuto akci nelze vrátit.')) { d.items = d.items.filter(x => x.id !== b.dataset.id); persist('Stroj smazán'); render(); } break;
      case 'up': case 'down': { const i = +b.dataset.i, j = a === 'up' ? i - 1 : i + 1; [d.items[i], d.items[j]] = [d.items[j], d.items[i]]; persist('Pořadí uloženo'); render(); break; }
      case 'ph-del': readForm(); editing.photos.splice(n, 1); render(); break;
      case 'ph-main': readForm(); editing.photos.unshift(editing.photos.splice(n, 1)[0]); render(); break;
      case 'pr-add': { readForm(); const last = editing.prices[editing.prices.length - 1]; editing.prices.push({from: last ? (last.to ?? last.from) + 1 : 1, to: null, price: null}); render(); break; }
      case 'pr-del': readForm(); editing.prices.splice(n, 1); render(); break;
      case 'pa-add': readForm(); editing.params.push(['', '']); render(); break;
      case 'pa-del': readForm(); editing.params.splice(n, 1); render(); break;
      case 'pa-up': readForm(); [editing.params[n - 1], editing.params[n]] = [editing.params[n], editing.params[n - 1]]; render(); break;
      case 'cat-add': sync(); d.categories.push({id: 'kat-' + Date.now().toString(36), name: 'Nová kategorie', icon: 'tools', intro: ''}); render(); break;
      case 'cat-up': sync(); [d.categories[n - 1], d.categories[n]] = [d.categories[n], d.categories[n - 1]]; render(); break;
      case 'cat-del': sync(); d.categories.splice(n, 1); persist('Kategorie smazána'); render(); break;
      case 'cat-save': sync(); persist('Kategorie uloženy'); render(); break;
      case 'sv-add': sync(); d.services.push({id: 'sl-' + Date.now().toString(36), name: 'Nová služba', price: null, unit: ''}); render(); break;
      case 'sv-del': sync(); d.services.splice(n, 1); persist('Služba smazána'); render(); break;
      case 'sv-save': sync(); persist('Služby uloženy'); render(); break;
      case 'inq-del': if (confirm('Opravdu smazat tuto poptávku?')) { S.saveInquiries(S.inquiries().filter(x => x.id !== b.dataset.id)); toast('Poptávka smazána'); render(); } break;
      case 'vat-save': { const v = num(document.getElementById('vat').value); if (v == null || v < 0 || v > 100) { toast('Zadejte platnou sazbu DPH.', true); break; } d.vatRate = v; persist('Sazba DPH uložena'); render(); break; }
      case 'export': { const blob = new Blob([JSON.stringify({exportedAt: new Date().toISOString(), data: d, inquiries: S.inquiries()}, null, 2)], {type: 'application/json'}); const u = URL.createObjectURL(blob); const l = document.createElement('a'); l.href = u; l.download = `havarix-zaloha-${new Date().toISOString().slice(0, 10)}.json`; document.body.append(l); l.click(); l.remove(); setTimeout(() => URL.revokeObjectURL(u), 1000); break; }
      case 'reset': if (confirm('Vrátit katalog do výchozího stavu? Vaše úpravy strojů budou ztraceny.')) { S.reset(); d = S.get(); toast('Katalog obnoven'); render(); } break;
    }
  });

  render();
})();
