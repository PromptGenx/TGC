// @flow
import {post} from 'api/utils'
import {setLocalToken, resetLocalToken} from 'api/LocalStorageCookiesSvc'

const WEB_HOST = process.env.PROTOCOL + '//' + process.env.HOST + ':' + process.env.PORT
// console.log('Default node host: ' + WEB_HOST)

export type LoginDataType = {
    Login_Nm: string,
    Login_Pwd: string
}
export type ResetPwdDataType = {
    ResetPwd: object
}
export type RegistrationRequest = {
	Registration: object
}
export type LogoutDataType = {
	Token: string
}
export const loginAPI = async (data: LoginDataType) => {
	// console.log('login api invoked' + WEB_HOST)
	return post(`${WEB_HOST}/api/login`, data)
}

export const ResetPwdAPI = async (data: ResetPwdDataType) => {
	return post(`${WEB_HOST}/api/SubmitResetPwd`, data)
}

export const GetRegistrationAPI = async (data: RegistrationRequest) => {
	return post(`${WEB_HOST}/api/GetRegistration`, data)
}

export const PostRegistrationAPI = async (data: RegistrationRequest) => {
	return post(`${WEB_HOST}/api/PostRegistration`, data)
}

export const logoutAPI = async (data: LogoutDataType) => {
	return post(`${WEB_HOST}/api/logout`, data)
}
