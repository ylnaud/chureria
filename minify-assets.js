const fs = require("fs");
const path = require("path");
const { minify } = require("terser");
const CleanCSS = require("clean-css");
const htmlMinifier = require("html-minifier-terser").minify;

const INPUT_DIR = "src/assets";
const OUTPUT_DIR = "_site/assets";

// Asegura que los subdirectorios existen
function ensureDirSync(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Procesar archivos recursivamente
function processFiles(dir, relative = "") {
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const relPath = path.join(relative, entry);
    const outputPath = path.join(OUTPUT_DIR, relPath);

    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      ensureDirSync(outputPath);
      processFiles(fullPath, relPath);
    } else if (stats.isFile()) {
      const ext = path.extname(entry);
      const content = fs.readFileSync(fullPath, "utf-8");

      (async () => {
        let minified;
        try {
          if (ext === ".js") {
            minified = (await minify(content)).code;
          } else if (ext === ".css") {
            minified = new CleanCSS().minify(content).styles;
          } else if (ext === ".html") {
            minified = await htmlMinifier(content, {
              collapseWhitespace: true,
              removeComments: true,
              minifyCSS: true,
              minifyJS: true,
            });
          } else {
            return fs.copyFileSync(fullPath, outputPath);
          }

          fs.writeFileSync(outputPath, minified);
          console.log(`✅ Minificado: ${relPath}`);
        } catch (err) {
          console.error(`❌ Error minificando ${relPath}:`, err);
        }
      })();
    }
  }
}

ensureDirSync(OUTPUT_DIR);
processFiles(INPUT_DIR);
