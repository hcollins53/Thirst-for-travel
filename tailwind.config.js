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
      midnightBlue: '#2c3e50',
      white2: '#F6F6F6',
      anotherGrey: '#DDD0C8',
      blue: '#408697'

      }
    },
  },
  plugins: [require("daisyui"),
            require('flowbite/plugin')],
  daisyui: {
    themes: [
      {
        mytheme: {
          beige:' #c8b7a6',
          perriwinkle: '#7d94b5',
          dustyRose: '#c29591',
          maroonBrown: '#703f37',
          mutedGreen: '#b6c199',
          paleGray: '#f4f4f4',
          anotherBeige: '#DDD0C8',
          darkGray: '#323232',
          midnightBlue: '#2c3e50',
          white2: '#F6F6F6',
          anotherGrey: '#DDD0C8',
          blue: '#408697'
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
