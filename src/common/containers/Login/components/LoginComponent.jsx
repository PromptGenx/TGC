// @flow
import React, { Component } from 'react'
import { Segment, Grid, Divider, Icon, Message } from 'semantic-ui-react'
import { Helmet } from 'react-helmet'
import { LoginButton, MainContainer, MainH1, MainH2 } from './style'
import LoginInput from './LoginInput'
import InfoFooter from './InfoFooter'
import Carousel from './CarouselDemo'
import _ from 'lodash'
import { FormattedMessage } from 'react-intl'
import { HideLoader } from 'api/utils/helper'
import { LocaleDataGet } from 'api/LocalStorageCookiesSvc'
import { clearStoreAndCookie } from 'actions/auth'

type Props = {
	login: (data: Object) => void,
	loginError: Object,
	ResetPwdResult: Object,
	isSubmitPending: boolean,
	SubmitResetPwd: Function,
	GoRegistration: Function
}

class LoginComponent extends Component {
	props: Props
	constructor (props) {
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.state = {
			ShowErrorMsg: false
		}
	}
	handleSubmit = (Login_Nm, Login_Pwd) => {
		this.setState({
			ShowErrorMsg: false
		})
		this.props.login({ Login_Nm: Login_Nm, Login_Pwd: Login_Pwd })
	}
	componentDidMount () {
		let SessionLoggedOut = LocaleDataGet('SessionLoggedOut')
		if (SessionLoggedOut === '1') {
			this.setState({
				ShowErrorMsg: true
			}, () => {
				HideLoader()
				clearStoreAndCookie()
			})
		}
	}

	render () {
		const {ShowErrorMsg} = this.state
		// Error from server
		const { loginError } = this.props
		// const loginFormProps = {error: !_.isEmpty(errors)}
		return (
			<div>

				<MainContainer>
					<Segment>

					</Segment>
					<Segment>

					</Segment>
					<Segment>

					</Segment>
				</MainContainer>
			</div>
		)
	}
}

export default LoginComponent
