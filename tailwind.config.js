// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A5F',
        secondary: '#E7EBF0',
        accent: '#E2954F',
      },
    },
  },
  plugins: [],
};
