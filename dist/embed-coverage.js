/**
 * current-coverage embed bootstrap
 * Generated from current-coverage-lookup.html by scripts/build-embed.js — do not hand-edit.
 *
 * Drop into a GHL funnel page (Custom Code element) with:
 *   <div id="coverage-lookup-widget" data-primary-color="{{custom_values.brand_primary_color}}"></div>
 *   <script src="https://cdn.jsdelivr.net/gh/maxmethod/doc-rx-lookup@vX.Y.Z/dist/embed-coverage.js"></script>
 *
 * Or omit the <div> and the script appends the widget to <body>.
 */
(function () {
  if (window.__coverageWidgetEmbedLoaded) return;
  window.__coverageWidgetEmbedLoaded = true;

  // ---- styles ----
  const style = document.createElement('style');
  style.setAttribute('data-coverage-lookup', 'styles');
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
  }#coverage-lookup-widget#coverage-lookup-widget * { box-sizing: border-box; }#coverage-lookup-widget#coverage-lookup-widget .cov-container {
    max-width: 100%;
    margin: 0;
    font-family: var(--font);
    color: var(--text);
    font-size: 15px;
    line-height: 1.5;
  }#coverage-lookup-widget#coverage-lookup-widget h1 { font-size: 22px; line-height: 1.3; margin: 0 0 4px; font-weight: 600; }#coverage-lookup-widget#coverage-lookup-widget .subtitle { color: var(--text-muted); margin-bottom: 28px; font-size: 14px; }#coverage-lookup-widget#coverage-lookup-widget .section {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 20px;
    margin-bottom: 20px;
  }#coverage-lookup-widget#coverage-lookup-widget .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }#coverage-lookup-widget#coverage-lookup-widget .section-title { font-size: 16px; font-weight: 600; margin: 0; }#coverage-lookup-widget#coverage-lookup-widget .section-count { color: var(--text-muted); font-size: 13px; }#coverage-lookup-widget#coverage-lookup-widget label { display: block; font-size: 13px; font-weight: 500; margin-bottom: 6px; color: var(--text); }#coverage-lookup-widget#coverage-lookup-widget input[type="text"], #coverage-lookup-widget#coverage-lookup-widget input[type="date"], #coverage-lookup-widget#coverage-lookup-widget select {
    width: 100%;
    padding: 9px 12px;
    font-size: 14px;
    font-family: var(--font);
    border: 1px solid var(--border-strong);
    border-radius: var(--radius);
    background: #fff;
    color: var(--text);
    transition: border-color 0.15s, box-shadow 0.15s;
  }#coverage-lookup-widget#coverage-lookup-widget input:focus, #coverage-lookup-widget#coverage-lookup-widget select:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 25%, transparent);
  }#coverage-lookup-widget#coverage-lookup-widget button {
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
  }#coverage-lookup-widget#coverage-lookup-widget button:hover { background: var(--surface); }#coverage-lookup-widget#coverage-lookup-widget button.primary { background: var(--accent); border-color: var(--accent); color: #fff; }#coverage-lookup-widget#coverage-lookup-widget button.primary:hover { background: var(--accent-hover); border-color: var(--accent-hover); }#coverage-lookup-widget#coverage-lookup-widget button.danger-text { background: transparent; border: none; color: var(--danger); padding: 4px 8px; font-size: 13px; }#coverage-lookup-widget#coverage-lookup-widget button.danger-text:hover { color: var(--danger-hover); background: transparent; }#coverage-lookup-widget#coverage-lookup-widget .items-list { margin-top: 16px; display: flex; flex-direction: column; gap: 8px; }#coverage-lookup-widget#coverage-lookup-widget .item-card {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 12px 14px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
  }#coverage-lookup-widget#coverage-lookup-widget .item-card-main { flex: 1; min-width: 0; }#coverage-lookup-widget#coverage-lookup-widget .item-card-name { font-weight: 500; font-size: 14px; }#coverage-lookup-widget#coverage-lookup-widget .item-card-meta { font-size: 13px; color: var(--text-muted); margin-top: 2px; }#coverage-lookup-widget#coverage-lookup-widget .add-box { background: #fff; border: 1px dashed var(--border-strong); border-radius: var(--radius); padding: 14px; }#coverage-lookup-widget#coverage-lookup-widget .add-box h4 { margin: 0 0 10px; font-size: 14px; font-weight: 600; }#coverage-lookup-widget#coverage-lookup-widget .field-group { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 10px; margin-bottom: 10px; }#coverage-lookup-widget#coverage-lookup-widget .field-group.single { grid-template-columns: 1fr; }#coverage-lookup-widget#coverage-lookup-widget .actions-right { display: flex; justify-content: flex-end; gap: 8px; margin-top: 10px; }#coverage-lookup-widget#coverage-lookup-widget .help-text { font-size: 12px; color: var(--text-muted); margin-top: 4px; }#coverage-lookup-widget#coverage-lookup-widget .empty-note { font-size: 13px; color: var(--text-muted); font-style: italic; padding: 6px 0 0; }#coverage-lookup-widget#coverage-lookup-widget .warn-banner {
    background: #fff3cd; border: 1px solid #ffd866; color: #665300;
    padding: 8px 12px; border-radius: var(--radius); font-size: 13px;
    margin-bottom: 10px; display: none;
  }#coverage-lookup-widget#coverage-lookup-widget .warn-banner.visible { display: block; }`;
  document.head.appendChild(style);

  // ---- markup ----
  let container = document.getElementById('coverage-lookup-widget') ||
                  document.querySelector('[data-coverage-widget]');
  if (!container) {
    container = document.createElement('div');
    container.id = 'coverage-lookup-widget';
    document.body.appendChild(container);
  }
  container.innerHTML = `<div class="cov-container">
  <p class="subtitle">List coverage that any applicant or dependent has. (Fill out this section if you currently have health insurance even if it is ending.) Add one entry per plan.</p>

  <!-- ============ CURRENT COVERAGE ============ -->
  <div class="section" id="coverage-section">
    <div class="section-header">
      <h2 class="section-title">Coverage on file</h2>
      <span class="section-count" id="cov-count">0 of 15</span>
    </div>

    <div class="add-box" id="cov-add-box">
      <h4>Add a coverage entry</h4>
      <div class="warn-banner" id="cov-warn">Choose a coverage type before adding.</div>

      <div class="field-group">
        <div>
          <label for="cov-type">Coverage Type</label>
          <select id="cov-type">
            <option value="">Select…</option>
            <option value="Employer">Employer</option>
            <option value="Individual">Individual</option>
            <option value="Medicare">Medicare</option>
            <option value="VA Benefits">VA Benefits</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label for="cov-company">Insurance Company</label>
          <input type="text" id="cov-company" placeholder="e.g. Blue Cross Blue Shield" autocomplete="off">
        </div>
      </div>

      <div class="field-group">
        <div>
          <label for="cov-start">Start Date</label>
          <input type="date" id="cov-start">
        </div>
        <div>
          <label for="cov-end">End Date</label>
          <input type="date" id="cov-end">
          <p class="help-text">Leave blank if coverage is ongoing.</p>
        </div>
      </div>

      <div class="field-group single">
        <div>
          <label for="cov-who">Who does this cover? (optional)</label>
          <input type="text" id="cov-who" placeholder="e.g. John Smith / Whole household" autocomplete="off">
        </div>
      </div>

      <div class="actions-right">
        <button type="button" id="cov-clear">Clear</button>
        <button type="button" class="primary" id="cov-add">Add coverage</button>
      </div>
    </div>

    <div class="items-list" id="cov-list"></div>
    <p class="empty-note" id="cov-empty">No coverage added yet.</p>
  </div>

  <!-- Fallback placeholders so the widget still syncs when used standalone. -->
  <input type="hidden" name="current_coverage_json">
  <input type="hidden" name="current_coverage_summary">
</div>`;

  // ---- widget logic ----
  (function widgetMain() {
// ============================================================
// CONFIG
// ============================================================
const MAX_COVERAGES = 15;

// Output field-key mapping. Each output is written to the GHL field whose clean
// key matches — the field's Unique Key, surfaced as the input name= (and data-q)
// on the rendered form. We match by clean key only, with NO hardcoded field IDs,
// so this widget is snapshot-portable: drop it into any sub-account whose form
// has fields with these keys and it connects automatically.
// Override via window.COVERAGE_CONFIG = { fieldKeys: { current_coverage_summary: [...] } }.
const FIELD_KEYS = Object.assign({
  current_coverage_json:    ['current_coverage_json'],
  current_coverage_summary: ['current_coverage_summary']
}, (typeof window !== 'undefined' && window.COVERAGE_CONFIG && window.COVERAGE_CONFIG.fieldKeys) || {});

// ============================================================
// STATE
// ============================================================
const state = {
  coverages: []   // { id, coverage_type, insurance_company, start_date, end_date, who_covered }
};

// Gates the very first (bootstrap) sync. We hydrate state from any existing
// field value, then paint once WITHOUT writing back, so a prefilled field is
// never clobbered by the empty initial render. Flipped true after bootstrap;
// every user-driven render thereafter syncs normally (append, not replace).
let syncReady = false;

// ============================================================
// UTILITIES
// ============================================================
function escapeHtml(s) {
  if (s == null) return '';
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

// "2024-01-15" (from <input type=date>) -> "01/15/2024". Passes through anything else.
function formatDate(val) {
  if (!val) return '';
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(val);
  return m ? `${m[2]}/${m[3]}/${m[1]}` : val;
}

function formatPeriod(start, end) {
  const s = formatDate(start);
  const e = formatDate(end);
  if (s && e) return `${s} – ${e}`;
  if (s) return `${s} – present`;
  if (e) return `until ${e}`;
  return '';
}

// ============================================================
// ADD / REMOVE
// ============================================================
const els = {
  type:    document.getElementById('cov-type'),
  company: document.getElementById('cov-company'),
  start:   document.getElementById('cov-start'),
  end:     document.getElementById('cov-end'),
  who:     document.getElementById('cov-who'),
  warn:    document.getElementById('cov-warn'),
  addBox:  document.getElementById('cov-add-box')
};

els.type.addEventListener('change', () => {
  if (els.type.value) els.warn.classList.remove('visible');
});

function clearAddForm() {
  els.type.value = '';
  els.company.value = '';
  els.start.value = '';
  els.end.value = '';
  els.who.value = '';
  els.warn.classList.remove('visible');
}

document.getElementById('cov-clear').onclick = clearAddForm;

document.getElementById('cov-add').onclick = () => {
  const coverage_type = els.type.value;
  if (!coverage_type) {
    els.warn.classList.add('visible');
    els.type.focus();
    return;
  }
  const entry = {
    id: `cov_${Date.now()}`,
    coverage_type,
    insurance_company: els.company.value.trim() || null,
    start_date:        els.start.value || null,
    end_date:          els.end.value || null,
    who_covered:       els.who.value.trim() || null
  };
  state.coverages.push(entry);
  clearAddForm();
  renderCoverages();
  els.type.focus();
};

function renderCoverages() {
  const list = document.getElementById('cov-list');
  const count = state.coverages.length;
  document.getElementById('cov-count').textContent = `${count} of ${MAX_COVERAGES}`;
  document.getElementById('cov-empty').style.display = count === 0 ? 'block' : 'none';

  list.innerHTML = state.coverages.map(c => {
    const metaParts = [];
    if (c.insurance_company) metaParts.push(escapeHtml(c.insurance_company));
    const period = formatPeriod(c.start_date, c.end_date);
    if (period) metaParts.push(escapeHtml(period));
    return `
      <div class="item-card">
        <div class="item-card-main">
          <div class="item-card-name">${escapeHtml(c.coverage_type)}</div>
          ${metaParts.length ? `<div class="item-card-meta">${metaParts.join(' · ')}</div>` : ''}
          ${c.who_covered ? `<div class="item-card-meta">Covers: ${escapeHtml(c.who_covered)}</div>` : ''}
        </div>
        <button class="danger-text" data-remove-cov="${c.id}">Remove</button>
      </div>
    `;
  }).join('');

  list.querySelectorAll('[data-remove-cov]').forEach(btn => {
    btn.onclick = () => {
      state.coverages = state.coverages.filter(c => c.id !== btn.dataset.removeCov);
      renderCoverages();
    };
  });

  els.addBox.style.display = count >= MAX_COVERAGES ? 'none' : 'block';

  syncHiddenFields();
}

// ============================================================
// JSON + SUMMARY BUILDERS
// ============================================================
function buildCoverageJson() {
  return JSON.stringify({
    version: '1.0',
    count: state.coverages.length,
    items: state.coverages.map(c => ({
      id: c.id,
      coverage_type: c.coverage_type,
      insurance_company: c.insurance_company,
      start_date: c.start_date,
      end_date: c.end_date,
      who_covered: c.who_covered
    }))
  });
}

function buildCoverageSummary() {
  if (state.coverages.length === 0) return '';
  const lines = [`CURRENT COVERAGE (${state.coverages.length})`, ''];
  for (const c of state.coverages) {
    let head = `• ${c.coverage_type}`;
    if (c.insurance_company) head += ` — ${c.insurance_company}`;
    lines.push(head);
    const detail = [];
    const period = formatPeriod(c.start_date, c.end_date);
    if (period) detail.push(period);
    if (c.who_covered) detail.push(`covers ${c.who_covered}`);
    if (detail.length) lines.push(`  ${detail.join(' · ')}`);
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
  setAll(FIELD_KEYS.current_coverage_json,    buildCoverageJson());
  setAll(FIELD_KEYS.current_coverage_summary, buildCoverageSummary());
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
  const widget = document.getElementById('coverage-lookup-widget');
  if (!widget) return;
  let color = null;
  if (typeof window !== 'undefined' && window.COVERAGE_CONFIG && isValidColor(window.COVERAGE_CONFIG.primaryColor)) {
    color = window.COVERAGE_CONFIG.primaryColor;
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
// HYDRATE — seed state from an existing field so entries APPEND
// ------------------------------------------------------------
// Reads the current_coverage_json we previously wrote (round-trip safe), so a
// contact re-entering the funnel keeps prior coverage instead of losing it. Bad
// or empty values are ignored. Dedups so a reload can't double an entry.
// ============================================================
function readFieldValue(keys) {
  // Scan ALL matches and return the first NON-EMPTY value. The widget injects its
  // own empty <input name="current_coverage_json"> mirror, which is first in doc
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

function hydrateFromField() {
  try {
    const raw = readFieldValue(FIELD_KEYS.current_coverage_json);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    const items = parsed && Array.isArray(parsed.items) ? parsed.items : null;
    if (!items) return;
    const keyOf = c => [c.coverage_type, c.insurance_company, c.start_date, c.end_date, c.who_covered].join('|');
    const seen = new Set(state.coverages.map(keyOf));
    items.forEach((it, i) => {
      if (!it || !it.coverage_type) return;
      const c = {
        id: String(it.id != null ? it.id : 'hydrated-' + i),
        coverage_type: it.coverage_type,
        insurance_company: it.insurance_company || null,
        start_date: it.start_date || null,
        end_date: it.end_date || null,
        who_covered: it.who_covered || null
      };
      const k = keyOf(c);
      if (seen.has(k)) return;
      seen.add(k);
      state.coverages.push(c);
    });
    if (state.coverages.length > MAX_COVERAGES) state.coverages.length = MAX_COVERAGES;
  } catch (e) { /* ignore malformed existing value */ }
}

applyPrimaryColor();
hydrateFromField();
renderCoverages();
syncReady = true;
  })();
})();
