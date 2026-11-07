/* HAVARIX – úložiště půjčovny.
   TESTOVACÍ REŽIM: data a poptávky se ukládají jen v tomto prohlížeči (localStorage).
   V kroku 3 se stejné funkce napojí na server (sdílená data pro web i administraci). */
window.HavarixStore = (() => {
  const DATA_KEY = 'havarix-rental-v1', INQ_KEY = 'havarix-poptavky-v1';
  const clone = o => JSON.parse(JSON.stringify(o));
  const read = (k, fallback) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; } };
  const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } };

  function get() {
    const d = read(DATA_KEY, null);
    return d && d.version === window.HAVARIX_RENTAL_DEFAULT.version ? d : clone(window.HAVARIX_RENTAL_DEFAULT);
  }
  const save = d => write(DATA_KEY, d);
  const reset = () => { try { localStorage.removeItem(DATA_KEY); } catch (e) {} };
  const inquiries = () => read(INQ_KEY, []);
  const saveInquiries = list => write(INQ_KEY, list);
  function addInquiry(i) {
    const list = inquiries();
    list.unshift({...i, id: 'P' + Date.now().toString(36).toUpperCase(), createdAt: new Date().toISOString(), status: 'nova'});
    return saveInquiries(list);
  }

  /* pomocné výpočty cen (ceny se zadávají bez DPH) */
  const withVat = (price, d) => price == null ? null : Math.round(price * (1 + (d.vatRate || 21) / 100));
  const fmt = n => n == null ? '' : n.toLocaleString('cs-CZ') + ' Kč';
  const tierFor = (item, days) => (item.prices || []).find(t => days >= t.from && (t.to == null || days <= t.to));
  const fromPrice = item => { const p = (item.prices || []).map(t => t.price).filter(v => v != null); return p.length ? Math.min(...p) : null; };
  const tierLabel = t => t.to == null ? `${t.from} a více dní` : `${t.from}–${t.to} dní`;

  return {get, save, reset, inquiries, saveInquiries, addInquiry, withVat, fmt, tierFor, fromPrice, tierLabel};
})();
