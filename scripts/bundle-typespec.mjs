// Bundelt TypeSpec-Libraries für den Browser und trägt eine Import Map in index.html ein.
// Aufruf: node scripts/bundle-typespec.mjs   (z. B. als "prebuild"/"prestart" in package.json)
import { createTypeSpecBundle } from "@typespec/bundler";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";

// Libraries, die im Editor verfügbar sein sollen. @typespec/compiler ist Pflicht.
const LIBRARIES = ["@typespec/compiler", "@typespec/http", "@typespec/json-schema"];

const ROOT = process.cwd();
const PUBLIC_DIR = join(ROOT, "public");      // Angular >= 17; bei älteren Projekten: src/assets
const FOLDER = "typespec";                    // -> wird unter /typespec/... ausgeliefert
const URL_PREFIX = `/${FOLDER}`;              // bei <base href="/app/"> entsprechend anpassen
const INDEX_HTML = join(ROOT, "src", "index.html");
const minify = process.argv.includes("--minify");

const imports = {};

for (const lib of LIBRARIES) {
  const bundle = await createTypeSpecBundle(resolve(ROOT, "node_modules", lib), { minify });
  const outDir = join(PUBLIC_DIR, FOLDER, lib);
  for (const file of bundle.files) {
    const target = join(outDir, file.filename);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, file.content);
  }
  // manifest.imports: { ".": "./index.js", "./foo": "./foo.js", ... }
  for (const [key, value] of Object.entries(bundle.manifest.imports)) {
    const specifier = key === "." ? lib : `${lib}/${key.slice(2)}`;
    imports[specifier] = `${URL_PREFIX}/${lib}/${value.slice(2)}`;
  }
  console.log(`✔ ${lib} (${bundle.files.length} Dateien)`);
}

// Import Map inline in index.html einsetzen (externe Import Maps per src= unterstützen Browser nicht).
const START = "<!-- typespec-importmap:start -->";
const END = "<!-- typespec-importmap:end -->";
const block = `${START}\n<script type="importmap">\n${JSON.stringify({ imports }, null, 2)}\n</script>\n${END}`;

let html = await readFile(INDEX_HTML, "utf8");
if (html.includes(START)) {
  html = html.replace(new RegExp(`${START}[\\s\\S]*?${END}`), block);
} else {
  html = html.replace(/<head([^>]*)>/i, (m) => `${m}\n${block}`);
}
await writeFile(INDEX_HTML, html);
console.log(`✔ Import Map in ${INDEX_HTML} aktualisiert`);

