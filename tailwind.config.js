// eslint-disable-next-line @typescript-eslint/no-var-requires
const flowbitePlugin = require('flowbite/plugin') 

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./public/**/*.html",
    "./node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbitePlugin
  ],
}

