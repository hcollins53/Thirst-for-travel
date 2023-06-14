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
        beige:' #c8b7a6',
        perriwinkle: '#7d94b5',
        dustyRose: '#c29591',
        maroonBrown: '#703f37',
        mutedGreen: '#b6c199',
        paleGray: '#f4f4f4',
      anotherBeige: '#DDD0C8',
      darkGray: '#323232',
      midnightBlue: '#2c3e50'

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
