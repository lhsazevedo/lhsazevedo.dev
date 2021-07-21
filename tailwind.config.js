const colors = require('tailwindcss/colors')

// tailwind.config.js
module.exports = {
  purge: [
    './index.md',
    './posts/*.md',
    './.vitepress/**/*.{vue,js,ts,jsx,tsx}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    // colors: {
    //   gray: colors.blueGray
    // },
    extend: {
      // colors: {
      //   gray: colors.blueGray
      // },
      typography: (theme) => ({
        // DEFAULT: {
        //   css: {
        //     color: theme('colors.gray.500'),
        //     // ...
        //   },
        // },
        xl: {
          css: {
            color: theme('colors.gray.700'),
            // ...
          },
        }
      }),
    },
  },
  variants: {
    // extend: {
    //   display: ['group-hover'],
    // }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}