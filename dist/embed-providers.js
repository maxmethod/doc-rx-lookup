/**
 * provider-lookup embed bootstrap
 * Generated from provider-lookup.html by scripts/build-embed.js — do not hand-edit.
 *
 * Drop into a GHL funnel page (Custom Code element) with:
 *   <div id="provider-lookup-widget" data-primary-color="{{custom_values.brand_primary_color}}"></div>
 *   <script src="https://cdn.jsdelivr.net/gh/maxmethod/doc-rx-lookup@vX.Y.Z/dist/embed-providers.js"></script>
 *
 * Or omit the <div> and the script appends the widget to <body>.
 */
(function () {
  if (window.__provLookupEmbedLoaded) return;
  window.__provLookupEmbedLoaded = true;

  // ---- styles ----
  const style = document.createElement('style');
  style.setAttribute('data-provider-lookup', 'styles');
  style.textContent = `:root {
    --bg: #ffffff;
    --surface: #f7f8fa;
    --border: #e3e6eb;
    --border-strong: #c9cfd8;
    --text: #1a2332;
    --text-muted: #5a6578;
    --accent: #1e4d8c;          
    --accent-hover: #163a6c;    
    --danger: #c94545;
    --danger-hover: #a83838;
    --success: #2d7a4f;
    --warning-bg: #fff8e6;
    --warning-border: #e8c96b;
    --radius: 6px;
    --shadow-sm: 0 1px 2px rgba(0,0,0,0.04);
    --shadow-md: 0 2px 8px rgba(0,0,0,0.08);
    --font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }#provider-lookup-widget#provider-lookup-widget * { box-sizing: border-box; }#provider-lookup-widget#provider-lookup-widget .prov-container {
    max-width: 100%;
    margin: 0;
    font-family: var(--font);
    color: var(--text);
    font-size: 15px;
    line-height: 1.5;
  }#provider-lookup-widget#provider-lookup-widget h1 { font-size: 22px; line-height: 1.3; margin: 0 0 4px; font-weight: 600; }#provider-lookup-widget#provider-lookup-widget .subtitle { color: var(--text-muted); margin-bottom: 28px; font-size: 14px; }#provider-lookup-widget#provider-lookup-widget .section {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 20px;
    margin-bottom: 20px;
  }#provider-lookup-widget#provider-lookup-widget .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }#provider-lookup-widget#provider-lookup-widget .section-title { font-size: 16px; font-weight: 600; margin: 0; }#provider-lookup-widget#provider-lookup-widget .section-count { color: var(--text-muted); font-size: 13px; }#provider-lookup-widget#provider-lookup-widget label { display: block; font-size: 13px; font-weight: 500; margin-bottom: 6px; color: var(--text); }#provider-lookup-widget#provider-lookup-widget input[type="text"], #provider-lookup-widget#provider-lookup-widget input[type="number"], #provider-lookup-widget#provider-lookup-widget select {
    width: 100%;
    padding: 9px 12px;
    font-size: 14px;
    font-family: var(--font);
    border: 1px solid var(--border-strong);
    border-radius: var(--radius);
    background: #fff;
    color: var(--text);
    transition: border-color 0.15s, box-shadow 0.15s;
  }#provider-lookup-widget#provider-lookup-widget input:focus, #provider-lookup-widget#provider-lookup-widget select:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 25%, transparent);
  }#provider-lookup-widget#provider-lookup-widget .search-wrap { position: relative; }#provider-lookup-widget#provider-lookup-widget .search-results {
    position: absolute;
    top: calc(100% + 4px);
    left: 0; right: 0;
    background: #fff;
    border: 1px solid var(--border-strong);
    border-radius: var(--radius);
    box-shadow: var(--shadow-md);
    max-height: 360px;
    overflow-y: auto;
    z-index: 20;
    display: none;
  }#provider-lookup-widget#provider-lookup-widget .search-results.open { display: block; }#provider-lookup-widget#provider-lookup-widget .result-item { padding: 10px 12px; cursor: pointer; border-bottom: 1px solid var(--border); font-size: 14px; }#provider-lookup-widget#provider-lookup-widget .result-item:last-child { border-bottom: none; }#provider-lookup-widget#provider-lookup-widget .result-item:hover, #provider-lookup-widget#provider-lookup-widget .result-item.active { background: #eef5f7; }#provider-lookup-widget#provider-lookup-widget .result-item .name { font-weight: 500; }#provider-lookup-widget#provider-lookup-widget .result-item .meta { font-size: 12px; color: var(--text-muted); margin-top: 2px; }#provider-lookup-widget#provider-lookup-widget .result-empty { padding: 14px 12px; font-size: 13px; color: var(--text-muted); text-align: center; }#provider-lookup-widget#provider-lookup-widget .result-empty a { color: var(--accent); cursor: pointer; text-decoration: underline; }#provider-lookup-widget#provider-lookup-widget button {
    font-family: var(--font);
    font-size: 14px;
    padding: 9px 16px;
    border-radius: var(--radius);
    border: 1px solid var(--border-strong);
    background: #fff;
    color: var(--text);
    cursor: pointer;
    font-weight: 500;
    transition: background 0.15s, border-color 0.15s;
  }#provider-lookup-widget#provider-lookup-widget button:hover { background: var(--surface); }#provider-lookup-widget#provider-lookup-widget button.primary { background: var(--accent); border-color: var(--accent); color: #fff; }#provider-lookup-widget#provider-lookup-widget button.primary:hover { background: var(--accent-hover); border-color: var(--accent-hover); }#provider-lookup-widget#provider-lookup-widget button.danger-text { background: transparent; border: none; color: var(--danger); padding: 4px 8px; font-size: 13px; }#provider-lookup-widget#provider-lookup-widget button.danger-text:hover { color: var(--danger-hover); background: transparent; }#provider-lookup-widget#provider-lookup-widget .items-list { margin-top: 16px; display: flex; flex-direction: column; gap: 8px; }#provider-lookup-widget#provider-lookup-widget .item-card {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 12px 14px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
  }#provider-lookup-widget#provider-lookup-widget .item-card.manual { background: var(--warning-bg); border-color: var(--warning-border); }#provider-lookup-widget#provider-lookup-widget .item-card-main { flex: 1; min-width: 0; }#provider-lookup-widget#provider-lookup-widget .item-card-name { font-weight: 500; font-size: 14px; }#provider-lookup-widget#provider-lookup-widget .item-card-meta { font-size: 13px; color: var(--text-muted); margin-top: 2px; }#provider-lookup-widget#provider-lookup-widget .item-card-badge {
    display: inline-block; font-size: 11px; padding: 2px 6px; border-radius: 3px;
    background: #e3a23a; color: #fff; margin-left: 6px;
    text-transform: uppercase; letter-spacing: 0.3px; font-weight: 600;
  }#provider-lookup-widget#provider-lookup-widget .manual-entry-box { background: #fff; border: 1px dashed var(--border-strong); border-radius: var(--radius); padding: 14px; margin-top: 10px; }#provider-lookup-widget#provider-lookup-widget .manual-entry-box h4 { margin: 0 0 10px; font-size: 14px; font-weight: 600; }#provider-lookup-widget#provider-lookup-widget .field-group { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 10px; margin-bottom: 10px; }#provider-lookup-widget#provider-lookup-widget .field-group.single { grid-template-columns: 1fr; }#provider-lookup-widget#provider-lookup-widget .actions-right { display: flex; justify-content: flex-end; gap: 8px; margin-top: 10px; }#provider-lookup-widget#provider-lookup-widget .loading-inline { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); font-size: 12px; color: var(--text-muted); }#provider-lookup-widget#provider-lookup-widget .zip-radius-row { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 10px; }#provider-lookup-widget#provider-lookup-widget .zip-radius-row > div { flex: 1 1 120px; min-width: 120px; }#provider-lookup-widget#provider-lookup-widget .help-text { font-size: 12px; color: var(--text-muted); margin-top: 4px; }#provider-lookup-widget#provider-lookup-widget .help-text a { color: var(--accent); cursor: pointer; }#provider-lookup-widget#provider-lookup-widget .warn-banner {
    background: #fff3cd; border: 1px solid #ffd866; color: #665300;
    padding: 8px 12px; border-radius: var(--radius); font-size: 13px;
    margin-bottom: 10px; display: none;
  }#provider-lookup-widget#provider-lookup-widget .warn-banner.visible { display: block; }`;
  document.head.appendChild(style);

  // ---- markup ----
  let container = document.getElementById('provider-lookup-widget') ||
                  document.querySelector('[data-provider-widget]');
  if (!container) {
    container = document.createElement('div');
    container.id = 'provider-lookup-widget';
    document.body.appendChild(container);
  }
  container.innerHTML = `<div class="prov-container">
  <p class="subtitle">Add any doctors you want to keep in-network. Search by name near a ZIP, or enter one manually.</p>

  <!-- ============ PROVIDERS ============ -->
  <div class="section" id="providers-section">
    <div class="section-header">
      <h2 class="section-title">Doctors &amp; Providers</h2>
      <span class="section-count" id="prov-count">0 of 10</span>
    </div>

    <div id="prov-search-block">
      <div class="warn-banner" id="prov-zip-warn">Enter a valid 5-digit ZIP above before searching.</div>
      <div class="zip-radius-row">
        <div>
          <label for="prov-zip">ZIP code</label>
          <input type="text" id="prov-zip" maxlength="5" placeholder="76104">
        </div>
        <div>
          <label for="prov-radius">Radius</label>
          <select id="prov-radius">
            <option value="10">10 miles</option>
            <option value="25" selected>25 miles</option>
            <option value="50">50 miles</option>
            <option value="100">100 miles</option>
          </select>
        </div>
      </div>

      <label for="prov-search">Search for a doctor</label>
      <div class="search-wrap">
        <input type="text" id="prov-search" placeholder="Doctor's last name, or first &amp; last" autocomplete="off">
        <div class="loading-inline" id="prov-loading" style="display:none;">Searching…</div>
        <div class="search-results" id="prov-results"></div>
      </div>
      <p class="help-text">Can't find your doctor? <a id="prov-manual-toggle">Enter them manually</a></p>
    </div>

    <div id="prov-type-block" style="display:none; margin-top:14px;">
      <label>Provider type</label>
      <select id="prov-type">
        <option value="Primary Care">Primary Care</option>
        <option value="Specialist">Specialist</option>
        <option value="Other">Other</option>
      </select>
      <div class="actions-right">
        <button type="button" id="prov-cancel">Cancel</button>
        <button type="button" class="primary" id="prov-add">Add doctor</button>
      </div>
    </div>

    <div id="prov-manual-block" class="manual-entry-box" style="display:none;">
      <h4>Manual provider entry</h4>
      <div class="field-group">
        <div>
          <label>First name</label>
          <input type="text" id="prov-manual-first">
        </div>
        <div>
          <label>Last name</label>
          <input type="text" id="prov-manual-last">
        </div>
      </div>
      <div class="field-group">
        <div>
          <label>Specialty (optional)</label>
          <input type="text" id="prov-manual-specialty" placeholder="e.g. Cardiology">
        </div>
        <div>
          <label>Provider type</label>
          <select id="prov-manual-type">
            <option value="Primary Care">Primary Care</option>
            <option value="Specialist">Specialist</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      <div class="field-group">
        <div>
          <label>City (optional)</label>
          <input type="text" id="prov-manual-city">
        </div>
        <div>
          <label>State (optional)</label>
          <input type="text" id="prov-manual-state" maxlength="2" placeholder="TX">
        </div>
      </div>
      <div class="actions-right">
        <button type="button" id="prov-manual-cancel">Cancel</button>
        <button type="button" class="primary" id="prov-manual-add">Add doctor</button>
      </div>
    </div>

    <div class="items-list" id="prov-list"></div>
  </div>

  <!-- Fallback placeholders so the widget still syncs when used standalone. -->
  <input type="hidden" name="providers_json">
  <input type="hidden" name="providers_summary">
</div>`;

  // ---- widget logic ----
  (function widgetMain() {
// ============================================================
// CONFIG
// ============================================================
const MAX_PROVIDERS = 10;
const DEBOUNCE_MS = 300;
const CT_BASE = 'https://clinicaltables.nlm.nih.gov/api/npi_idv/v3/search';
const ZIP_BASE = 'https://api.zippopotam.us/us';

// Output field-key mapping. Each output is written to the GHL field whose clean
// key matches — the field's Unique Key, surfaced as the input name= (and data-q)
// on the rendered form. We match by clean key only, with NO hardcoded field IDs,
// so this widget is snapshot-portable: drop it into any sub-account whose form
// has fields with these keys and it connects automatically.
// Override via window.PROV_CONFIG = { fieldKeys: { providers_summary: [...] } }.
const FIELD_KEYS = Object.assign({
  providers_json:    ['providers_json'],
  providers_summary: ['providers_summary']
}, (typeof window !== 'undefined' && window.PROV_CONFIG && window.PROV_CONFIG.fieldKeys) || {});

// ZIP dataset — reused from the OG doc-rx-lookup CDN (immutable per tag). Override
// for local dev by setting window.ZIP_DATASET_URL before this script runs.
const ZIP_DATASET_VERSION = 'v1.0.9';
const ZIP_DATASET_URL = (() => {
  if (typeof window !== 'undefined' && window.ZIP_DATASET_URL) return window.ZIP_DATASET_URL;
  if (typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return './dist/us-zips.json';
  }
  return `https://cdn.jsdelivr.net/gh/maxmethod/doc-rx-lookup@${ZIP_DATASET_VERSION}/dist/us-zips.json`;
})();

// ============================================================
// STATE
// ============================================================
const state = {
  providers: [],
  provPending: null,
  zipCoordCache: new Map(),
  zipDataset: null,
  zipDatasetPromise: null
};

// Gates the very first (bootstrap) sync. We hydrate state from any existing
// field value, then paint once WITHOUT writing back, so a prefilled field is
// never clobbered by the empty initial render. Flipped true after bootstrap;
// every user-driven render thereafter syncs normally (append, not replace).
let syncReady = false;

// ============================================================
// UTILITIES
// ============================================================
function debounce(fn, ms) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

function haversineMiles(lat1, lon1, lat2, lon2) {
  const R = 3958.8;
  const toRad = d => d * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat/2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon/2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

async function loadZipDataset() {
  if (state.zipDataset) return state.zipDataset;
  if (state.zipDatasetPromise) return state.zipDatasetPromise;
  state.zipDatasetPromise = (async () => {
    try {
      const res = await fetch(ZIP_DATASET_URL);
      if (!res.ok) throw new Error(`Dataset fetch returned ${res.status}`);
      state.zipDataset = await res.json();
      return state.zipDataset;
    } catch (e) {
      console.warn('ZIP dataset load failed, falling back to zippopotam per-lookup:', e);
      state.zipDataset = null;
      return null;
    }
  })();
  return state.zipDatasetPromise;
}

async function getZipCoordinates(zip) {
  if (!zip || !/^\d{5}$/.test(zip)) return null;
  if (state.zipCoordCache.has(zip)) return state.zipCoordCache.get(zip);

  const dataset = await loadZipDataset();
  if (dataset) {
    const row = dataset[zip];
    if (row) {
      const coords = { lat: row[0], lon: row[1], state: row[2], city: null };
      state.zipCoordCache.set(zip, coords);
      return coords;
    }
  }

  try {
    const res = await fetch(`${ZIP_BASE}/${zip}`);
    if (!res.ok) { state.zipCoordCache.set(zip, null); return null; }
    const data = await res.json();
    const place = data.places && data.places[0];
    if (!place) { state.zipCoordCache.set(zip, null); return null; }
    const coords = {
      lat: parseFloat(place.latitude),
      lon: parseFloat(place.longitude),
      state: place['state abbreviation'],
      city: place['place name']
    };
    state.zipCoordCache.set(zip, coords);
    return coords;
  } catch (e) {
    state.zipCoordCache.set(zip, null);
    return null;
  }
}

loadZipDataset();

function escapeHtml(s) {
  if (s == null) return '';
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

function toTitleCase(s) {
  if (!s) return '';
  return s.toLowerCase().replace(/\b([a-z])/g, (_, c) => c.toUpperCase());
}

// ============================================================
// PROVIDER SEARCH (Clinical Tables NPI)
// ============================================================
async function searchProviders(nameQuery, zip, radiusMiles) {
  if (!nameQuery || nameQuery.length < 2) return [];
  const center = await getZipCoordinates(zip);
  if (!center) return { error: 'Could not look up that ZIP code.' };

  const params = new URLSearchParams({
    terms: nameQuery,
    count: '50',
    q: `addr_practice.state:${center.state}`,
    ef: 'addr_practice,name.full,provider_type,licenses,provider_credential_text'
  });

  let data;
  try {
    const res = await fetch(`${CT_BASE}?${params.toString()}`);
    if (!res.ok) return { error: `Clinical Tables API returned ${res.status}` };
    data = await res.json();
  } catch (e) {
    return { error: 'Network error contacting NLM Clinical Tables.' };
  }

  const [, npis, extras] = data;
  if (!npis || npis.length === 0) return [];

  const addrs = (extras && extras['addr_practice']) || [];
  const names = (extras && extras['name.full']) || [];
  const types = (extras && extras['provider_type']) || [];
  const licenses = (extras && extras['licenses']) || [];
  const credentials = (extras && extras['provider_credential_text']) || [];

  const raw = npis.map((npi, i) => {
    const addr = addrs[i] || {};
    const licArr = licenses[i] || [];
    const primaryLic = licArr.find(l => l && l.is_primary_taxonomy === 'Y') || licArr[0] || null;
    const specialty = (primaryLic && primaryLic.taxonomy && primaryLic.taxonomy.classification) || null;
    const rawName = names[i] || '';
    const [lastRaw, firstRaw] = rawName.split(',').map(s => s.trim());
    return {
      npi,
      last_name: toTitleCase(lastRaw || ''),
      first_name: toTitleCase(firstRaw || ''),
      credential: credentials[i] || null,
      specialty,
      provider_type_raw: types[i] || null,
      address: {
        street: addr.line1 || null,
        street2: addr.line2 || null,
        city: addr.city ? toTitleCase(addr.city) : null,
        state: addr.state || null,
        zip: addr.zip || null
      }
    };
  });

  const withDist = [];
  const BATCH = 10;
  for (let i = 0; i < raw.length; i += BATCH) {
    const batch = raw.slice(i, i + BATCH);
    const results = await Promise.all(batch.map(async r => {
      if (!r.address.zip) return null;
      const coords = await getZipCoordinates(r.address.zip);
      if (!coords) return null;
      const dist = haversineMiles(center.lat, center.lon, coords.lat, coords.lon);
      if (dist > radiusMiles) return null;
      return { ...r, _distance: dist };
    }));
    withDist.push(...results.filter(Boolean));
    if (withDist.length >= 12) break;
  }

  withDist.sort((a, b) => a._distance - b._distance);
  return withDist.slice(0, 12);
}

const provSearchInput = document.getElementById('prov-search');
const provResults = document.getElementById('prov-results');
const provLoading = document.getElementById('prov-loading');
const provTypeBlock = document.getElementById('prov-type-block');
const provManualBlock = document.getElementById('prov-manual-block');
const provSearchBlock = document.getElementById('prov-search-block');
const provZipWarn = document.getElementById('prov-zip-warn');

const runProvSearch = debounce(async (q) => {
  const zip = document.getElementById('prov-zip').value.trim();
  const radius = parseInt(document.getElementById('prov-radius').value, 10);

  if (!q || q.length < 2) {
    provResults.classList.remove('open');
    provLoading.style.display = 'none';
    return;
  }
  if (!/^\d{5}$/.test(zip)) {
    provZipWarn.classList.add('visible');
    provResults.classList.remove('open');
    return;
  }
  provZipWarn.classList.remove('visible');
  provLoading.style.display = 'block';

  const results = await searchProviders(q, zip, radius);
  provLoading.style.display = 'none';

  if (results && results.error) {
    provResults.innerHTML = `<div class="result-empty">${escapeHtml(results.error)} <a id="prov-no-match-manual">Enter manually</a></div>`;
    provResults.classList.add('open');
    document.getElementById('prov-no-match-manual').onclick = () => {
      provResults.classList.remove('open');
      showProvManualEntry();
    };
    return;
  }

  if (!results || results.length === 0) {
    provResults.innerHTML = `<div class="result-empty">No providers found within ${radius} miles. <a id="prov-no-match-manual">Enter manually</a></div>`;
    provResults.classList.add('open');
    document.getElementById('prov-no-match-manual').onclick = () => {
      provResults.classList.remove('open');
      showProvManualEntry();
    };
    return;
  }

  provResults.innerHTML = results.map((r, i) => {
    const name = [r.first_name, r.last_name].filter(Boolean).join(' ');
    const credential = r.credential ? `, ${r.credential}` : '';
    const specialty = r.specialty || r.provider_type_raw || '';
    const cityState = [r.address.city, r.address.state].filter(Boolean).join(', ');
    return `
      <div class="result-item" data-idx="${i}">
        <div class="name">${escapeHtml(name)}${escapeHtml(credential)}</div>
        <div class="meta">${escapeHtml(specialty)} · ${escapeHtml(cityState)} · ${r._distance.toFixed(1)} mi · NPI ${escapeHtml(r.npi)}</div>
      </div>
    `;
  }).join('');
  provResults.classList.add('open');

  provResults.querySelectorAll('.result-item').forEach(el => {
    const idx = parseInt(el.dataset.idx, 10);
    el.onclick = () => selectProvider(results[idx]);
  });
}, DEBOUNCE_MS);

provSearchInput.addEventListener('input', (e) => runProvSearch(e.target.value.trim()));
document.getElementById('prov-zip').addEventListener('input', () => {
  const zip = document.getElementById('prov-zip').value.trim();
  if (/^\d{5}$/.test(zip)) provZipWarn.classList.remove('visible');
});

document.addEventListener('click', (e) => {
  if (!provSearchInput.contains(e.target) && !provResults.contains(e.target)) {
    provResults.classList.remove('open');
  }
});

function selectProvider(ctResult) {
  provResults.classList.remove('open');
  provSearchInput.value = [ctResult.first_name, ctResult.last_name].filter(Boolean).join(' ');
  state.provPending = ctResult;

  const spec = (ctResult.specialty || '').toLowerCase();
  const primaryKeywords = ['family medicine', 'internal medicine', 'general practice', 'pediatrics', 'primary care'];
  const select = document.getElementById('prov-type');
  if (primaryKeywords.some(k => spec.includes(k))) select.value = 'Primary Care';
  else select.value = 'Specialist';

  provTypeBlock.style.display = 'block';
  provSearchBlock.style.display = 'none';
}

document.getElementById('prov-cancel').onclick = resetProvSearch;

document.getElementById('prov-add').onclick = () => {
  if (!state.provPending) return;
  const r = state.provPending;
  const fullName = [r.first_name, r.last_name].filter(Boolean).join(' ');
  const displayName = r.credential ? `${fullName}, ${r.credential}` : fullName;

  const entry = {
    id: `prov_${Date.now()}`,
    full_name: displayName,
    first_name: r.first_name || null,
    last_name: r.last_name || null,
    npi: r.npi,
    specialty: r.specialty || r.provider_type_raw || null,
    provider_type: document.getElementById('prov-type').value,
    address: { street: r.address.street, street2: r.address.street2, city: r.address.city, state: r.address.state, zip: r.address.zip },
    source: 'clinicaltables'
  };
  state.providers.push(entry);
  renderProviders();
  resetProvSearch();
};

function resetProvSearch() {
  state.provPending = null;
  provSearchInput.value = '';
  provTypeBlock.style.display = 'none';
  provSearchBlock.style.display = 'block';
  provManualBlock.style.display = 'none';
}

function showProvManualEntry() {
  provSearchBlock.style.display = 'none';
  provTypeBlock.style.display = 'none';
  provManualBlock.style.display = 'block';
}

document.getElementById('prov-manual-toggle').onclick = (e) => { e.preventDefault(); showProvManualEntry(); };
document.getElementById('prov-manual-cancel').onclick = resetProvSearch;

document.getElementById('prov-manual-add').onclick = () => {
  const first = document.getElementById('prov-manual-first').value.trim();
  const last = document.getElementById('prov-manual-last').value.trim();
  if (!first || !last) { alert('First and last name are required.'); return; }
  const entry = {
    id: `prov_${Date.now()}`,
    full_name: `${first} ${last}`,
    first_name: first,
    last_name: last,
    npi: null,
    specialty: document.getElementById('prov-manual-specialty').value.trim() || null,
    provider_type: document.getElementById('prov-manual-type').value,
    address: {
      street: null, street2: null,
      city: document.getElementById('prov-manual-city').value.trim() || null,
      state: document.getElementById('prov-manual-state').value.trim().toUpperCase() || null,
      zip: null
    },
    source: 'manual'
  };
  state.providers.push(entry);
  ['prov-manual-first','prov-manual-last','prov-manual-specialty','prov-manual-city','prov-manual-state']
    .forEach(id => document.getElementById(id).value = '');
  renderProviders();
  resetProvSearch();
};

function renderProviders() {
  const list = document.getElementById('prov-list');
  const count = state.providers.length;
  document.getElementById('prov-count').textContent = `${count} of ${MAX_PROVIDERS}`;

  list.innerHTML = state.providers.map(p => {
    const spec = p.specialty ? `${escapeHtml(p.specialty)} (${escapeHtml(p.provider_type)})` : escapeHtml(p.provider_type);
    const cityState = [p.address.city, p.address.state].filter(Boolean).join(', ');
    const manualBadge = p.source === 'manual' ? '<span class="item-card-badge">Manual</span>' : '';
    return `
      <div class="item-card ${p.source === 'manual' ? 'manual' : ''}">
        <div class="item-card-main">
          <div class="item-card-name">${escapeHtml(p.full_name)}${manualBadge}</div>
          <div class="item-card-meta">${spec}${cityState ? ' · ' + escapeHtml(cityState) : ''}</div>
        </div>
        <button class="danger-text" data-remove-prov="${p.id}">Remove</button>
      </div>
    `;
  }).join('');

  list.querySelectorAll('[data-remove-prov]').forEach(btn => {
    btn.onclick = () => {
      state.providers = state.providers.filter(p => p.id !== btn.dataset.removeProv);
      renderProviders();
    };
  });

  if (count >= MAX_PROVIDERS) {
    provSearchBlock.style.display = 'none';
    provTypeBlock.style.display = 'none';
    provManualBlock.style.display = 'none';
  } else if (!state.provPending && provManualBlock.style.display === 'none') {
    provSearchBlock.style.display = 'block';
  }

  syncHiddenFields();
}

// ============================================================
// JSON + SUMMARY BUILDERS
// ============================================================
function buildProvidersJson() {
  return JSON.stringify({
    version: '1.0',
    count: state.providers.length,
    items: state.providers.map(p => ({
      id: p.id, full_name: p.full_name,
      first_name: p.first_name, last_name: p.last_name,
      npi: p.npi, specialty: p.specialty, provider_type: p.provider_type,
      address: p.address, source: p.source
    }))
  });
}

function buildProvidersSummary() {
  if (state.providers.length === 0) return '';
  const lines = [`PROVIDERS (${state.providers.length})`, ''];
  for (const p of state.providers) {
    const spec = p.specialty ? `${p.specialty} (${p.provider_type})` : p.provider_type;
    lines.push(`• ${p.full_name} — ${spec}`);
    const addrParts = [p.address.street, p.address.city, p.address.state, p.address.zip].filter(Boolean);
    if (addrParts.length > 0) lines.push(`  ${addrParts.join(', ')}`);
    if (p.source === 'manual') lines.push('  [manually entered]');
    lines.push('');
  }
  return lines.join('\n').trim();
}

function syncHiddenFields() {
  if (!syncReady) return; // skip the bootstrap write so hydrate can't be clobbered
  const setAll = (keys, value) => {
    for (const key of (Array.isArray(keys) ? keys : [keys])) {
      if (!key) continue;
      const selector = `[name="${key}"], [data-q="${key}"]`;
      document.querySelectorAll(selector).forEach(el => {
        el.value = value;
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
      });
    }
  };
  setAll(FIELD_KEYS.providers_json,    buildProvidersJson());
  setAll(FIELD_KEYS.providers_summary, buildProvidersSummary());
}

// ============================================================
// PRIMARY COLOR INHERITANCE
// ------------------------------------------------------------
// Resolution order (first valid wins):
//   1. window.<WIDGET>_CONFIG.primaryColor — explicit JS override
//   2. data-primary-color on the container. In GHL set this to the literal
//      {{custom_values.brand_primary_color}} — GHL substitutes the account's
//      brand color server-side (works on both forms and surveys).
//   3. Auto-detect: GHL form submit-button bg, then survey Next-button color.
//   4. Fallback: the widget's default --accent (#1e4d8c).
// Unresolved {{...}} merge tags are ignored (see isValidColor).
// ============================================================
function isValidColor(v) {
  if (!v || typeof v !== 'string') return false;
  const s = v.trim();
  if (!s) return false;
  if (s.includes('{{') || s.includes('}}')) return false;
  return /^#[0-9a-f]{3,8}$/i.test(s) || /^rgba?\(/i.test(s);
}

function applyPrimaryColor() {
  const widget = document.getElementById('provider-lookup-widget');
  if (!widget) return;
  let color = null;
  if (typeof window !== 'undefined' && window.PROV_CONFIG && isValidColor(window.PROV_CONFIG.primaryColor)) {
    color = window.PROV_CONFIG.primaryColor;
  } else if (widget.dataset && isValidColor(widget.dataset.primaryColor)) {
    color = widget.dataset.primaryColor;
  } else {
    // No explicit color set — auto-detect the host's brand color.
    // Form-style: GHL forms put the brand color inline on the submit button bg.
    const formBtn = document.querySelector('button[type="submit"]');
    if (formBtn && isValidColor(formBtn.style.backgroundColor)) {
      color = formBtn.style.backgroundColor;
    }
    // Survey-style: the footer Next/Submit button. Prefer a filled background,
    // else fall back to the (brand-colored) text color GHL uses by default.
    if (!color) {
      const surveyBtn = document.querySelector(
        '.ghl-footer-next, .ghl-footer-previous, .ghl-footer-preview, .ghl-footer .ghl-btn'
      );
      if (surveyBtn) {
        const s = getComputedStyle(surveyBtn);
        const transparent = ['rgba(0, 0, 0, 0)', 'transparent', ''];
        const skipColors = [
          'rgb(0, 0, 0)', 'rgba(0, 0, 0, 0)', 'rgb(96, 113, 121)',
          'rgb(255, 255, 255)', 'rgba(255, 255, 255, 1)'
        ];
        const bg = s.backgroundColor;
        const fg = s.color;
        if (bg && !transparent.includes(bg) && !skipColors.includes(bg)) {
          color = bg;
        } else if (fg && !skipColors.includes(fg) && isValidColor(fg)) {
          color = fg;
        }
      }
    }
  }
  if (!color) return;
  const hex8 = color.match(/^#([0-9a-f]{8})$/i);
  if (hex8) color = '#' + hex8[1].substring(0, 6);
  widget.style.setProperty('--accent', color);
  widget.style.setProperty('--accent-hover', darken(color, 0.12));
}

function darken(color, amount) {
  let r, g, b;
  const hex = color.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  const rgb = color.match(/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/i);
  if (hex) {
    const h = hex[1].length === 3 ? hex[1].split('').map(c => c + c).join('') : hex[1];
    r = parseInt(h.slice(0, 2), 16); g = parseInt(h.slice(2, 4), 16); b = parseInt(h.slice(4, 6), 16);
  } else if (rgb) { r = +rgb[1]; g = +rgb[2]; b = +rgb[3]; } else { return color; }
  const d = v => Math.max(0, Math.round(v * (1 - amount))).toString(16).padStart(2, '0');
  return '#' + d(r) + d(g) + d(b);
}

// ============================================================
// HYDRATE — seed state from an existing field so selections APPEND
// ------------------------------------------------------------
// Reads the providers_json we previously wrote (round-trip safe), so a contact
// re-entering the funnel keeps their prior doctors instead of losing them. Bad
// or empty values are ignored. Dedups so a reload can't double an entry.
// ============================================================
function readFieldValue(keys) {
  // Scan ALL matches and return the first NON-EMPTY value. The widget injects its
  // own empty <input name="providers_json"> mirror, which is first in document
  // order — skipping empties lets us read GHL's prefilled [data-q] field instead.
  for (const key of (Array.isArray(keys) ? keys : [keys])) {
    if (!key) continue;
    const els = document.querySelectorAll(`[name="${key}"], [data-q="${key}"]`);
    for (const el of els) {
      if (el && el.value && el.value.trim()) return el.value;
    }
  }
  return '';
}

// Fallback hydration seed for RETURNING contacts (option C). GHL resolves a merge
// tag into the page and the widget reads it WITHOUT putting PHI in the URL.
// Unresolved {{...}} tags and empty values are ignored (falls through to empty).
// Preferred wiring on the embed page = a sibling JSON script element with
// type="application/json" and id="provider-lookup-widget-seed" whose text is
// {{ contact.custom.providers_json }}, placed BEFORE the embed script element.
// (Quote-safe: JSON in a script text node can't break the HTML the way a data-*
// attribute does — that attribute path was removed in v2.3.0.)
// NOTE: on GHL funnel/survey pages {{ contact.custom.* }} resolves from the
// visitor's local-storage of a PRIOR submission on that funnel (same browser) —
// it is NOT a cross-device / server-side-by-identity lookup.
function readInitialSeed() {
  const clean = v => {
    if (typeof v !== 'string') return '';
    const s = v.trim();
    if (!s || s.indexOf('{{') !== -1 || s.indexOf('}}') !== -1) return '';
    return s;
  };
  // Source 1 (PREFERRED, quote-safe): JSON inside a <script type="application/json"> tag.
  const seedTag = document.getElementById('provider-lookup-widget-seed');
  if (seedTag) {
    const s = clean(seedTag.textContent);
    if (s) return s;
  }
  // Source 2: explicit JS-global override.
  const cfg = (typeof window !== 'undefined' && window.PROV_CONFIG) || {};
  return clean(cfg.initialProviders);
}

function hydrateFromField() {
  try {
    const raw = readFieldValue(FIELD_KEYS.providers_json) || readInitialSeed();
    if (!raw) return;
    const parsed = JSON.parse(raw);
    const items = parsed && Array.isArray(parsed.items) ? parsed.items : null;
    if (!items) return;
    const keyOf = p => [p.npi, p.full_name, p.address && p.address.city, p.address && p.address.state].join('|');
    const seen = new Set(state.providers.map(keyOf));
    items.forEach((it, i) => {
      if (!it) return;
      const p = {
        id: String(it.id != null ? it.id : 'hydrated-' + i),
        full_name: it.full_name || [it.first_name, it.last_name].filter(Boolean).join(' '),
        first_name: it.first_name || null,
        last_name: it.last_name || null,
        npi: it.npi || null,
        specialty: it.specialty || null,
        provider_type: it.provider_type || 'Provider',
        address: it.address && typeof it.address === 'object' ? it.address : {},
        source: it.source || 'lookup'
      };
      if (!p.full_name) return;
      const k = keyOf(p);
      if (seen.has(k)) return;
      seen.add(k);
      state.providers.push(p);
    });
    if (state.providers.length > MAX_PROVIDERS) state.providers.length = MAX_PROVIDERS;
  } catch (e) { /* ignore malformed existing value */ }
}

applyPrimaryColor();
hydrateFromField();
renderProviders();
syncReady = true;
  })();
})();
