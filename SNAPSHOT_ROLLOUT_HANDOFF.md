# doc-rx-lookup — Snapshot Rollout Handoff

**Last updated:** 2026-07-01 (late night session)
**Current shipped version:** **`v2.3.0`** (live on jsDelivr, all 4 embeds 200 + byte-matched)
**Repo:** `github.com/maxmethod/doc-rx-lookup` (main @ `472d53a`)

Pick up here in the morning. TL;DR: the four widgets append instead of overwrite, and
v2.3.0 adds a **quote-safe returning-contact seed**. The remaining work is GHL-side wiring +
live validation (below).

---

## ✅ Morning testing checklist (do these in order)

1. **Switch each survey/form to the new custom fields** (`providers_json`, `medications_json`,
   `current_coverage_json`, `income_json`, + `_summary` variants, + `household_income`) instead
   of the older native fields the widgets originally wrote to. Removes any overwrite collision.
   Full list + types in [`SNAPSHOT-FIELDS.md`](SNAPSHOT-FIELDS.md).
2. **Add the `_summary` fields (Large Text) to each step** alongside the `_json` fields.
   Open item from tonight: summary wasn't populating live — almost certainly because only the
   `_json` field was on the step, not `_summary`. The `_json` field is the real data; `_summary`
   is the readable mirror.
3. **Paste the v2.3.0 blocks** (see "Embed snippets" below) — pinned `@v2.3.0`, one Custom Code
   element per widget, each with its own `<script type="application/json" ...-seed>` line.
4. **Same-browser return test:** as a contact who already has saved data, re-open the survey in
   the same browser. Expect: prior entries hydrate, new entries **append**, and **submit works**
   (the v2.2.0 attribute bug that broke submit is fixed).
5. **View Source check:** confirm the seed `<script type="application/json" id="...-seed">` shows
   the contact's JSON (resolved) and not the literal `{{ contact.custom.providers_json }}`.
   - If literal → the merge syntax differs in your account. Try `{{ contact.providers_json }}`
     (no `.custom.`) or use the merge-field picker to get the exact token, then tell me.
6. **Cross-device / renewal path test** (the trigger-link plan — see below).

---

## What we did tonight (the arc)

Started from: widgets **overwrote** the field on every submit (a returning contact's prior
doctors/meds were wiped). Ended at: append + a quote-safe returning-contact seed.

| Version | What it does |
| --- | --- |
| `v2.0.1` | Original — **overwrites** the field (wipes prior entries) |
| `v2.1.0` | **Appends** — hydrates from the on-page field, no empty-clobber at load |
| `v2.2.0` | Added a returning-contact **seed** via `data-initial-*` attribute — **BROKE survey submit** (see below), do not use |
| **`v2.3.0`** ✅ | Seed moved to a **quote-safe JSON `<script>` tag**; `data-initial-*` removed; build hardened |

