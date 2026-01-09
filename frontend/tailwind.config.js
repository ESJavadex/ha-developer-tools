/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ha-primary': '#03a9f4',
        'ha-secondary': '#0288d1',
        'ha-background': '#1c1c1c',
        'ha-surface': '#252525',
        'ha-card': '#303030',
      },
    },
  },
  plugins: [],
}
