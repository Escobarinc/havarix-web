/* HAVARIX – výchozí data půjčovny. Administrace je upravuje; tento soubor slouží jako výchozí stav.
   Stroje a parametry: podklady od L. Pečenky (29. 10. 2026) a technické listy výrobce Master.
   Fotky strojů: složka FOTKY PUJCOVNA (7. 11. 2026). Ceny a počty kusů zatím nedodány → null = „cena na dotaz“. Stroje „do budoucna“ jsou skryté (active:false). */
window.HAVARIX_RENTAL_DEFAULT = {
  version: 2,
  vatRate: 21,
  categories: [
    {id:'odvlhcovace', name:'Odvlhčovače a vysoušeče', icon:'drop', intro:'Kondenzační a adsorpční odvlhčovače pro vysoušení po vytopení a havárii vody.'},
    {id:'ventilatory', name:'Ventilátory', icon:'wind', intro:'Podlahové a axiální ventilátory pro rychlejší odpařování vlhkosti z podlah a stěn.'},
    {id:'topidla', name:'Topidla', icon:'heat', intro:'Elektrická topidla jako doplněk k vysoušení i k temperování prostor.'},
    {id:'turbiny', name:'Turbíny a separátory', icon:'turbine', intro:'Technika pro vysoušení podlahových souvrství a odčerpávání vody.'},
    {id:'prislusenstvi', name:'Příslušenství', icon:'tools', intro:'Hadice, čerpadla kondenzátu a další doplňky k vysoušecí technice.'}
  ],
  services: [
    {id:'doprava', name:'Doprava techniky na místo', price:null, unit:'km'},
    {id:'zapojeni', name:'Dovoz a zapojení na místě', price:null, unit:'zakázka'},
    {id:'mereni', name:'Průběžné kontroly a měření vlhkosti', price:null, unit:'návštěva'},
    {id:'odvoz', name:'Odvoz po skončení pronájmu', price:null, unit:'zakázka'},
    {id:'zaskoleni', name:'Zaškolení obsluhy při předání', price:null, unit:'zakázka'}
  ],
  items: [
    {id:'master-dh-752-p', name:'Master DH 752 P', category:'odvlhcovace', active:true, count:null, deposit:null,
     short:'Kondenzační odvlhčovač s výkonem až 47,2 l za 24 hodin, kovové provedení odolné proti nárazu.',
     description:'Výkonný profesionální odvlhčovač pro vysoušení bytů, domů a stavebních prostor po vytopení. Robustní kovové tělo, rotační kompresor a kolečka pro snadný přesun.',
     params:[['Odvlhčovací výkon','až 47,2 l / 24 h (30 °C / 80 %)'],['Výkon při 20 °C / 60 %','20,3 l / 24 h'],['Doporučený prostor','do 700 m³'],['Průtok vzduchu','350 m³/h'],['Příkon','900 W'],['Napájení','230 V / 50 Hz'],['Nádrž na kondenzát','5,7 l'],['Pracovní teplota','5–35 °C'],['Hlučnost','52 dB(A) v 7 m'],['Hmotnost','30 kg'],['Rozměry (d × š × v)','580 × 422 × 820 mm']],
     prices:[{from:1,to:10,price:null},{from:11,to:20,price:null},{from:21,to:30,price:null},{from:31,to:null,price:null}], photos:['assets/pujcovna/master-dh-752-p.webp']},
    {id:'master-cdx-20', name:'Master CDX 20', category:'ventilatory', active:true, count:null, deposit:null,
     short:'Mobilní podlahový ventilátor s průtokem až 1 610 m³/h, určený k vysoušení podlah a stěn.',
     description:'Nízký podlahový ventilátor, který proudí vzduch těsně nad povrchem a urychluje odpařování vlhkosti z podlah a spodních částí stěn. Dvě rychlosti.',
     params:[['Průtok vzduchu','1 270–1 610 m³/h'],['Rychlosti','2'],['Příkon','161 / 179 W'],['Napájení','230 V / 50 Hz'],['Hlučnost','67–70 dB(A)'],['Hmotnost','7,8 kg'],['Rozměry','520 × 425 × 215 mm']],
     prices:[{from:1,to:10,price:null},{from:11,to:20,price:null},{from:21,to:30,price:null},{from:31,to:null,price:null}], photos:['assets/pujcovna/master-cdx-20.webp']},
    {id:'master-df-20-p', name:'Master DF 20 P', category:'ventilatory', active:true, count:null, deposit:null,
     short:'Axiální ventilátor s průtokem až 6 600 m³/h, průměrem 50 cm a krytím IP44.',
     description:'Silný axiální ventilátor pro intenzivní proudění vzduchu ve větších prostorách. Tři rychlosti a krytí IP44.',
     params:[['Průtok vzduchu','3 600 / 4 800 / 6 600 m³/h'],['Typ','axiální'],['Průměr výstupu','500 mm'],['Rychlosti','3'],['Příkon','98 / 100 / 107 W'],['Napájení','230 V / 50 Hz'],['Krytí','IP44'],['Hmotnost','9 kg']],
     prices:[{from:1,to:10,price:null},{from:11,to:20,price:null},{from:21,to:30,price:null},{from:31,to:null,price:null}], photos:['assets/pujcovna/master-df-20-p.webp']},
    {id:'master-b-3-3-it', name:'Master B 3,3 IT (EPB)', category:'topidla', active:true, count:null, deposit:null,
     short:'Elektrické topidlo s ventilátorem a termostatem, výkon 1,65 / 3,3 kW, 230 V.',
     description:'Kompaktní elektrické topidlo s ventilátorem a termostatem. Pomáhá udržet teplotu při vysoušení a temperovat prostory.',
     params:[['Topný výkon','1,65 / 3,3 kW'],['Průtok vzduchu','510 m³/h'],['Termostat','ano, 5–35 °C'],['Napájení','230 V / 50–60 Hz'],['Jmenovitý proud','14,5 A'],['Zásuvka na topidle','16 A / 3P'],['Krytí','IP24'],['Hmotnost','5,1 kg'],['Rozměry','260 × 260 × 410 mm']],
     prices:[{from:1,to:10,price:null},{from:11,to:20,price:null},{from:21,to:30,price:null},{from:31,to:null,price:null}], photos:['assets/pujcovna/master-b-3-3-it.webp']},
    {id:'hadice-blm-4800', name:'Hadice pružná PVC k ventilátoru Master BLM 4800', category:'prislusenstvi', active:true, count:null, deposit:null,
     short:'Pružná žlutá PVC hadice o průměru 25 cm a délce 7,6 m.',
     description:'Hadice pro vedení vzduchu od ventilátoru Master BLM 4800 do míst, kam se ventilátor nevejde.',
     params:[['Průměr','25 cm'],['Délka','7,6 m'],['Materiál','pružné PVC'],['Kompatibilita','ventilátor Master BLM 4800'],['Kód','4515.559']],
     prices:[{from:1,to:10,price:null},{from:11,to:20,price:null},{from:21,to:30,price:null},{from:31,to:null,price:null}], photos:['assets/pujcovna/hadice-blm-4800.webp']},
    /* --- technika do budoucna: skrytá, zapne se v administraci --- */
    {id:'corroventa-t2', name:'Tlaková turbína Corroventa T2 Premium Line ES', category:'turbiny', active:false, count:3, deposit:null, short:'Tlaková turbína pro vysoušení podlahových souvrství, úsporná řada ES.', description:'', params:[], prices:[{from:1,to:10,price:null},{from:11,to:20,price:null},{from:21,to:30,price:null},{from:31,to:null,price:null}], photos:['assets/pujcovna/corroventa-t2.webp']},
    {id:'corroventa-t4', name:'Tlaková turbína Corroventa T4 Premium Line ES', category:'turbiny', active:false, count:1, deposit:null, short:'Výkonnější tlaková turbína pro vysoušení podlahových souvrství, úsporná řada ES.', description:'', params:[], prices:[{from:1,to:10,price:null},{from:11,to:20,price:null},{from:21,to:30,price:null},{from:31,to:null,price:null}], photos:['assets/pujcovna/corroventa-t4.webp']},
    {id:'corroventa-ws4es', name:'Separátor na odčerpávání vody WS4ES', category:'turbiny', active:false, count:2, deposit:null, short:'Separátor na odčerpávání vody s filtrací nasávaného vzduchu.', description:'', params:[], prices:[{from:1,to:10,price:null},{from:11,to:20,price:null},{from:21,to:30,price:null},{from:31,to:null,price:null}], photos:['assets/pujcovna/corroventa-ws4es.webp']},
    {id:'corroventa-a4', name:'Adsorpční odvlhčovač Corroventa A4 Premium Line ES', category:'odvlhcovace', active:false, count:1, deposit:null, short:'Adsorpční odvlhčovač, účinný i při nízkých teplotách.', description:'', params:[], prices:[{from:1,to:10,price:null},{from:11,to:20,price:null},{from:21,to:30,price:null},{from:31,to:null,price:null}], photos:['assets/pujcovna/corroventa-a4.webp']},
    {id:'trotec-ttk-125-s', name:'Průmyslový kondenzační odvlhčovač Trotec TTK 125 S', category:'odvlhcovace', active:false, count:1, deposit:null, short:'Průmyslový kondenzační odvlhčovač.', description:'', params:[], prices:[{from:1,to:10,price:null},{from:11,to:20,price:null},{from:21,to:30,price:null},{from:31,to:null,price:null}], photos:['assets/pujcovna/trotec-ttk-125-s.webp']},
    {id:'trotec-ttk-qube', name:'Kondenzační odvlhčovač Trotec TTK Qube s čerpadlem kondenzátu', category:'odvlhcovace', active:false, count:1, deposit:null, short:'Profesionální kondenzační odvlhčovač s čerpadlem kondenzátu.', description:'', params:[], prices:[{from:1,to:10,price:null},{from:11,to:20,price:null},{from:21,to:30,price:null},{from:31,to:null,price:null}], photos:['assets/pujcovna/trotec-ttk-qube.webp']},
    {id:'trotec-ost5', name:'Čerpadlo kondenzátu Trotec OST5', category:'prislusenstvi', active:false, count:1, deposit:null, short:'Čerpadlo pro odvod kondenzátu z odvlhčovače.', description:'', params:[], prices:[{from:1,to:10,price:null},{from:11,to:20,price:null},{from:21,to:30,price:null},{from:31,to:null,price:null}], photos:['assets/pujcovna/trotec-ost5.webp']},
    {id:'trotec-ttf-10-s', name:'Průmyslový ventilátor Trotec TTF 10 S', category:'ventilatory', active:false, count:1, deposit:null, short:'Průmyslový ventilátor.', description:'', params:[], prices:[{from:1,to:10,price:null},{from:11,to:20,price:null},{from:21,to:30,price:null},{from:31,to:null,price:null}], photos:['assets/pujcovna/trotec-ttf-10-s.webp']}
  ]
};
