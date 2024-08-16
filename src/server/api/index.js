import {Router} from 'express'
import links from './links'
import {performRequest} from './util'
import _ from 'lodash'
const router = Router()
// const fs = require('fs')
// var util = require('util')
// let LogException = '../AppScriptExceptions/'

// test
router.get('/links', (req, res) => {
	try {
		res.send(links)
	} catch (e) {
		LogNodeServerException(req, res, e, true)
	}
})

// login
router.post('/login', (req, res) => {
	try {
		performRequest('/api/Login/Authenticate', 'POST', req, function (data) {
			try {
				res.send(data)
			} catch (e) {
				console.log('Error while sending response')
			}
		})
	} catch (e) {
		LogNodeServerException(req, res, e, true)
	}
})

// logout
router.post('/logout', (req, res) => {
	try {
		performRequest('/api/Login/Logout', 'GET', req, function (data) {
			try {
				res.send(data)
			} catch (e) {
				console.log('Error while sending response')
			}
		})
	} catch (e) {
		LogNodeServerException(req, res, e, true)
	}
})

export default router
