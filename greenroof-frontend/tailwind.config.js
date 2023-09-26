/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        ss: '350px',
        sm: '414px',
        tb: '1022px',
        md: '724px'
      },
      colors: {
        darkbg: '#0F0F0F',
        darkprimary:'#363636',
        darktext: '#ffffff',
        darksecondary: '#aaaaaa',
        black: '#222A22',
        white: '#FDFDFD',
        brown: '#B97246',
        blue: '#2F3E46',
        bluebg: '#D1F1FF',
        green: '#37AD28',
        greenbg :'#EBFFE8',
        greenttl: '#1E670B',
        cyan: '#3BB697',
        greenbtn: '#347E32',
        gray: '#8D8D8D',
        graylt: '#d3d3d3',
        graybg: '#F3F3F3',
        red:'#FF0000'
      }
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}

