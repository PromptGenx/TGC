// @flow
import enLocaleData from 'react-intl/locale-data/en'
// import tlLocaleData from 'react-intl/locale-data/tl'
// import hnLocaleData from 'react-intl/locale-data/hn'
import en from 'static/locals/en'
// import tl from 'static/locals/tl'
// import hn from 'static/locals/hn'

export const defaultLanguage = 'en'
// export const supportedLanguages = ['en', 'tl', 'hn']
export const supportedLanguages = ['en']

// const translations = {
// 	en, tl, hn
// }
const translations = {
	en
}

export default (lang: string = defaultLanguage) => {
	// const localeData = {
	// 	en: enLocaleData,
	// 	tl: tlLocaleData,
	// 	hn: hnLocaleData,
	// }
	const localeData = {
		en: enLocaleData
	}
	// Function to sanitize user locale attribute
	function Sanitize (locale) {
		if (locale === 'en' || locale === 'tl' || locale === 'hn')
		{ return locale }
		else
		{ return 'en' }
	}
	return {
		lang: Sanitize(lang),
		localeData: localeData[Sanitize(lang)],
		locale: Sanitize(lang),
		messages: translations[Sanitize(lang)]
	}
}
