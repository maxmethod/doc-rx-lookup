# GHL embed snippets — drop in one at a time

Paste each numbered file's **entire contents** into its own GHL **Custom Code / HTML element**, inside the form or survey, on the **same step** as that widget's destination fields. One element per widget.

| # | Widget | File | Writes (clean keys) |
|---|---|---|---|
| 1 | Doctors / Providers | `1-providers.html` | `providers_json`, `providers_summary` |
| 2 | Medications / Rx | `2-medications.html` | `medications_json`, `medications_summary` |
| 3 | Current Coverage | `3-current-coverage.html` | `current_coverage_json`, `current_coverage_summary` |
| 4 | Income Sources | `4-income.html` | `income_json`, `income_summary`, `household_income` |

Notes:
- All pinned to **v2.6.0** on jsDelivr (all four returning 200 from jsDelivr and githack as of 2026-10-01). Each file has a commented **githack fallback** line. Use it only if a widget doesn't appear because jsDelivr is still warming.
- These blocks carry no returning-contact seed line. It is optional and unproven, see the note in [`../GHL-EMBED-SNIPPETS.html`](../GHL-EMBED-SNIPPETS.html).
- Before data saves, the sub-account needs the matching custom fields **and** the `brand_primary_color` custom value — see [`../SNAPSHOT-FIELDS.md`](../SNAPSHOT-FIELDS.md). Each field must be on the same form/survey step as its widget.
- Color comes from `{{custom_values.brand_primary_color}}`; with no custom value it falls back to a neutral default.
- Test on the **published** form/survey — GHL's builder preview may not run `<script>`.
