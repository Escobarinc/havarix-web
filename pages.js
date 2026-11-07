/* HAVARIX – podstránky. Každá stránka má vlastní úvod a bloky podle grafického návrhu (HAVARIX-podstranky, HAVARIX-pet-kroku). */
const route = new URLSearchParams(location.search).get('view') || 'sluzby';
const root = document.getElementById('dynamic-page');
const IMG = 'assets/img/';

/* ---------- ikony (jednoduché obrysové SVG) ---------- */
const ICON = {
  arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
  check:'<path d="m5 12 4.5 4.5L19 7"/>',
  drop:'<path d="M12 3C7.5 9.5 6 12.6 6 15.5a6 6 0 0 0 12 0C18 12.6 16.5 9.5 12 3Z"/>',
  percent:'<path d="M12 3C7.5 9.5 6 12.6 6 15.5a6 6 0 0 0 12 0C18 12.6 16.5 9.5 12 3Z"/><path d="m9.5 17.5 5-5M10 13h.01M14 17h.01"/>',
  wind:'<path d="M3 8h11a3 3 0 1 0-3-3M3 12h15a3 3 0 1 1-3 3M3 16h8"/>',
  shield:'<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
  house:'<path d="m3 11 9-8 9 8M5 9.5V21h14V9.5M10 21v-6h4v6"/>',
  clock:'<circle cx="13" cy="13" r="8"/><path d="M13 9v4l3 2M11 2h4M3 9h3M2 13h3M3 17h3"/>',
  leaf:'<path d="M20 4C10 4 5 9 5 15c0 2 .7 3.7 1.6 5M20 4c0 10-5 15-11 15M6.6 20C9 14 12.5 10.5 16 8"/>',
  docSearch:'<path d="M14 3H6v18h6M14 3l5 5h-5zM9 11h6M9 15h3"/><circle cx="17" cy="17" r="3"/><path d="m19.2 19.2 2.3 2.3"/>',
  docs:'<path d="M8 3h9l3 3v13H8zM17 3v3h3M4 7v14h12M11 10h6M11 14h6"/>',
  sign:'<path d="M12 3v18M12 5h7l2 2.5L19 10h-7M12 12H5l-2 2.5L5 17h7"/>',
  phone:'<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2Z"/>',
  mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  pin:'<path d="M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12Z"/><circle cx="12" cy="9" r="2.5"/>',
  faucet:'<path d="M4 10h9a4 4 0 0 1 4 4v1M4 7v6M9 7V4M7 4h4M17 18c-1 1.5-1.5 2.3-1.5 3a1.5 1.5 0 0 0 3 0c0-.7-.5-1.5-1.5-3Z"/>',
  waves:'<path d="M8 3c-2 3-3 4.6-3 6a3 3 0 0 0 6 0c0-1.4-1-3-3-6ZM16 5c-1.3 2-2 3-2 4a2 2 0 0 0 4 0c0-1-.7-2-2-4ZM3 16c2 0 2-1.5 4.5-1.5S10 16 12 16s2-1.5 4.5-1.5S19 16 21 16M3 20c2 0 2-1.5 4.5-1.5S10 20 12 20s2-1.5 4.5-1.5S19 20 21 20"/>',
  tools:'<path d="M14.5 6.5a4 4 0 0 0 5 5L12 19a2.1 2.1 0 0 1-3-3zM5 3l4 4-2 2-4-4M7 9l3 3"/>',
  camera:'<path d="M4 7h3l2-3h6l2 3h3v13H4z"/><circle cx="12" cy="13" r="4"/>',
  fileCheck:'<path d="M14 3H6v18h12V7zM14 3v4h4M9 12h6M9 9h2"/><path d="m10 17 1.5 1.5L15 15"/>',
  list:'<path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01"/>',
  gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"/>',
  calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  checklist:'<path d="M9 3h6v3H9zM7 5H5v16h14V5h-2M8 11l1.5 1.5L12 10M8 16l1.5 1.5L12 15M14 11h3M14 16h3"/>',
  ruler:'<path d="M4 20 20 4M7 17l2 2M10 14l1.5 1.5M13 11l2 2M16 8l1.5 1.5"/>',
  brush:'<path d="M14 4 20 10l-8 8H6v-6zM4 20l2-2"/>',
  heat:'<rect x="5" y="4" width="14" height="16" rx="2"/><path d="M9 8c1 1 1 2 0 3s-1 2 0 3M12 8c1 1 1 2 0 3s-1 2 0 3M15 8c1 1 1 2 0 3s-1 2 0 3M8 20v1M16 20v1"/>',
  turbine:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2"/><path d="M12 10c0-3 1-5 3-6M14 12c3 0 5 1 6 3M12 14c0 3-1 5-3 6M10 12c-3 0-5-1-6-3"/>',
  truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  idcard:'<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2.2"/><path d="M5.5 16c.7-1.6 2-2.4 3.5-2.4s2.8.8 3.5 2.4M14 10h4M14 13h3"/>'
};
const ic = (name, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICON[name]}</svg>`;
const arrow = ic('arrow', 'ic-arrow');

/* ---------- data ---------- */
const STEPS = [
  {id:'havarie', title:'Havárie', photo:'step_havarie', copy:'Vytopení, průsak nebo jiné poškození vodou.'},
  {id:'dokumentace', title:'Dokumentace', photo:'step_dokumentace', copy:'Rychle a správně zdokumentujeme škody pro pojišťovnu.'},
  {id:'rozpocet', title:'Rozpočet', photo:'step_rozpocet', copy:'Připravíme přehledný rozpočet na vysoušení, sanaci a opravy.'},
  {id:'vysouseni', title:'Vysoušení a sanace', photo:'step_vysouseni', copy:'Profesionálně vysušíme konstrukce, odstraníme vlhkost a následky poškození.'},
  {id:'pojisteni', title:'Revize pojištění', photo:'step_pojisteni', copy:'Pomůžeme s hlášením škody a prověříme vaše pojistné krytí.'}
];
const SERVICES = [
  {title:'Diagnostika vlhkosti', photo:'sl-diagnostika', href:'dokumentace', copy:'Přesně zjistíme rozsah poškození, míru zavlhnutí a skrytá rizika, abychom navrhli nejúčinnější postup obnovy.'},
  {title:'Profesionální vysoušení', photo:'sl-vysouseni', href:'vysouseni', copy:'Rychle a bezpečně odstraníme přebytečnou vlhkost z konstrukcí, podlah i zdiva pomocí výkonné a šetrné techniky.'},
  {title:'Sanace a opravy', photo:'sl-sanace', href:'vysouseni', copy:'Odstraníme následky vytopení – sanace zdiva, protiplísňová opatření, opravy omítek, podlah i dalších poškozených částí.'},
  {title:'Pomoc s pojištěním', photo:'sl-pojisteni', href:'pojisteni', copy:'Připravíme podklady, zdokumentujeme škody a pomůžeme s komunikací s pojišťovnou bez zbytečných průtahů.'}
];
const FAQ = [
  {cat:'havarie', q:'Co udělat, když právě uniká voda?', a:'Pokud nehrozí nebezpečí, zastavte přívod vody. Při riziku zásahu elektrickým proudem nevstupujte do zasažených prostor a volejte příslušnou pomoc.'},
  {cat:'havarie', q:'Jaké jsou první kroky po havárii?', a:'Zastavte přívod vody, odpojte ohrožené spotřebiče, vše vyfoťte a zapište si, kdy k havárii došlo. Pak volejte odborníky a škodu nahlaste pojišťovně.'},
  {cat:'vlhkost', q:'Jak poznám vlhkost ve zdi?', a:'Vlhké mapy, změny barvy, odlupující se malba, zápach nebo plíseň jsou signály. Přesný rozsah však ukáže až vhodné měření.'},
  {cat:'vlhkost', q:'Jak dlouho trvá vysoušení?', a:'Záleží na množství vody, skladbě konstrukce a podmínkách v objektu. Bez měření nelze spolehlivě určit délku.'},
  {cat:'vlhkost', q:'Může se po vysoušení hned malovat?', a:'Ne vždy. Před opravou povrchů je potřeba ověřit stav vlhkosti a případné další poškození materiálu.'},
  {cat:'pojisteni', q:'Mám nejdřív volat pojišťovnu?', a:'Škodu nahlaste podle podmínek smlouvy bez zbytečného odkladu a průběžně dokumentujte stav. Záchranné kroky kvůli bezpečnosti neodkládejte.'},
  {cat:'pojisteni', q:'Co má obsahovat rozpočet pro pojišťovnu?', a:'Rozsah zásahu, popis jednotlivých prací, materiály, předpokládané množství a informace o položkách, které mohou vyžadovat upřesnění.'}
];
const CATS = {havarie:{label:'Havárie', icon:'drop'}, vlhkost:{label:'Vlhkost', icon:'waves'}, pojisteni:{label:'Pojištění', icon:'shield'}};
const ARTICLES = [
  {cat:'havarie', photo:'cl-havarie', title:'První kroky po havárii', copy:'Co udělat hned po vytopení, jak omezit škody a na koho se obrátit.', faq:1},
  {cat:'vlhkost', photo:'cl-vlhkost', title:'Jak poznat vlhkost', copy:'Typické příznaky, příčiny a jednoduché způsoby, jak vlhkost včas odhalit.', faq:2},
  {cat:'vlhkost', photo:'cl-vysouseni', title:'Jak dlouho trvá vysoušení', copy:'Co ovlivňuje dobu vysoušení, jak probíhá a kdy je prostor znovu bezpečný.', faq:3},
  {cat:'pojisteni', photo:'cl-pojisteni', title:'Kdy volat pojišťovnu', copy:'Jak správně nahlásit škodu, jaké podklady připravit a na co si dát pozor.', faq:5}
];

/* ---------- společné části ---------- */
function hero({photo, kicker, title, lead, cta, href = '#page-details', icon, extra = '', before = '', cls = ''}) {
  return `<section class="page-hero ${cls}"><img src="${IMG}${photo}.jpg" alt="" fetchpriority="high"><div class="page-hero-inner">${before}${kicker ? `<p class="page-kicker">${kicker}</p>` : ''}<h1>${title}</h1>${lead ? `<p class="page-lead">${lead}</p>` : ''}${cta ? `<a class="primary-link" href="${href}">${icon ? ic(icon) : ''}${cta} ${arrow}</a>` : ''}${extra}</div></section>`;
}
function stepper(index) {
  return `<nav class="stepper" aria-label="Postup v pěti krocích">${STEPS.map((s, i) => `<a class="${i < index ? 'done' : i === index ? 'current' : ''}" href="page.html?view=${s.id}"${i === index ? ' aria-current="step"' : ''}><span>${i < index ? ic('check') : String(i + 1).padStart(2, '0')}</span>${s.title}</a>`).join('')}</nav>`;
}
function stepNav(index) {
  const prev = STEPS[index - 1], next = STEPS[index + 1];
  return `<section class="page-section dark step-pager"><div class="pager">${prev ? `<a href="page.html?view=${prev.id}"><small>Předchozí krok</small>← ${prev.title}</a>` : '<span></span>'}<a class="pager-all" href="page.html?view=postup">Celý postup</a>${next ? `<a href="page.html?view=${next.id}"><small>Další krok</small>${next.title} →</a>` : '<span></span>'}</div></section>`;
}
function iconCards(items, cls = '') {
  return `<div class="icon-cards ${cls}">${items.map(([icon, title, copy]) => `<div class="icon-card">${ic(icon)}<div><h3>${title}</h3>${copy ? `<p>${copy}</p>` : ''}</div></div>`).join('')}</div>`;
}
function photoCards(items, cls = '') {
  return `<div class="photo-cards ${cls}">${items.map(c => `<${c.href ? `a href="page.html?view=${c.href}"` : 'div'} class="photo-card"><img src="${IMG}${c.photo}.jpg" alt="" loading="lazy"><div class="photo-card-body">${c.icon ? ic(c.icon) : ''}<h3>${c.title}${c.href ? arrow : ''}</h3><p>${c.copy}</p></div></${c.href ? 'a' : 'div'}>`).join('')}</div>`;
}
function checklist(items) { return `<ul class="checklist">${items.map(t => `<li>${ic('check')}${t}</li>`).join('')}</ul>`; }
function callout(title = 'Nevíte, kde začít?', text = 'Krátký průvodce vám pomůže zorientovat se v dalším postupu.', cta = 'Spustit průvodce', href = 'pruvodce', photo = '') {
  return `<section class="page-section dark"><div class="callout${photo ? ' callout-photo' : ''}">${photo ? `<img src="${IMG}${photo}.jpg" alt="" loading="lazy">` : ''}<div class="callout-text"><h2>${title}</h2><p>${text}</p><a class="primary-link" href="page.html?view=${href}">${cta} ${arrow}</a></div></div></section>`;
}

/* ---------- jednotlivé stránky ---------- */
const PAGES = {
  sluzby: {name:'Naše služby', render: () =>
    hero({photo:'hero-sluzby', kicker:'NAŠE SLUŽBY', title:'Vrátíme váš domov<br>do pořádku.', lead:'Kompletní obnova domů a bytů po vytopení – od zjištění rozsahu škod přes vysoušení až po sanaci, opravy a vyřízení s pojišťovnou. Rychle, odborně a s jasným plánem.', cta:'Potřebuji pomoc', href:'page.html?view=pruvodce'}) +
    `<section class="page-section dark overlap" id="page-details">${photoCards(SERVICES, 'four')}</section>` + callout()},

  postup: {name:'Jak postupujeme', render: () =>
    hero({photo:'postup-technik', kicker:'JAK POSTUPUJEME', title:'Od havárie<br>k novému začátku.', lead:'Postaráme se o celý proces obnovy po vytopení – od prvního zásahu přes vysoušení a sanaci až po vyřízení s pojišťovnou.', cta:'Projít jednotlivé kroky'}) +
    `<section class="page-section dark" id="page-details"><ol class="process-line">${STEPS.map((s, i) => `<li><a href="page.html?view=${s.id}"><span class="pl-photo"><img src="${IMG}${s.photo}.jpg" alt="" loading="lazy"><b>${String(i + 1).padStart(2, '0')}</b></span><h3>${s.title}</h3><p>${s.copy}</p></a></li>`).join('')}</ol></section>` +
    `<section class="page-section dark split-photo"><div class="split-text"><h2>Co v každém kroku zařídíme?</h2>${checklist(['Rychlý výjezd a odborné posouzení rozsahu škod', 'Kompletní fotodokumentaci a podklady pro pojišťovnu', 'Přesný rozpočet a plán obnovy', 'Profesionální vysoušení, odvlhčení a sanaci konstrukcí', 'Komunikaci s pojišťovnou až do finálního uzavření škody'])}<a class="primary-link" href="page.html?view=havarie">Začít řešit havárii ${arrow}</a></div><img src="${IMG}hero-postup.jpg" alt="Vysoušeče HAVARIX v zasažené místnosti" loading="lazy"></section>`},

  proc: {name:'Proč HAVARIX', render: () =>
    hero({photo:'hero-proc', kicker:'PROČ HAVARIX', title:'Jeden partner.<br>Kompletní řešení.', lead:'Od prvního zásahu po finální obnovu – vysušíme, vyčistíme, sanujeme a vrátíme váš domov do bezpečného a plně obyvatelného stavu.'}) +
    `<section class="page-section dark" id="page-details">${iconCards([
      ['clock', 'Rychlá reakce', 'Jsme připraveni zasáhnout okamžitě a omezit tak další škody na vašem majetku.'],
      ['leaf', 'Šetrné technologie', 'Používáme profesionální a prověřené postupy, které jsou účinné, bezpečné a šetrné k vašemu domovu.'],
      ['shield', 'Pomoc s pojištěním', 'Zajistíme dokumentaci škod a pomůžeme s komunikací s pojišťovnou.'],
      ['house', 'Vše pod jednou střechou', 'Koordinujeme celý proces – od vysoušení a sanace přes stavební opravy až po uvedení do původního stavu.']
    ], 'row-divided')}</section>` +
    callout('Máte škody po vytopení?', 'Nezůstávejte na to sami. Poradíme vám s dalším postupem, navrhneme řešení na míru a vysvětlíme všechny možnosti.', 'Chci nezávaznou konzultaci', 'kontakt', 'proc-technik')},

  poradna: {name:'Poradna', render: () =>
    hero({photo:'hero-poradna', kicker:'PORADNA HAVARIX', title:'Rady, když vás<br>překvapí voda.', lead:'Praktické návody, ověřené postupy a odpovědi na nejčastější otázky po vytopení, havárii i při řešení vlhkosti.',
      extra:`<div class="chips" role="group" aria-label="Témata">${Object.entries(CATS).map(([k, c]) => `<button type="button" class="chip" data-cat="${k}" aria-pressed="false">${ic(c.icon)}${c.label}</button>`).join('')}</div>`}) +
    `<section class="page-section dark overlap" id="page-details"><form class="search-bar" role="search" onsubmit="return false"><label for="faq-search" class="sr-only">Hledat v poradně</label>${ic('search')}<input id="faq-search" type="search" placeholder="S čím potřebujete poradit?"><button class="primary-link" type="submit">Hledat</button></form>
      <div class="article-cards">${ARTICLES.map(a => `<a class="article-card" href="#faq-${a.faq}" data-faq="${a.faq}"><span class="tag">${CATS[a.cat].label}</span><img src="${IMG}${a.photo}.jpg" alt="" loading="lazy"><div class="photo-card-body"><h3>${a.title}</h3><p>${a.copy}</p><span class="read-more">Přečíst článek ${arrow}</span></div></a>`).join('')}</div></section>` +
    `<section class="page-section alt"><div class="section-intro"><small>ČASTÉ OTÁZKY</small><h2>Odpovědi na vaše otázky</h2></div><p id="faq-count" class="faq-count" aria-live="polite"></p><div class="faq-list" id="faq-list"></div></section>` + callout(), init: initAdvice},

  kontakt: {name:'Kontakt', render: () =>
    `<section class="page-hero hero-contact"><img src="${IMG}hero-kontakt.jpg" alt="Technik HAVARIX s vlhkoměrem" fetchpriority="high"><div class="page-hero-inner"><h1 class="underlined">Jsme připraveni pomoci.</h1>
      <form class="contact-card" id="contact-form" novalidate><div class="form-field"><label for="person">Jméno</label><input id="person" name="person" autocomplete="name" required maxlength="80" placeholder="Vaše jméno"></div><div class="form-field"><label for="phone">Telefon</label><input id="phone" name="phone" type="tel" autocomplete="tel" required minlength="9" maxlength="24" placeholder="Vaše telefonní číslo"></div><div class="form-field"><label for="email">E-mail</label><input id="email" name="email" type="email" autocomplete="email" maxlength="120" placeholder="Vaše e-mailová adresa"></div><div class="form-field"><label for="description">Co se stalo?</label><textarea id="description" name="description" required minlength="12" maxlength="2000" placeholder="Stručně popište situaci (např. prasklé potrubí, vytopený byt, vlhkost ve zdech apod.)"></textarea></div><button class="primary-link wide" type="submit">Odeslat poptávku ${arrow}</button><p class="form-hint">Testovací verze – odesílání se napojí v dalším kroku.</p><p class="message" id="form-message" role="status"></p></form></div></section>` +
    `<section class="page-section dark" id="page-details">${iconCards([
      ['phone', 'Zavolejte nám', 'Rádi s vámi situaci ihned probereme a poradíme s dalším postupem.'],
      ['mail', 'Napište nám', 'Pošlete nám informace o vašem problému a co nejdříve se vám ozveme.'],
      ['pin', 'Kde působíme', 'Napište nám, kde se objekt nachází, a domluvíme další postup.']
    ], 'outlined')}</section>`, init: initContact},

  pruvodce: {name:'Průvodce havárií', render: () =>
    hero({photo:'hero-pruvodce', title:'Stala se vám<br>havárie vody?', lead:'Pomůžeme vám najít správný postup.', cls:'hero-bar',
      extra: iconCards([['clock', 'Rychlá pomoc při havárii'], ['shield', 'Odborné řešení vlhkosti a škod'], ['house', 'Kompletní obnova vašeho domova']], 'mini')}) +
    `<section class="page-section dark overlap" id="page-details"><div class="wizard-card" id="wizard"><div class="wizard-head"><span class="dots" id="wizard-dots"></span><p class="wizard-progress" id="wizard-progress">Krok 1 ze 3</p></div><h2 id="wizard-heading"></h2><p id="wizard-description"></p><div class="wizard-options" id="wizard-options"></div><div class="wizard-controls"><button id="wizard-back" type="button">← Zpět</button><button class="primary-link" id="wizard-next" type="button" disabled>Pokračovat ${arrow}</button></div></div></section>`, init: initWizard},

  havarie: {name:'Havárie', step:0, render: () =>
    hero({photo:'hero-havarie', before: stepper(0), kicker:'KROK 01 — <span>HAVÁRIE</span>', title:'Voda v domě?<br>Zachovejte klid.', lead:'Právě řešíte havárii vody? Postupujte podle těchto 3 kroků, minimalizujete škody a ochráníte svůj domov.', cls:'hero-tall',
      extra:`<ol class="first-aid">${[['faucet', 'Zastavte přívod vody', 'Uzavřete hlavní uzávěr vody, případně lokální ventil u postiženého zařízení (pračka, bojler, WC apod.).'], ['shield', 'Zajistěte bezpečí', 'Odpojte ohrožené elektrospotřebiče, chraňte sebe i rodinu a omezte pohyb v zasažených prostorách.'], ['phone', 'Zavolejte odborníkům', 'Kontaktujte HAVARIX – přijedeme, zastavíme škody a zahájíme profesionální sanaci.']].map(([i, t, c], n) => `<li>${ic(i)}<div><h3><b>${n + 1}.</b> ${t}</h3><p>${c}</p></div></li>`).join('')}</ol><a class="primary-link" href="page.html?view=kontakt">Potřebuji pomoc ihned ${arrow}</a>`}) +
    `<section class="page-section dark step-band" id="page-details"><div class="band-label"><span class="badge">01<small>/05</small></span><h2>HAVÁRIE</h2></div><p>Jste v situaci, kdy voda nečekaně pronikla do vašeho domova. Správná první reakce je zásadní.</p><div class="band-photos">${['hv-potrubi', 'hv-strop', 'hv-podlaha'].map(p => `<img src="${IMG}${p}.jpg" alt="" loading="lazy">`).join('')}</div></section>` + stepNav(0)},

  dokumentace: {name:'Dokumentace', step:1, render: () =>
    hero({photo:'hero-dokumentace', before: stepper(1), title:'Změříme škody.<br>Vše zdokumentujeme.', lead:'Přesně změříme rozsah zasažení vlhkostí, detailně vše zdokumentujeme a připravíme kompletní podklady pro další postup i komunikaci s pojišťovnou.', cta:'Objednat diagnostiku', href:'page.html?view=kontakt', icon:'calendar', cls:'hero-rule'}) +
    `<section class="page-section dark" id="page-details"><div class="cards-with-aside">${photoCards([
      {icon:'percent', title:'Měření vlhkosti', photo:'dk-mereni', copy:'Profesionálními přístroji zjistíme aktuální vlhkost konstrukcí a rozsah zasažení.'},
      {icon:'camera', title:'Fotodokumentace', photo:'dk-foto', copy:'Detailně zdokumentujeme poškození všech zasažených prostor, včetně rozsahových snímků.'},
      {icon:'fileCheck', title:'Podklady pro pojišťovnu', photo:'dk-podklady', copy:'Připravíme přehledný soubor měření, fotografií a zjištění, který odpovídá požadavkům pojišťoven.'}
    ], 'three icon-top')}<aside class="aside-list">${ic('checklist')}<h3>Kontrolní seznam</h3>${checklist(['Zaměření vlhkosti v klíčových místech', 'Detailní fotodokumentace poškození', 'Záznam rozsahu a příčin zatečení', 'Příprava podkladů pro pojišťovnu'])}</aside></div></section>` + stepNav(1)},

  rozpocet: {name:'Rozpočet', step:2, render: () =>
    hero({photo:'hero-rozpocet', before: stepper(2), title:'Přehledný plán.<br>Jasné náklady.', lead:'Připravíme vám srozumitelný a položkový rozpočet oprav, abyste přesně věděli, co vás čeká – bez skrytých nákladů.', cta:'Chci rozpočet', href:'page.html?view=kontakt'}) +
    `<section class="page-section dark" id="page-details"><div class="budget-layout"><div class="budget-card"><h2>Ukázkový rozpočet obnovy po zatečení</h2><p class="budget-sub">Rodinný dům – zasažená stěna v obývacím pokoji (cca 12 m²). Ilustrativní příklad.</p>
      <div class="table-wrap"><table><thead><tr><th>Položka</th><th>Popis prací</th><th>Množství</th><th>Cena bez DPH</th></tr></thead><tbody>
      <tr><td>${ic('search')}Diagnostika</td><td>Měření vlhkosti, rozsah poškození, návrh postupu</td><td>1×</td><td>2 900 Kč</td></tr>
      <tr><td>${ic('wind')}Vysoušení</td><td>Profesionální vysoušení konstrukcí (včetně pronájmu techniky)</td><td>5 dní</td><td>7 500 Kč</td></tr>
      <tr><td>${ic('brush')}Oprava omítek</td><td>Odstranění poškozené omítky, nová sanační omítka, přemalování</td><td>12 m²</td><td>14 400 Kč</td></tr>
      </tbody><tfoot><tr><td colspan="3">Celkový odhad</td><td>24 800 Kč</td></tr></tfoot></table></div>
      <div class="budget-notes"><span>${ic('calendar')}Odhadovaná doba realizace: 7–10 dní</span><span>${ic('shield')}Cena zahrnuje práci, materiál i techniku</span></div></div>
      <div class="budget-side">${iconCards([['list', 'Položkový rozpočet', 'Přesný přehled všech prací, materiálů a nákladů.'], ['gear', 'Srozumitelný postup', 'Víme, co, kdy a jak budeme dělat – krok za krokem.'], ['shield', 'Bez překvapení', 'Domluvená cena platí. Žádné skryté poplatky.']], 'stack')}<a class="primary-link wide big" href="page.html?view=kontakt">Chci rozpočet ${arrow}</a></div></div></section>` + stepNav(2)},

  vysouseni: {name:'Vysoušení a sanace', step:3, render: () =>
    hero({photo:'hero-vysouseni', before: stepper(3), kicker:'KROK 04: VYSOUŠENÍ A SANACE', title:'Vysušíme. Opravíme.<br>Vrátíme domov.', lead:'Odstraníme vlhkost, zastavíme její šíření a odborně zajistíme sanaci i opravy po vytopení. Váš dům či byt bezpečně vysušíme, zpevníme zdivo a vrátíme do plně obyvatelného stavu.', cta:'Poptat vysoušení', href:'page.html?view=kontakt',
      extra: iconCards([['wind', 'Rychlé vysušení'], ['shield', 'Odborná sanace'], ['house', 'Kompletní opravy']], 'mini inline')}) +
    `<section class="page-section dark" id="page-details">${photoCards([
      {title:'Profesionální vysoušení', photo:'vs-vysouseni', copy:'Výkonné odvlhčovače bezpečně a efektivně odstraní vlhkost ze zdiva, podlah i konstrukcí.'},
      {title:'Sanace zdiva', photo:'vs-sanace', copy:'Zastavíme vzlínající vlhkost, zpevníme zdivo a zajistíme jeho dlouhodobou ochranu proti vodě.'},
      {title:'Opravy a omítky', photo:'vs-omitky', copy:'Obnovíme poškozené povrchy, provedeme nové omítky a připravíme prostory k běžnému užívání.'}
    ], 'three side')}</section>` + stepNav(3)},

  pujcovna: {name:'Půjčovna techniky', render: renderCatalog, init: initCatalog},
  stroj: {name:'Půjčovna techniky', render: renderItem, init: initItem},

  pojisteni: {name:'Revize pojištění', step:4, render: () =>
    hero({photo:'hero-pojisteni', before: stepper(4), kicker:'<span class="badge">05 / 05</span> REVIZE POJIŠTĚNÍ', title:'Pomůžeme vám<br>i s pojištěním.', lead:'Zkontrolujeme vaši pojistnou smlouvu, připravíme potřebné podklady a doporučíme další postup, aby řešení škody probíhalo hladce.', cta:'Chci prověřit pojištění', href:'page.html?view=kontakt', cls:'hero-rule'}) +
    `<section class="page-section dark overlap" id="page-details">${iconCards([['docSearch', 'Kontrola krytí'], ['docs', 'Podklady pro pojišťovnu'], ['sign', 'Doporučení dalšího postupu']], 'big-white')}</section>` + stepNav(4)}
};

/* ---------- vykreslení ---------- */
function render() {
  const p = PAGES[route] || PAGES.sluzby;
  document.title = `${p.name} | HAVARIX`;
  const navKey = typeof p.step === 'number' ? 'postup' : route === 'stroj' ? 'pujcovna' : route;
  if (route === 'stroj') { const it = findItem(); if (it) document.title = `${it.name} – půjčovna | HAVARIX`; }
  document.querySelectorAll('.desktop-nav [data-view]').forEach(a => a.classList.toggle('active', a.dataset.view === navKey));
  root.innerHTML = p.render();
  if (p.init) p.init();
}

function initAdvice() {
  const input = document.getElementById('faq-search'), list = document.getElementById('faq-list'), count = document.getElementById('faq-count');
  let cat = '';
  function search() {
    const q = input.value.trim().toLocaleLowerCase('cs');
    const matched = FAQ.map((f, i) => ({...f, i})).filter(f => (!cat || f.cat === cat) && (f.q + ' ' + f.a).toLocaleLowerCase('cs').includes(q));
    list.innerHTML = matched.map(f => `<details id="faq-${f.i}"><summary>${f.q}</summary><p>${f.a}</p></details>`).join('') || '<p>Pro toto hledání jsme nenašli odpověď. Zkuste jiné slovo.</p>';
    count.textContent = `Nalezeno odpovědí: ${matched.length}`;
  }
  input.addEventListener('input', search);
  document.querySelector('.search-bar').addEventListener('submit', () => { search(); list.scrollIntoView({behavior:'smooth', block:'start'}); });
  document.querySelectorAll('.chip').forEach(b => b.addEventListener('click', () => {
    cat = cat === b.dataset.cat ? '' : b.dataset.cat;
    document.querySelectorAll('.chip').forEach(x => x.setAttribute('aria-pressed', String(x.dataset.cat === cat)));
    search(); list.scrollIntoView({behavior:'smooth', block:'start'});
  }));
  document.querySelectorAll('.article-card').forEach(a => a.addEventListener('click', e => {
    e.preventDefault(); cat = ''; input.value = ''; search();
    document.querySelectorAll('.chip').forEach(x => x.setAttribute('aria-pressed', 'false'));
    const d = document.getElementById('faq-' + a.dataset.faq); if (d) { d.open = true; d.scrollIntoView({behavior:'smooth', block:'center'}); }
  }));
  search();
}

function initContact() {
  const form = document.getElementById('contact-form'), msg = document.getElementById('form-message');
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    msg.textContent = 'Děkujeme. V testovací verzi se poptávka zatím nikam neodesílá.';
  });
}

function initWizard() {
  const Q = [
    {h:'Co nejlépe vystihuje vaši situaci právě teď?', d:'Vyberte jednu možnost. Podle toho vám doporučíme správný postup, další kroky a jak vám můžeme pomoci.', o:[['faucet', 'Právě mi uniká voda'], ['waves', 'Objevil jsem vlhkost'], ['tools', 'Potřebuji opravit škody']]},
    {h:'Jak rozsáhlý je problém?', d:'Stačí odhad, přesný rozsah zjistíme měřením.', o:[['house', 'Jedna místnost'], ['ruler', 'Více místností'], ['search', 'Zatím nevím']]},
    {h:'Co potřebujete jako další krok?', d:'Vyberte, s čím vám máme pomoci nejdřív.', o:[['phone', 'Rychlou orientaci'], ['percent', 'Diagnostiku a měření'], ['list', 'Plán oprav a pojištění']]}
  ];
  const st = {i:0, a:[null, null, null]};
  const $ = id => document.getElementById(id);
  function draw() {
    $('wizard-dots').innerHTML = Q.map((_, n) => `<i class="${n < st.i ? 'done' : n === st.i ? 'on' : ''}"></i>`).join('');
    if (st.i === 3) {
      $('wizard-progress').textContent = 'Doporučení';
      $('wizard-heading').textContent = 'Máte základní přehled.';
      $('wizard-description').textContent = st.a[0] === 0 ? 'Pokud voda stále uniká, řešte nejprve bezpečnost a zastavení úniku. Při riziku elektřiny nevstupujte do ohrožených prostor.' : st.a[0] === 1 ? 'Doporučujeme odborné měření a dokumentaci, než se začne s opravami.' : 'Začněte dokumentací stavu a přehledným rozpočtem potřebných prací.';
      const step = st.a[0] === 0 ? 'havarie' : st.a[0] === 1 ? 'dokumentace' : 'rozpocet';
      $('wizard-options').innerHTML = `<div class="help-card"><h3>Vaše odpovědi</h3><p>${st.a.map((a, i) => Q[i].o[a][1]).join(' · ')}</p><a class="primary-link" href="page.html?view=kontakt">Kontaktovat HAVARIX ${arrow}</a> <a class="secondary-link" href="page.html?view=${step}">Co dělat dál</a></div>`;
      $('wizard-back').hidden = false; $('wizard-next').hidden = true; return;
    }
    const q = Q[st.i];
    $('wizard-progress').textContent = `Krok ${st.i + 1} ze 3`;
    $('wizard-heading').textContent = q.h; $('wizard-description').textContent = q.d;
    $('wizard-options').innerHTML = q.o.map(([icon, label], n) => `<button class="wizard-option ${st.a[st.i] === n ? 'selected' : ''}" type="button" data-option="${n}" aria-pressed="${st.a[st.i] === n}">${ic(icon, 'ic big')}<span>${label}</span>${arrow}</button>`).join('');
    $('wizard-options').querySelectorAll('[data-option]').forEach(b => b.addEventListener('click', () => { st.a[st.i] = Number(b.dataset.option); draw(); }));
    $('wizard-back').hidden = st.i === 0; $('wizard-next').hidden = false;
    $('wizard-next').disabled = st.a[st.i] === null;
    $('wizard-next').innerHTML = (st.i === 2 ? 'Zobrazit doporučení ' : 'Pokračovat ') + arrow;
  }
  $('wizard-next').addEventListener('click', () => { if (st.a[st.i] !== null) { st.i++; draw(); } });
  $('wizard-back').addEventListener('click', () => { if (st.i > 0) { st.i--; draw(); } });
  draw();
}



/* ================= PŮJČOVNA ================= */
const S = window.HavarixStore;
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));
function rental() { return S.get(); }
function findItem() { const id = new URLSearchParams(location.search).get('id'); return rental().items.find(i => i.id === id && i.active); }
function catOf(d, id) { return d.categories.find(c => c.id === id) || {name:'', icon:'tools'}; }
function media(item, d, cls = 'item-media') {
  return item.photos && item.photos.length ? `<div class="${cls}"><img src="${item.photos[0]}" alt="${esc(item.name)}" loading="lazy"></div>` : `<div class="${cls} no-photo">${ic(catOf(d, item.category).icon, 'ic ph')}<span>Fotografie bude doplněna</span></div>`;
}
function priceLine(item, d) {
  const p = S.fromPrice(item);
  return p == null ? '<span class="price-ask">Cena na dotaz</span>' : `<span class="price-from">od <b>${S.fmt(p)}</b> / den</span><small>bez DPH · ${S.fmt(S.withVat(p, d))} s DPH</small>`;
}

function renderCatalog() {
  const d = rental(), items = d.items.filter(i => i.active);
  const cats = d.categories.filter(c => items.some(i => i.category === c.id));
  return hero({photo:'hero-postup', kicker:'PŮJČOVNA TECHNIKY', title:'Profesionální technika<br>k zapůjčení.', lead:'Odvlhčovače, ventilátory a topidla pro vysoušení po vytopení. Techniku vám můžeme i dovézt, zapojit a průběžně měřit vlhkost.', cta:'Prohlédnout techniku'}) +
    `<section class="page-section dark overlap" id="page-details"><div class="catalog-bar"><div class="chips" role="group" aria-label="Kategorie techniky"><button type="button" class="chip" data-cat="" aria-pressed="true">Vše <span class="chip-count">${items.length}</span></button>${cats.map(c => `<button type="button" class="chip" data-cat="${c.id}" aria-pressed="false">${ic(c.icon)}${esc(c.name)} <span class="chip-count">${items.filter(i => i.category === c.id).length}</span></button>`).join('')}</div></div>
      <div class="catalog-grid" id="catalog-grid">${items.length ? items.map(i => `<a class="item-card" data-cat="${i.category}" href="page.html?view=stroj&id=${encodeURIComponent(i.id)}">${media(i, d)}<div class="item-body"><span class="item-cat">${esc(catOf(d, i.category).name)}</span><h3>${esc(i.name)}</h3><p>${esc(i.short)}</p><div class="item-foot"><div class="item-price">${priceLine(i, d)}</div><span class="item-go">Detail ${arrow}</span></div></div></a>`).join('') : '<p class="empty-note">Nabídka techniky se právě připravuje.</p>'}</div></section>` +
    `<section class="page-section alt"><div class="rent-info"><div><div class="section-intro"><small>K PRONÁJMU NABÍZÍME</small><h2>Doplňkové služby</h2><p>Techniku si můžete vyzvednout sami, nebo se o vše postaráme my.</p></div><ul class="service-list">${d.services.map(sv => `<li>${ic('check')}<span>${esc(sv.name)}</span><b>${sv.price == null ? 'dle dohody' : `${S.fmt(sv.price)} / ${esc(sv.unit)}`}</b></li>`).join('')}</ul></div>
      <div class="rent-steps"><h3>Jak půjčení probíhá</h3><ol><li>${ic('list')}<div><b>Vyberete techniku</b><span>a pošlete nezávaznou poptávku s termínem.</span></div></li><li>${ic('phone')}<div><b>Ozveme se vám</b><span>potvrdíme dostupnost, cenu a způsob předání.</span></div></li><li>${ic('idcard')}<div><b>Převzetí techniky</b><span>s občanským průkazem a vratnou kaucí, případně dovezeme a zapojíme.</span></div></li><li>${ic('truck')}<div><b>Vrácení</b><span>po skončení pronájmu techniku vyzvednete zpět nebo ji odvezeme.</span></div></li></ol></div></div></section>` +
    callout('Nevíte, jakou techniku potřebujete?', 'Popište nám situaci a doporučíme vhodnou techniku i délku pronájmu.', 'Poradit s výběrem', 'kontakt');
}
function initCatalog() {
  const chips = document.querySelectorAll('.catalog-bar .chip'), cards = document.querySelectorAll('.item-card');
  chips.forEach(b => b.addEventListener('click', () => {
    chips.forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    cards.forEach(c => { c.hidden = !!b.dataset.cat && c.dataset.cat !== b.dataset.cat; });
  }));
}

function renderItem() {
  const d = rental(), it = findItem();
  if (!it) return `<section class="page-section dark item-missing"><h1>Stroj nebyl nalezen</h1><p>Tato technika už není v nabídce, nebo je odkaz neplatný.</p><a class="primary-link" href="page.html?view=pujcovna">Zpět do půjčovny ${arrow}</a></section>`;
  const cat = catOf(d, it.category), photos = it.photos || [];
  const tiers = it.prices || [], anyPrice = tiers.some(t => t.price != null);
  return `<section class="page-section dark item-top"><nav class="crumbs" aria-label="Drobečková navigace"><a href="page.html?view=pujcovna">Půjčovna techniky</a><span>›</span><a href="page.html?view=pujcovna#${cat.id}">${esc(cat.name)}</a><span>›</span><b>${esc(it.name)}</b></nav>
    <div class="item-layout"><div class="gallery">${media(it, d, 'gallery-main')}${photos.length > 1 ? `<div class="thumbs">${photos.map((ph, n) => `<button type="button" class="thumb${n ? '' : ' on'}" data-src="${n}" aria-label="Fotografie ${n + 1}"><img src="${ph}" alt=""></button>`).join('')}</div>` : ''}</div>
    <div class="item-info"><span class="item-cat light">${ic(cat.icon)}${esc(cat.name)}</span><h1>${esc(it.name)}</h1><p class="item-short">${esc(it.short)}</p>
      <div class="price-box"><h2>Ceník pronájmu</h2>${anyPrice ? `<table class="price-table"><thead><tr><th>Délka pronájmu</th><th>bez DPH / den</th><th>s DPH / den</th></tr></thead><tbody>${tiers.map(t => `<tr><td>${S.tierLabel(t)}</td><td>${t.price == null ? 'na dotaz' : S.fmt(t.price)}</td><td>${t.price == null ? '–' : S.fmt(S.withVat(t.price, d))}</td></tr>`).join('')}</tbody></table>` : '<p class="price-ask big">Cena na dotaz</p><p class="muted">Cenu vám rádi sdělíme podle délky pronájmu.</p>'}
      ${it.deposit != null ? `<p class="deposit">${ic('shield')}Vratná kauce: <b>${S.fmt(it.deposit)}</b></p>` : ''}${it.count != null ? `<p class="deposit">${ic('list')}Počet kusů k dispozici: <b>${it.count}</b></p>` : ''}</div>
      <a class="primary-link wide big" href="#poptavka">Poptat tento stroj ${arrow}</a></div></div></section>
    <section class="page-section alt"><div class="item-details">${it.description ? `<div><h2>Popis</h2><p class="item-desc">${esc(it.description)}</p></div>` : ''}${it.params && it.params.length ? `<div><h2>Technické parametry</h2><table class="param-table"><tbody>${it.params.map(([k, v]) => `<tr><th>${esc(k)}</th><td>${esc(v)}</td></tr>`).join('')}</tbody></table></div>` : ''}</div></section>
    <section class="page-section dark" id="poptavka"><div class="inquiry-layout"><form class="contact-card inquiry" id="inquiry-form" novalidate><h2>Poptávka: ${esc(it.name)}</h2><p class="form-hint">Nezávazná poptávka. Ozveme se vám s potvrzením dostupnosti a ceny.</p>
      <div class="form-row"><div class="form-field"><label for="q-from">Půjčit od</label><input type="date" id="q-from" name="from" required></div><div class="form-field"><label for="q-to">Vrátit do</label><input type="date" id="q-to" name="to" required></div><div class="form-field small"><label for="q-count">Počet kusů</label><input type="number" id="q-count" name="count" min="1" ${it.count ? `max="${it.count}"` : ''} value="1" required></div></div>
      <fieldset class="form-field"><legend>Převzetí</legend><div class="radio-row"><label><input type="radio" name="delivery" value="Osobní odběr" checked> Osobní odběr</label><label><input type="radio" name="delivery" value="Doprava na místo"> Doprava na místo</label></div></fieldset>
      <div class="form-field" id="q-address-wrap" hidden><label for="q-address">Adresa místa</label><input id="q-address" name="address" autocomplete="street-address" maxlength="200"></div>
      <fieldset class="form-field"><legend>Doplňkové služby</legend><div class="check-grid">${d.services.map(sv => `<label><input type="checkbox" name="services" value="${esc(sv.name)}"> ${esc(sv.name)}</label>`).join('')}</div></fieldset>
      <div class="form-row"><div class="form-field"><label for="q-name">Jméno</label><input id="q-name" name="name" autocomplete="name" required maxlength="80"></div><div class="form-field"><label for="q-phone">Telefon</label><input id="q-phone" name="phone" type="tel" autocomplete="tel" required minlength="9" maxlength="24"></div></div>
      <div class="form-row"><div class="form-field"><label for="q-email">E-mail</label><input id="q-email" name="email" type="email" autocomplete="email" maxlength="120"></div><div class="form-field"><label for="q-company">Firma / IČO <small>(nepovinné)</small></label><input id="q-company" name="company" autocomplete="organization" maxlength="120"></div></div>
      <div class="form-field"><label for="q-note">Poznámka</label><textarea id="q-note" name="note" maxlength="1500" placeholder="Např. co se stalo, jak velký je prostor…"></textarea></div>
      <label class="consent"><input type="checkbox" name="consent" required> Souhlasím se zpracováním osobních údajů pro vyřízení poptávky.</label>
      <button class="primary-link wide" type="submit">Odeslat poptávku ${arrow}</button><p class="message" id="q-message" role="status"></p></form>
      <aside class="estimate" id="estimate"><h3>Orientační cena</h3><div id="estimate-body"><p class="muted">Vyberte termín pronájmu.</p></div><p class="muted small">Konečnou cenu potvrdíme v odpovědi na poptávku. Doplňkové služby se účtují zvlášť.</p></aside></div></section>`;
}
function initItem() {
  const d = rental(), it = findItem(); if (!it) return;
  document.querySelectorAll('.thumb').forEach(b => b.addEventListener('click', () => {
    document.querySelector('.gallery-main img').src = it.photos[+b.dataset.src];
    document.querySelectorAll('.thumb').forEach(x => x.classList.toggle('on', x === b));
  }));
  const f = document.getElementById('inquiry-form'), from = f.from, to = f.to, count = f.count;
  const today = new Date().toISOString().slice(0, 10); from.min = today; to.min = today;
  const days = () => { if (!from.value || !to.value) return 0; const n = Math.round((new Date(to.value) - new Date(from.value)) / 864e5) + 1; return n > 0 ? n : 0; };
  function estimate() {
    to.min = from.value || today;
    const n = days(), k = Math.max(1, +count.value || 1), body = document.getElementById('estimate-body');
    if (!n) { body.innerHTML = '<p class="muted">Vyberte termín pronájmu.</p>'; return; }
    const t = S.tierFor(it, n);
    if (!t || t.price == null) { body.innerHTML = `<p class="est-days">${n} ${n === 1 ? 'den' : n < 5 ? 'dny' : 'dní'} · ${k} ks</p><p class="price-ask">Cenu vám pošleme v odpovědi.</p>`; return; }
    const total = t.price * n * k;
    body.innerHTML = `<p class="est-days">${n} ${n === 1 ? 'den' : n < 5 ? 'dny' : 'dní'} × ${S.fmt(t.price)} × ${k} ks</p><p class="est-total">${S.fmt(total)} <small>bez DPH</small></p><p class="est-vat">${S.fmt(S.withVat(total, d))} s DPH</p>`;
  }
  [from, to, count].forEach(el => el.addEventListener('input', estimate));
  f.querySelectorAll('[name=delivery]').forEach(r => r.addEventListener('change', () => { document.getElementById('q-address-wrap').hidden = f.delivery.value !== 'Doprava na místo'; f.address.required = !document.getElementById('q-address-wrap').hidden; }));
  f.addEventListener('submit', e => {
    e.preventDefault();
    const msg = document.getElementById('q-message');
    if (from.value && to.value && days() === 0) { to.setCustomValidity('Datum vrácení musí být stejné nebo pozdější než datum půjčení.'); } else to.setCustomValidity('');
    if (!f.reportValidity()) return;
    const fd = new FormData(f);
    const ok = S.addInquiry({itemId: it.id, itemName: it.name, from: fd.get('from'), to: fd.get('to'), days: days(), count: +fd.get('count'), delivery: fd.get('delivery'), address: fd.get('address') || '', services: fd.getAll('services'), name: fd.get('name'), phone: fd.get('phone'), email: fd.get('email') || '', company: fd.get('company') || '', note: fd.get('note') || ''});
    msg.textContent = ok ? 'Děkujeme, poptávka je uložená. (Testovací režim: zatím se ukládá jen v tomto prohlížeči a uvidíte ji v administraci.)' : 'Poptávku se nepodařilo uložit. Zkuste to prosím znovu.';
    if (ok) { f.reset(); estimate(); }
  });
}

render();
