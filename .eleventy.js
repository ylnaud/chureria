import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import eleventyGoogleFonts from "eleventy-google-fonts";
import htmlmin from "html-minifier-terser";
import * as terser from "terser";

// Texto con caracteres en español (incluye acentos)
const fontText = "AÁÉÍÓÚÜÑaáéíóúüñBbCcDdEeFfGgHhIiJjKkLlMmNnÑñOoPpQqRrSsTtUuVvWwXxYyZz0123456789";

// Configuración de Google Fonts
const googleFonts = {
  fonts: [
    {
      family: "Poppins",
      variants: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
      subsets: ["latin"],
      display: "swap"
    }
  ],
  formats: ["woff2"],
  text: fontText  // Usa el texto con acentos aquí
};

export default function (eleventyConfig) {
  // 1. Plugins
  eleventyConfig.addPlugin(eleventyGoogleFonts, googleFonts);
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["webp", "jpeg"],
    widths: ["auto"],
    sharpOptions: { quality: 80 }
  });

  // 2. Transformaciones
  eleventyConfig.addTransform("htmlmin", (content, outputPath) => {
    if (process.env.NODE_ENV === "production" && outputPath?.endsWith(".html")) {
      return htmlmin.minify(content, {
        collapseWhitespace: true,
        removeComments: true,
        minifyJS: true,
        minifyCSS: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        preserveLineBreaks: false,
        removeOptionalTags: true,
        caseSensitive: true
      });
    }
    return content;
  });

  // 3. Filtros
  eleventyConfig.addFilter("jsmin", async (code) => {
    if (process.env.NODE_ENV === "production") {
      try {
        const minified = await terser.minify(code, {
          compress: { drop_console: true },
          mangle: true
        });
        return minified.code || code;
      } catch (err) {
        console.error("Terser error: ", err);
        return code;
      }
    }
    return code;
  });

  // 4. Shortcodes
  eleventyConfig.addShortcode("googleFonts", () => {
      const encodedText = encodeURIComponent(fontText);
    return `
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link rel="preload" 
            href="https://fonts.googleapis.com/css2?family=Monoton&family=Noto+Color+Emoji&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap&text=${encodedText}" 
            as="style"
            onload="this.onload=null;this.rel='stylesheet'">
      <noscript>
        <link rel="stylesheet" 
              href="https://fonts.googleapis.com/css2?family=Monoton&family=Noto+Color+Emoji&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap&text=${encodedText}">
      </noscript>
    `;
  });

  // 5. Passthrough Copies
  
  eleventyConfig.addPassthroughCopy({
    
    "src/assets/css": "assets/css",
    "node_modules/@fortawesome/fontawesome-free/webfonts": "assets/webfonts",
    "node_modules/@fortawesome/fontawesome-free/css/all.min.css": "assets/css/fontawesome.css",
    "src/assets/js": "assets/js",
    "src/assets/favicon.ico": "/assets/favicon.ico",
  });

  // 6. Configuración final
  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html", "11ty.js"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
}
