/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        color1: '#AFDDE5',
        color2:'#0FA4AF',
        color3:'#964734',
        color4:'#024950',
        color5:'#003135'
      },
    },
  },
  plugins: [],
}

