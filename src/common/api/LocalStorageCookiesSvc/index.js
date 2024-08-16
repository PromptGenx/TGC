// @flow
import Cookies from 'js-cookie'
// By default, we don't use localStorage, but store2 is already installed import
// store from 'store2'
import decodeJWT from 'jwt-decode'
import _ from 'lodash'
import store from 'store2'
import { IsNotNullOrEmpty, IsValid } from 'api/utils/helper'

export const JWT_TOKEN = 'JWT_TOKEN'
export const USER_LOCALE = 'USER_LOCALE'

export function getLocalToken (): string | null {
	return store.session.get(JWT_TOKEN)
}

export function resetLocalToken () {
	store.session.remove(JWT_TOKEN)
}

export function setLocalToken (token: string) {
	store.session.set(JWT_TOKEN, token, { expires: 365 })
}

export function getInfoFromJWT () {
	const token = getLocalToken()
	return decodeJWT(token)
}

export function setUserLocale (LocaleFlag) {
	if (LocaleFlag === null || LocaleFlag === '') {
		LocaleFlag = 'en'
	}
	Cookies.set(USER_LOCALE, LocaleFlag, { expires: 365 })
}

export function getUserLocale () {
	let localecookie = Cookies.get(USER_LOCALE)
	if (!IsValid(localecookie)) {
		localecookie = 'en'
		let userLang = navigator.language || navigator.userLanguage
		userLang = userLang.substring(0, 2)
		if (IsValid(userLang) && (userLang === 'es' || userLang === 'it' || userLang === 'fr')) {
			localecookie = userLang
		}
		setUserLocale(localecookie)
	}
	else {
		if (localecookie === 'en' || localecookie === 'es' || localecookie === 'it' || localecookie === 'fr')
		{ return localecookie }
		else
		{ return 'en' }
	}
	return localecookie
}

export function setLocalStorageDataByKey (key, data) {
	store.session(key, data)
}

export function LocaleDataSet (key, value) {
	store.session.set(key, value)
}

export function LocaleDataGet (key) {
	return store.session.get(key)
}

export function LocaleDataRemove (key) {
	store.session.remove(key)
}

export function clearStore () {
	store.session.clearAll()
}

export function getMasterData () {
	let StoreData = store.session('MasterData')
	if (_.isUndefined(StoreData) || _.isNull(StoreData) || _.isEmpty(StoreData)) {
		StoreData = null
	}
	return StoreData
}

export function GetUserInfo () {
	let result = null
	let userInfo = store.session('UserInfo')
	userInfo = JSON.parse(userInfo)
	if (_.isObject(userInfo) && !_.isEmpty(userInfo)) {
		result = userInfo[0]
	}
	return result
}

export function getUserInfoByKey (key) {
	let result = null
	let userInfo = store.session('UserInfo')
	userInfo = JSON.parse(userInfo)
	if (_.isObject(userInfo) && !_.isEmpty(userInfo)) {
		result = userInfo[0][key]
	}
	return result
}

export const isLoggedIn = () => !!getLocalToken()
