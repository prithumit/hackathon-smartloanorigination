const path = require('path')
const fs = require('fs')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const key = fs.readFileSync('./src/config/certificates/server.key')
const certificate = fs.readFileSync('./src/config/certificates/server.cert')
const globalSassFiles = [
  '~@/themes/default/_variables.scss',
  '~@/themes/default/_mixins.scss',
  '~@/themes/default/defaultColorPalette.scss',
  '~@/themes/custom/_variables.scss',
  '~@/themes/custom/customColorPalette.scss'
]

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@/': path.resolve(__dirname, 'src')
      }
    },
    module: {
      rules: [{
        type: 'javascript/auto',
        test: /\.json$/,
        include: /appConfiguration.json/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '_config/_app/[name].[ext]'
            }
          }
        ]
      }]
    },
    /* plugins: [
      new ZipFilesPlugin({
        entries: [
          { src: path.join(__dirname, 'dist'), dist: 'DOB_App' },
        ],
        output: path.join(__dirname, 'DOB_App'),
        format: 'zip',
      }),
      new CopyWebpackPlugin([
        { from: 'src/_config', to: '_config' },
        { from: 'server', to: 'server' },
        { from: 'mocks', to: 'mocks' },
        { from: '.env.prod', to: '.env.prod' },
        { from: 'start.bat', to: 'start.bat' },
        { from: 'stop.bat', to: 'stop.bat' },
        { from: 'start.sh', to: 'start.sh' },
        { from: 'stop.sh', to: 'stop.sh' },
      ]),
    ], */
    // entry: {
    //   main: path.resolve(__dirname, 'src/main.js')
    // },
    optimization: {
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name (module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
              return `npm.${packageName.replace('@', '')}`
            }
          }
        }
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: globalSassFiles.map(src => `@import "${src}";`).join('\n')
      }
    }
  },
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'test') {
      const sassRule = config.module.rule('sass')
      const scssRule = config.module.rule('scss')
      scssRule.uses.clear()
      sassRule.uses.clear()
      scssRule.use('null-loader').loader('null-loader')
      sassRule.use('null-loader').loader('null-loader')
    }
    ['vue-modules', 'vue', 'normal-modules', 'normal'].forEach((match) => {
      config.module.rule('sass').oneOf(match).use('sass-loader')
        .tap(opt => Object.assign(opt, {
          prependData: globalSassFiles.map(src => `@import "${src}"`).join('\n')
        }))
    })
  },
  devServer: {
    disableHostCheck: true,
    // Remove for disabling https - Client
    https: {
      key,
      cert: certificate
    }
  },
  transpileDependencies: [
    'vuetify', 'vuex'
  ],
  lintOnSave: true
}
