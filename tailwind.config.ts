import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-green": "#02251A",
        "medium-green": "#059669",
        "normal-green": "#3ECC72",
        "light-green": "#E6F2EE",
        "medium-gray": "#E9E9EC",
        "off-white": "#FAFAFB",
        "red-000": "#F15B5B",
        "chart-green": "#DCFCE7",
        "chart-blue": "#DBEAFE",
        "chart-purple": "#E8DEFD",
        "chart-yellow": "#FEF9C3",
        "chart-red": "#FEE2E2",
      },
      boxShadow: {
        sm: "1px 1px 1px 0 rgba(2, 32, 26, 0.1)",
      },
      fontSize: {
        "small-medium": [
          "0.75rem",
          {
            lineHeight: "1rem",
            letterSpacing: "0px",
            fontWeight: "500",
          },
        ],
        "small-spacing": [
          "0.75rem",
          {
            lineHeight: "1rem",
            letterSpacing: "1px",
            fontWeight: "500",
          },
        ],
        "base-normal": [
          "1rem",
          {
            lineHeight: "1.5rem",
            fontWeight: "400",
          },
        ],
        "base-semi": [
          "1rem",
          {
            lineHeight: "1.5rem",
            fontWeight: "600",
          },
        ],
        huge: [
          "2.25rem",
          {
            lineHeight: "2.5rem",
            fontWeight: "700",
          },
        ],
      },
    },
  },
  plugins: [],
};
export default config;
