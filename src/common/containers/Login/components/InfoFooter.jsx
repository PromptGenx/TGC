/**
 * @flow
 */
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { LoginFooter } from './style'
import { Header, Icon, List, Grid } from 'semantic-ui-react'

const InfoFooter = () => {
	return (
		<LoginFooter>
			<Header as="h2" icon textAlign="center">
				<Header.Subheader>
					<List>
						<List.Item><FormattedMessage id="NotCompatible.Login" /></List.Item>
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
				</Header.Subheader>
			</Header>
		</LoginFooter>
	)
}

export default InfoFooter
