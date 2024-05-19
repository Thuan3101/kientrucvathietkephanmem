/** @type {import('tailwindcss').Config} */
export default {
  // corePlugins: {
  //   preflight: false,
  // },
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      colors: {
        "primary": "var(--primary)",
        "primary-soft": "var(--primary-soft)",
        "primary-dark": "var(--primary-dark)",
        "text-soft": "var(--text-soft)",
        "text-primary": "var(--text-primary)",
        "text-dark": "var(--text-dark)",
      },
    },
  },
  plugins: [],
};
