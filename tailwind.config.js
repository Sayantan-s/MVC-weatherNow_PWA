const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily : {
        'body' : ['Nunito']
      },
    },
    colors: {
      ...colors,
      weather : {
        yellow : '#FFBD50',
        blue : {
          light : '#E5E8FE',
          medium : '#A2ACFF',
          dark : '#333866'
        },
        grey : '#ADB1CC'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
