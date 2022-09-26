/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve, join } = require('path')
const glob = require('glob')

const withPlugins = require('next-compose-plugins')
const withPWA = require('next-pwa')
const optimizedImages = require('next-optimized-images')
const WindiCSSWebpackPlugin = require('windicss-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const PurgeFontawesomePlugin = require('purge-fontawesome/webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'
const isNextExportCommand = process.env.NEXT_EXPORT_COMMAND === 'true'

const nextConfigurations = {
  // experimental: {
  //   fallbackNodePolyfills: false,
  // },
  images: {
    domains: ['www.floatui.com', 'images.clerk.dev'],
    ...(isNextExportCommand ? {
      loader: 'akamai',
      unoptimized: true,
      path: '/'
    } : {})
  },
  ...(isNextExportCommand ? {
    exportPathMap: async () => ({
      '/': { page: '/' }
    })
  } : {}),
  webpack(config) {
    config.resolve.alias['@$'] = resolve(__dirname, 'src')
    config.resolve.alias['linaria/loader'] = '@linaria/webpack-loader'
    config.plugins.push(
      new WindiCSSWebpackPlugin()
    )
    if (isProduction) {
      config.plugins.push(
        new CompressionWebpackPlugin({
          test: /\.(js|css|html|svg)$/
        })
      )
      config.plugins.push(
        new PurgeFontawesomePlugin({
          paths: [
            glob.sync(join(__dirname, 'src/**/*'), { nodir: true })
          ]
        })
      )
    }
    return config
  },
  ...(isProduction ? {
    eslint: {
      ignoreDuringBuilds: true,
    },
    pwa: {
      dest: 'public',
      maximumFileSizeToCacheInBytes: 8 * 1024 * 1024
    },
    swcMinify: true,
  } : {})
}

module.exports = withPlugins([
  ...(isNextExportCommand ? [optimizedImages] : []),
  ...(isProduction ? [withPWA] : [])
], nextConfigurations)