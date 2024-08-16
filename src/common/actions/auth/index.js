// @flow
import {awral} from 'actions/utils'
import {loginAPI, ResetPwdAPI, logoutAPI} from 'api/AuthSvc'
import {setLocalToken, resetLocalToken, setLocalStorageDataByKey, clearStore} from 'api/LocalStorageCookiesSvc'
import {UI_APICALL_PENDING,	UI_APICALL_SUCCESS} from 'actions/layout'
import _ from 'lodash'
import { IsNotNullOrEmpty, HideLoader, IsValid, MELICIOUSCHECK, GetMessage } from 'api/utils/helper'

export const LOGIN_AUTH_PENDING = 'LOGIN_AUTH_PENDING'
export const LOGIN_AUTH_SUCCESS = 'LOGIN_AUTH_SUCCESS'
export const LOGIN_AUTH_FAIL = 'LOGIN_AUTH_FAIL'
export const RESETPWD_PROG_PENDING = 'RESETPWD_PROG_PENDING'
export const RESETPWD_PROG_DONE = 'RESETPWD_PROG_DONE'

export type SET_LOCALE_TYPE = {type: 'SET_LOCALE'}
export type LOGIN_AUTH_PENDING_TYPE = {type: 'LOGIN_AUTH_PENDING'}
export type LOGIN_AUTH_SUCCESS_TYPE = {
	type: 'LOGIN_AUTH_SUCCESS',
	payload: {data: Object}
}
export type LOGIN_AUTH_FAIL_TYPE = {
	type: 'LOGIN_AUTH_FAIL',
	payload: {errors: Object}
}

export const SET_LOCALE_FLAG = 'SET_LOCALE_FLAG'
export type SET_LOCALE_FLAG_TYPE = {type: 'SET_LOCALE_FLAG'}

export const LOGOUT_AUTH_SUCCESS = 'LOGOUT_AUTH_SUCCESS'
export type LOGOUT_AUTH_SUCCESS_TYPE = {type: 'LOGOUT_AUTH_SUCCESS'}

export const LOGIN_AUTH = payload => async dispatch => {
	try {
		dispatch({type: UI_APICALL_PENDING})
		dispatch({type: LOGIN_AUTH_PENDING})
		const result = await loginAPI(payload)
		if (result.ok === true) {
			if (result.data === MELICIOUSCHECK) {
				dispatch({type: LOGIN_AUTH_FAIL, payload: result})
				dispatch({type: UI_APICALL_SUCCESS})
				alert(GetMessage())
			} else {
				if (!_.isUndefined(result.data)) {
					if (!_.isUndefined(result.data.ObjUserMessagesList) && result.data.ObjUserMessagesList.length === 0) {
						// Clear all cookie and local storage
						clearStoreAndCookie()

						// Set JWT Token and User, WebFunction info in local storage for app global access
						setLocalStorageNCookieInfo(result.data)

						// // Dispatch Login Success and update store with api output result
						dispatch({type: LOGIN_AUTH_SUCCESS, payload: result})
						dispatch({type: UI_APICALL_SUCCESS})
					}
					else {
						dispatch({type: LOGIN_AUTH_FAIL, payload: result})
						dispatch({type: UI_APICALL_SUCCESS})
					}

					if (IsValid(result.data.ResponseMessgae)) {
						if (result.data.ResponseMessgae.StatusCode !== 200) {
							HideLoader()
						}
					}
				}
			}
		} else {
			dispatch({type: LOGIN_AUTH_FAIL, payload: result})
			dispatch({type: UI_APICALL_SUCCESS})
		}
		HideLoader()
	} catch (e) {
		HideLoader()
	}
}

export const SET_LOCALE = flag => async dispatch => {
	dispatch({type: SET_LOCALE_FLAG, payload: flag})
}

export const LOGOUT_AUTH = payload => async dispatch => {
	const result = await logoutAPI(payload)
	if (result.ok === true) {
		dispatch({ type: 'SET_LOGINSTATE', value: false })
	}
}

export const setLocalStorageNCookieInfo = (data) => {
	// set JWT token in cookie
	let JWTToken = data.Token
	if (!_.isUndefined(JWTToken) && !_.isEmpty(JWTToken) && !_.isNull(JWTToken)) {
		setLocalToken(JWTToken)
	}

	// set user info in Local Storage
	let userInfo = data.UserJSON
	if (!_.isUndefined(userInfo) && !_.isEmpty(userInfo) && !_.isNull(userInfo)) {
		setLocalStorageDataByKey('UserInfo', userInfo)
	}

	// set Master data info in Local Storage
	let MasterData = data.MasterData
	if (!_.isUndefined(MasterData) && !_.isEmpty(MasterData) && !_.isNull(MasterData)) {
		setLocalStorageDataByKey('MasterData', MasterData)
	}
}

export const clearStoreAndCookie = () => {
	clearStore()
	resetLocalToken()
}

// region Reset UserId/Password
export const RESETPWDPOST_PENDING = 'RESETPWDPOST_PENDING'
export const RESETPWDPOST_SUCCESS = 'RESETPWDPOST_SUCCESS'
export const RESETPWDPOST_FAIL = 'RESETPWDPOST_FAIL'

export type RESETPWDPOST_PENDING_TYPE = {type: RESETPWDPOST_PENDING}
export type RESETPWDPOST_SUCCESS_TYPE = {type: RESETPWDPOST_SUCCESS, payload: {data: Object}}
export type RESETPWDPOST_FAIL_TYPE = {type: RESETPWDPOST_FAIL, payload: {errors: Object}}

export const POSTRESETPWD_ACTION = payload => async dispatch => {
	dispatch({type: RESETPWDPOST_PENDING})
	const result = await ResetPwdAPI(payload)
	if (result.ok === true) {
		dispatch({type: RESETPWDPOST_SUCCESS, payload: result})
	} else {
		dispatch({type: RESETPWDPOST_FAIL, payload: result})
	}
}
// endregion
