import { defineConfig } from 'windicss/helpers'
import colors from 'windicss/colors'
import typography from 'windicss/plugin/typography'

const config = defineConfig({
  extract: {
    include: [
      './src/components/**/*.{ts,tsx,js,jsx}', 
      './src/pages/**/*.{ts,tsx,js,jsx}'
    ],
    exclude: ['node_modules', '.git', '.next'],
  },
  darkMode: 'class',
  plugins: [typography],
  theme: {
    extend: {
      colors: {
        teal: colors.teal
      }
    }
  }
})

export default config