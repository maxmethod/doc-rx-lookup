# Snapshot requirements — custom value + custom fields

For the generic widgets to render (color) and save (data), every sub-account that
loads the snapshot needs the items below. Widgets match GHL fields **by clean key**
(the field's Unique Key, surfaced as the input `name=` / `data-q` on the rendered
form) — **not** by field ID — so the keys must match exactly. Field IDs differ per
account and are never hardcoded.

## Custom value (drives widget color)

| Custom value key | Type | Example | Used by |
| --- | --- | --- | --- |
| `brand_primary_color` | Text | `#0ea5e9` | All four widgets, via `data-primary-color="{{custom_values.brand_primary_color}}"` |

If unset, widgets fall back to auto-detecting the form/survey button color, then to a neutral default (`#1e4d8c`). Setting it is strongly recommended for on-brand color.

## Custom fields

Create these on the sub-account (Settings → Custom Fields) with the exact **Unique Key** shown, then add them to the quote form/survey (they can be hidden). The widget keeps them synced as the user makes selections.

| Widget | Clean key | Field type | Notes |
| --- | --- | --- | --- |
| Providers | `providers_json` | Large Text (multi-line) | Structured JSON of selected doctors |
| Providers | `providers_summary` | Large Text (multi-line) | Human-readable list |
| Medications | `medications_json` | Large Text (multi-line) | Structured JSON of selected drugs |
| Medications | `medications_summary` | Large Text (multi-line) | Human-readable list |
| Coverage | `current_coverage_json` | Large Text (multi-line) | Structured JSON of current coverage |
| Coverage | `current_coverage_summary` | Large Text (multi-line) | Human-readable list |
| Income | `income_json` | Large Text (multi-line) | Structured JSON of income sources |
| Income | `income_summary` | Large Text (multi-line) | Human-readable list |
| Income | `household_income` | **Monetary** | Auto-totaled annualized income. Only written when ≥1 source is entered, so it never clobbers a manually-entered value. |

### Notes

- **Do not** reuse single-line fields for the JSON/summary outputs — they can hold a lot of text; use Large Text.
- If an account needs a widget to target a differently-named field, override per page without rebuilding:
  ```html
  <script>
    window.INCOME_CONFIG = { fieldKeys: { household_income: ['my_income_field_key'] } };
  </script>
  <!-- ...then the embed <div> + <script> -->
  ```
  Config globals: `PROV_CONFIG`, `MEDS_CONFIG`, `COVERAGE_CONFIG`, `INCOME_CONFIG`.
