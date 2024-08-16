// @flow
import $ from 'jquery'
import ajax_loader from 'static/images/ajax-loader.gif'
import _ from 'lodash'
import { LocaleDataGet, getUserLocale } from 'api/LocalStorageCookiesSvc/index'

export const MELICIOUSCHECK = 'Malicious content found.'

export function IsNotNullOrEmpty (Field) {
	let ValidationFieldFlag = false
	if (!_.isUndefined(Field) && !_.isNull(Field) && !_.isEmpty(Field)) {
		ValidationFieldFlag = true
	}
	return ValidationFieldFlag
}

export function IsValid (UserObject) {
	let Type = typeof UserObject
	let Flag = false
	switch (Type) {
	case 'string':
		if (UserObject.trim().length > 0) {
			Flag = true
		}
		break
	case 'object':
		if (UserObject !== null) {
			if (Object.keys(UserObject).length > 0) {
				Flag = true
			}
		}
		break
	case 'undefined': break
	default: Flag = false; break
	}
	return Flag
}

export const ShowToast = function (Message, TimeSpan) {
	let DefaultWaitTime = 20000
	if (TimeSpan !== null && TimeSpan !== undefined && TimeSpan !== '') {
		try {
			DefaultWaitTime = parseInt(TimeSpan)
		} catch (e) {
			DefaultWaitTime = 20000
		}
	}
	let $ToastElement = document.getElementById('apptoast')
	if ($ToastElement !== null) {
		$ToastElement.innerHTML = Message
		$ToastElement.classList.add('fadeIn')
		setTimeout(() => {
			$ToastElement.classList.add('fadeOut')
			setTimeout(() => {
				$ToastElement.classList.remove('fadeIn', 'fadeOut')
			}, 2000)
		}, DefaultWaitTime)
	}
}

export const ShowLoader = function () {
	if ($ !== undefined && $ !== null) {
		try {
			HideLoader()
			if ($('#page-fader').length === 0) {
				let $OldLoader = `<div id="page-fader" 
								style="z-index:5001;position:fixed; 
										background-color: rgba(238, 238, 238, 0.37); 
										top: 0px; bottom:0px;left:0px;right:0px;">
								<img style="position: absolute;
									top: 0px;
									bottom: 0px;
									left: 0px;
									right: 0px;
									margin: auto;
									width: 50px;" src="${ajax_loader}" />
								<div style="position: absolute;
									bottom: 0px;
									left: 0px;
									right: 0px;
									margin: auto;
									top: 55%;
									font-size: 18px;
									font-weight: bold;
									color: orange;
									width: 120px;
									text-align: center;" id="loader_text"></div>
						</div>`

				let $NewLoader = `<div id="page-fader" class="loaderparent_screen">
							<div class="fade_loaderscreen">
								<div class="new_loader"></div>
								<div class="new_loader_label">Loading ...</div>
							</div>
						</div>`

				$('document, body').append($NewLoader)
			}
		} catch (e) {
			console.log('Jquery is not initialized.')
		}
	}
}

export const HideLoader = () => {
	if ($('#page-fader').length > 0) {
		$('#page-fader').remove()
	}
}

export const reactIntlFormattedStr = (key, props) => {
	const { intl } = props
	if (IsValid(key) && IsValid(intl)) {
		return intl.formatMessage({ id: key })
	}
	return ''
}

export const GetGlobalizedName = (HeaderNames, Props) => {
	let GlobalizedHeaderName = []
	if (IsValid(HeaderNames)) {
		let index = 0
		while (index < HeaderNames.length) {
			GlobalizedHeaderName.push(reactIntlFormattedStr(HeaderNames[index], Props))
			index++
		}
	}
	return GlobalizedHeaderName
}

export const DeepCloneObject = (OriginalObject) => {
	let TargetObject = {}
	TargetObject = JSON.stringify(OriginalObject)
	return JSON.parse(TargetObject)
}

export const EmptyClonedObject = (ComplextObject) => {
	let $EmptyObject = null
	if (IsValid(ComplextObject)) {
		let StringifyObject = JSON.stringify(ComplextObject)
		StringifyObject = JSON.parse(StringifyObject)
		$EmptyObject = ConvertToEmptyGridObjec(StringifyObject)
	}
	return $EmptyObject
}

