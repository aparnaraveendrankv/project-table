module.exports = {
  mode: "jit",
  content: [
    "./src/**/**/*.{js,ts,jsx,tsx,html,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,html,mdx}",
  ],
  darkMode: "class",
  theme: {
    screens: { md: { max: "1050px" }, sm: { max: "550px" } },
    extend: {
      colors: {
        gray: {
          100: "#f4f4f4",
          300: "#dddddd",
          500: "#9c9c9c",
          600: "#6c6c6c",
          "500_01": "#999999",
        },
        black: { 900: "#000000" },
        blue: { A400: "#157afe" },
        white: { A700: "#ffffff" },
      },
      fontFamily: { poppins: "Poppins" },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
