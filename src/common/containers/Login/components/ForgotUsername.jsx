import React, {Component} from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { CustomeModalHeader, Content, ErrorMessage } from './style'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import { Modal, Form, Loader, Divider, Radio } from 'semantic-ui-react'
import { StyledButton, StyledRadio } from 'styles/components'
import { IsNotNullOrEmpty } from 'api/utils/helper'
import { Flag } from 'appConstants'
import { getUserInfoByKey } from 'api/LocalStorageCookiesSvc'
import MessageHandler from 'components/AdvanceFilter/components/MessageHandler'
import { encrypt } from 'containers/Utility'

class ForgotUsername extends Component {
	constructor (props) {
		super(props)
		this.state = {
			Errors: [],
			ServerError: [],
			Email_Addr: '',
			Login_Id: '',
			isSubmitBtnDisable: false
		}
	}

	componentWillReceiveProps (nextProps) {
		if (this.props.isSubmitPending === true && nextProps.isSubmitPending === false) {
			if (IsNotNullOrEmpty(nextProps.ResetPwdResult)) {
				let ServerError = []
				let err = nextProps.ResetPwdResult.ObjUserMessagesList
				err.map((item, index) => { if (item.MessageNo !== 0) { return ServerError.push({'MessageDescription': item.MessageDescription, 'MessageSeverity': item.MessageSeverity}) } })
				this.setState((state) => ({
					ServerError: ServerError,
					isSubmitBtnDisable: true
				}))
				let ForgotText = this.props.ModalName === 'Forgot Username?' ? 'UID' : 'PWD'
				if (IsNotNullOrEmpty(ServerError) && ServerError[0].MessageSeverity !== 0) {
					ForgotText === 'UID' ? this.InputStyling('Email_Addr', false) : this.InputStyling('Login_Id', false)
				}
				else {
					ForgotText === 'UID' ? this.InputStyling('Email_Addr', true) : this.InputStyling('Login_Id', true)
				}
			}
		}
	}
    handlePlaceHolderStr = (key) => {
    	const { intl } = this.props
    	return intl.formatMessage({ id: key })
    }

	handleChange = (e, value) => {
		this.setState((state) => ({
			[value.name]: value.value
    	}))
    	event.preventDefault()
	}

	handleSubmit = () => {
		let {Email_Addr, Login_Id} = this.state
		let ForgotText = this.props.ModalName === 'Forgot Username?' ? 'UID' : 'PWD'
		let ResetPwd = { Email_Addr: encrypt(Email_Addr), Login_Id: encrypt(Login_Id), ForgotText: ForgotText }
		if (this.ValidateInput(Email_Addr, Login_Id)) {
			this.props.SubmitResetPwd({ResetPwd})
		}
	}
	InputStyling = (controlName, isValid) => {
		let tag = document.getElementsByName(controlName)[0]
		if (isValid) {
			tag.classList.remove('empty-alert')
			tag.classList.add('valid-alert')
		}
		else {
			tag.classList.remove('valid-alert')
			tag.classList.add('empty-alert')
		}
	}
    ValidateInput = (Email_Addr, Login_Id) => {
    	const validateError = []
    	let ForgotText = 'Forgot Username?'
    	if (this.props.ModalName === ForgotText) {
    		if (!IsNotNullOrEmpty(Email_Addr)) {
    			validateError.push({'Error_Desc': this.handlePlaceHolderStr('ForgotUsername.ValidEmail'), 'ErrSeverity_Ind': 3})
    			this.InputStyling('Email_Addr', false)
    		}
    		else if (this.IsValidEmail(Email_Addr)) {
    			validateError.push({'Error_Desc': this.handlePlaceHolderStr('ForgotUsername.ValidEmail2'), 'ErrSeverity_Ind': 3})
    			this.InputStyling('Email_Addr', false)
    		}
    		else {
    			this.InputStyling('Email_Addr', true)
    		}
    	}
    	else {
    		if (!IsNotNullOrEmpty(Login_Id)) {
    			validateError.push({'Error_Desc': this.handlePlaceHolderStr('ForgotUsername.ValidLoginName'), 'ErrSeverity_Ind': 3})
    			this.InputStyling('Login_Id', false)
    		}
    		else {
    			this.InputStyling('Login_Id', true)
    	    }
    	}

    	if (validateError.length > 0) {
    		this.setState((state) => ({Errors: validateError}))
    		return false
    	}
    	else {
    		this.setState((state) => ({Errors: []}))
    		return true
    	}
    }

	hidePopUp = () => {
		this.setState((state) => ({
			Errors: [],
			ServerError: []
		}))
		this.props.closePopUp()
	}

	IsValidEmail = (sEmail) => {
		return (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(sEmail))
	}

	render () {
    	let {Email_Addr, Login_Id} = this.state
    	let ForgotText = 'Forgot Username?'
    	let title = this.props.ModalName === ForgotText ? 'ForgotUsername.ForgotUserId' : 'ForgotUsername.ForgotPassword'
    	let info = this.props.ModalName === ForgotText ? 'ForgotUsername.Info' : null
		const {ServerError} = this.state
    	return (
    		<Modal
    			dimmer={this.props.PopUpState}
    			open={this.props.PopUpState}
    			closeIcon onClose={this.hidePopUp} closeOnDimmerClick={false}
    			size='tiny'>
    			<Modal.Header>
    				<CustomeModalHeader>
    					<span className="header"><FormattedMessage id={title} /></span>
    				</CustomeModalHeader>
    			</Modal.Header>
    			<Modal.Content>
					{ IsNotNullOrEmpty(this.props.ResetPwdResult) && IsNotNullOrEmpty(ServerError) && <MessageHandler MessageList={ServerError} /> }
					<Content>
						<Form>
							{ this.props.ModalName === ForgotText ? <p><b><FormattedMessage id={info}/></b></p> : null }
							{
								this.props.ModalName === ForgotText
									? (
										<Form.Input fluid name='Email_Addr' onChange={this.handleChange} value={Email_Addr} />
									) : (
										<Form.Input fluid label={this.handlePlaceHolderStr('ForgotUsername.LabelUserId')} maxLength="100" name='Login_Id' onChange={this.handleChange} value={Login_Id} />
									)
							}
							{this.state.Errors.length > 0 && <ErrorMessage>{this.state.Errors[0].Error_Desc}</ErrorMessage>}
						</Form>
					</Content>
    			</Modal.Content>
    			<Modal.Actions>
    				<StyledButton primary loading={this.props.isSubmitPending} disabled={this.state.isSubmitBtnDisable} onClick={this.handleSubmit} ><FormattedMessage id="Submit" /></StyledButton>
    				<StyledButton onClick={this.hidePopUp}><FormattedMessage id="Cancel" /></StyledButton>
    			</Modal.Actions>
    		</Modal>
    	)
	}
}

ForgotUsername.propTypes = {
	isSubmitPending: PropTypes.bool,
	PopUpState: PropTypes.bool,
	closePopUp: PropTypes.func,
	intl: intlShape.isRequired,
	ModalName: PropTypes.string,
	SubmitResetPwd: PropTypes.func,
	ResetPwdResult: PropTypes.object
}

export default injectIntl(ForgotUsername)
