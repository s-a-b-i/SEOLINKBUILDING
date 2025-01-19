/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/layouts/**/*.{js,jsx,ts,tsx}",
    "./index.html"
  ],
  theme: {
    extend: {
      colors: {
        'foundations-primary': '#3D52A0',
        'foundations-secondary': '#7091E6',
        'foundations-tertiary': '#8697C4',
        'foundations-hover': '#ADBBDA',
        'foundations-light': '#EDE8F5',
        'foundations-dark': '#1E2838',
      },
    },
  },
  plugins: [],
}