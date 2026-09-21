import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FBFAFE",
        surface: "#FFFFFF",
        ink: {
          DEFAULT: "#1C1B29",
          muted: "#645F73",
          soft: "#948FA3",
        },
        border: "#ECE8F6",

        // Primary brand color
        accent: {
          DEFAULT: "#6D5BF0",
          dark: "#5142C9",
          soft: "#EEEAFE",
        },

        // Secondary palette used for tool badges, illustrations, and
        // playful accents around the site. Keep class names literal
        // wherever used so Tailwind's scanner can pick them up.
        coral: {
          DEFAULT: "#FF6B5B",
          soft: "#FFE7E3",
        },
        amber: {
          DEFAULT: "#FFA83E",
          soft: "#FFEEDA",
        },
        teal: {
          DEFAULT: "#15B79E",
          soft: "#DCF6F1",
        },
        pink: {
          DEFAULT: "#FF63A5",
          soft: "#FFE4F0",
        },
        sky: {
          DEFAULT: "#3E9DFF",
          soft: "#E1F0FF",
        },
      },
      fontFamily: {
        display: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "72rem",
        prose: "42rem",
      },
      borderRadius: {
        card: "16px",
        pill: "999px",
      },
      boxShadow: {
        soft: "0 2px 10px -2px rgba(28, 27, 41, 0.06), 0 8px 24px -8px rgba(28, 27, 41, 0.08)",
        lift: "0 8px 24px -6px rgba(109, 91, 240, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
