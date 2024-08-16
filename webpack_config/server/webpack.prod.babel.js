import webpack from 'webpack'
import config from '../config'
import baseWebpackConfig from './webpack.base'
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer'
import OptimizeJsPlugin from 'optimize-js-plugin'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'

if (config.ANALYZE_BUNDLE) {
	baseWebpackConfig.plugins.push(new BundleAnalyzerPlugin({analyzerMode: 'static'}))
}

baseWebpackConfig.plugins.push(
	new webpack.ProgressPlugin(),
	new webpack.optimize.ModuleConcatenationPlugin(),
	new OptimizeJsPlugin({
		sourceMap: true
	})
)

baseWebpackConfig.mode = 'production'

baseWebpackConfig.optimization = {
	  minimizer: [
		new UglifyJsPlugin({
			uglifyOptions: {
				sourceMap: true,
				warnings: false,
				compress: {
					unused: true,
					dead_code: true,
					// This option removes console.log in production
					drop_console: config.DROP_CONSOLE
				},
				output: {
					comments: false
				}
			}
		})
	  ]
}

export default baseWebpackConfig
