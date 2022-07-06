const { resolve } = require('path')

const withPlugins = require('next-compose-plugins')
const withPWA = require('next-pwa')
const optimizedImages = require('next-optimized-images')
// const withLinaria = require('next-linaria')
const WindiCSSWebpackPlugin = require('windicss-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

console.log(process.env.NEXT_EXPORT_COMMAND, typeof process.env.NEXT_EXPORT_COMMAND)

const isProduction = process.env.NODE_ENV === 'production'
const isNextExportCommand = process.env.NEXT_EXPORT_COMMAND === 'true'

console.log(isNextExportCommand)

const nextConfigurations = {
  images: {
    domains: ['www.floatui.com'],
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
    }
    return config
  },
  ...(isProduction ? {
    eslint: {
      ignoreDuringBuilds: true,
    },
    pwa: {
      dest: 'public'
    },
    swcMinify: true,
  } : {})
}

module.exports = withPlugins([
  ...(isNextExportCommand ? [optimizedImages] : []),
  ...(isProduction ? [withPWA] : [])
], nextConfigurations)