/**
 * @import { Config } from 'tailwindcss'
 */
import { content as _content, plugin } from 'flowbite-react/tailwind'

/** @type {Config} */
export const content = [
  './src/pages/**/*.{ts,tsx}',
  './src/components/**/*.{ts,tsx}',
  './public/**/*.html',
  _content()
]
export const theme = {
  extend: {}
}
export const plugins = [plugin()]
