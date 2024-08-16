import React from 'react'
import {Grid, Header, Image} from 'semantic-ui-react'
import {StyledFooter} from 'styles/components'

const Footer = () => {
	return (
		<StyledFooter>
			<div className="footer-inner">
				<Grid columns={2} divided>
					<Grid.Row verticalAlign="middle">
						<Grid.Column width={8} mobile={8} textAlign="right">
							<a href="http://www.apmterminals.com/">
								<Header as="h5">
									{/* <Icon name="github" /> */}
									<Header.Content className="footer-color">
										Privacy Policy
									</Header.Content>
								</Header>
							</a>
						</Grid.Column>
						<Grid.Column width={8} mobile={8} textAlign="left" stretched={true}>
							<a href="http://www.apmterminals.com/">
								<Header as="h5" relaxed="true">
									{/* <Icon name="github" /> */}
									<Header.Content className="footer-color">
										Terms of Use
									</Header.Content>
								</Header>
							</a>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</div>
		</StyledFooter>
	)
}

export default Footer
