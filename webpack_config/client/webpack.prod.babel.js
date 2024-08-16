import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import CompressionPlugin from 'compression-webpack-plugin'
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import ProgressPlugin from 'webpack/lib/ProgressPlugin'
import OfflinePlugin from 'offline-plugin'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import OptimizeJsPlugin from 'optimize-js-plugin'
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer'
import base from './webpack.base'
import config from '../config'

// Do you want to use bundle analyzer?
if (config.ANALYZE_BUNDLE) {
	base.plugins.push(new BundleAnalyzerPlugin({analyzerMode: 'static'}))
}

base.stats = {
	colors: true,
	// Add children information
	children: false,
	// Add chunk information (setting this to `false` allows for a less verbose output)
	chunks: false,
	// Add built modules information to chunk information
	chunkModules: false,
	chunkOrigins: false,
	modules: false,
	reasons: true,
	errorDetails: true
}

base.module.rules.push(
	{
		test: /\.css$/,
		use: ExtractTextPlugin.extract({
			fallback: 'style-loader',
			use: ['css-loader', 'postcss-loader']
		})
	},
	{
		test: /\.scss$/,
		use: ExtractTextPlugin.extract({
			fallback: 'style-loader',
			use: ['css-loader', 'postcss-loader', 'sass-loader']
		})
	}
)

// Production plugins
base.plugins.push(
	new ProgressPlugin(),
	new ExtractTextPlugin({
		filename: '[name].[hash:6].css',
		allChunks: true
	}),
	new OptimizeCssAssetsPlugin({
		cssProcessorOptions: {
			safe: true,
			discardComments: {
				removeAll: true
			}
		}
	}),
	new webpack.optimize.ModuleConcatenationPlugin(),

	new OptimizeJsPlugin({
		sourceMap: true
	}),

	new CompressionPlugin({
		algorithm: 'gzip'
	}),
	new OfflinePlugin({
		caches: {
			main: [
				'vendor.*.js',
				'vendor.*.css',
				'manifest.*.js',
				'client.*.js',
				'assets/icons.*.*'
			],
			additional: [':externals:'],
			optional: [':rest:']
		},
		externals: [
			'https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic&subset=latin'
		],
		safeToUseOptionalCaches: true,
		AppCache: false
	})
)

base.mode = 'production'

base.optimization = {
	splitChunks: {
		chunks: 'async',
		minSize: 30000,
		minChunks: 1,
		maxAsyncRequests: 5,
		maxInitialRequests: 3,
		name: true,
		cacheGroups: {
			vendors: {
				test: /[\\/]node_modules[\\/]/,
				priority: -10
		  },
		  default: {
				minChunks: 2,
				priority: -20,
				reuseExistingChunk: true
		  }
		}
	  },
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

export default base
