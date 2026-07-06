# doc-rx-lookup — Snapshot Rollout Handoff

**Last updated:** 2026-07-06 (v2.4.0 "Other → specify" release)
**Current shipped version:** **`v2.4.0`** (live on jsDelivr, all 4 embeds 200 + byte-matched)
**Repo:** `github.com/maxmethod/doc-rx-lookup` (main @ `72f68ab`, tag `v2.4.0` — pushed)

> **✅ 2026-07-06 — ROLLOUT COMPLETE + v2.4.0 SHIPPED.** Marsh built the net-new health-quote
> form + survey with the doctor + Rx widgets across **all** accounts, pushed the snapshot, and
> moved Lion's Pride onto the generic build. (Income widget lives only on **LPI's pre-enrollment
> form** — the quote forms deliberately exclude income + current coverage to keep the quote
> simple.) Then **v2.4.0** added the **"Other" → free-text specify** field to the income-type
> and Rx-frequency dropdowns (folds into the summary string, no new CRM field). Live embeds
> already repointed to `@v2.4.0`. **The morning-checklist + rollout-sequence sections below are
> now historical record**, kept for context.

Pick up here first thing. **State:** the widgets are done (v2.3.0 — append + quote-safe
returning-contact seed) and **Perfect Agency v4.0 is now fully provisioned** for them. Today's
decision: build **net-new** form + survey (don't force existing contacts to shift over). The single
sheet to build from is **[`V4.0-NEW-SURFACE-BUILD.md`](V4.0-NEW-SURFACE-BUILD.md)**; this file is the
higher-level arc + reference.

---

## 🔜 First thing in the morning (do these in order)

0. *(optional)* **Push the local commit** — `git push origin main` (main is 1 ahead: the v4.0 build sheet).
1. **Open [`V4.0-NEW-SURFACE-BUILD.md`](V4.0-NEW-SURFACE-BUILD.md)** and build the net-new **form + survey**
   on v4.0 (`dPBc7oh3Kf8lOPdzzajj`): add each widget's fields to its step (mapping in the sheet), paste the
   four `@v2.4.0` blocks. **No field creation needed — prereqs are done** (see Session update below).
2. **Validate on v4.0** (full checklist in the build sheet):
   - Submit a test contact → **all 9 fields populate**, including every `_summary` (the open item from 07-01
     — the summary fields now exist, so this should finally work once they're on the step).
   - **View Source:** each seed `<script id="…-seed">` shows resolved JSON (or empty) — **not** the literal
     `{{ contact.custom.providers_json }}`. If literal → try `{{ contact.providers_json }}` (no `.custom.`)
     or grab the exact token from the merge-field picker, then flag it.
   - Widgets render **MM purple** (`#6500c1`) → confirms `brand_primary_color` resolved.
3. **Same-browser return test:** submit once, reopen in the same browser → prior entries hydrate, new ones
   **append**, and **submit works** (the v2.2.0 attribute bug is fixed).
4. **Then Marsh IG** (first live test — net-new surfaces there too), **then LPI** (config-override repoint).

---

## 🟢 Session update — 2026-07-03 (v4.0 provisioning + net-new decision)

- **v4.0 custom fields — STANDARDIZED + DONE.** Live-probed Perfect Agency v4.0 (415 contact fields).
  Already existed: `providers_json`, `medications_json`, `income_json`, `income_summary`. **Created the
  missing 5:** `providers_summary`, `medications_summary`, `current_coverage_json`,
  `current_coverage_summary` (Large Text) + **`household_income`** (Monetary). Re-probe confirms **all 9
  keys present, correct type, no suffixed dupes**, all in the folder with the existing `_json` fields.
- **Household income decision:** created a **generic `household_income`** (Monetary) rather than reusing the
  year-based fields (`2024/2025/2026_household_income` — kept for tax-year records). Widget auto-total now
  has a year-agnostic home; no per-page override needed.
- **Brand color confirmed:** `{{ custom_values.brand_primary_color }}` = **`#6500c1`** on v4.0 → widgets
  render on-brand automatically.
- **Legacy intake fields left untouched:** `contact.doctors` (🏥 Doctors), `contact.provider_list`,
  `contact.medications` (🏥 Prescriptions) — the "different fields" providers/meds were originally wired to.
  Widgets standardize on the `_json`/`_summary` keys; old data stays put.
- **Fleet propagation:** field creation on v4.0 **auto-syncs to sub-accounts already deployed from the
  snapshot**, so the *fields* are standardized fleet-wide in one shot. A **new form/survey is a funnel
  asset** — it only reaches sub-accounts on a fresh snapshot push, not already-live accounts. (For Marsh IG
  you'll build the net-new surfaces there directly — which is the plan.)
- **Decision — net-new surfaces:** rather than editing the existing v4.0 test survey (which would force
  existing users over), build a **new form + survey**. Captured end-to-end in `V4.0-NEW-SURFACE-BUILD.md`.
- **Marsh IG finding CORRECTED:** its survey (`OhA1dnXDrDD4dcrwrcXw`) is **not** the LPI fork — it runs the
  **legacy combined all-in-one** `doc-rx-lookup@v1.0.9/dist/embed.js` (one Custom-HTML element, container
  `<div id="rx-lookup-widget">`). Same fix direction: replace with the 4 split v2.3.0 widgets + create the
  9 fields there.
- **Repo housekeeping:** deleted stray debug dup `provider-lookup 2.html`; added + committed
  `V4.0-NEW-SURFACE-BUILD.md` (`d755943`, local/unpushed).

---

## What we did tonight (the arc)

Started from: widgets **overwrote** the field on every submit (a returning contact's prior
doctors/meds were wiped). Ended at: append + a quote-safe returning-contact seed.

| Version | What it does |
| --- | --- |
| `v2.0.1` | Original — **overwrites** the field (wipes prior entries) |
| `v2.1.0` | **Appends** — hydrates from the on-page field, no empty-clobber at load |
| `v2.2.0` | Added a returning-contact **seed** via `data-initial-*` attribute — **BROKE survey submit** (see below), do not use |
| **`v2.3.0`** | Seed moved to a **quote-safe JSON `<script>` tag**; `data-initial-*` removed; build hardened |
| **`v2.4.0`** ✅ | **"Other" → free-text specify** on the income-type + Rx-frequency dropdowns (both meds paths) — folds into the summary string, no new field, required when selected |

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

## Embed snippets (v2.4.0 — ready to paste)

One block per widget, each in its own Custom Code element. The seed `<script>` **must sit
BEFORE the embed `<script>`** and must not be nested inside the `<div>`.

```html
<!-- Doctors / Providers -->
<div id="provider-lookup-widget" data-primary-color="{{custom_values.brand_primary_color}}"></div>
<script type="application/json" id="provider-lookup-widget-seed">{{ contact.custom.providers_json }}</script>
<script src="https://cdn.jsdelivr.net/gh/maxmethod/doc-rx-lookup@v2.4.0/dist/embed-providers.js"></script>

<!-- Medications / Rx -->
<div id="medications-lookup-widget" data-primary-color="{{custom_values.brand_primary_color}}"></div>
<script type="application/json" id="medications-lookup-widget-seed">{{ contact.custom.medications_json }}</script>
<script src="https://cdn.jsdelivr.net/gh/maxmethod/doc-rx-lookup@v2.4.0/dist/embed-medications.js"></script>

<!-- Current Coverage -->
<div id="coverage-lookup-widget" data-primary-color="{{custom_values.brand_primary_color}}"></div>
<script type="application/json" id="coverage-lookup-widget-seed">{{ contact.custom.current_coverage_json }}</script>
<script src="https://cdn.jsdelivr.net/gh/maxmethod/doc-rx-lookup@v2.4.0/dist/embed-coverage.js"></script>

<!-- Income Sources -->
<div id="income-sources-widget" data-primary-color="{{custom_values.brand_primary_color}}"></div>
<script type="application/json" id="income-sources-widget-seed">{{ contact.custom.income_json }}</script>
<script src="https://cdn.jsdelivr.net/gh/maxmethod/doc-rx-lookup@v2.4.0/dist/embed-income.js"></script>
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

## Snapshot requirements — see SNAPSHOT-FIELDS.md

**✅ Provisioned on v4.0 (2026-07-03)** — this is the per-account contract; v4.0 (the snapshot source)
now satisfies it, and existing sub-accounts inherited the fields via snapshot sync.

- **9 custom fields:** 8 × Large Text (`providers_json`/`_summary`, `medications_json`/`_summary`,
  `current_coverage_json`/`_summary`, `income_json`/`_summary`) + `household_income` (Monetary). ✅ on v4.0
- **1 custom value:** `brand_primary_color` (hex; drives widget color; optional — falls back). ✅ on v4.0 = `#6500c1`
- Each field must be on the **same form/survey step** as its widget. ← still per-surface (do when building).

---

## Deploy / build notes

- **Deploy by tag** — jsDelivr serves immutable content per git tag. To ship a change: edit source,
  `node scripts/build-embed.js`, commit, `git tag vX.Y.Z && git push origin vX.Y.Z`, bump `@vX.Y.Z`
  in the snapshot embeds. Commit as `Marshall Watts <info@maxmethodology.com>`.
- **Never hand-edit `dist/*.js`** — build artifacts. Edit the source `*.html`, then build.
- **jsDelivr fallback** if an embed is slow to warm on a fresh tag:
  `https://rawcdn.githack.com/maxmethod/doc-rx-lookup/v2.4.0/dist/<file>`.
- Separately: fix the **Marsh Insurance Group** survey (`OhA1dnXDrDD4dcrwrcXw`) — corrected 2026-07-03: it
  runs the **legacy combined `@v1.0.9/embed.js`** (`<div id="rx-lookup-widget">`), **not** the LPI fork.
  Fix = build net-new form/survey with the 4 split v2.3.0 widgets + create the 9 fields on that account.
- **LPI (last):** move off the LPI fork (`lpi-enrollment-widgets@v1.4.0`) via per-page `*_CONFIG` fieldKey
  override pointing the generic build at LPI's existing keys → no field migration, no data loss. Prep =
  capture LPI's actual clean keys (needs the LPI location PIT).
