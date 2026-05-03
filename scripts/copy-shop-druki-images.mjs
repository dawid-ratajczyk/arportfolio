/**
 * Kopiuje JPG z Desktop/SHOPIFY → portfolio/images/shop-druki/<slug>.jpg
 * Uruchom z katalogu portfolio: node scripts/copy-shop-druki-images.mjs
 *
 * Wyjątek: On the Moon 1 — trzymaj w repo `images/shop-druki/on-the-moon-1.png` (nie kopiujemy z SHOPIFY).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORTFOLIO_ROOT = path.join(__dirname, "..");
const DST = path.join(PORTFOLIO_ROOT, "images", "shop-druki");
const SRC = "C:/Users/bruno/OneDrive/Desktop/SHOPIFY";

/** Nazwa pliku w SHOPIFY (dokładnie jak na dysku) → slug pliku docelowego */
const MAP = [
  ["Absolute garavitas.jpg", "absolute-gravitas.jpg"],
  ["Apokalipsa.jpg", "apocalypse.jpg"],
  ["Canyon space.jpg", "canyon-space.jpg"],
  ["cubicspace.jpg", "cubic-space.jpg"],
  ["cubicspace3.jpg", "cubic-space-3.jpg"],
  ["cubicspace4.jpg", "cubic-space-4.jpg"],
  ["cum vanitas.jpg", "cum-vanitas.jpg"],
  ["Dome of imaginations.jpg", "dome.jpg"],
  ["Elatio in nihilum.jpg", "elatio-in-nihilum.jpg"],
  ["EntropySpace.jpg", "entropy-space.jpg"],
  ["EntropySpace2.jpg", "entropy-space-2.jpg"],
  ["Faallingspace.jpg", "falling-space.jpg"],
  ["Fate vanity copy.jpg", "fate-vanity.jpg"],
  ["Footprint.jpg", "footprint.jpg"],
  ["Goterdammerung.jpg", "gotterdammerung.jpg"],
  ["gravitas inanis.jpg", "gravitas-inanis.jpg"],
  ["Holespace.jpg", "space-hole.jpg"],
  ["Inside space.jpg", "inside-space.jpg"],
  ["interitius fatum.jpg", "interitus-fatum.jpg"],
  ["landingspace.jpg", "landing-space.jpg"],
  ["lost pyramid.jpg", "lost-pyramid.jpg"],
  ["Melancholia.jpg", "melancholy.jpg"],
  ["Memory of space.jpg", "memory-of-space.jpg"],
  ["Moon space.jpg", "moon-space.jpg"],
  ["onthemoon2.jpg", "on-the-moon-2.jpg"],
  ["Outward search.jpg", "outward-search.jpg"],
  ["pyramid.jpg", "pyra.jpg"],
  ["pyramidspace.jpg", "pyramid-space.jpg"],
  ["pyramidspace3.jpg", "pyramid-space-3-2.jpg"],
  ["solium spatium.jpg", "solium-spatium.jpg"],
  ["squarespace.jpg", "square-space.jpg"],
  ["tempus forma.jpg", "tempus-forma.jpg"],
  ["Trianglespace.jpg", "triangle-space.jpg"],
  ["Ultimus spiritus.jpg", "ultimus-spiritus.jpg"],
  ["UmbraGloriae.jpg", "laokoon.jpg"],
  ["Vanum sprut.jpg", "vanum-spurt.jpg"],
  ["zen space.jpg", "zen-space.jpg"],
];

function findSourceFile(baseDir, exact) {
  const p = path.join(baseDir, exact);
  if (fs.existsSync(p)) return p;
  return null;
}

function findByPrefix(baseDir, prefix) {
  const names = fs.readdirSync(baseDir);
  const re = new RegExp(`^${prefix}`, "i");
  const hit = names.find((n) => re.test(n) && /\.jpe?g$/i.test(n));
  return hit ? path.join(baseDir, hit) : null;
}

fs.mkdirSync(DST, { recursive: true });

let n = 0;
for (const [srcName, destName] of MAP) {
  const from = findSourceFile(SRC, srcName);
  if (!from) {
    console.error("Brak pliku:", srcName);
    process.exitCode = 1;
    continue;
  }
  fs.copyFileSync(from, path.join(DST, destName));
  n++;
}

const st = findByPrefix(SRC, "Sta");
const xi = findByPrefix(SRC, "xi");
if (!st) {
  console.error("Brak pliku Sta*.jpg (Stańczyki)");
  process.exitCode = 1;
} else {
  fs.copyFileSync(st, path.join(DST, "stanczyki.jpg"));
  n++;
}
if (!xi) {
  console.error("Brak pliku xi*.jpg (Xiega)");
  process.exitCode = 1;
} else {
  fs.copyFileSync(xi, path.join(DST, "xiega.jpg"));
  n++;
}

console.log("Skopiowano", n, "plików do", DST);
