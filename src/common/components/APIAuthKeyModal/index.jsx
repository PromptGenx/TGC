/**
 * @flow
 */

import React, {Component} from 'react'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { IsNotNullOrEmpty, ShowLoader, HideLoader } from 'api/utils/helper'
import { Flag } from 'appConstants'

import ValidationMessages from 'containers/Account/ManageUsers/components/ValidationMessages'

import { Modal, List, Form } from 'semantic-ui-react'
import { StyledButton, StyledCheckbox } from 'styles/components'
import { CustomModalHeader } from './style'

class APIAuthKeyModal extends Component {
	constructor (props) {
		super(props)

		this.SetAPIAuthKey = this.SetAPIAuthKey.bind(this)
		this.SubmitAPIAuthKey = this.SubmitAPIAuthKey.bind(this)

		this.state = {
			APIAuthKey: {},
			Messages: [],
			DisableForm: false
		}
	}

	componentDidMount () {
		ShowLoader()

		let AuthKeyRequest = {
			UserAPIAuthKey: {
				APIAuthenticationKey_Id: 0,
				User_Id: this.props.User_Id,
				AuthKey: null,
				Create_DtTm: null,
				Active_Flg: null
			},
			IsAdmin: this.props.isAdmin,
			Login_Nm: this.props.Login_Nm
		}

		this.props.GetAPIAuthKey(AuthKeyRequest)
	}

	componentDidUpdate (prevProps) {
		if (prevProps.isLoading && !this.props.isLoading) {
			if (IsNotNullOrEmpty(this.props.APIAuthKeyData)) {
				if (IsNotNullOrEmpty(this.props.APIAuthKeyData.ObjUserMessagesList)) {
					let ServerMessages = []

					this.props.APIAuthKeyData.ObjUserMessagesList.map((item) => {
						return ServerMessages.push({'Error_Desc': item.MessageDescription, 'ErrSeverity_Ind': item.MessageSeverity})
					})

					this.setState({
						Messages: ServerMessages,
						DisableForm: true
					})
				}
				else {
					this.SetAPIAuthKey(this.props.APIAuthKeyData)
				}
			}

			HideLoader()
		}

		if (prevProps.isSubmitPending && !this.props.isSubmitPending) {
			if (IsNotNullOrEmpty(this.props.APIAuthKeySubmitData)) {
				let ServerMessages = []

				this.props.APIAuthKeySubmitData.ObjUserMessagesList.map((item) => {
					return ServerMessages.push({'Error_Desc': item.MessageDescription, 'ErrSeverity_Ind': item.MessageSeverity})
				})

				this.setState({
					Messages: ServerMessages
				})

				this.SetAPIAuthKey(this.props.APIAuthKeySubmitData)
			}

			HideLoader()
		}
	}

	SetAPIAuthKey (ServerData) {
		let APIAuthKeyData = {}

		if (IsNotNullOrEmpty(ServerData) && IsNotNullOrEmpty(ServerData.UserAPIAuthKeyJSON)) {
			let RG_APIAuthenticationKey = JSON.parse(ServerData.UserAPIAuthKeyJSON)['RG_APIAuthenticationKey']

			APIAuthKeyData = {
				APIAuthenticationKey_Id: RG_APIAuthenticationKey[0].APIAuthenticationKey_Id,
				User_Id: RG_APIAuthenticationKey[0].User_Id,
				AuthKey: RG_APIAuthenticationKey[0].AuthKey,
				Create_DtTm: RG_APIAuthenticationKey[0].Create_DtTm,
				Expire_Dt: RG_APIAuthenticationKey[0].Expire_Dt,
				Active_Flg: RG_APIAuthenticationKey[0].Active_Flg
			}
		}

		this.setState({
			APIAuthKey: APIAuthKeyData
		})
	}

	SubmitAPIAuthKey (Renew, Active) {
		ShowLoader()

		let APIAuthKeyRequest = {
			UserAPIAuthKey: {
				APIAuthenticationKey_Id: this.state.APIAuthKey.APIAuthenticationKey_Id,
				User_Id: this.props.User_Id,
				AuthKey: this.state.APIAuthKey.AuthKey,
				Create_DtTm: this.state.APIAuthKey.Create_DtTm,
				Active_Flg: Active
			},
			IsRenew: Renew,
			Login_Nm: this.props.Login_Nm
		}

		this.setState({
			Messages: []
		})

		this.props.SubmitAPIAuthKey(APIAuthKeyRequest)
	}

