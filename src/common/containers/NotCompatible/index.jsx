// @flow
import React from 'react'
import { Header, Icon, List, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { NotCompatibleLayout } from './style'
import { FormattedMessage } from 'react-intl'

const NotCompatible = () => {
	return (
		<NotCompatibleLayout>
			<Header as="h2" icon textAlign="center">
				<Icon name="info" circular />
				<Header.Content>Contact Us under construction</Header.Content>
				<br/>
				{/* <Header.Subheader>
					<List>
						<List.Item><FormattedMessage id="NotCompatible.Info1" /></List.Item>
						<List.Item><FormattedMessage id="NotCompatible.Info2" /></List.Item>
						<br/>
						<Grid columns={3} divided>
							<Grid.Row>
								<Grid.Column>
									<Icon name="chrome" circular /><FormattedMessage id="NotCompatible.Chrome" />
								</Grid.Column>
								<Grid.Column>
									<Icon name="firefox" circular /><FormattedMessage id="NotCompatible.FireFox" />
								</Grid.Column>
								<Grid.Column>
									<Icon name="microsoft edge" circular /><FormattedMessage id="NotCompatible.Edge" />
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</List>
				</Header.Subheader> */}
			</Header>
		</NotCompatibleLayout>
	)
}

export default NotCompatible
