// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Menu, Icon, Dropdown, Input, Accordion, Popup, Segment } from 'semantic-ui-react'
import { withRouter } from 'react-router'
import { push } from 'react-router-redux'
import { NavLink } from 'react-router-dom'
import { getLayoutState } from 'selectors'
import { StyledSidebar } from './style'
import { ToolTip } from 'styles/components'
import { getCurrentFacilityId, getUserInfoByKey, getMTOProfileParamByCode, hasWebFunctionRights } from 'api/LocalStorageCookiesSvc'
import { MTOProfileParam, Flag, TrucksAndOrDrivers } from 'appConstants'
import _ from 'lodash'
import { reactIntlFormattedStr } from 'api/utils/helper'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import PropTypes from 'prop-types'

class ReactSidebarComponent extends Component<Props> {
	constructor (props) {
		super(props)
		this.GenerateMenu = this.GenerateMenu.bind(this)
		this.state = {
		}
	}

	componentWillMount () {
		// console.log('[ wiil mount fired ]=========================================================================>>>')
	}

	componentWillUpdate () {
		// console.log('[ will update fired ]=========================================================================>>>')
	}

	ExpandPanel = (e) => {
		e.stopPropagation()
		let ReferenceLink = e.currentTarget.getAttribute('href')
		if (this.state.NoLoad.indexOf(ReferenceLink) !== -1) { e.preventDefault() }
		let elems = document.getElementById('menu-sec').querySelectorAll('a')
		let IsSelf = false
		let indx = elems.length
		while (indx > 0) {
			if (elems[indx - 1] !== e.currentTarget) {
				elems[indx - 1].classList.remove('active')
				if (e.currentTarget.closest('a > div') == null) {
					if (elems[indx - 1].querySelector('div').classList.contains('expand')) {
						elems[indx - 1].querySelector('div').classList.remove('expand')
						if (elems[indx - 1].querySelectorAll('i:nth-of-type(1)').length > 1) {
							elems[indx - 1].querySelectorAll('i:nth-of-type(1)')[1].setAttribute('class', 'plus icon')
						}
					}
					elems[indx - 1].removeAttribute('style')
				}
			}
			indx--
		}
		e.currentTarget.classList.add('active')

		if (e.currentTarget.querySelector('div[name="child-dv"]') != null) {
			let $classes = e.currentTarget.querySelector('div[name="child-dv"]').classList
			if (!$classes.contains('expand')) {
				$classes.add('expand')
				e.currentTarget.setAttribute('style', 'background-color: #023b5a !important')
				if (e.currentTarget.querySelectorAll('i:nth-of-type(1)').length > 1) {
					e.currentTarget.querySelectorAll('i:nth-of-type(1)')[1].setAttribute('class', 'minus icon')
				}
			} else {
				$classes.remove('expand')
				e.currentTarget.removeAttribute('style')
				if (e.currentTarget.querySelectorAll('i:nth-of-type(1)').length > 1) {
					e.currentTarget.querySelectorAll('i:nth-of-type(1)')[1].setAttribute('class', 'plus icon')
				}
			}
			// e.currentTarget.querySelector('div[name="child-dv"]').setAttribute('class', classes)
		}
	};

	GenerateMenu (menurouting) {
		const routes = menurouting.map((route, i) => {
			const { path, icon, name, exact, hasChild, external } = route
			let linkProps = external
				? { href: path, rel: 'noopener', as: 'a', target: '_blank' }
				: { activeClassName: 'active', to: path, as: NavLink, exact }

			return (
				<Menu.Item key={i} {...linkProps} icon link>
					{/* onClick={this.ExpandPanel} */}
					<span name={name}><Icon name={icon} />{name}</span>
				</Menu.Item>
			)
		})
		return routes
	}

	render () {
		const routing: any[] = [
			{
				path: '/about',
				exact: true,
				name: 'ABOUT',
				icon: '',
				hasChild: false
			},
			{
				path: '/connect',
				exact: true,
				name: 'CONNECT',
				icon: '',
				hasChild: false
			},
			{
				path: '/resources',
				exact: true,
				name: 'RESOURCES',
				icon: '',
				hasChild: false
			},
			{
				path: '/contact',
				exact: true,
				name: 'CONTACT US',
				icon: '',
				hasChild: false
			}
		]

		const sidebarProps = {
			visible: true,
			as: Menu,
			vertical: false,
			animation: 'push',
			width: 'wide',
			inverted: true
		}

		const routes = this.GenerateMenu(routing)
		let activeItem = 'ABOUT'
		return (
			// <StyledSidebar {...sidebarProps}>

			//  	{/* <div id="menu-sec" className="menu-dv">{routes}</div> */}
			//  </StyledSidebar>

			<Segment inverted>
				<Menu inverted secondary>
					<Menu.Item
						name='ABOUT'
						active={activeItem === 'ABOUT'}
						onClick={this.handleItemClick}
					/>
					<Menu.Item
						name='CONNECT'
						active={activeItem === 'CONNECT'}
						onClick={this.handleItemClick}
					/>
					<Menu.Item
						name='RESOURCES'
						active={activeItem === 'RESOURCES'}
						onClick={this.handleItemClick}
					/>
					<Menu.Item
						name='CONTACTUS'
						active={activeItem === 'CONTACTUS'}
						onClick={this.handleItemClick}
					/>
				</Menu>
			</Segment>

		)
	}
}

const mapStateToProps = state => ({ }) // This returns an empty object
const mapDispatchToProps = dispatch => ({})

ReactSidebarComponent.propTypes = {
	intl: intlShape.isRequired
}

// re-update current active link in sidebar on location change
// export default injectIntl(withRouter(connect(mapStateToProps, mapDispatchToProps)(ReactSidebarComponent)))
export default injectIntl(withRouter(connect(mapStateToProps, mapDispatchToProps)(ReactSidebarComponent)))
