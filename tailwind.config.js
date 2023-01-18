const defaultTheme = require("tailwindcss/defaultTheme");
const wildConfig = require("./tailwind.config.podcast.js");

module.exports = {
  presets: [wildConfig.preset],
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
    },
    colors: {
      white: "#ffffff",
      black: "#000000",
      red: "#FF0000",
      lightgrey: "#999999",
      grey: "#252525",
      transparent: "transparent",
    },
    fontFamily: {
      sans: ["KristallNow Pro", ...defaultTheme.fontFamily.sans],
      serif: ["SchadowBT", ...defaultTheme.fontFamily.serif],
      grotesk: ["RundGrotesk", ...defaultTheme.fontFamily.sans],
    },
    fontSize: {
      12: [wildConfig.utils.pxRem(12), 1.5],
      14: [wildConfig.utils.pxRem(14), 1.2],
      16: [wildConfig.utils.pxRem(16), 1.5],
      base: [wildConfig.utils.pxRem(18), 1.5],
      20: [wildConfig.utils.pxRem(20), 1.05],
      24: [wildConfig.utils.pxRem(24), 1.25],
      32: [wildConfig.utils.pxRem(32), 1.2],
      40: [wildConfig.utils.pxRem(40), 1.2],
      60: [wildConfig.utils.pxRem(60), 1.07],
      72: [wildConfig.utils.pxRem(72), 1.07],
      100: [wildConfig.utils.pxRem(100), 1],
      300: [wildConfig.utils.pxRem(300), 1],
      500: [wildConfig.utils.pxRem(500), 1],
    },
  },
};
