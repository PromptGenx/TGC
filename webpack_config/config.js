/**
 * @file for config stuff that's used for webpack configuration, but isn't passed to webpack compiler
 */

import path from 'path'
import manifest from '../static/manifest'

const {
	NODE_ENV = 'development',
	SENTRY_PUBLIC_DSN = 'https://6a2f363f69774249aaa373fe5e3e4316@sentry.io/1224002',
	GA_ID = 'UA-120790094-1',
	ANALYZE_BUNDLE = false,
	SENTRY_DSN = 'https://6a2f363f69774249aaa373fe5e3e4316@sentry.io/1224002',
	PORT = 3000,
	HOST = 'localhost',
	INSPECT_ENABLED = true,
	BASE_API,
	DOMAIN = 'http://localhost:3000/',
	APIPORT = 60701,
	PROTOCOL = 'http:',
	REACT_APIHOST = 'localhost',
	REACTWEBAPP_SUPPORTEDLANGUAGES = 'en-English-us,es-Español-es,it-italiano-it,fr-français-fr',
	RELEASE_VERSION = '7.21.1',
	APP_LANGUAGE = 'en',
	APIPROTOCOL = 'http:',
	SERVER = 'LocalHost',
	KEY = '',
	IV = '',
	DROP_CONSOLE = false
} = process.env

// compute isProduction based on NODE_ENV
const isProduction = process.env.NODE_ENV === 'production'
const DEV_SERVER_PORT = +PORT + 1

// Paths
const rootPath = path.join(__dirname, '../') // = "/"
const distPath = path.join(rootPath, './dist') // = "/dist"
const srcPath = path.join(rootPath, './src') // = "/src"
const srcCommonPath = path.join(srcPath, './common') // = "/src/common"
const publicPath = !isProduction ? `http://${HOST}:${PORT}/` : '/'

// Vars for server only
const CLIENT_STATIC_PATH = path.join(distPath, './client') // = "/dist/client"
const CLIENT_ASSETS_MANIFEST = path.join(CLIENT_STATIC_PATH, './webpack-assets.json')

export default {
	isProduction,
	// Env vars
	NODE_ENV,
	SENTRY_PUBLIC_DSN,
	ANALYZE_BUNDLE,
	GA_ID,
	CLIENT_STATIC_PATH,
	CLIENT_ASSETS_MANIFEST,
	SENTRY_DSN,
	PORT,
	HOST,
	INSPECT_ENABLED,
	BASE_API,
	// Client's webpack-dev-server port
	DEV_SERVER_PORT,
	// Paths
	srcPath,
	srcCommonPath,
	distPath,
	rootPath,
	publicPath,
	// text for WebpackBannerPlugin
	banner: 'TERMPoint Appointment System. Repo: https://aisapmt.visualstudio.com/Termpoint/_git/TERMPoint_React',
	// your manifest.json
	manifest,
	vendor: [
		'react',
		'react-dom',
		'redux',
		'history',
		'react-router',
		'react-router-dom',
		'react-router-redux',
		// 'semantic-ui-react',
		'redux-thunk',
		'react-helmet',
		'lodash',
		'js-cookie',
		'store2',
		'styled-components',
		'react-headroom'
	],
	polyfills: ['isomorphic-fetch'],
	DOMAIN,
	APIPORT,
	PROTOCOL,
	REACT_APIHOST,
	REACTWEBAPP_SUPPORTEDLANGUAGES,
	RELEASE_VERSION,
	APP_LANGUAGE,
	APIPROTOCOL,
	SERVER,
	KEY,
	IV,
	DROP_CONSOLE
}
