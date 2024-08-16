/**
 * @flow
 */

import _ from 'lodash'
// var util = require('util')
var http = require('http')
var https = require('https')
// const fs = require('fs')

export const performRequest = (endpoint, method, req, success) => {
	let request = null
	let protocol = process.env.APIPROTOCOL || 'http:'
	let host = 	process.env.REACT_APIHOST || 'localhost'
	let apiport = process.env.APIPORT || 60701
	let dataString = JSON.stringify(req.body)
	// let LogFileLocation = '../logs/'
	// let ErrorObject = null

	try {
		let requestAuthDecoration = ''
		if (!_.isUndefined(req.headers.authorization) && !_.isNull(req.headers.authorization)) {
			requestAuthDecoration = req.headers.authorization
		} else {
			console.log('Token not found')
		}

		// const requestCultureDecoration = (!_.isUndefined(req.headers.user_local) && !_.isNull(req.headers.user_local))
		// 	? `${req.headers.user_local}`
		// 	: 'en'

		const headers = {
			'Content-Type': 'application/json',
			'Content-Length': String(Buffer.byteLength(dataString, 'utf-8')),
			'Authorization': requestAuthDecoration
			// 'Culture': requestCultureDecoration
		}

		const extServerOptions = {
			protocol: protocol,
			host: host,
			port: apiport,
			path: endpoint,
			method: method,
			headers: headers
		}

		const HandleResponse = (response, statuscode) => {
			let responseObject = null
			try {
				if (typeof responseString === 'string') {
					responseObject = JSON.parse(response)
				}

				if (statuscode === 400 || statuscode === 401 || statuscode === 410) {
					responseObject = {
						ResponseMessage: {
							StatusCode: statuscode,
							Message: 'Session expired or invalid token.'
						}
					}
				}

				if (responseObject === null)
				{ responseObject = response }
				return responseObject
			} catch (e) {
				responseObject = null
				console.log('Error in HandleResponse() method')
				throw e
			}
		}

		if (protocol === 'http:') {
			request = http.request(extServerOptions, function (res) {
				try {
					console.log('Http response log')
					var responseString = ''
					res.setEncoding('utf-8')
					res.on('data', function (data) {
						try {
							responseString += data
						} catch (e) {
							console.log('[http data() error]: End function error.')
						}
					})
					res.on('end', function () {
						 try {
							 if (res !== null && typeof res['statusCode'] !== 'undefined') {
								let responseObject = HandleResponse(responseString, res.statusCode)
								success(responseObject)
							 }
						} catch (e) {
							console.log('[http end() error]: End function error.')
						}
					})
				} catch (e) {
					console.log('Http error block')
				}
			})

			request.on('error', (error) => {
				if (typeof error === 'object') {
					// if (fs.existsSync(LogFileLocation)) {
					// 	let fileName = (new Date()).getTime()
					// 	let writer = fs.createWriteStream(LogFileLocation + fileName + '.txt')
					// 	writer.write(util.inspect(error))
					// 	writer.end()
					// }
					console.log('error occured in node server')
				}
			})
		}
		else if (protocol === 'https:') {
			request = https.request(extServerOptions, function (res) {
				try {
					console.log('Https response log')
					var responseString = ''
					res.setEncoding('utf-8')
					res.on('data', function (data) {
						try {
							responseString += data
						} catch (e) {
							console.log('End function error.')
						}
					})
					res.on('end', function () {
						try {
							let responseObject = HandleResponse(responseString)
							success(responseObject)
						} catch (e) {
							console.log('End function error.')
						}
					})
				} catch (e) {
					console.log('Http error block')
				}
			})
		}

		request.write(dataString)
		request.end()
	} catch (e) {
		throw e
	}
}
