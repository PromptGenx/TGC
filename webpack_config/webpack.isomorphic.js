/**
 * @file
 */
import path from 'path'
import webpack from 'webpack'
import CircularDependencyPlugin from 'circular-dependency-plugin'
import config from './config'

const {
	srcPath,
	rootPath,
	srcCommonPath,
	PORT,
	NODE_ENV,
	HOST,
	BASE_API,
	DOMAIN,
	APIPORT,
	PROTOCOL,
	REACT_APIHOST,
	REACTWEBAPP_SUPPORTEDLANGUAGES,
	RELEASE_VERSION,
	APP_LANGUAGE,
	GA_ID,
	SENTRY_DSN,
	APIPROTOCOL,
	SERVER,
	KEY,
	IV,
	DROP_CONSOLE
} = config

const definePluginArgs = {
	'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
	'process.env.PORT': JSON.stringify(PORT),
	'process.env.HOST': JSON.stringify(HOST),
	'process.env.BASE_API': JSON.stringify(BASE_API),
	'process.env.DOMAIN': JSON.stringify(DOMAIN),
	'process.env.APIPORT': JSON.stringify(APIPORT),
	'process.env.PROTOCOL': JSON.stringify(PROTOCOL),
	'process.env.REACT_APIHOST': JSON.stringify(REACT_APIHOST),
	'process.env.REACTWEBAPP_SUPPORTEDLANGUAGES': JSON.stringify(REACTWEBAPP_SUPPORTEDLANGUAGES),
	'process.env.RELEASE_VERSION': JSON.stringify(RELEASE_VERSION),
	'process.env.APP_LANGUAGE': JSON.stringify(APP_LANGUAGE),
	'process.env.GA_ID': JSON.stringify(GA_ID),
	'process.env.SENTRY_DSN': JSON.stringify(SENTRY_DSN),
	'process.env.APIPROTOCOL': JSON.stringify(APIPROTOCOL),
	'process.env.SERVER': JSON.stringify(SERVER),
	'process.env.KEY': JSON.stringify(KEY),
	'process.env.IV': JSON.stringify(IV),
	'process.env.DROP_CONSOLE': JSON.stringify(DROP_CONSOLE)
}

export default {
	resolve: {
		alias: {
			actions: `${srcCommonPath}/actions/`,
			api: `${srcCommonPath}/api/`,
			components: `${srcCommonPath}/components/`,
			containers: `${srcCommonPath}/containers/`,
			reducers: `${srcCommonPath}/reducers/`,
			routing: `${srcCommonPath}/routing/`,
			styles: `${srcCommonPath}/styles`,
			selectors: `${srcCommonPath}/selectors`,
			static: `${rootPath}/static`,
			appConstants: `${srcCommonPath}/appConstants`
		},
		extensions: ['.js', '.json', '.jsx'],
		modules: [srcPath, path.join(rootPath, 'node_modules')]
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				enforce: 'pre',
				use: [
					{
						loader: 'eslint-loader',
						options: {
							fix: true
						}
					}
				],
				exclude: [/node_modules/]
			},
			{
				test: /\.(js|jsx)$/,
				use: [
					{
						loader: 'thread-loader'

					  },
					  {
						loader: 'cache-loader'

					  },
					{
				 	loader: 'babel-loader'

					}],
				exclude: [/node_modules/]
			},
			{
				test: /\.(jpe?g|png|gif|svg|pdf)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 4096,
							name: 'images/[name].[hash:6].[ext]'
						}
					}
				]
			}
		]
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.BannerPlugin({
			banner: config.banner
		}),
		new CircularDependencyPlugin({
			exclude: /node_modules/
		}),
		new webpack.DefinePlugin(definePluginArgs)
	]
}