	handlePlaceHolderStr = (key) => {
		const { intl } = this.props
		return intl.formatMessage({ id: key })
	}

	handleCopyAuthKey = () => {
		let AuthKeyInput = document.getElementsByName('AuthKey')
		let ResultMessage = []

		if (IsNotNullOrEmpty(AuthKeyInput)) {
			AuthKeyInput[0].select()
			document.execCommand('copy')

			ResultMessage.push({'Error_Desc': this.handlePlaceHolderStr('APIAuthKeyModal.CopySuccessful'), 'ErrSeverity_Ind': 0})
		}
		else {
			ResultMessage.push({'Error_Desc': this.handlePlaceHolderStr('APIAuthKeyModal.CopyFailed'), 'ErrSeverity_Ind': 0})
		}

		this.setState({
			Messages: ResultMessage
		})
	}

	handleActive_Flg = () => {
		let IsRenew = false
		let IsActive = this.state.APIAuthKey.Active_Flg === Flag.YES ? Flag.NO : Flag.YES

		this.SubmitAPIAuthKey(IsRenew, IsActive)
	}

	handleRenew = () => {
		let IsRenew = true
		let IsActive = this.state.APIAuthKey.Active_Flg

		this.SubmitAPIAuthKey(IsRenew, IsActive)
	}

	render () {
		const { Messages, DisableForm } = this.state
		let { AuthKey, Expire_Dt, Active_Flg } = this.state.APIAuthKey

		return (
			<Modal
				closeIcon={true}
				dimmer={true}
				onClose={this.props.CloseModal}
				open={true}>
				<Modal.Header>
					<CustomModalHeader>
						<span className='header'>
							<FormattedMessage id='APIAuthKeyModal.ModalHeader' />
						</span>
					</CustomModalHeader>
				</Modal.Header>
				<Modal.Content>
					{Messages !== undefined && Messages.length > 0 &&
						<List relaxed divided animated>
							{_.map(Messages, (ConItem, i) => {
								if (ConItem !== undefined) {
									return <ValidationMessages key={i} {...ConItem} />
								}
							})}
						</List>
					}
					<Form>
						<Form.Group widths='equal'>
							<Form.Input
								fluid
								readOnly
								action = {{
									disabled: DisableForm,
									icon: 'copy',
									onClick: this.handleCopyAuthKey
								}}
								label={this.handlePlaceHolderStr('APIAuthKeyModal.AuthKey')}
								name='AuthKey'
								value={AuthKey}
							/>
						</Form.Group>
						<Form.Group widths='equal'>
							<Form.Input fluid readOnly label={this.handlePlaceHolderStr('APIAuthKeyModal.Expire_Dt')} name='Expire_Dt' value={Expire_Dt} />
						</Form.Group>
						<Form.Group widths='equal'>
							<StyledCheckbox fluid checked={Active_Flg === Flag.YES} disabled={DisableForm} label={this.handlePlaceHolderStr('APIAuthKeyModal.Active_Flg')} onChange={this.handleActive_Flg} readOnly={!this.props.isAdmin} />
						</Form.Group>
					</Form>
				</Modal.Content>
				<Modal.Actions>
					{this.props.isAdmin && <StyledButton primary disabled={DisableForm} loading={this.props.isSubmitPending} onClick={this.handleRenew} ><FormattedMessage id='APIAuthKeyModal.Renew' /></StyledButton>}
					<StyledButton onClick={this.props.CloseModal} ><FormattedMessage id='Close' /></StyledButton>
				</Modal.Actions>
			</Modal>
		)
	}
}

APIAuthKeyModal.propTypes = {
	User_Id: PropTypes.number,
	Login_Nm: PropTypes.string,
	APIAuthKeyData: PropTypes.object,
	APIAuthKeySubmitData: PropTypes.object,
	isAdmin: PropTypes.bool,
	isLoading: PropTypes.bool,
	isSubmitPending: PropTypes.bool,
	GetAPIAuthKey: PropTypes.func,
	SubmitAPIAuthKey: PropTypes.func,
	CloseModal: PropTypes.func,
	intl: intlShape.isRequired
}

export default injectIntl(APIAuthKeyModal)
