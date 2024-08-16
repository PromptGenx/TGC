// @flow
import {isLoggedIn as hasLocalToken, setUserLocale, getUserLocale} from 'api/LocalStorageCookiesSvc'
import _ from 'lodash'

import {
	LOGIN_AUTH_FAIL,
	LOGIN_AUTH_PENDING,
	LOGIN_AUTH_SUCCESS,
	LOGOUT_AUTH_SUCCESS,
	SET_LOCALE_FLAG,
	RESETPWDPOST_PENDING,
	RESETPWDPOST_SUCCESS,
	RESETPWDPOST_FAIL,
	RESETPWD_PROG_PENDING,
	RESETPWD_PROG_DONE,
	SAFETYATTESTATION_PROG_PENDING,
	SAFETYATTESTATION_PROG_DONE
} from 'actions/auth'
import {APPLICATION_INIT} from 'actions/common'
//
import type {
	LOGIN_AUTH_FAIL_TYPE,
	LOGIN_AUTH_PENDING_TYPE,
	LOGIN_AUTH_SUCCESS_TYPE,
	LOGOUT_AUTH_SUCCESS_TYPE,
	SET_LOCALE_FLAG_TYPE,
	RESETPWDPOST_PENDING_TYPE,
	RESETPWDPOST_SUCCESS_TYPE,
	RESETPWDPOST_FAIL_TYPE
} from 'actions/auth'

import type {APPLICATION_INIT_TYPE} from 'actions/common'

export type State = {
	isLoading: boolean,
	isLoaded: boolean,
	isLoggedIn: boolean,
	errors: Object
}

type Action =
	| APPLICATION_INIT_TYPE
	| LOGIN_AUTH_FAIL_TYPE
	| LOGIN_AUTH_PENDING_TYPE
	| LOGIN_AUTH_SUCCESS_TYPE
	| LOGOUT_AUTH_SUCCESS_TYPE
	| SET_LOCALE_FLAG
	| RESETPWDPOST_PENDING_TYPE
	| RESETPWDPOST_SUCCESS_TYPE
	| RESETPWDPOST_FAIL_TYPE

export const initialState: State = {
	isLoading: false,
	isLoaded: false,
	// isLoggedIn: hasLocalToken(),
	errors: {},
	masterdata: {}
}

export function auth (state: State = initialState, action: Action): State {
	// console.log('Auth state')
	switch (action.type) {
	case APPLICATION_INIT:
		return {...initialState, ...state}
	case LOGOUT_AUTH_SUCCESS: {
		return {
			...state,
			isLoaded: true,
			isLoggedIn: false
		}
	}
	case LOGIN_AUTH_FAIL: {
		const {data} = action.payload
		return {
			...state,
			isLoaded: true,
			isLoggedIn: false,
			result: data
		}
	}
	case LOGIN_AUTH_SUCCESS: {
		const {data} = action.payload
		let isUserLogInOk = false
		if (!_.isUndefined(data)) {
			isUserLogInOk = data.ResetPwdOnNextLogin_Flg === 'N' && data.IsSafetyAttestationReq_Flg === 'N' && data.ChangePwdRequired_Flg === 'N'
		}
		return {
			...state,
			isLoaded: true,
			isLoggedIn: isUserLogInOk,
			result: data
		}
	}
	case 'SET_LOGINSTATE': {
		let userAction = action.value
		return {
			...state,
			isLoggedIn: userAction
		}
	}
	case LOGIN_AUTH_PENDING: {
		return {
			...state,
			isLoaded: false,
			isLoggedIn: false,
			errors: {},
			result: {}
		}
	}
	case SET_LOCALE_FLAG: {
		const seletedLocale = action.payload
		setUserLocale(seletedLocale)
		location.href = location.href
		return state
	}
	case RESETPWDPOST_FAIL: {
		const {data} = action.payload
		return {...state, isSubmitPending: false, ResetPwdResult: data}
	}
	case RESETPWDPOST_SUCCESS: {
		const {data} = action.payload
		return {...state, isSubmitPending: false, ResetPwdResult: data}
	}
	case RESETPWDPOST_PENDING: {
		return {...state, isSubmitPending: true, ResetPwdResult: {}}
	}
	case RESETPWD_PROG_PENDING: {
		return {
			...state,
			IsResetPwdChangePending: true
		}
	}
	case RESETPWD_PROG_DONE: {
		return {
			...state,
			IsResetPwdChangePending: false
		}
	}
	case SAFETYATTESTATION_PROG_DONE: {
		return {
			...state,
			isSafetyAttestationPending: false
		}
	}
	case SAFETYATTESTATION_PROG_PENDING: {
		return {
			...state,
			isSafetyAttestationPending: true
		}
	}
	default:
		return state
	}
}