export const ConvertToEmptyGridObjec = (ComplextObject) => {
	let NewData = {}
	let $CurrentObject = null
	let HeaderNames = Object.keys(ComplextObject)
	let index = 0
	while (index < HeaderNames.length) {
		$CurrentObject = null
		$CurrentObject = ComplextObject[HeaderNames[index]]
		if (typeof $CurrentObject === 'object' && $CurrentObject !== null) {
			if ($CurrentObject instanceof Array) {
				if ($CurrentObject.length > 0) {
					NewData[HeaderNames[index]] = []
					let InnerIndex = 0
					while (InnerIndex < $CurrentObject.length) {
						NewData[HeaderNames[index]].push(ConvertToEmptyGridObjec($CurrentObject[InnerIndex]))
						InnerIndex++
					}
				} else {
					NewData[HeaderNames[index]] = []
				}
			} else {
				NewData[HeaderNames[index]] = ConvertToEmptyGridObjec($CurrentObject)
			}
		} else {
			if (typeof $CurrentObject === 'string') {
				if (HeaderNames[index] === 'value') {
					NewData[HeaderNames[index]] = ''
				} else {
					NewData[HeaderNames[index]] = ComplextObject[HeaderNames[index]]
				}
			} else {
				NewData[HeaderNames[index]] = ComplextObject[HeaderNames[index]]
			}
		}
		index++
	}
	return NewData
}

export const ConvertToEmptyJson = (ComplextObject) => {
	let NewData = {}
	let $CurrentObject = null
	let HeaderNames = Object.keys(ComplextObject)
	let index = 0
	while (index < HeaderNames.length) {
		$CurrentObject = null
		$CurrentObject = ComplextObject[HeaderNames[index]]
		if (typeof $CurrentObject === 'object' && $CurrentObject !== null) {
			if ($CurrentObject instanceof Array) {
				if ($CurrentObject.length > 0) {
					NewData[HeaderNames[index]] = []
					let InnerIndex = 0
					while (InnerIndex < $CurrentObject.length) {
						NewData[HeaderNames[index]].push(ConvertToEmptyJson($CurrentObject[InnerIndex]))
						InnerIndex++
					}
				} else {
					NewData[HeaderNames[index]] = []
				}
			} else {
				NewData[HeaderNames[index]] = ConvertToEmptyJson($CurrentObject)
			}
		} else {
			if (typeof $CurrentObject === 'string') {
				NewData[HeaderNames[index]] = ''
			} else if (typeof $CurrentObject === 'boolean') {
				NewData[HeaderNames[index]] = false
			} else if (typeof $CurrentObject === 'number') {
				NewData[HeaderNames[index]] = 0
			}
		}
		index++
	}
	return NewData
}

export const LogException = () => {

}

const MaliciousTag = ['<\/', '<script', '\/>', '*\/', '\/*', '\/\/', '--']

export const IsValidRequest = (Data) => {
	let PureStringifyPayload = JSON.stringify(Data)
	let index = 0
	while (index < MaliciousTag.length) {
		if (PureStringifyPayload.indexOf(MaliciousTag[index]) > -1) {
			alert(GetMessage())
			HideLoader()
			return false
		}
		index++
	}
	return true
}

// export const RegisterWindowException = () => {
// 	if (typeof window !== 'undefined') {
// 		window.onerror = (e, url, lineNo, columnNo, errorObject) => {
// 			console.log('Root error fired.')
// 			let error = LocaleDataGet('error')
// 			if (IsValid(error)) {
// 				HideLoader()
// 				let ErrorObject = {
// 					Message: IsValid(error.message) ? error.message : 'App/index.jsx receives an exception.',
// 					ErrorCode: 0,
// 					InnerMessage: '',
// 					StackTrace: IsValid(error.stack) ? error.stack : '',
// 					FileName: ''
// 				}
// 				// this.BindToast(ErrorObject)
// 				if (IsValid(ErrorObject)) {
// 					this.props.LogLocalException(ErrorObject)
// 				}
// 			}
// 		}
// 	}
// }
