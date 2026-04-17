# doc-rx-lookup

Client-side prescription and provider lookup widget for Max Methodology quote forms. Embeds in a GoHighLevel funnel page, searches the public NLM APIs for drugs and doctors, writes structured output to GHL custom fields for HealthSherpa handoff.

**This repo is intentionally public.** The code runs entirely in the browser and is visible via View Source on any page that embeds it. Do not commit secrets, API keys, customer data, or anything you would not want indexed by Google.

## What's in the repo

| Path | Purpose |
| --- | --- |
| `rx-provider-lookup.html` | Full standalone version (with HTML shell). Useful for local dev and testing outside GHL. |
| `dist/embed.js` | **Production embed.** Self-bootstrapping single-file version — paste one `<script>` tag into a GHL Custom Code block and the widget injects itself. |
| `dist/us-zips.json` | Bundled ZIP coordinate dataset, served via jsDelivr. ~1.2MB uncompressed, ~350KB gzipped. |
| `scripts/build-embed.js` | Regenerates `dist/embed.js` from `rx-provider-lookup.html`. Run after any HTML change. |
| `scripts/build-zip-dataset.js` | Regenerates `dist/us-zips.json` from the GeoNames US postal-code export. |

## GHL embed snippet

Paste into a Custom Code / Custom HTML block on the funnel page where you want the widget to appear:

```html
<div id="rx-lookup-widget"></div>
<script src="https://cdn.jsdelivr.net/gh/maxmethod/doc-rx-lookup@v1.0.9/dist/embed.js"></script>
```

On the same funnel page, place a GHL form containing the four custom fields as hidden inputs (`medications_json`, `medications_summary`, `providers_json`, `providers_summary`) and a submit button styled as "Continue". Configure the form's "On Submit" to redirect to the next funnel step. The widget will find those hidden inputs by their `name` attributes and keep them synced automatically as the user makes selections.

## Runtime architecture

1. **Drug search** → RxNorm (`rxnav.nlm.nih.gov`) — fuzzy name search, strength/form picker, NDC lookup. CORS open.
2. **Doctor search** → NLM Clinical Tables NPI index (`clinicaltables.nlm.nih.gov`) — name-based, filtered server-side by state, filtered client-side by radius using the bundled ZIP dataset. CORS open.
3. **ZIP coordinates** → this repo's `us-zips.json` via jsDelivr. Falls back to `api.zippopotam.us` on per-ZIP miss (very rare; brand-new ZIPs or military APO/FPO).
4. **Output** → four GHL custom fields: `medications_json`, `medications_summary`, `providers_json`, `providers_summary`. No backend, no database, no PHI ever touches this CDN.

## Versioning and deploys

jsDelivr caches `@main` URLs for up to 12 hours — a bug fix pushed to `main` will not reach users promptly. **Always deploy via git tags.** The recommended flow:

1. Make changes on a branch, merge to `main`.
2. Tag a new semver version: `git tag v1.0.1 && git push origin v1.0.1`.
3. Update the embedded `ZIP_DATASET_VERSION` constant in `rx-provider-lookup.html` to the new tag.
4. Update the `<script src>` in the GHL snapshot to the new tag.
5. Propagate the snapshot (or let subaccounts update themselves on their next sync).

jsDelivr URL pattern once you start hosting the HTML/JS via CDN:

```
https://cdn.jsdelivr.net/gh/maxmethod/doc-rx-lookup@vX.Y.Z/rx-provider-lookup.html
https://cdn.jsdelivr.net/gh/maxmethod/doc-rx-lookup@vX.Y.Z/dist/us-zips.json
```

## Regenerating the ZIP dataset

```bash
curl -L -o geonames-us.zip https://download.geonames.org/export/zip/US.zip
unzip geonames-us.zip US.txt
node scripts/build-zip-dataset.js
git add dist/us-zips.json
git commit -m "Refresh ZIP dataset from GeoNames YYYY-MM-DD"
```

The source `US.txt` is `.gitignore`'d — only the processed `dist/us-zips.json` ships.

## Local development

Serve the folder with any static server:

```bash
npx http-server . -p 8787 -c-1
# then open http://localhost:8787/rx-provider-lookup.html
```

When the page is served from `localhost`, `ZIP_DATASET_URL` auto-resolves to `./dist/us-zips.json` so you can test against the local build without pushing. In production (non-localhost), it pins to the jsDelivr tagged URL.

## Attribution

ZIP coordinate dataset derived from [GeoNames](https://www.geonames.org), licensed under [Creative Commons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/).
