module.exports = {
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindConfig: "./tailwind.config.js",
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  trailingComma: "none",
  // Forza el parser HTML para Nunjucks
  overrides: [
    {
      files: "*.njk",
      options: { parser: "html" },
    },
  ],
};
