module.exports = {
  content: [
    "./src/**/*.{html,js,njk,md}",
    "./src/_data/**/*.{html,js,njk,md,json}",
    "./src/_includes/**/*.{html,js,njk,md}",
  ],
  theme: {
    extend: {},
    theme: {
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"], // Inter + fallback
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"], // Fuentes del sistema
      },
    },
  },
  plugins: [],
};
