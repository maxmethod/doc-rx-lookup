#!/usr/bin/env node
// Build dist/embed.js — a self-bootstrapping single-file embed version of the
// widget. Users paste one <script> tag into a GHL Custom Code block and the
// script injects styles + markup + logic into the page.
//
// Usage: node scripts/build-embed.js

const fs = require('fs');
const path = require('path');

const input = path.resolve(__dirname, '..', 'rx-provider-lookup.html');
const output = path.resolve(__dirname, '..', 'dist', 'embed.js');

const html = fs.readFileSync(input, 'utf8');

// Extract <style>...</style>
const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
if (!styleMatch) throw new Error('Could not find <style> block');
const rawCss = styleMatch[1].trim();

// Scope every selector to #rx-lookup-widget so the widget's CSS cannot leak
// out and affect the host page. We DOUBLE the scope id (#x#x) to bump
// specificity above typical host-page form framework rules — this is the
// cheapest way to win the cascade against e.g. GHL's .hl-form-input styles
// without resorting to !important. Two ID selectors targeting the same
// element is valid CSS and effectively doubles the specificity weight.
// Keeps :root custom-property declarations global, drops body/html rules.
function scopeCss(css, scope) {
  const compound = `${scope}${scope}`;  // doubled-id specificity boost
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

const css = scopeCss(rawCss, '#rx-lookup-widget');

// Extract body content (between <body> ... </body>, trimmed)
const bodyMatch = html.match(/<body>([\s\S]*?)<\/body>/);
if (!bodyMatch) throw new Error('Could not find <body> block');
let body = bodyMatch[1].trim();

// Strip the <script>...</script> from the body — we'll emit it separately
const scriptMatch = body.match(/<script>([\s\S]*?)<\/script>/);
if (!scriptMatch) throw new Error('Could not find <script> block in body');
const js = scriptMatch[1].trim();
body = body.replace(scriptMatch[0], '').trim();

// Escape for JS template literals: backticks and ${ sequences
const escapeForTemplate = s => s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');

const embed = `/**
 * doc-rx-lookup embed bootstrap
 * Generated from rx-provider-lookup.html
 *
 * Drop into a GHL funnel page with:
 *   <div id="rx-lookup-widget"></div>
 *   <script src="https://cdn.jsdelivr.net/gh/maxmethod/doc-rx-lookup@vX.Y.Z/dist/embed.js"></script>
 *
 * Or omit the <div> and the script will append the widget to <body>.
 */
(function () {
  if (window.__rxLookupEmbedLoaded) return;
  window.__rxLookupEmbedLoaded = true;

  // ---- styles ----
  const style = document.createElement('style');
  style.setAttribute('data-rx-lookup', 'styles');
  style.textContent = \`${escapeForTemplate(css)}\`;
  document.head.appendChild(style);

  // ---- markup ----
  // Find an explicit container or create one. The page may pre-place
  // <div id="rx-lookup-widget"></div> where it wants the widget to appear.
  let container = document.getElementById('rx-lookup-widget') ||
                  document.querySelector('[data-rx-lookup-widget]');
  if (!container) {
    container = document.createElement('div');
    container.id = 'rx-lookup-widget';
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
const stats = fs.statSync(output);
console.log(`Wrote ${path.basename(output)} (${(stats.size / 1024).toFixed(1)} KB)`);
