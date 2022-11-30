module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      antonio: ["Antonio", "sans-serif"],
      spartan: ["League Spartan", "sans-serif"],
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      gray: {
        500: "#838391",
        700: "#38384F",
      },
      blue: {
        400: "#2d68f0",
        500: "#419EBB",
      },
      violet: "#6D2ED5",
      yellow: "#EDA249",
      black: "#070724",
      orange: "#CD5120",
      green: "#1EC1A2",
      red: {
        500: "#D83A34",
        600: "#D14C32",
      },
    },
  },
  extends: {
    backgroundImage: {
      "hero-pattern": "url('/img/hero-pattern.svg')",
    },
  },
  plugins: [],
};
