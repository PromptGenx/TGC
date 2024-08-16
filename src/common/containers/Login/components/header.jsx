/**
 * @flow
 */
import React from 'react'
import {connect} from 'react-redux'
import {Icon, Flag} from 'semantic-ui-react'
import {withRouter, matchPath} from 'react-router'
import _ from 'lodash'
import {TOGGLE_SIDEBAR} from 'actions/layout'
import {StyledHeader, SidebarLogo, SidebarLogoContainer} from 'styles/components'
import {getMetaRoutes} from 'routing'
import Headroom from 'react-headroom'
import LogoImage from '../../images/logo1.png'
import { FormattedMessage } from 'react-intl'

type Props = {
	title: string,
	toggleSidebar: () => void
}

const HeaderTop = {
	'position': 'fixed',
	'top': '0px',
	'width': '100%'
}

const UserMenu = () => {
	return (
		<div className="head-info dn" onMouseLeave={CloseLoginDropOption} id="usermenu">
			<ul>
				<li>
					<a>
						<i className="user icon"></i><span className="title-txt"><FormattedMessage id="Header.MyAccount" /></span>
					</a>
				</li>
				<li>
					<a className="anc-last">
						<i className="sign out alternate icon"></i><span className="title-txt"><FormattedMessage id="Header.Signout" /></span>
					</a>
				</li>
			</ul>
		</div>
	)
}

const toggaleUserMenu = (e) => {
	let menudv = document.getElementById('usermenu')
	if (menudv.classList.contains('dn')) {
		menudv.classList.remove('dn')
		menudv.classList.add('sn')
	} else {
		menudv.classList.remove('sn')
		menudv.classList.add('dn')
	}
}

const Header = ({title, toggleSidebar}: Props) => {
	return (
		<Headroom style={HeaderTop}>
			<StyledHeader>
				<div className="header-inner">
					<span className="navicon" role="button" onClick={toggleSidebar}>
						<Icon name="content" />
					</span>
					<SidebarLogoContainer href="https://apmterminals.com">
						<SidebarLogo src={LogoImage} alt="logo" shape="circular" centered />
						<span className="spn-title"><FormattedMessage id="Header.PoweredBy" /><b><FormattedMessage id="Header.TERMPoint" /></b></span>
					</SidebarLogoContainer>
					
				</div>
			</StyledHeader>
		</Headroom>
	)
}

const mapStateToProps = (state, props) => {
	const {location: {pathname}} = props
	const {name: title} =
		_.find(getMetaRoutes(), a => matchPath(pathname, a))
	return {
		title
	}
}

const mapDispatchToProps = dispatch => ({
	toggleSidebar () {
		dispatch(TOGGLE_SIDEBAR)
	}
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
