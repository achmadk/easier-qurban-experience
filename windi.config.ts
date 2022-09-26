import { defineConfig } from 'windicss/helpers'
import colors from 'windicss/colors'
import typography from 'windicss/plugin/typography'
import flowbitePlugin from 'flowbite/plugin'

const config = defineConfig({
  extract: {
    include: [
      './src/components/**/*.{ts,tsx,js,jsx}', 
      './src/pages/**/*.{ts,tsx,js,jsx}',
      'node_modules/flowbite-react/**/*.{ts,tsx,js,jsx}'
    ],
    exclude: ['node_modules', '.git', '.next'],
  },
  darkMode: 'class',
  plugins: [typography, flowbitePlugin],
  theme: {
    extend: {
      colors: {
        teal: colors.teal
      }
    }
  }
})

export default config