/**
 * @flow
 */

import {getLocalToken, resetLocalToken, getUserLocale, LocaleDataSet} from 'api/LocalStorageCookiesSvc'
import fetch from 'isomorphic-fetch'
import _ from 'lodash'
import { IsValid } from 'api/utils/helper'

/**
 * Create request wrapper for certain method
 * @param  {String} method - Request method
 * @return {Function}
 */
const requestWrapper = (
	method: 'GET' | 'POST' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'PUT' | 'PATCH'
) => {
	/**
	 * Creates request to `url` with `data`
	 * @param  {String} 	url        				Request URL
	 * @param  {Object} 	[data= null]			Data for Request
	 * @param  {Object} 	[options= {}]			Additional options
	 * @param  {Function} [cb = (a) => a]		Transform request before it will be sent
	 * @return {Object}             				Request response
	 */
	return async (
		url: string,
		data: Object | null = null,
		options: Object = {},
		cb: (request: Object) => Object = a => a
	) => {
		// get decorated url and request params
		const {requestURL, request} = decorateRequest({
			method,
			url,
			data,
			options,
			cb
		})
		// create request!
		return fetch(requestURL, request)
			.then(checkStatus)
			.then(parseJSON)
			.catch((err: string) => {
				console.error('api => utils => index.js caught exception: ' + err)
				// location.href = process.env.PROTOCOL + '//' + process.env.HOST + ':' + process.env.PORT
				return err
			})
	}
}

/**
 * middlewares
 * 1. parse response
 * 2. add "ok" property to result
 * 3. return request result
 * @param  {Object} res - Response from resource
 * @return {Object} response result with "ok" property
 */
async function parseJSON (res: Response): Object {
	let json: Object
	const {status} = res
	// status response field in return object
	try {
		json = await res.json()
	} catch (e) {
		if (res.status === 204) {
			return {ok: true, data: {}, status}
		}
		return {ok: false, status}
	}
	let Flag = IsValidResponse(json)
	if (!Flag) {
		// location.href = process.env.PROTOCOL + '//' + process.env.HOST + ':' + process.env.PORT
		location.href = '/'
	}

	if (!res.ok) {
		return {data: json, ok: false, status}
	}
	return {data: json, ok: true, status}
}

function IsValidResponse (_response: Response): boolean {
	let flag = true
	if (IsValid(_response)) {
		if (IsValid(_response.ResponseMessage)) {
			if (_response.ResponseMessage.StatusCode === 400 || _response.ResponseMessage.StatusCode === 401) {
				localStorage.setItem('IsSessionOut', '1')
				flag = false
			} else if (_response.ResponseMessage.StatusCode === 410) {
				LocaleDataSet('SessionLoggedOut', '1')
				flag = false
			}
		}
	}
	return flag
}

/**
 * Checks response status
 * @param  {Object} response - Response
 * @return {Object}          - Response
 */
function checkStatus (response: Response): Response {
	const {status} = response
	if (status >= 200 && status < 300) {
		// Everything is ok
	} else if (status >= 300 && status < 400) {
		// 300 Multiple Choices
		// 301 - Moved Permanently,
		// 302 - Found, Moved Temporarily
		// 304 - not modified
		// 307 - Temporary Redirect
	} else if (status === 400) {
		// Probably is a validation error
	} else if (status === 403 || status === 401) {
		// 401 - Forbidden
		// 403 - Unauthorized
		// remove local token in this case
		resetLocalToken()
	} else if (status === 404) {
		// Not Found
	} else if (status >= 500) {
		// Server error
	}
	return response
}

/**
 * Creates request to `url` with `data`
 * @param  {String} 	method        		Request method
 * @param  {String} 	url        				Request URL
 * @param  {Object} 	[data= null]			Data for Request
 * @param  {Object} 	[options= {}]			Additional options
 * @param  {Function} [cb = (a) => a]		Transform request before it will be sent
 * @return {Object}             				{URL, request}
 */
function decorateRequest ({method, url, data, options, cb}): Object {
	// Default params for fetch = method + (Content-Type)
	const defaults = {
		method,
		headers: {}
	}
	const token: string | null = getLocalToken()
	const userlocal: string = getUserLocale()
	const isRequestToExternalResource = /(http|https):\/\//.test(url)
	const requestURL = isRequestToExternalResource
		? url
		: process.env.BASE_API + url

	const requestAuthDecoration =
		isRequestToExternalResource && token && token !== undefined
			? { headers: {Authorization: `JWT ${token}`}}
			: {}

	const requestUserLocalDecoration =
		isRequestToExternalResource && userlocal && userlocal !== undefined
			? { headers: {USER_LOCAL: userlocal}}
			: {}

	const requestHeadersDataDecoration = getHeaderDataDecoration(data)

	const request = cb(
		_.merge(
			{},
			defaults,
			options,
			requestAuthDecoration,
			requestHeadersDataDecoration,
			requestUserLocalDecoration
		)
	)

	// if (!isRequestToExternalResource) {
	// console.log(`Request ${url} was sent to our domain`, request)
	// } else {
	// console.log(`Request ${url} was sent to external domain`, request)
	// }

	return {
		request,
		requestURL
	}
}

function getHeaderDataDecoration (data): Object {
	const requestDataDecoration = data ? {body: JSON.stringify(data)} : {}
	const requestContentTypeDecoration =
		data instanceof FormData
			? {}
			: {
				headers: {
					'Content-Type': 'application/json; charset=UTF-8'
			  }}

	return {...requestDataDecoration, ...requestContentTypeDecoration}
}

export const get = requestWrapper('GET')
export const post = requestWrapper('POST')
export const put = requestWrapper('PUT')
export const patch = requestWrapper('PATCH')
export const del = requestWrapper('DELETE')

// USAGE:
// get('https://www.google.com', options)
//
// post('https://www.google.com', data, options)
