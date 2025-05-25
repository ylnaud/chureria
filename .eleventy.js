
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import eleventyGoogleFonts from "eleventy-google-fonts";
import htmlmin  from "html-minifier-terser";
import  * as terser from "terser";


export default  function (eleventyConfig) {

  // Minificación HTML solo en producción
  eleventyConfig.addTransform("htmlmin", (content, outputPath) => {
    if (process.env.NODE_ENV === "production" && outputPath?.endsWith(".html")) {
      return htmlmin.minify(content, {
        collapseWhitespace: true,
        removeComments: true,
        minifyJS: true,
        keepClosingSlash: true,
        preserveLineBreaks: false
      });
    }
    return content;
  });

  // Minificación JS solo en producción
  eleventyConfig.addFilter("jsmin", (code) => {
    if (process.env.NODE_ENV === "production") {
      const minified = terser.minify(code);
      if (minified.error) {
        console.log("Terser error: ", minified.error);
        return code;
      }
      return minified.code;
    }
    return code;
  });

  // Configuración de assets (CSS sin procesar)
  eleventyConfig.addPassthroughCopy({
    "src/assets/css": "assets/css",
    // Cambia la ruta de destino de los webfonts
    "node_modules/@fortawesome/fontawesome-free/webfonts": "assets/webfonts",
    // Asegura que el CSS se copie correctamente
    "node_modules/@fortawesome/fontawesome-free/css/all.min.css": "assets/css/fontawesome.css",
    "src/assets/js": "assets/js",
    "src/assets/img": "assets/img",
     "src/assets/img/favicon.ico": "/assets/img/favicon.ico"
  });
  // Plugin de imágenes
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["webp", "jpeg"],
    widths: ["auto"],
    sharpOptions: {
      quality: 80
    }
  });

  // Google Fonts
  eleventyConfig.addPlugin(eleventyGoogleFonts);

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site",
    
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
}