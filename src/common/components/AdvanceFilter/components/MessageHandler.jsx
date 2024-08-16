import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Message, Icon, List } from 'semantic-ui-react'
import _ from 'lodash'
import { MessageDiv } from '../style'
import { IsNotNullOrEmpty } from 'api/utils/helper'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

class MessageHandler extends Component {
	constructor (props) {
		super(props)
		this.DeriveSeverityColor = this.DeriveSeverityColor.bind(this)
		this.DeriveSeverityIcon = this.DeriveSeverityIcon.bind(this)
		this.state = { visible: true }
	}

	handleDismiss = () => {
		this.setState({ visible: false })
	}

	toggleMsgDiv () {
		let tag = document.getElementById('messageHandler')
		tag.style.display = 'block'
		setTimeout(() => {
			tag.classList.add('fade-div')
			setTimeout(() => {
				tag.classList.remove('fade-div')
				tag.style.display = 'none'
			}, 0)
		}, 60000)
	}

	componentDidMount () {
		this.toggleMsgDiv()
	}

	componentDidUpdate () {
		this.toggleMsgDiv()
	}

	DeriveSeverityColor (MessageSeverity) {
		let SeverityColor = 'red'

		switch (MessageSeverity) {
		case 0:
		case 1:
			SeverityColor = 'green'
			break
		case 2:
			SeverityColor = 'gold'
			break
		}

		return SeverityColor
	}

	DeriveSeverityIcon (MessageSeverity) {
		let SeverityIcon = 'close'

		switch (MessageSeverity) {
		case 0:
		case 1:
			SeverityIcon = 'check'
			break
		case 2:
			SeverityIcon = 'warning sign'
			break
		}

		return SeverityIcon
	}

	render () {
		if (this.state.visible) {
			return (
				<TransitionGroup>
					<CSSTransition
						key={location.key}
						classNames="fade"
						timeout={60000}
						appear={true}
						exit={false}
					>
						<div style={{ 'width': '99%', 'padding': '10px 0 10px 0' }} id="messageHandler" tabIndex="-1">
							{
								_.map(this.props.MessageList, (message, i) => {
									return (
										<MessageDiv colorName={this.DeriveSeverityColor(message['MessageSeverity'])}>
											<div className="MessageDiv_innerDiv">
												<p className="msgDesc">{message['MessageDescription']}</p>
												<Icon name={this.DeriveSeverityIcon(message['MessageSeverity'])} size="big" />
											</div>
										</MessageDiv>
									)
								})
							}
						</div>
					</CSSTransition>
				</TransitionGroup>
			)
		}
	}
}

MessageHandler.propTypes = {
	MessageList: PropTypes.array,
	MessageHeader: PropTypes.string
}

export default MessageHandler
