const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
const eleventyGoogleFonts = require("eleventy-google-fonts");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets/");
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    // output image formats
    formats: ["avif", "webp", "jpeg"],

    // output image widths
    widths: ["auto"],

    // optional, attributes assigned on <img> nodes override these values
    htmlOptions: {
      imgAttributes: {
        loading: "lazy",
        decoding: "async",
      },
      pictureAttributes: {},
    },
  });
  // Crear un shortcode para generar CSS en línea de Google Fonts
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
