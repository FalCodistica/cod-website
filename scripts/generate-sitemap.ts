import { writeFileSync } from "node:fs";
import { industries } from "../lib/industries";
import { absoluteUrl } from "../lib/site";

type Entry = { path: string; changefreq: string; priority: string };

const entries: Entry[] = [
  { path: "/", changefreq: "monthly", priority: "1.0" },
  ...industries.map((i) => ({
    path: `/industries/${i.slug}`,
    changefreq: "monthly",
    priority: "0.8",
  })),
  { path: "/company", changefreq: "monthly", priority: "0.7" },
  { path: "/about", changefreq: "monthly", priority: "0.7" },
  { path: "/apply/strategic-collaboration", changefreq: "yearly", priority: "0.5" },
  { path: "/apply/strategic-conversation", changefreq: "yearly", priority: "0.5" },
  { path: "/apply/join-team", changefreq: "yearly", priority: "0.5" },
  { path: "/privacy", changefreq: "yearly", priority: "0.2" },
  { path: "/terms", changefreq: "yearly", priority: "0.2" },
];

const lastmod = new Date().toISOString().slice(0, 10);

const body = entries
  .map(
    (e) =>
      `  <url><loc>${absoluteUrl(e.path)}</loc><lastmod>${lastmod}</lastmod><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`,
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

writeFileSync(new URL("../public/sitemap.xml", import.meta.url), xml);
console.log(`Generated public/sitemap.xml with ${entries.length} URLs`);
