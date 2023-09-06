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
        white: '#FDFDFD',
        brown: '#B97246',
        blue: '#2F3E46',
        green: '#37AD28',
        greenttl: '#1E670B',
        cyan: '#3BB697',
        greenbtn: '#347E32',
        gray: '#8D8D8D',
        graybg: '#F3F3F3'
      }
    },
  },
  plugins: [],
}

