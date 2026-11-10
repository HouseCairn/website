// Static checks of the built site (dist/): strict CSP compatibility, no JavaScript,
// no external resource, and the weight budget of the home page files.
//   node scripts/check-dist.mjs        (after npm run build)
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import { gzipSync } from "node:zlib";

const DIST = "dist";
// Budget of the home page (direction "Calm product"), in bytes transferred.
const BUDGET = { html: 20_000, css: 12_000, font: 30_000 };

const files = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else files.push(path);
  }
})(DIST);

const problems = [];
const html = files.filter((f) => f.endsWith(".html"));
for (const file of html) {
  const text = readFileSync(file, "utf8");
  if (/<style[\s>]/i.test(text)) problems.push(`${file}: inline <style>`);
  if (/\sstyle=/i.test(text)) problems.push(`${file}: style= attribute`);
  for (const tag of text.match(/<script[^>]*>/gi) ?? []) {
    if (!/type="application\/ld\+json"/.test(tag)) problems.push(`${file}: script ${tag}`);
  }
  // Resources the page loads (not links the visitor follows) must come from the site.
  // Canonical and alternate links name the site itself and load nothing.
  for (const tag of text.match(/<(?:img|source|link|script)\b[^>]*>/gi) ?? []) {
    if (/rel="(canonical|alternate)"/.test(tag)) continue;
    for (const [, attr, value] of tag.matchAll(/\b(src|srcset|href)="([^"]+)"/g)) {
      for (const url of value.split(",").map((part) => part.trim().split(/\s+/)[0])) {
        if (/^(https?:)?\/\//.test(url)) problems.push(`${file}: external ${attr} ${url}`);
      }
    }
  }
  if (/data:[a-z]+\/[a-z0-9.+-]+;base64/i.test(text)) problems.push(`${file}: data: URI`);
}
const js = files.filter((f) => [".js", ".mjs"].includes(extname(f)));
if (js.length) problems.push(`JavaScript files: ${js.join(", ")}`);

// Transferred size: HTML and CSS are served compressed (gzip here, as GitHub Pages does).
const size = (f) => (/\.(html|css)$/.test(f) ? gzipSync(readFileSync(f), { level: 9 }).length : statSync(f).size);
const home = join(DIST, "index.html");
const css = files.filter((f) => f.endsWith(".css"));
const fonts = files.filter((f) => f.endsWith(".woff2"));
const report = {
  html: Math.max(size(home), size(join(DIST, "fr", "index.html"))),
  css: css.reduce((n, f) => n + size(f), 0),
  font: fonts.reduce((n, f) => n + size(f), 0),
};
for (const [key, limit] of Object.entries(BUDGET)) {
  const verdict = report[key] <= limit ? "ok" : "OVER";
  console.log(`${key.padEnd(5)} ${String(report[key]).padStart(7)} B  (budget ${limit} B)  ${verdict}`);
  if (report[key] > limit) problems.push(`${key}: ${report[key]} B over the budget of ${limit} B`);
}
if (fonts.length !== 1) problems.push(`expected one font file, found ${fonts.length}`);
console.log(`${html.length} pages, ${css.length} stylesheet(s), ${fonts.length} font file(s), ${js.length} script file(s)`);

if (problems.length) {
  console.error(problems.map((p) => `FAIL ${p}`).join("\n"));
  process.exit(1);
}
console.log("dist: CSP compatible, no JavaScript, no external resource, within budget.");
