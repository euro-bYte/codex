/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        green: '#034d19',
        'green-accent': '#556b2f',
        yellow: '#ffd580',
        base: '#f4ead5',
        text: '#730019',
      },
    },
  },
  plugins: [],
}
