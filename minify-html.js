const fs = require("fs");
const path = require("path");
const { minify } = require("html-minifier-terser");

async function minifyHTML(dir = "_site") {
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      await minifyHTML(fullPath);
    } else if (stats.isFile() && entry.endsWith(".html")) {
      const html = fs.readFileSync(fullPath, "utf-8");

      try {
        const minified = await minify(html, {
          collapseWhitespace: true,
          removeComments: true,
          minifyJS: true,
          minifyCSS: true,
        });

        fs.writeFileSync(fullPath, minified);
        console.log(`✅ HTML minificado: ${fullPath}`);
      } catch (err) {
        console.error(`❌ Error minificando ${fullPath}:`, err);
      }
    }
  }
}

(async () => {
  await minifyHTML();
})();
