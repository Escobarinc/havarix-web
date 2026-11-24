/* HAVARIX – výchozí články Poradny. Administrace je upravuje; tento soubor slouží jako výchozí stav.
   Pole steps = „Co udělat hned“ (zobrazí se rovnou na kartě). Formát textu článku: odstavce oddělené prázdným řádkem, „## “ = podnadpis, „- “ = odrážka. */
window.HAVARIX_PORADNA_DEFAULT = {
  version: 1,
  categories: [
    {id:'havarie', name:'Havárie', icon:'drop'},
    {id:'vlhkost', name:'Vlhkost', icon:'waves'},
    {id:'pojisteni', name:'Pojištění', icon:'shield'}
  ],
  articles: [
    {id:'prvni-kroky-po-havarii', steps:["Zastavte přívod vody", "Zajistěte bezpečí – odpojte elektřinu", "Volejte asistenci své pojišťovny", "Zavolejte HAVARIX"], title:'První kroky po havárii', category:'havarie', published:true, date:'2026-11-24', photo:'assets/img/cl-havarie.jpg',
     perex:'Co udělat hned po vytopení, jak omezit škody a na koho se obrátit.',
     body:'Když voda začne unikat, rozhodují první minuty. Postupujte v tomto pořadí:\n\n- Zastavte přívod vody – uzavřete hlavní uzávěr, případně ventil u zařízení (pračka, bojler, WC).\n- Zajistěte bezpečí – při riziku zásahu elektřinou nevstupujte do zasažených prostor a odpojte ohrožené spotřebiče.\n- Nahlaste havárii asistenční službě své pojišťovny a řekněte, že jako realizační firmu chcete HAVARIX. Nechte si to potvrdit.\n- Zavolejte nám – přijedeme k diagnostice a pořídíme aktuální záznam stavu.\n\n## Co si připravit\nVyfoťte poškození a zapište si, kdy k havárii došlo. Poškozené věci uschovejte, dokud je neuvidí pojišťovna.'},
    {id:'jak-poznat-vlhkost', steps:["Hledejte mapy a skvrny na stěnách", "Všímejte si zápachu a plísně", "Nechte vlhkost odborně změřit"], title:'Jak poznat vlhkost', category:'vlhkost', published:true, date:'2026-11-24', photo:'assets/img/cl-vlhkost.jpg',
     perex:'Typické příznaky, příčiny a jednoduché způsoby, jak vlhkost včas odhalit.',
     body:'Vlhkost ve zdivu se často projeví dřív, než si jí všimnete na první pohled.\n\n## Typické příznaky\n- vlhké mapy a skvrny na stěnách\n- odlupující se malba nebo omítka\n- zatuchlý zápach\n- plíseň v rozích a za nábytkem\n\n## Proč měřit\nPřesný rozsah a příčinu vlhkosti ukáže až měření. Bez něj se snadno opraví jen povrch a problém se vrátí.'},
    {id:'jak-dlouho-trva-vysouseni', steps:["Před začátkem nechte vlhkost změřit", "Větrejte a udržujte teplotu", "Opravy až po kontrolním měření"], title:'Jak dlouho trvá vysoušení', category:'vlhkost', published:true, date:'2026-11-24', photo:'assets/img/cl-vysouseni.jpg',
     perex:'Co ovlivňuje dobu vysoušení, jak probíhá a kdy je prostor znovu bezpečný.',
     body:'Délka vysoušení záleží na množství vody, skladbě konstrukce a podmínkách v objektu. Bez měření ji nelze spolehlivě určit.\n\n## Co dobu ovlivňuje\n- kolik vody do konstrukce vniklo a jak dlouho tam byla\n- materiál stěn a podlah\n- teplota a větrání prostoru\n- použitá technika\n\n## Kdy je hotovo\nVysoušení končí, až měření potvrdí, že vlhkost klesla na odpovídající hodnoty. Teprve pak má smysl opravovat povrchy.'},
    {id:'kdy-volat-pojistovnu', steps:["Nejdřív volejte asistenční linku", "Řekněte, že chcete HAVARIX", "Nechte si to potvrdit", "Připravte fotky a záznam stavu"], title:'Kdy volat pojišťovnu', category:'pojisteni', published:true, date:'2026-11-24', photo:'assets/img/cl-pojisteni.jpg',
     perex:'Jak správně nahlásit škodu, jaké podklady připravit a na co si dát pozor.',
     body:'Aby pojišťovna havárii proplatila bez komplikací, je důležité pořadí kroků.\n\n## Nejdřív asistenční služba\nNahlaste havárii na asistenční linku své pojišťovny a řekněte, že jako realizační firmu chcete HAVARIX. Nechte si to potvrdit. Bez odsouhlasení asistence nemusí zásah proplatit, nebo ho proplatí se zpožděním.\n\n## Kdo co obvykle platí\n- Asistence: diagnostiku a odstranění příčiny havárie. Limit bývá 10 000–15 000 Kč podle vaší smlouvy.\n- Pojišťovna: další odstranění škod – vysoušení, nové omítky a opravy.\n\n## Jaké podklady připravit\nAktuální záznam stavu – fotky, měření a protokol z diagnostiky. Přesné podmínky se liší podle vaší pojistné smlouvy.'}
  ]
};
