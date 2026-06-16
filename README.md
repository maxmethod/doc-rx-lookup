# doc-rx-lookup

Client-side enrollment widgets for Max Methodology quote forms. Each widget embeds in a GoHighLevel funnel/survey page, collects structured data (drugs, doctors, current coverage, income), and writes it into GHL custom fields for HealthSherpa handoff.

**This is the generic, snapshot-portable version.** Widgets match GHL fields by **clean key only** (no hardcoded field IDs) and pull their brand color from a GHL **custom value**, so the same build drops into any sub-account via the shared snapshot. (The Lion's Pride build in `lpi-enrollment-widgets` is a separate fork that hardcodes LPI's teal + field IDs.)

**This repo is intentionally public.** The code runs entirely in the browser and is visible via View Source on any page that embeds it. Do not commit secrets, API keys, customer data, or anything you would not want indexed by Google.

## Widgets — four independent embeds

| Widget | Source | Embed | Container id | Writes (clean keys) |
| --- | --- | --- | --- | --- |
| **Doctors / Providers** | `provider-lookup.html` | `dist/embed-providers.js` | `provider-lookup-widget` | `providers_json` · `providers_summary` |
| **Medications / Rx** | `medications-lookup.html` | `dist/embed-medications.js` | `medications-lookup-widget` | `medications_json` · `medications_summary` |
| **Current Coverage** | `current-coverage-lookup.html` | `dist/embed-coverage.js` | `coverage-lookup-widget` | `current_coverage_json` · `current_coverage_summary` |
| **Income Sources** | `income-sources.html` | `dist/embed-income.js` | `income-sources-widget` | `income_json` · `income_summary` · `household_income` (auto-total) |

Each is a **separate embed** with a distinct container id / config global / load-guard, so any combination can coexist on one page. Drop each into its own GHL Custom Code block.

> **Legacy:** `rx-provider-lookup.html` → `dist/embed.js` is the original *combined* doctor+Rx widget (container `rx-lookup-widget`). It is kept for backward-compat with any page already embedding it; new work should use the four split widgets above. `scripts/build-embed.js` builds only the split widgets — the legacy `dist/embed.js` is frozen.

## Brand color — driven by a GHL custom value

Set `data-primary-color` on the container to the literal merge tag **`{{custom_values.brand_primary_color}}`**. GHL substitutes the account's brand color server-side (works on forms and surveys). Resolution order (first valid wins):

1. `window.<WIDGET>_CONFIG.primaryColor` — explicit JS override
2. `data-primary-color` on the container (the custom-value merge tag)
3. Auto-detect: GHL form submit-button background, then survey Next-button color
4. Fallback: the widget's neutral default `#1e4d8c`

Unresolved `{{...}}` merge tags are ignored (the widget falls through to auto-detect / default), so a sub-account that hasn't set the custom value still renders sanely.

## GHL embed snippets

Paste each into a Custom Code / Custom HTML block. Ready-to-paste copies are in `GHL-EMBED-SNIPPETS.html`.

```html
<!-- Doctors / Providers -->
<div id="provider-lookup-widget" data-primary-color="{{custom_values.brand_primary_color}}"></div>
<script src="https://cdn.jsdelivr.net/gh/maxmethod/doc-rx-lookup@vX.Y.Z/dist/embed-providers.js"></script>

<!-- Medications / Rx -->
<div id="medications-lookup-widget" data-primary-color="{{custom_values.brand_primary_color}}"></div>
<script src="https://cdn.jsdelivr.net/gh/maxmethod/doc-rx-lookup@vX.Y.Z/dist/embed-medications.js"></script>

<!-- Current Coverage -->
<div id="coverage-lookup-widget" data-primary-color="{{custom_values.brand_primary_color}}"></div>
<script src="https://cdn.jsdelivr.net/gh/maxmethod/doc-rx-lookup@vX.Y.Z/dist/embed-coverage.js"></script>

<!-- Income Sources -->
<div id="income-sources-widget" data-primary-color="{{custom_values.brand_primary_color}}"></div>
<script src="https://cdn.jsdelivr.net/gh/maxmethod/doc-rx-lookup@vX.Y.Z/dist/embed-income.js"></script>
```

