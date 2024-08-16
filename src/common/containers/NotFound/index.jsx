// @flow
import React from 'react'
import {Header, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {NotFoundLayout} from './style'
import { FormattedMessage } from 'react-intl'

const NotFound = () => {
	return (
		<NotFoundLayout>
			<Header as="h2" icon textAlign="center">
				<Icon name="warning sign" circular />
				<Header.Content>Connect - Under Construction</Header.Content>
				<br/>
				{/* <Header.Subheader>
				<Link to="/"><FormattedMessage id="Page.Home" /></Link>
			</Header.Subheader> */}
			</Header>
		</NotFoundLayout>
	)
}

export default NotFound
