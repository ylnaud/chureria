const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
const eleventyGoogleFonts = require("eleventy-google-fonts");

module.exports = function (eleventyConfig) {
  // Configuración para copiar los archivos
  eleventyConfig.addPassthroughCopy({
    "node_modules/@fortawesome/fontawesome-free/webfonts": "assets/webfonts",
    "node_modules/@fortawesome/fontawesome-free/css/all.min.css":
      "assets/css/fontawesome.css",
  });

  eleventyConfig.addPassthroughCopy("src/assets");

  // Resto de tu configuración...
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["webp", "jpeg"],
    widths: ["auto"],
    htmlOptions: {
      imgAttributes: {
        loading: "lazy",
        decoding: "async",
      },
      pictureAttributes: {},
    },
  });

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
    dataTemplateEngine: "njk",
  };
};
