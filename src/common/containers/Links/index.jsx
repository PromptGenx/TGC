/**
 * @flow
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { Loader, Grid, List, Header, Icon } from 'semantic-ui-react'
import { GET_LINKS } from 'actions/links'
import LinkItem from './components/LinkItem'
import { getEntitiesLinksState, isLoaded } from 'selectors'
import { ContainerBox, NotCompatibleLayout } from './style'
import _ from 'lodash'

type Props = {
	links: Object,
	getLinks: () => void,
	isLinksLoaded: boolean
}

class Links extends Component<Props> {
	componentDidMount () {
		if (!this.props.isLinksLoaded) {
			this.props.getLinks()
		}
	}

	async asyncBootstrap () {
		if (!this.props.isLinksLoaded) {
			await this.props.getLinks()
		}
		return true
	}

	render () {
		const { links, isLinksLoaded } = this.props
		return (
			<NotCompatibleLayout>
				<Header as="h2" icon textAlign="center">
					<Icon name="info" circular />
					<Header.Content>About Us under construction</Header.Content>
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
}

function mapStateToProps (state) {
	const linksState = getEntitiesLinksState(state)
	const links = linksState.entities
	const isLinksLoaded = isLoaded(linksState)
	return { links, isLinksLoaded }
}

const mapDispatchToProps = dispatch => ({
	async getLinks () {
		return dispatch(GET_LINKS())
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Links)
