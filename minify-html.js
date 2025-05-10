const fs = require("fs");
const path = require("path");
const { minify } = require("html-minifier-terser");

async function minifyAllHtml(dir = "_site") {
  const entries = fs.readdirSync(dir);

  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      await minifyAllHtml(fullPath);
    } else if (stats.isFile() && entry.endsWith(".html")) {
      const html = fs.readFileSync(fullPath, "utf-8");
      try {
        const minified = await minify(html, {
          collapseWhitespace: true,
          removeComments: true,
          minifyCSS: true,
          minifyJS: true,
        });
        fs.writeFileSync(fullPath, minified);
        console.log("✅ Minificado:", fullPath);
      } catch (err) {
        console.error("❌ Error:", fullPath, err);
      }
    }
  }
}

minifyAllHtml();
