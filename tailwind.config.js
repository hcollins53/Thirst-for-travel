/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Pacifico']
      }, 
      colors: {
      timberwolf: '#D8D5D3ff',
      lion: '#BE8E71ff',
      silver: '#CCBEB8ff',
      aliceBlue: '#DAE7EDff',
      blue: '#57819Cff'
      }
    },
  },
  plugins: [],
}
