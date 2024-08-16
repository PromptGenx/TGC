// @flow
import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { getRouterRoutes } from 'routing'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'
import './index.css'
import { IsValid } from 'api/utils/helper'

// separate component for Routing is required by react-hot-loader
// + it's a good practice

// A simple component that shows the pathname of the current location
class RoutingWrapper extends React.Component {
	static propTypes = {
		match: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired
	}

	CheckScrollToTopState =() => {
		if (typeof document !== 'undefined') {
			let $ScrollBar = document.getElementById('main-container')
			if (IsValid($ScrollBar)) {
				if ($ScrollBar.scrollTop > 0) {
					document.getElementById('scrolltop-chip').classList.add('zero-opac')
				}
			}
		}
	}

	render () {
		const routes = getRouterRoutes()
		const { match, location, history } = this.props
		return (
			<div>
				<TransitionGroup>
					<CSSTransition
						key={location.key}
						classNames="fade"
						timeout={20000}
						appear= {true}
						exit={false}
						onEnter = {() => {
							window.scrollTo(0, 0)
						}}
					>
						<div>
							<Switch location={location}>
								{this.CheckScrollToTopState()}
								{routes.map((a, i) => <Route {...a} key={i} />)}
							</Switch>
						</div>
					</CSSTransition>
				</TransitionGroup>
			</div>
		)
	}
}

// Create a new component that is "connected" (to borrow redux
// terminology) to the router.
const RoutingWrapperWithRouter = withRouter(RoutingWrapper)

export default RoutingWrapperWithRouter
