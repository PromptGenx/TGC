/**
 * @flow
 */
import React from 'react'
import { Grid, Header, Image as ImageComponent } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import { StyledFooter } from './style'

const Footer = () => {
	let verName = process.env.RELEASE_VERSION
	let serverIP = process.env.SERVER
	return (
		<StyledFooter>
			<div className="footer-inner">
				<Grid columns={8}>
					<Grid.Row verticalAlign="middle">
						<Grid.Column width={2} mobile={2} textAlign="right">
							<Header as="h5">
								<Header.Content className="footer-color">
									Twitter-X
								</Header.Content>
							</Header>
						</Grid.Column>
						<Grid.Column width={12} mobile={12} textAlign="center">
							<Header as="h5">
								<Header.Content className="footer-color">
									YouTube
								</Header.Content>
							</Header>
						</Grid.Column>
						<Grid.Column width={2} mobile={2} textAlign="left">
							<Header as="h5">
								<Header.Content className="footer-color">
									FaceBook
								</Header.Content>
							</Header>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</div>
		</StyledFooter>
	)
}

export default Footer
