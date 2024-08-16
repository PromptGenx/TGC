import { IsValid, HideLoader } from 'api/utils/helper'

export default class CommonErrorHandlerService {
	constructor () {
		this.MankeLive = this.MankeLive.bind(this)
		this.HandleError = this.HandleError.bind(this)
	}

	MankeLive () {
		// console.log('This method is only required for empty class creation.')
	}

	RedirectToHomePage () {
		HideLoader()
		location.href = process.env.PROTOCOL + '//' + process.env.HOST + ':' + process.env.PORT
	}

	HandleError (ErrorHandlerObject) {
		let Status = {
			Valid: true,
			StatusCode: -1,
			Message: 'Server error has been occured. Please contact help desk.'
		}

		if (IsValid(ErrorHandlerObject)) {
			if (IsValid(ErrorHandlerObject.data)) {
				if (IsValid(ErrorHandlerObject.data.ResponseMessage)) {
					if (ErrorHandlerObject.data.ResponseMessage.StatusCode !== 200) {
						Status.Valid = false
						Status.StatusCode = ErrorHandlerObject.data.ResponseMessage.StatusCode
						if (Status.StatusCode === 400 || Status.StatusCode === 401) {
							Status.Message = 'Your session got expired. Please login again.'
						}
					}
				}
			}
		}
		return Status
	}
}
