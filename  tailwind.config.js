module.exports = {
  content: [
    "./src/**/*.{html,js,css,njk,md}",
    "./src/_includes/**/*.{html,js,njk,md}",
  ],
  theme: {
    extend: {},
    theme: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"], // Inter + fallback
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"], // Fuentes del sistema
      },
    },
  },
  plugins: [],
};
