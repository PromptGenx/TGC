import app from './server'
import http from 'http'
import https from 'https'
import fs from 'fs'

let currentApp = app

if (process.env.PROTOCOL === 'http:') {
	console.log('http server creation started')
	console.log('http server creation started')
	const httpServer = http.createServer(app)

	httpServer.listen(process.env.PORT, error => {
		if (error) {
			console.log(error)
		}
		console.log('🚀 http server started')
	})

	if (module.hot) {
		console.log('✅  Server-side HMR Enabled!')

		module.hot.accept('./server', () => {
			console.log('🔁  HMR Reloading `./server`...')
			httpServer.removeListener('request', currentApp)
			const newApp = require('./server').default
			httpServer.on('request', newApp)
			currentApp = newApp
		})
	}
}
else if (process.env.PROTOCOL === 'https:') {
	const options = {
		key: fs.readFileSync('src/keys/privatekey.pem'),
		cert: fs.readFileSync('src/keys/cert.pem')
	}

	const httpsServer = https.createServer(options, app)

	httpsServer.listen(process.env.PORT, error => {
		if (error) {
			console.log(error)
		}
		console.log('🚀 https server started')
	})

	if (module.hot) {
		console.log('✅  Server-side HMR Enabled!')

		module.hot.accept('./server', () => {
			console.log('🔁  HMR Reloading `./server`...')
			httpsServer.removeListener('request', currentApp)
			const newApp = require('./server').default
			httpsServer.on('request', newApp)
			currentApp = newApp
		})
	}
}
