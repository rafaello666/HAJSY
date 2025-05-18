/* ========  CONFIG  ======== */
const HOST = location.hostname || 'localhost';   // ← zabezpieczenie, gdy brak hostname
const API  = `http://${HOST}:8000/api`;

/* ========  HELPERS  ======== */
async function fetchJSON(url, opts = {}) {
  try {
    const r = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      ...opts
    });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return await r.json();
  } catch (err) {
    console.error('fetchJSON error:', err);
    throw err;
  }
}

/* ========  DOM REFERENCES  ======== */
const $form   = document.getElementById('form');
const $amount = document.getElementById('amount');
const $cat    = document.getElementById('category');
const $note   = document.getElementById('note');
const $total  = document.getElementById('total');
const $catUl  = document.getElementById('cat-list');
const $list   = document.getElementById('list');

/* ========  UI – Refresh danych  ======== */
async function refresh() {
  try {
    const [items, sum] = await Promise.all([
      fetchJSON(`${API}/expenses`),
      fetchJSON(`${API}/summary`)
    ]);

    /* suma wszystkich wydatków */
    $total.textContent = `Suma: ${sum.total.toFixed(2)} PLN`;

    /* podsumowanie kategorii */
    $catUl.innerHTML = '';
    sum.by_category.forEach(c => {
      const li = document.createElement('li');
      li.textContent = `${c.category} – ${c.sum.toFixed(2)} PLN`;
      $catUl.append(li);
    });

    /* lista pojedynczych wydatków */
    $list.innerHTML = '';
    items.forEach(it => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between';
      li.textContent =
        `${it.ts.slice(0, 10)} | ${it.amount} PLN | ${it.category} | ${it.note || ''}`;
      $list.append(li);
    });
  } catch (_) {
    $total.textContent = '⛔ Offline lub błąd sieci';
  }
}

/* ========  FORM SUBMIT  ======== */
$form.addEventListener('submit', async e => {
  e.preventDefault();

  const amountVal = parseFloat($amount.value);
  if (isNaN(amountVal)) {
    alert('⚠️ Podaj poprawną kwotę!');
    return;
  }

  const data = {
    amount: amountVal,
    category: $cat.value.trim() || 'inne',
    note: $note.value.trim()
  };

  try {
    await fetchJSON(`${API}/expenses`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
    $form.reset();
    $amount.focus();
    refresh();
  } catch (_) {
    alert('⛔ Nie udało się zapisać – offline lub błąd serwera');
  }
});

/* ========  START APLIKACJI  ======== */
refresh();

/* ========  SERVICE WORKER  ======== */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(reg => console.log('✅ SW registered:', reg.scope))
      .catch(err => console.error('❌ SW registration failed:', err));
  });

  navigator.serviceWorker.addEventListener('message', ev => {
    if (ev.data?.type === 'sw-updated') {
      console.log('🔄 Nowa wersja aplikacji dostępna!');
    }
  });
}
