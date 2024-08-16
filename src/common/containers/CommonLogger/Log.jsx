import { IsValid, HideLoader } from 'api/utils/helper'
import { LocaleDataSet, LocaleDataRemove, getUserLocale, getMTOProfileParamByCode, getUserInfoByKey } from 'api/LocalStorageCookiesSvc/index'
import PageError from './PageError'
import { LogLocalException_API } from 'api/scheduleAppointment/index'
import { MTOProfileParam } from '../../appConstants/index'
import CommonService from 'containers/ScheduleAppointment/components/CommonService'

/** *********************************************** How to use Log() *****************************************************************
 *                                                                                                                                  *
 *                                                                                                                                  *
 *      import { Log } from 'containers/CommonLogger/Log'                                                                           *
 *                                                                                                                                  *
 *      try{                                                                                                                        *
 *          // logic or code                                                                                                        *
 *      } catch(e){                                                                                                                 *
 *          Log(this, e.message, e.stact, "extra message");                                                                         *
 *      }                                                                                                                           *
 *                                                                                                                                  *
 *      Log(...)                                                                                                                    *
 *      1st parameter:      this object of current class if using arraw funtion the use null                                        *
 *                                                                                                                                  *
 *      2nd parameter:      exact exception message if calling [Log()] inside catch block then call [e.message] else                *
 *                          pass some proper infomatic message where and why exception occured.                                     *
 *                                                                                                                                  *
 *      3rd parameter:      pass stack tract value i.e [e.stact] else pass null.                                                    *
 *                                                                                                                                  *
 *      4th parameter:      pass few extar message to describe more information about the exception.                                *
 *                                                                                                                                  *
 *                                                                                                                                  *
 *                                                                                                                                  *
 * **********************************************************************************************************************************/

export const Log = ($Current, $Message, $Stack, $ExtraMessage) => {
	HideLoader()
	let ErrorObject = {
		UserName: '',
		CompnayName: '',
		Terminal: '',
		Locale: 'en',
		FileName: '',
		ErrorLocation: '',
		TransactonDetail: {},
		ClassMethodDetail: '',
		Message: IsValid($Message) ? $Message : 'Message not available.',
		ErrorCode: 0,
		CustomeMessage: IsValid($ExtraMessage) ? $ExtraMessage : '',
		StackTrace: $Stack
	}

	const pageError = PageError.GetInstance()
	if (IsValid(pageError)) {
		if (IsValid(pageError.ErrorObjectDesc)) {
			ErrorObject.TransactonDetail = JSON.stringify(pageError.ErrorObjectDesc)
		} else {
			ErrorObject.TransactonDetail = ''
		}
	}
	if (IsValid($Current)) {
		if ($Current.constructor !== null && $Current.constructor !== undefined) {
			ErrorObject.FileName = $Current.constructor.name
		} else {
			ErrorObject.FileName = 'NA'
		}
	} else {
		ErrorObject.FileName = 'NA'
	}

	if (IsValid($Stack)) {
		if ($Stack.split('\n').length > 1) {
			let FirstStackFrame = $Stack.split('\n')[1]
			let SplittedStactFrame = ''
			if (FirstStackFrame.indexOf('__REACT_HOT_LOADER__') !== -1) {
				SplittedStactFrame = FirstStackFrame.split('__REACT_HOT_LOADER__')
			} else {
				SplittedStactFrame = FirstStackFrame.split(' (')
			}
			if (SplittedStactFrame.length === 2) {
				if ((SplittedStactFrame[1]).indexOf('webpack-internal:\/\/\/') !== -1) {
					ErrorObject.ErrorLocation = (SplittedStactFrame[1]).replace('(webpack-internal:\/\/\/', '')
				} else {
					ErrorObject.ErrorLocation = (SplittedStactFrame[1])
				}
				let ClassMethodDetail = (SplittedStactFrame[0]).replace('at', '').trim()
				if (ClassMethodDetail.split('\.__').length === 2) {
					let MethodFrame = ClassMethodDetail.split('\.__')
					ErrorObject.ClassMethodDetail = `Class: ${MethodFrame[0]}. Method name: ${MethodFrame[1]}`
				} else {
					ErrorObject.ClassMethodDetail = `Class: ${ClassMethodDetail}.`
				}
			}
		}
	}

	let TerminalName = getMTOProfileParamByCode(MTOProfileParam.TerminalName)
	let User_Nm = getUserInfoByKey('Login_Nm')
	let Company_Nm = getUserInfoByKey('Company_Nm')
	ErrorObject['Terminal'] = TerminalName
	ErrorObject['UserName'] = User_Nm
	ErrorObject['CompnayName'] = Company_Nm
	ErrorObject['Locale'] = getUserLocale()
	// LocaleDataRemove('error')
	// LocaleDataSet('error', JSON.stringify(ErrorObject))
	let commonService = new CommonService()
	commonService.BindToast({ Message: ErrorObject['Message'] }, ErrorObject['CustomeMessage'])
	LogLocalException_API(ErrorObject)
}

export const CaptureApiCallInfomation = (api, data) => {
	let ObjError = PageError.GetInstance()
	ObjError.ErrorObjectDesc['api'] = api
	ObjError.ErrorObjectDesc['request'] = data
	ObjError.ErrorObjectDesc['action'] = `scheduleappointment`
}
