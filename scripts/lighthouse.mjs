// Lighthouse on the built site (dist/), home page in English and French, mobile and
// desktop. Fails when a category scores under 95, when the mobile home page transfers
// more than 200 KB, or when any JavaScript is loaded.
//   npm run build && npm run lighthouse
// Chrome is found by chrome-launcher, or set CHROME_PATH. LIGHTHOUSE_REPORT_ONLY=1 prints
// the scores without failing (for machines whose CPU is not representative).
import { createServer } from "node:http";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join, extname, resolve, sep } from "node:path";
import * as chromeLauncher from "chrome-launcher";
import lighthouse from "lighthouse";
import desktopConfig from "lighthouse/core/config/desktop-config.js";

const DIST = "dist";
const MIN_SCORE = 95;
const MAX_MOBILE_BYTES = 200 * 1024;
const TYPES = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".woff2": "font/woff2", ".avif": "image/avif",
  ".webp": "image/webp", ".png": "image/png", ".svg": "image/svg+xml", ".ico": "image/x-icon", ".xml": "application/xml", ".txt": "text/plain" };

// A small static server: Lighthouse needs HTTP, and the site has no server code.
// Paths ending in "/" are pages (index.html); nothing outside dist/ is ever served.
const ROOT = resolve(DIST);
const server = createServer(async (req, res) => {
  let path = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (path.endsWith("/")) path += "index.html";
  const file = resolve(ROOT, `.${path}`);
  try {
    if (!file.startsWith(ROOT + sep)) throw new Error("outside dist");
    const body = await readFile(file);
    res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream", "cache-control": "max-age=600" });
    res.end(body);
  } catch {
    res.writeHead(404, { "content-type": "text/html" });
    res.end(await readFile(join(DIST, "404.html")));
  }
});
await new Promise((ok) => server.listen(0, "127.0.0.1", ok));
const origin = `http://127.0.0.1:${server.address().port}`;

const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu"] });
const rows = [];
const problems = [];
try {
  for (const [lang, path] of [["en", "/"], ["fr", "/fr/"]]) {
    for (const form of ["mobile", "desktop"]) {
      const config = form === "desktop" ? desktopConfig : undefined;
      const result = await lighthouse(`${origin}${path}`, { port: chrome.port, output: "json", logLevel: "error" }, config);
      const lhr = result.lhr;
      const scores = Object.fromEntries(Object.entries(lhr.categories).map(([k, c]) => [k, Math.round(c.score * 100)]));
      const bytes = lhr.audits["total-byte-weight"].numericValue;
      const items = lhr.audits["resource-summary"].details.items;
      const script = items.find((i) => i.resourceType === "script");
      const requests = items.find((i) => i.resourceType === "total").requestCount;
      const row = { page: path, form, ...scores, kb: Math.round(bytes / 1024), requests,
        lcp_s: +(lhr.audits["largest-contentful-paint"].numericValue / 1000).toFixed(2),
        cls: +lhr.audits["cumulative-layout-shift"].numericValue.toFixed(3), js: script?.transferSize ?? 0 };
      rows.push(row);
      for (const [k, v] of Object.entries(scores)) if (v < MIN_SCORE) problems.push(`${path} ${form}: ${k} ${v} < ${MIN_SCORE}`);
      if (form === "mobile" && bytes > MAX_MOBILE_BYTES) problems.push(`${path} mobile: ${Math.round(bytes / 1024)} KB > 200 KB`);
      if (row.js > 0) problems.push(`${path} ${form}: ${row.js} B of JavaScript`);
    }
  }
} finally {
  await chrome.kill();
  server.close();
}

const head = "| Page | Form | Performance | Accessibility | Best practices | SEO | KB | Requests | LCP (s) | CLS |";
const table = [head, "|---|---|---|---|---|---|---|---|---|---|",
  ...rows.map((r) => `| ${r.page} | ${r.form} | ${r.performance} | ${r.accessibility} | ${r["best-practices"]} | ${r.seo} | ${r.kb} | ${r.requests} | ${r.lcp_s} | ${r.cls} |`)].join("\n");
console.log(table);
await mkdir("lighthouse", { recursive: true });
await writeFile("lighthouse/summary.json", JSON.stringify(rows, null, 2) + "\n");
if (process.env.GITHUB_STEP_SUMMARY) await writeFile(process.env.GITHUB_STEP_SUMMARY, `## Lighthouse\n\n${table}\n`, { flag: "a" });
if (problems.length) {
  console.error(problems.map((p) => `FAIL ${p}`).join("\n"));
  if (process.env.LIGHTHOUSE_REPORT_ONLY !== "1") process.exit(1);
}
