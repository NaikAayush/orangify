/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "Brand/Thistle": "#DBBFD5",
        "Brand/Lilac": "#BFA2CA",
        "Brand/Cameo Pink": "#E6B8D0",
        "Brand/Champagne Pink": "#F5D8CB",
        "Brand/Champagne": "#F5E9D3",
        "Brand/Tea Green": "#D8E5C9",
        "Accent/Success/100": "#53D258",
        "Accent/Success/80": "#75DB79",
        "Accent/Success/60": "#98E49B",
        "Accent/Success/40": "#BAEDBC",
        "Accent/Success/20": "#DDF6DE",
        "Accent/Error/100": "#E25C5C",
        "Accent/Error/80": "#E87D7D",
        "Accent/Error/60": "#EE9D9D",
        "Accent/Error/40": "#F3BEBE",
        "Accent/Error/0": "#F9DEDE",
        "Base/100": "#242424",
        "Base/80": "#707070",
        "Base/60": "#A0A0A0",
        "Base/40": "#CFCFCF",
        "Base/20": "#F3F3F3",
        "Base/0": "#FFFFFF",
      },
    },
    fontFamily: {
      rogerex: "Rogerex",
      inter: "Inter",
    },
    backgroundImage: {
      welcome: "url('./assets/welcome/bg.png')",
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
