const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");
const TurndownService = require("turndown");
const { gfm } = require("turndown-plugin-gfm");

// wiki path -> { file: hugo content path, url: preserved permalink, weight }
const MAP = {
  "home":               { file: "_index.md",                       url: "/",                       weight: 0 },
  "home/hf_net":        { file: "hf_net.md",                       url: "/home/hf_net/",           weight: 40 },
  "home/digi_net":      { file: "digi_net.md",                     url: "/home/digi_net/",         weight: 50 },
  "home/VETesting":     { file: "VETesting.md",                    url: "/home/VETesting/",        weight: 60 },
  "home/memes":         { file: "memes.md",                        url: "/home/memes/",            weight: 70 },
  "home/fcof":          { file: "fcof.md",                         url: "/home/fcof/",             weight: 80 },
  "amateur":            { file: "amateur/_index.md",               url: "/amateur/",               weight: 10 },
  "amateur/licensing":  { file: "amateur/licensing.md",            url: "/amateur/licensing/",     weight: 10 },
  "amateur/modes":      { file: "amateur/modes/_index.md",         url: "/amateur/modes/",         weight: 20 },
  "amateur/modes/SSTV": { file: "amateur/modes/SSTV.md",           url: "/amateur/modes/SSTV/",    weight: 10 },
  "amateur/modes/FTn":  { file: "amateur/modes/FTn.md",            url: "/amateur/modes/FTn/",     weight: 20 },
  "radio":              { file: "radio/_index.md",                 url: "/radio/",                 weight: 20 },
  "radio/antennas":     { file: "radio/antennas.md",               url: "/radio/antennas/",        weight: 10 },
  "other-radio":        { file: "other-radio/_index.md",           url: "/other-radio/",           weight: 30 },
  "other-radio/swl":    { file: "other-radio/swl.md",              url: "/other-radio/swl/",       weight: 10 },
  "other-radio/frs":    { file: "other-radio/frs.md",              url: "/other-radio/frs/",       weight: 20 },
  "other-radio/GMRS":   { file: "other-radio/GMRS.md",             url: "/other-radio/GMRS/",      weight: 30 },
};

// internal wiki link -> preserved site path
const LINK_REWRITE = {
  "/modes/FTn": "/amateur/modes/FTn/",
  "/modes/SSTV": "/amateur/modes/SSTV/",
  "/other-radio/frs": "/other-radio/frs/",
  "/other-radio/swl": "/other-radio/swl/",
};
// image src -> local static path
const IMG_REWRITE = {
  "https://hrcc.wiki/hrcc.png": "/hrcc.png",
  "/sacred_teachings.webp": "/sacred_teachings.webp",
  "https://pbs.twimg.com/media/DV_yXrsWsAAIyVV?format=jpg&name=900x900": "/images/feng-meme.jpg",
  "https://pbs.twimg.com/media/DV_yXrsWsAAIyVV?format=jpg&amp;name=900x900": "/images/feng-meme.jpg",
};

const td = new TurndownService({ headingStyle: "atx", codeBlockStyle: "fenced", bulletListMarker: "-", emDelimiter: "*" });
td.use(gfm);
// emit raw <br> (keeps multi-value table cells on one line)
td.addRule("brRaw", { filter: "br", replacement: () => "<br>" });
// drop the Wiki.js heading anchor "¶" links
td.addRule("dropTocAnchor", {
  filter: (node) => node.nodeName === "A" && node.classList && node.classList.contains("toc-anchor"),
  replacement: () => "",
});

function rawFile(p) { return "_raw/" + p.replace(/\//g, "__") + ".html"; }

function esc(s) { return String(s || "").replace(/"/g, '\\"'); }

let count = 0;
for (const [wpath, info] of Object.entries(MAP)) {
  const html = fs.readFileSync(rawFile(wpath), "utf8");
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  const pageEl = doc.querySelector("page");
  const title = pageEl?.getAttribute("title") || wpath;
  const desc = pageEl?.getAttribute("description") || "";
  const created = pageEl?.getAttribute("created-at") || "";
  const updated = pageEl?.getAttribute("updated-at") || "";
  const author = pageEl?.getAttribute("author-name") || "";

  const contents = doc.querySelector('template[slot="contents"]');
  const container = contents.content.firstElementChild; // the wrapping <div>

  // rewrite links & images in the DOM before turndown
  container.querySelectorAll("a[href]").forEach((a) => {
    let h = a.getAttribute("href");
    if (LINK_REWRITE[h]) a.setAttribute("href", LINK_REWRITE[h]);
  });
  container.querySelectorAll("img[src]").forEach((img) => {
    let s = img.getAttribute("src");
    if (IMG_REWRITE[s]) img.setAttribute("src", IMG_REWRITE[s]);
    img.removeAttribute("width"); img.removeAttribute("height");
  });
  // Fix Wiki.js tables: a colspan caption row inside <thead> breaks markdown tables.
  // Lift it out as a bold caption above the table so the real header row is used.
  container.querySelectorAll("table").forEach((table) => {
    // flatten multi-<p> cells to <br>-separated inline content (valid in md tables)
    table.querySelectorAll("td, th").forEach((cell) => {
      const ps = [...cell.children].filter((c) => c.tagName === "P");
      if (ps.length) {
        cell.innerHTML = ps.map((p) => p.innerHTML.trim()).join("<br>");
      }
    });
    const thead = table.querySelector("thead");
    if (!thead) return;
    const rows = [...thead.querySelectorAll("tr")];
    if (rows.length < 2) return;
    const firstCells = [...rows[0].children];
    // caption row = single cell spanning multiple columns -> lift out as bold text
    if (firstCells.length === 1 && parseInt(firstCells[0].getAttribute("colspan") || "1", 10) > 1) {
      const caption = firstCells[0].textContent.trim();
      rows[0].remove();
      if (caption) {
        const p = doc.createElement("p");
        const b = doc.createElement("strong");
        b.textContent = caption;
        p.appendChild(b);
        const fig = table.closest("figure") || table;
        fig.parentNode.insertBefore(p, fig);
      }
    }
  });

  // remove a redundant leading logo <img> on the home page (logo shown by theme)
  if (wpath === "home") {
    const first = container.querySelector("img");
    if (first && first.getAttribute("src") === "/hrcc.png") first.remove();
  }

  let md = td.turndown(container.innerHTML).trim();
  // collapse 3+ newlines
  md = md.replace(/\n{3,}/g, "\n\n");
  // trim stray leading space in ATX headings ("#  Foo" -> "# Foo")
  md = md.replace(/^(#{1,6}) +/gm, "$1 ");

  const fm = [
    "---",
    `title: "${esc(title)}"`,
    desc ? `description: "${esc(desc)}"` : null,
    `url: "${info.url}"`,
    info.weight != null ? `weight: ${info.weight}` : null,
    created ? `date: ${created}` : null,
    updated ? `lastmod: ${updated}` : null,
    author ? `# original author: ${esc(author)}` : null,
    "---",
    "",
  ].filter((x) => x !== null).join("\n");

  const out = path.join("content", info.file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, fm + md + "\n");
  count++;
  console.log(`${wpath} -> ${out} (${md.length} chars)`);
}
console.log(`\nWrote ${count} pages.`);
