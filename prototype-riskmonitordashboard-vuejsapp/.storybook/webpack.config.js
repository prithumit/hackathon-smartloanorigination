const path = require('path')
const rootPath = path.resolve(__dirname, '../src')

module.exports = async ({ config }) => {
  config.resolve.alias['~storybook'] = path.resolve(__dirname)
  config.resolve.alias['@'] = rootPath
  config.resolve.alias['~'] = rootPath

  config.module.rules.push({
    resourceQuery: /blockType=story/,
    loader: 'vue-storybook',
  })

  config.module.rules.push({
		test: /\.pug$/,
		loader: 'pug-plain-loader'
	})

	/* config.module.rules.push({
		test: /\.svg$/,
		use: [
			'svg-sprite-loader',
			'svgo-loader'
		]
	}) */

  config.module.rules.push({
    test: /\.s(a|c)ss$/,
    use: ['style-loader', 'css-loader',
    {
      loader: 'sass-loader',
      
      options: {
        implementation: require('sass'),
        // fiber: require('fibers'),
        //indentedSyntax: true, // optional
        prependData: `
          @import "@/themes/default/_variables.scss";
          @import "@/themes/default/defaultColorPalette.scss";
        `
      }
    }],
    
    include: path.resolve(__dirname, '../'),
  })

  return config
}
