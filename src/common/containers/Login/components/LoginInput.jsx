import React, { Component } from 'react'
import { LogInInputContainer, LoginH1, LoginButton, Link } from './style'
import { Segment, Grid, Form, Message, Input, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'
// import { LoginFooter } from 'styles/components'
// import LoginFooterImage from 'static/images/login-footer.png'
// import MessageHandler from 'components/AdvanceFilter/components/MessageHandler'
import _ from 'lodash'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import { connect } from 'react-redux'
import { RESETPWD_PROG_PENDING, RESETPWD_PROG_DONE } from 'actions/auth'
import { push } from 'react-router-redux'

class LoginInput extends Component {
	constructor (props) {
		super(props)
		this.state = {
		}
	}

	componentDidUpdate (prevProps) {
	}

	render () {
		return (
			<LogInInputContainer>
				<Grid columns={1} stretched className='borderTopOrange'>
					<Grid.Row className="color-row">
						<Grid.Column className="pad-left">
							<Segment>
								<LoginH1><FormattedMessage id="LoginInput.Login" /></LoginH1>
							</Segment>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</LogInInputContainer>
		)
	}
}

LoginInput.propTypes = {
	intl: intlShape.isRequired,
	dispatchPwdChangeStatusPending: PropTypes.func,
	dispatchPwdChangeStatusDone: PropTypes.func,
	goDashboard: PropTypes.func
}

const mapStateToProps = state => {

}
const mapDispatchToProps = dispatch => ({
	goDashboard: () => dispatch(push('/dashboard')),
	dispatchPwdChangeStatusPending: () => dispatch({ type: RESETPWD_PROG_PENDING }),
	dispatchPwdChangeStatusDone: () => dispatch({ type: RESETPWD_PROG_DONE })
})

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(LoginInput))
