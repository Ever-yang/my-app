/** @type {import('tailwindcss').Config} */
const { addDynamicIconSelectors } = require('@iconify/tailwind')
const { iconsPlugin, dynamicIconsPlugin } = require('@egoist/tailwindcss-icons')
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [iconsPlugin(), dynamicIconsPlugin()],
}

