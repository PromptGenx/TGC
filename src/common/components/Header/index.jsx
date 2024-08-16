/**
 * @flow
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Icon, Menu } from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'
import { withRouter } from 'react-router'
import _ from 'lodash'
import { StyledHeader } from './style'
import Headroom from 'react-headroom'
import * as $_ from 'common/QueryFile/@Query'

const HeaderTop = {
	'position': 'fixed',
	'top': '-50px',
	'width': '100%',
	'z-index': '2'
}
const divStyle = {
	'font-size': '100px',
	'margin-bottom': '35px'
}

const NObject = {
	a: '',
	b: ''
}

const routing: any[] = [
	{
		path: '/about',
		exact: true,
		name: 'ABOUT US',
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
		path: '/services',
		exact: true,
		name: 'SERVICES',
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

class Header extends Component<Props> {
	constructor (props) {
		super(props)
		this.GenerateMenu = this.GenerateMenu.bind(this)
		this.state = {
		}
	}
	InitQuery = () => {
		$_.Query.find(x => x.id('hello'))
	}
	GenerateMenu = (menurouting) => {
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
		const routes = this.GenerateMenu(routing)
		return (
			<div style={HeaderTop}>
				<Headroom>
					<StyledHeader>
						{/* <div className="header-inner">
						<span className="navicon" role="button">
							<Icon name="content" />
						</span>
						<div className="logo-side-text">
							<b>Welcome to Throne Of Grace</b> <br />
						</div>
					</div> */}
						<div style={divStyle}>Throne of Grace</div>
						{/* <nav className="nav">
						<a href="#home">Home</a>
						<a href="#about">About Us</a>
						<a href="#services">Services</a>
						<a href="#contact">Contact</a>
					</nav> */}
						<div id="menu-sec" className="menu-dv">{routes}</div>
					</StyledHeader>
				</Headroom>
			</div>
		)
	}
}

const mapStateToProps = state => ({ }) // This returns an empty object
const mapDispatchToProps = dispatch => ({})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
