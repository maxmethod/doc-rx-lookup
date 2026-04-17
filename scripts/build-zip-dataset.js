#!/usr/bin/env node
// Build compact ZIP coordinates dataset from GeoNames US.txt
// Input: US.txt (tab-separated, GeoNames postal codes export)
// Output: us-zips.json — { "12345": [lat, lon, "ST"], ... }
//
// Data source: GeoNames (https://www.geonames.org), CC BY 4.0
// Fields (0-indexed):
//   0 country, 1 postal_code, 2 place_name, 3 admin_name1 (state),
//   4 admin_code1 (state abbr), 9 lat, 10 lon

const fs = require('fs');
const path = require('path');

const input = path.resolve(__dirname, '..', 'US.txt');
const output = path.resolve(__dirname, '..', 'dist', 'us-zips.json');

const lines = fs.readFileSync(input, 'utf8').split('\n').filter(Boolean);
const dataset = {};
let skipped = 0;

for (const line of lines) {
  const cols = line.split('\t');
  if (cols.length < 11) { skipped++; continue; }
  const zip = cols[1];
  const state = cols[4];
  const lat = parseFloat(cols[9]);
  const lon = parseFloat(cols[10]);
  if (!/^\d{5}$/.test(zip) || !state || isNaN(lat) || isNaN(lon)) { skipped++; continue; }
  // Dedupe — if a ZIP appears multiple times (rare, usually PO box variants), first wins
  if (dataset[zip]) continue;
  dataset[zip] = [
    Math.round(lat * 10000) / 10000,
    Math.round(lon * 10000) / 10000,
    state
  ];
}

fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, JSON.stringify(dataset));

const stats = fs.statSync(output);
console.log(`Wrote ${Object.keys(dataset).length} ZIPs to ${path.basename(output)} (${(stats.size / 1024).toFixed(1)} KB, skipped ${skipped})`);
