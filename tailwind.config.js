/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00563B",   // green
        primaryDark: "#00452F",
        background: "#F9FAFB",
        card: "#FFFFFF",
        textMain: "#111827",
        textSub: "#6B7280",
      },
      borderRadius: {
        xl2: "1rem",
      }
    },
  },
  plugins: [],
}