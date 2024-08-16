/**
 * @flow
 * @file
 */
import 'babel-polyfill'
import express from 'express'
import fetch from 'isomorphic-fetch'
import addMiddlewares from './middlewares'
import API from './api'
import SSR from './ssr'

global.fetch = fetch

const app: express$Application = express()

// Add global middlewares
addMiddlewares(app)
// Add API
app.use('/api', API)
// Add SSR
app.use(SSR)

// app.use(function (req, res, next) {
// 	if (req.secure) {
// 		next()
// 	} else {
// 		res.redirect('https://' + req.headers.host + req.url)
// 	}
// })

export default app