**Two bugs found + fixed tonight:**
1. **Attribute broke submit.** For a returning contact, GHL substitutes the stored JSON (full of
   double quotes) **raw / un-encoded** into the double-quoted `data-initial-*="…"` attribute →
   first `"` terminates the attribute → corrupts the DOM → survey won't submit. Fix: carry the
   seed in a `<script type="application/json">` text node instead (quotes can't break it).
2. **Build truncation.** `scripts/build-embed.js` extracted the widget `<script>` with a
   non-greedy regex, so a literal `</script>` in a code comment truncated the widget logic
   mid-function (hydration silently never ran). Hardened to a greedy match + a guard that throws
   if extra `<script>` remains. **Lesson: never put a literal `</script>` in the widget source's
   inline `<script>` (comments/strings included).**

**Verified in-browser (v2.3.0):** seed hydrates (tested with `Dr Mary O'Brien` — apostrophe +
double-quotes intact) → manual add **appends** (field count 1→2) → unresolved `{{...}}` ignored
(empty, no break) → medications seed hydrates → console clean.

---

## Embed snippets (v2.3.0 — ready to paste)

One block per widget, each in its own Custom Code element. The seed `<script>` **must sit
BEFORE the embed `<script>`** and must not be nested inside the `<div>`.

```html
<!-- Doctors / Providers -->
<div id="provider-lookup-widget" data-primary-color="{{custom_values.brand_primary_color}}"></div>
<script type="application/json" id="provider-lookup-widget-seed">{{ contact.custom.providers_json }}</script>
<script src="https://cdn.jsdelivr.net/gh/maxmethod/doc-rx-lookup@v2.3.0/dist/embed-providers.js"></script>

<!-- Medications / Rx -->
<div id="medications-lookup-widget" data-primary-color="{{custom_values.brand_primary_color}}"></div>
<script type="application/json" id="medications-lookup-widget-seed">{{ contact.custom.medications_json }}</script>
<script src="https://cdn.jsdelivr.net/gh/maxmethod/doc-rx-lookup@v2.3.0/dist/embed-medications.js"></script>

<!-- Current Coverage -->
<div id="coverage-lookup-widget" data-primary-color="{{custom_values.brand_primary_color}}"></div>
<script type="application/json" id="coverage-lookup-widget-seed">{{ contact.custom.current_coverage_json }}</script>
<script src="https://cdn.jsdelivr.net/gh/maxmethod/doc-rx-lookup@v2.3.0/dist/embed-coverage.js"></script>

<!-- Income Sources -->
<div id="income-sources-widget" data-primary-color="{{custom_values.brand_primary_color}}"></div>
<script type="application/json" id="income-sources-widget-seed">{{ contact.custom.income_json }}</script>
<script src="https://cdn.jsdelivr.net/gh/maxmethod/doc-rx-lookup@v2.3.0/dist/embed-income.js"></script>
```

The seed line is safe to leave in for new contacts — unresolved `{{...}}` / empty is ignored.
Omit it to disable the returning-contact feature. `SNAPSHOT-FIELDS.md` + `GHL-EMBED-SNIPPETS.html`
carry the same info.

---

## What we learned about GHL prefill (verified against docs + community)

- **Sticky contact does NOT prefill custom fields** — standard identity fields (name/email/phone)
  only. It won't rehydrate the `_json` fields.
- **GHL does NOT HTML-encode** when substituting merge values — raw string replace. That's why the
  attribute broke; it's also why the JSON-`<script>`-tag carrier is safe.
- **Reach of `{{ contact.custom.* }}` on a funnel/survey page = SAME BROWSER.** It resolves from the
  visitor's **local-storage of a prior submission on that funnel**, not a server-side lookup by
  identity. So the seed appends for a contact returning **on the same device** — not cross-device,
  not a cold email link on a new phone.
- Merge tags **do** substitute inside a Custom Code `<script>` block (community-confirmed).

---

## Cross-device plan (the trigger-link idea — for renewals)

For renewal workflows where the contact opens the link on any device, the local-storage seed isn't
enough. The plan: a **GHL trigger link carrying the contact ID** (`?contact_id={{contact.id}}&prefill=true`
or the account's equivalent), sent from the renewal workflow. Only the ID travels (no PHI in URL),
one template customizes per contact.

**No widget changes needed** — the widget reads the on-page field first, then the seed, so whichever
way GHL delivers the value, it hydrates + appends. Two delivery paths to check in View Source:

- **Path A — GHL prefills the field element** (`[data-q="providers_json"]` gets the value) → widget reads field.
- **Path B — GHL resolves `{{ contact.custom.providers_json }}` server-side into the seed `<script>`** (because the trigger link identified the contact) → widget reads seed. Reuses v2.3.0 as-is; nicer path.

**Caveats to test:**
- **Hidden-field caveat:** GHL prefill has historically skipped *hidden* custom fields. If the `_json`
  field is hidden and Path A is empty, that's why → Path B (seed tag) is the workaround.
- **Form-submitted-data caveat:** contact-ID prefill reportedly pulls data submitted *through a form*,
  not API/import-set data. Our `_json` is written via the form submission, so it should qualify — confirm.
- Exact param syntax is community-documented (not first-party); mobile prefill is reportedly spotty. Test on mobile.
- If contact-ID prefill turns out not to cover custom fields at all → the only true cross-device
  fallback is a small backend lookup (out of scope for these client-only widgets; would reintroduce PHI handling).

**Bring back to Claude:** the View Source of the trigger link opened on a second device → we'll confirm
which path fired and whether anything needs a nudge (unhide a field, change which key the seed reads, etc.).

---

## Snapshot requirements (unchanged) — see SNAPSHOT-FIELDS.md

- **9 custom fields:** 8 × Large Text (`providers_json`/`_summary`, `medications_json`/`_summary`,
  `current_coverage_json`/`_summary`, `income_json`/`_summary`) + `household_income` (Monetary).
- **1 custom value:** `brand_primary_color` (hex; drives widget color; optional — falls back).
- Each field must be on the **same form/survey step** as its widget.

---

## Deploy / build notes

- **Deploy by tag** — jsDelivr serves immutable content per git tag. To ship a change: edit source,
  `node scripts/build-embed.js`, commit, `git tag vX.Y.Z && git push origin vX.Y.Z`, bump `@vX.Y.Z`
  in the snapshot embeds. Commit as `Marshall Watts <info@maxmethodology.com>`.
- **Never hand-edit `dist/*.js`** — build artifacts. Edit the source `*.html`, then build.
- **jsDelivr fallback** if an embed is slow to warm on a fresh tag:
  `https://rawcdn.githack.com/maxmethod/doc-rx-lookup/v2.3.0/dist/<file>`.
- Separately: fix the **Marsh Insurance Group** survey that still has the wrong LPI-fork build.
