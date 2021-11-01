const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  options: {
    safelist: [/data-theme$/],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      // Build your palette here
      transparent: "transparent",
      current: "currentColor",
      gray: colors.trueGray,
      red: colors.red,
      blue: colors.sky,
      yellow: colors.amber,
      rose: colors.rose,
      pink: colors.pink,
      fuchsia: colors.fuchsia,
      purple: colors.purple,
      violet: colors.violet,
      indigo: colors.indigo,
      sky: colors.sky,
      cyan: colors.cyan,
      teal: colors.teal,
      emeral: colors.emerald,
      green: colors.green,
      lime: colors.lime,
      amber: colors.amber,
      orange: colors.orange,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        patienTheme: {
          /* your theme name */
          primary: "#3182CE",
          /* Primary color */
          "primary-focus": "#225b90",
          /* Primary color - focused */
          "primary-content": "#ffffff",
          /* Foreground content color to use on primary color */
          secondary: "#81d4fa",
          /* Secondary color */
          "secondary-focus": "#5a94af",
          /* Secondary color - focused */
          "secondary-content": "#ffffff",
          /* Foreground content color to use on secondary color */
          accent: "#37cdbe",
          /* Accent color */
          "accent-focus": "#2aa79b",
          /* Accent color - focused */
          "accent-content": "#ffffff",
          /* Foreground content color to use on accent color */
          neutral: "#3d4451",
          /* Neutral color */
          "neutral-focus": "#2a2e37",
          /* Neutral color - focused */
          "neutral-content": "#ffffff",
          /* Foreground content color to use on neutral color */
          "base-100": "#ffffff",
          /* Base color of page, used for blank backgrounds */
          "base-200": "#f9fafb",
          /* Base color, a little darker */
          "base-300": "#d1d5db",
          /* Base color, even more darker */
          "base-content": "#1f2937",
          /* Foreground content color to use on base color */
          info: "#2094f3",
          /* Info */
          success: "#009485",
          /* Success */
          warning: "#ff9900",
          /* Warning */
          error: "#ff0000",
          /* Error */
        },
        hospitalTheme: {
          /* your theme name */
          primary: "#43a047",
          "primary-focus": "#2e7031",
          "primary-content": "#ffffff",
          secondary: "#ef5350",
          "secondary-focus": "#a73a38",
          "secondary-content": "#ffffff",
          accent: "#37cdbe",
          /* Accent color */
          "accent-focus": "#2aa79b",
          /* Accent color - focused */
          "accent-content": "#ffffff",
          /* Foreground content color to use on accent color */
          neutral: "#3d4451",
          /* Neutral color */
          "neutral-focus": "#2a2e37",
          /* Neutral color - focused */
          "neutral-content": "#ffffff",
          /* Foreground content color to use on neutral color */
          "base-100": "#ffffff",
          /* Base color of page, used for blank backgrounds */
          "base-200": "#f9fafb",
          /* Base color, a little darker */
          "base-300": "#d1d5db",
          /* Base color, even more darker */
          "base-content": "#1f2937",
          /* Foreground content color to use on base color */
          info: "#2094f3",
          /* Info */
          success: "#009485",
          /* Success */
          warning: "#ff9900",
          /* Warning */
          error: "#ff0000",
          /* Error */
        },
        adminTheme: {
          /* your theme name */
          primary: "#212121",
          "primary-focus": "#9c9c9c",
          "primary-content": "#ffffff",
          secondary: "#ff9ead",
          "secondary-focus": "#ff7a8e",
          "secondary-content": "#ffffff",
          accent: "#37cdbe",
          /* Accent color */
          "accent-focus": "#2aa79b",
          /* Accent color - focused */
          "accent-content": "#ffffff",
          /* Foreground content color to use on accent color */
          neutral: "#3d4451",
          /* Neutral color */
          "neutral-focus": "#2a2e37",
          /* Neutral color - focused */
          "neutral-content": "#ffffff",
          /* Foreground content color to use on neutral color */
          "base-100": "#ffffff",
          /* Base color of page, used for blank backgrounds */
          "base-200": "#f9fafb",
          /* Base color, a little darker */
          "base-300": "#d1d5db",
          /* Base color, even more darker */
          "base-content": "#1f2937",
          /* Foreground content color to use on base color */
          info: "#2094f3",
          /* Info */
          success: "#009485",
          /* Success */
          warning: "#ff9900",
          /* Warning */
          error: "#ff0000",
          /* Error */
        },
      },
    ],
  },
};
