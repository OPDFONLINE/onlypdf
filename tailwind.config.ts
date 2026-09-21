import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F3F4EF",
        surface: "#FFFFFF",
        ink: {
          DEFAULT: "#14181C",
          muted: "#586067",
          soft: "#8B929A",
        },
        accent: {
          DEFAULT: "#2B5F5C",
          dark: "#1E4744",
          soft: "#E1ECEA",
        },
        border: "#E1E3DC",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-plex)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "72rem",
        prose: "42rem",
      },
      borderRadius: {
        card: "10px",
      },
    },
  },
  plugins: [],
};

export default config;
