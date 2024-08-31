/* eslint-disable @typescript-eslint/no-var-requires */
import { resolve, join, dirname } from 'path'
import glob from 'glob'
import { fileURLToPath } from 'url'

import withPlugins from 'next-compose-plugins'
import withPWA from 'next-pwa'
import optimizedImages from 'next-optimized-images'
// const WindiCSSWebpackPlugin = require('windicss-webpack-plugin')
import CompressionWebpackPlugin from 'compression-webpack-plugin'
import PurgeFontawesomePlugin from 'purge-fontawesome/webpack-plugin.js'

const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = dirname(__filename) // get the name of the directory
const isProduction = process.env.NODE_ENV === 'production'
const isNextExportCommand = process.env.NEXT_EXPORT_COMMAND === 'true'

const nextConfigurations = {
  experimental: {
    // fallbackNodePolyfills: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        port: '',
        hostname: 'floatui.com'
      },
      {
        protocol: 'https',
        port: '',
        hostname: '**.clerk.dev'
      },
      {
        protocol: 'https',
        port: '',
        hostname: '**.clerk.com'
      }
    ],
    ...(isNextExportCommand
      ? {
          loader: 'akamai',
          unoptimized: true,
          path: '/'
        }
      : {})
  },
  ...(isNextExportCommand
    ? {
        exportPathMap: async () => ({
          '/': { page: '/' }
        })
      }
    : {}),
  webpack(config) {
    config.resolve.alias['@$'] = resolve(__dirname, 'src')
    config.resolve.alias['linaria/loader'] = '@linaria/webpack-loader'
    if (isProduction) {
      config.plugins.push(
        new CompressionWebpackPlugin({
          test: /\.(js|css|html|svg)$/
        })
      )
      config.plugins.push(
        new PurgeFontawesomePlugin({
          paths: [glob.sync(join(__dirname, 'src/**/*'), { nodir: true })]
        })
      )
    }
    return config
  },
  ...(isProduction
    ? {
        eslint: {
          ignoreDuringBuilds: true
        },
        pwa: {
          dest: 'public',
          maximumFileSizeToCacheInBytes: 8 * 1024 * 1024
        },
        swcMinify: true
      }
    : {})
}

export default withPlugins(
  [...(isNextExportCommand ? [optimizedImages] : []), ...(isProduction ? [withPWA] : [])],
  nextConfigurations
)
