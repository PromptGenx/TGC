// @flow
import React from 'react'
import { connect } from 'react-redux'
import { LOGIN_AUTH, POSTRESETPWD_ACTION } from 'actions/auth'
import LoginComponent from './components/LoginComponent'
import { getAuthState } from 'selectors'
import type { GlobalState } from 'reducers'
import { push } from 'react-router-redux'
import _ from 'lodash'
import { MTOProfileParam } from 'appConstants'

type Props = {
	login: (data: Object) => void,
	loginError: Object,
	ResetPwdResult: Object,
	isSubmitPending: boolean,
	SubmitResetPwd: (ResetPwd: Object) => { ResetPwdResult: Object },
	GoRegistration: () => void
}

const Login = ({ login, loginError, ResetPwdResult, isSubmitPending, SubmitResetPwd, GoRegistration }: Props) => {
	const props = {
		login,
		loginError,
		ResetPwdResult,
		isSubmitPending,
		SubmitResetPwd,
		GoRegistration
	}
	return <LoginComponent {...props} />
}

const mapStateToProps = (state: GlobalState) => {
	let loginError = {}
	const authState = getAuthState(state)
	let { ResetPwdResult, isSubmitPending } = authState

	if (authState.result !== undefined) {
		loginError = authState.result.ObjUserMessagesList
	}
	return {
		loginError,
		ResetPwdResult,
		isSubmitPending
	}
}

const mapDispatchToProps = dispatch => ({
	login (payload) {
		dispatch(LOGIN_AUTH(payload))
	},
	SubmitResetPwd (payload) {
		dispatch(POSTRESETPWD_ACTION(payload))
	},
	GoRegistration () {
		 dispatch(push('/Registration'))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