> Pin `@vX.Y.Z` to a real tag, not `@main`. Test on the **published** form/survey — GHL's in-builder preview may not run `<script>`.

## What the snapshot must contain

For the widgets to render and save, each sub-account (via the snapshot) needs:

- **Custom value:** `brand_primary_color` (a hex like `#0ea5e9`). Drives the widget color.
- **Custom fields** (see `SNAPSHOT-FIELDS.md` for the full table): the JSON + summary fields above as **LARGE_TEXT**, plus `household_income` as **MONETARY**. The widget matches by the field's clean key (its Unique Key, which GHL renders in the field's `data-q` on the form/survey), so the keys must match exactly. The field must also be added to the **same form/survey step** the widget sits on, or its `data-q` element won't render and data won't save.

## Runtime architecture

1. **Drug search** → RxNorm (`rxnav.nlm.nih.gov`) — fuzzy name search, strength/form picker, NDC lookup. CORS open.
2. **Doctor search** → NLM Clinical Tables NPI index (`clinicaltables.nlm.nih.gov`) — name-based, filtered server-side by state, client-side by radius using the bundled ZIP dataset. CORS open.
3. **ZIP coordinates** (providers only) → this repo's `dist/us-zips.json` via jsDelivr; falls back to `api.zippopotam.us` on per-ZIP miss. On `localhost` auto-resolves to `./dist/us-zips.json`.
4. **Coverage / Income** → no external API; fully self-contained.
5. **Output** → GHL custom fields by clean key. No backend, no database, no PHI on the CDN.

## Build

`dist/*.js` embeds are **build artifacts — never hand-edit them.** After any change to a widget's HTML:

```bash
node scripts/build-embed.js              # build all four split widgets
node scripts/build-embed.js providers    # or just one (providers | medications | coverage | income)
```

The build scopes each widget's CSS to its container id (doubled `#id#id` for specificity, no `!important`) and inlines markup + logic into a self-bootstrapping IIFE.

## Versioning and deploys

jsDelivr serves **immutable content per git tag** and caches `@main` for up to 12h. **Always deploy by tag:**

1. Commit changes to `main`.
2. `git tag vX.Y.Z && git push origin vX.Y.Z`.
3. Bump `@vX.Y.Z` in the snapshot's embed snippets and propagate.

> ⚠️ **jsDelivr serving glitch (seen 2026-06-16):** certain files can get stuck returning a self-referential `301` redirect loop on a given tag (the file never loads). It is not a code problem — the file is fine on GitHub and a purge does not always clear it. Workaround: serve the affected file from `https://rawcdn.githack.com/maxmethod/doc-rx-lookup/<tag>/<path>` (production githack), or cut a fresh tag. Verify each `dist/embed-*.js` returns HTTP 200 from jsDelivr before relying on it in the snapshot.

## Regenerating the ZIP dataset

```bash
curl -L -o geonames-us.zip https://download.geonames.org/export/zip/US.zip
unzip geonames-us.zip US.txt
node scripts/build-zip-dataset.js
git add dist/us-zips.json && git commit -m "Refresh ZIP dataset from GeoNames YYYY-MM-DD"
```

The source `US.txt` is `.gitignore`'d — only the processed `dist/us-zips.json` ships.

## Local development

```bash
python3 -m http.server 8787    # or: npx http-server . -p 8787 -c-1
# then open http://localhost:8787/test-embed-providers.html (or -medications / -coverage / -income)
```

Each `test-embed-*.html` simulates a GHL page: the widget div + a fake hidden form so you can watch the clean keys populate on submit. When served from `localhost`, the provider widget's `ZIP_DATASET_URL` auto-resolves to `./dist/us-zips.json`.

## Attribution

ZIP coordinate dataset derived from [GeoNames](https://www.geonames.org), licensed under [Creative Commons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/).
