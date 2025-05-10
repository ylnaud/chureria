const fs = require("fs");
const path = require("path");
const { minify } = require("html-minifier-terser");

async function minifyHTML(dir = "src") {
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      await minifyHTML(fullPath);
    } else if (stats.isFile() && entry.endsWith(".html")) {
      const relPath = path.relative("src", fullPath);
      const outputPath = path.join("_site", relPath);
      const html = fs.readFileSync(fullPath, "utf-8");

      try {
        const minified = await minify(html, {
          collapseWhitespace: true,
          removeComments: true,
          minifyJS: true,
          minifyCSS: true,
        });

        const dirOut = path.dirname(outputPath);
        fs.mkdirSync(dirOut, { recursive: true });
        fs.writeFileSync(outputPath, minified);
        console.log(`✅ HTML minificado: ${relPath}`);
      } catch (err) {
        console.error(`❌ Error minificando ${relPath}:`, err);
      }
    }
  }
}

(async () => {
  await minifyHTML();
})();
