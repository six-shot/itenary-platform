/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        neutral_300: "var(--neutral_300)",
        black_secondary: "var(--black-secondary)",
        secondary: "var(--secondary)",
        secondary_900: "var(--secondary-900)",
        primary_100: "var(--primary-100)",
        neutral_500: "var(--neutral-500)",
        primary_1100: "var(--primary-1100)",
        black_primary: "var(--black-primary)",
        primary_600: "var(--primary-600)",
      },
      screens: {
        
        1920: "1920px", // Optional custom breakpoint
      },
    },
  },
  plugins: [],
};
