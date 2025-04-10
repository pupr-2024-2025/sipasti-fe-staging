/** @type {import('tailwindcss').Config} */
const colors = require("./src/styles/colors"); // Adjust the path here

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: {
          light: {
            background: colors.Surface.Light.Background,
            overlay: colors.Surface.Light.Background_Overlay,
            outline: colors.Surface.Light.Outline,
          },
        },
        emphasis: {
          on_surface: {
            high: colors.Emphasis.Light.On_Surface.High,
            medium: colors.Emphasis.Light.On_Surface.Medium,
            small: colors.Emphasis.Light.On_Surface.Small,
          },
          on_color: {
            high: colors.Emphasis.Light.On_Color.High,
            medium: colors.Emphasis.Light.On_Color.Medium,
            small: colors.Emphasis.Light.On_Color.Small,
          },
        },
        solid: colors.Solid,
        custom: {
          red: colors.Solid.Basic.Red,
          blue: colors.Solid.Basic.Blue,
          neutral: colors.Solid.Basic.Neutral,
          green: colors.Solid.Basic.Green,
          yellow: colors.Solid.Basic.Yellow,
          Error: colors.Solid.Basic.Error,
        },
      },
      // fontFamily: {
      //   'poppins': ['Poppins', 'sans-serif'],
      // },
      fontSize: {
        // Headline Styles
        H1: ["3.5rem", { lineHeight: "4rem", fontWeight: "700" }], // 56px
        H2: ["3rem", { lineHeight: "3.5rem", fontWeight: "700" }], // 48px
        H3: ["2.5rem", { lineHeight: "3rem", fontWeight: "700" }], // 40px
        H4: ["2rem", { lineHeight: "2.5rem", fontWeight: "700" }], // 32px
        H5: ["1.5rem", { lineHeight: "2rem", fontWeight: "800" }], // 24px
        H6: ["1rem", { lineHeight: "1.5rem", fontWeight: "700" }], // 16px

        // Body Styles
        B1: ["1rem", { lineHeight: "1.5rem", fontWeight: "400" }], // 16px
        B2: ["0.875rem", { lineHeight: "1.25rem", fontWeight: "400" }], // 14px

        // Button Styles
        ExtraLarge: ["1.5rem", { lineHeight: "2rem", fontWeight: "400" }], // 24px
        Large: ["1.313rem", { lineHeight: "1.75rem", fontWeight: "400" }], // 21px
        Medium: ["1.125rem", { lineHeight: "1.75rem", fontWeight: "400" }], // 18px
        Small: ["0.938rem", { lineHeight: "1.25rem", fontWeight: "400" }], // 15px
        ExtraSmall: ["0.75rem", { lineHeight: "1rem", fontWeight: "400" }], // 12px

        // Other Styles
        Caption: [
          "0.75rem",
          {
            lineHeight: "1.25rem",
            fontWeight: "400",
            letterSpacing: "0.025em",
          },
        ], // 12px
        Overline: [
          "0.625rem",
          {
            lineHeight: "1.125rem",
            fontWeight: "400",
            letterSpacing: "0.094em",
          },
        ], // 10px
      },
    },
  },
  plugins: [],
};
