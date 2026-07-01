#!/usr/bin/env node
// Build the self-bootstrapping single-file embed(s). Each widget compiles to one
// dist/*.js file: users paste a <script> tag into a GHL Custom Code block and it
// injects styles + markup + logic into the page.
//
// Usage:
//   node scripts/build-embed.js            # build every widget
//   node scripts/build-embed.js providers  # build only one (providers | medications | coverage | income)

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// One entry per widget. scope/containerId/guard/configGlobal must be unique so
// two embeds can coexist on the same GHL page without colliding.
const WIDGETS = {
  medications: {
    input: 'medications-lookup.html',
    output: 'dist/embed-medications.js',
    containerId: 'medications-lookup-widget',
    dataAttr: 'data-medications-widget',
    styleAttr: 'data-medications-lookup',
    guard: '__medsLookupEmbedLoaded',
    label: 'medications-lookup'
  },
  providers: {
    input: 'provider-lookup.html',
    output: 'dist/embed-providers.js',
    containerId: 'provider-lookup-widget',
    dataAttr: 'data-provider-widget',
    styleAttr: 'data-provider-lookup',
    guard: '__provLookupEmbedLoaded',
    label: 'provider-lookup'
  },
  coverage: {
    input: 'current-coverage-lookup.html',
    output: 'dist/embed-coverage.js',
    containerId: 'coverage-lookup-widget',
    dataAttr: 'data-coverage-widget',
    styleAttr: 'data-coverage-lookup',
    guard: '__coverageWidgetEmbedLoaded',
    label: 'current-coverage'
  },
  income: {
    input: 'income-sources.html',
    output: 'dist/embed-income.js',
    containerId: 'income-sources-widget',
    dataAttr: 'data-income-widget',
    styleAttr: 'data-income-sources',
    guard: '__incomeSourcesEmbedLoaded',
    label: 'income-sources'
  }
};

// Scope every selector to #<containerId> so the widget's CSS cannot leak out and
// affect the host page. We DOUBLE the scope id (#x#x) to bump specificity above
// typical host-page form-framework rules — the cheapest way to win the cascade
// against e.g. GHL's .hl-form-input styles without resorting to !important. Two
// ID selectors on the same element is valid CSS and doubles the specificity
// weight. Keeps :root custom-property declarations global; drops body/html rules.
function scopeCss(css, scope) {
  css = css.replace(/\/\*[\s\S]*?\*\//g, '');  // strip CSS comments so they can't be swept into a scoped selector
  const compound = `${scope}${scope}`;
  return css.replace(/([^{}]+)\{([^{}]*)\}/g, (match, selector, body) => {
    const sel = selector.trim();
    if (sel === ':root') return `${sel} {${body}}`;
    if (sel === 'body' || sel === 'html' || sel === 'html, body') return '';
    const scoped = sel.split(',').map(part => {
      const trimmed = part.trim();
      if (!trimmed) return trimmed;
      if (trimmed.startsWith(scope)) return trimmed;
      return `${compound} ${trimmed}`;
    }).join(', ');
    return `${scoped} {${body}}`;
  });
}

const escapeForTemplate = s =>
  s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');

function build(widget) {
  const input = path.resolve(ROOT, widget.input);
  const output = path.resolve(ROOT, widget.output);
  const html = fs.readFileSync(input, 'utf8');
  const scope = `#${widget.containerId}`;

  const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
  if (!styleMatch) throw new Error(`[${widget.label}] Could not find <style> block`);
  const css = scopeCss(styleMatch[1].trim(), scope);

  const bodyMatch = html.match(/<body>([\s\S]*?)<\/body>/);
  if (!bodyMatch) throw new Error(`[${widget.label}] Could not find <body> block`);
  let body = bodyMatch[1].trim();

  // GREEDY match to the LAST </script> so a literal </script> inside a JS comment
  // or string (e.g. documenting embed usage) can't truncate the extraction. The
  // widget body must contain exactly one <script> block for this to be correct.
  const scriptMatch = body.match(/<script>([\s\S]*)<\/script>/);
  if (!scriptMatch) throw new Error(`[${widget.label}] Could not find <script> block in body`);
  const js = scriptMatch[1].trim();
  body = body.replace(scriptMatch[0], '').trim();
  if (/<script/i.test(body)) throw new Error(`[${widget.label}] Extra <script> found in markup after extraction — the widget must contain exactly ONE <script> block (a literal </script> in a comment/string can also trigger this).`);

  const embed = `/**
 * ${widget.label} embed bootstrap
 * Generated from ${widget.input} by scripts/build-embed.js — do not hand-edit.
 *
 * Drop into a GHL funnel page (Custom Code element) with:
 *   <div id="${widget.containerId}" data-primary-color="{{custom_values.brand_primary_color}}"></div>
 *   <script src="https://cdn.jsdelivr.net/gh/maxmethod/doc-rx-lookup@vX.Y.Z/${widget.output}"></script>
 *
 * Or omit the <div> and the script appends the widget to <body>.
 */
(function () {
  if (window.${widget.guard}) return;
  window.${widget.guard} = true;

  // ---- styles ----
  const style = document.createElement('style');
  style.setAttribute('${widget.styleAttr}', 'styles');
  style.textContent = \`${escapeForTemplate(css)}\`;
  document.head.appendChild(style);

  // ---- markup ----
  let container = document.getElementById('${widget.containerId}') ||
                  document.querySelector('[${widget.dataAttr}]');
  if (!container) {
    container = document.createElement('div');
    container.id = '${widget.containerId}';
    document.body.appendChild(container);
  }
  container.innerHTML = \`${escapeForTemplate(body)}\`;

  // ---- widget logic ----
  (function widgetMain() {
${js}
  })();
})();
`;

  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, embed);
  const kb = (fs.statSync(output).size / 1024).toFixed(1);
  console.log(`[${widget.label}] wrote ${widget.output} (${kb} KB)`);
}

const only = process.argv[2];
const names = only ? [only] : Object.keys(WIDGETS);
for (const name of names) {
  const w = WIDGETS[name];
  if (!w) { console.error(`Unknown widget "${name}". Known: ${Object.keys(WIDGETS).join(', ')}`); process.exit(1); }
  build(w);
}
