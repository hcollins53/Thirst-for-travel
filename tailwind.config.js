/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Satisfy']
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
  plugins: [require("daisyui"),
            require('flowbite/plugin')],
  daisyui: {
    themes: [
      {
        mytheme: {
          timberwolf: '#D8D5D3ff',
          lion: '#BE8E71ff',
          silver: '#CCBEB8ff',
          aliceBlue: '#DAE7EDff',
          blue: '#57819Cff',
        },
      },
    ],
    styled: true,
    themes: true,
    base: false,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
}
