/**
 * @flow
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { push } from 'react-router-redux'
import _ from 'lodash'
// Import main views
import Sidebar from 'components/Sidebar'
import Footer from 'components/Footer'
import Header from 'components/Header'
// Import actions
import { TOGGLE_SIDEBAR, WINDOW_RESIZE, TOGGLE_FILTER, TOGGLE_ADDWATCHLIST, TOGGLE_ADDUSERGROUP } from 'actions/layout'
import { LOGOUT_AUTH, clearStoreAndCookie } from 'actions/auth'
import { getAuthState, getLayoutState, getLayoutMobileStatuses } from 'selectors'
import ReactGA from 'react-ga'
import { resetLocalToken, getLocalToken, LocaleDataSet, getMTOProfileParamByCode, getUserInfoByKey } from 'api/LocalStorageCookiesSvc'
import PropTypes from 'prop-types'
import { MTOProfileParam } from 'appConstants'
// import {appendScript} from 'containers/Utility'

// Import styled components
// import {PageLayout, SidebarSemanticPusherStyled, SidebarSemanticPushable} from './style'
import {
	PageLayout,
	MainLayout,
	MainContent,
	SidebarSemanticPusherStyled,
	SidebarSemanticPushableStyled,
	MainContainer,
	StyledDimmer,
	Toast,
	ScrollChip
} from './style'
import type { RouteItem } from 'types'
import { Container, Dimmer, Loader, Icon } from 'semantic-ui-react'
import type { GlobalState } from 'reducers'

// Scss is written as a case study and a proof of CSS support
import './App.scss'
import { IsNotNullOrEmpty, HideLoader, ShowToast, IsValid, RegisterWindowException } from 'api/utils/helper'
import { LocaleDataGet, LocaleDataRemove, getUserLocale, hasWebFunctionRights } from 'api/LocalStorageCookiesSvc/index'
// import CommonService from 'containers/ScheduleAppointment/components/CommonService'
const ExceptionStyle = 'background: #222; color: #bada55; border-radius: 4px;'

type Props = {
	children: React$Node,
	// Routes of app passed as props in `Root`
	routes: Array<RouteItem>,
	// React-router `withRouter` props
	location: any,
	history: any,
	// SidebarOpened can force component to re-render
	sidebarOpened: boolean,
	closeSidebar: Function,
	// IsLoggedIn can force component to re-render
	isLoggedIn: boolean,
	isLoading: boolean,
	handleWindowResize: Function,
	logout: Function,
	checkAuthLogic: Function,
	toggleSidebar: Function,
	// IsMobile can force component to re-render
	isMobile: string,
	isMobileXS: boolean,
	isMobileSM: boolean,
	send: Function,
	ToggleFilter: boolean,
	setLoginState: Function,
	setLogoutState: Function,
	CheckUrl: Function,
	IsWatchListToggle: boolean,
	IsAddUserGroupToggle: boolean,
	IsResetPwdChangePending: boolean,
	LogLocalException: Function,
	isSafetyAttestationPending: boolean
}

let loginToken = false
class App extends Component<Props> {
	props: Props
	componentDidMount () {
		// appendScript('https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/aes.js')
		if (process.env.SENTRY_PUBLIC_DSN) {
			const script = document.createElement('script')
			script.type = 'text/javascript'
			script.crossorigin = 'anonymous'
			script.async = true
			script.onload = () => {
				Raven.config(process.env.SENTRY_PUBLIC_DSN, {
					release: process.env.RELEASE_VERSION,
					environment: process.env.NODE_ENV
				}).install()
			}
			script.src = 'https://cdn.ravenjs.com/3.24.1/raven.min.js'
			document.body.appendChild(script)
		}

		if (process.env.GA_ID) {
			const { location: { search, pathname } } = this.props
			ReactGA.initialize(process.env.GA_ID)
			ReactGA.pageview(pathname + search)
		}
		this.BindGrlobalErrorHandler()
	}

	handleContainerScrollEvent = (e) => {
		let position = document.getElementById('main-container').scrollTop
		if (position > 80) {
			document.getElementById('scrolltop-chip').classList.remove('zero-opac')
		} else {
			document.getElementById('scrolltop-chip').classList.add('zero-opac')
		}
	}

	scrollToTop = () => {
		let $Container = document.getElementById('main-container')
		this.MoveScrollTo($Container, 0, 500)
	}

	MoveScrollTo = (element, to, duration) => {
		let start = element.scrollTop
		let change = to - start
		let currentTime = 0
		let increment = 20

		const animateScroll = () => {
			currentTime += increment
			var val = this.easeInOutQuad(currentTime, start, change, duration)
			element.scrollTop = val
			if (currentTime < duration) {
				setTimeout(animateScroll, increment)
			}
		}
		animateScroll()
	}

	easeInOutQuad = (t, b, c, d) => {
	  t /= d / 2
		if (t < 1) return c / 2 * t * t + b
		t--
		return -c / 2 * (t * (t - 2) - 1) + b
	};

	BindGrlobalErrorHandler = () => {
		try {
			if (typeof window !== 'undefined') {
				window.onerror = () => {
					HideLoader()
					// let commonService = new CommonService()
					// let TerminalName = getMTOProfileParamByCode(MTOProfileParam.TerminalName)
					// let User_Nm = getUserInfoByKey('Login_Nm')
					// let Company_Nm = getUserInfoByKey('Company_Nm')
					// let error = LocaleDataGet('error')
					// error = JSON.parse(error)
					// if (IsValid(error)) {
					// 	error['Terminal'] = TerminalName
					// 	error['UserName'] = User_Nm
					// 	error['CompnayName'] = Company_Nm
					// 	error['Locale'] = getUserLocale()
					// 	LocaleDataRemove('error')
					// 	this.props.LogLocalException(error)
					// }
				}
			}
		} catch (e) {
			console.log('Fired exception in BindGlobalErrorHandler() Method under App=>index.jsx file.')
		}
	}

	BindToast (ErrorObject) {
		let FileName = ''
		let FullMessage = ''
		if (IsValid(ErrorObject)) {
			console.log('%c [-------- Your code encounter an exception. Please see the below description.  ------------ ]\n ', ExceptionStyle)
			if (IsValid(ErrorObject.FileName)) {
				FileName += '[File: ' + ErrorObject.FileName + ' ]\n'
			}
			if (IsValid(ErrorObject.Message)) {
				FullMessage += '[Message: ' + ErrorObject.Message + ' ]\n '
			}
			if (IsValid(ErrorObject.InnerMessage)) {
				FullMessage += '[Inner message: ' + ErrorObject.InnerMessage + ' ]\n '
			}
			console.log('%c ' + FileName + ' ' + FullMessage, ExceptionStyle)
			console.log('%c [--------  Error mesage ends here ---------------------------------------------]', ExceptionStyle)
		}

		ShowToast(IsValid(ErrorObject.Message) ? ErrorObject.Message : ErrorObject.InnerMessage)
	}

	/**
     * Check that user is allowed to visit route
     * @param  {Boolean} isLoggedIn state.auth.me.isLoggedIn, current prop
     * @return {Void}
     */
	checkAppAuthLogic (isLoggedIn: boolean) {
		const path: string = this.props.location.pathname
		// this.props.checkAuthLogic(path, isLoggedIn)
	}

	/**
   * Checks that user is still allowed to visit path after props changed
   * @param  {Object} nextProps
   */
	componentWillReceiveProps (nextProps: Props, { location: nextLocation }) {
		const { location } = this.props
		if (location.pathname !== '' && location.pathname !== '/') {
			let IsActiveFlag = this.IsUrlPermitted()
			if (!IsActiveFlag)
			{
				try {
					this.props.location.pathname = '/NotFound'
					window.history.pushState({}, null, '/notfound')
					HideLoader()
				} catch (e) {
					location.href = '/'
				}
			}
		}
		if (process.env.GA_ID && !_.isEqual(nextLocation, location)) {
			if (nextLocation) {
				const { search, pathname } = nextLocation
				ReactGA.pageview(pathname + search)
			}
		}
		this.checkAppAuthLogic(nextProps.isLoggedIn)
	}

	IsUrlPermitted () {
		let	RoutingDetail = [
			{
				path: '/about',
				exact: true,
				hasChild: false
			},
			{
				path: '/connect',
				exact: true,
				hasChild: false
			},
			{
				path: '/services',
				exact: true,
				hasChild: false
			},
			{
				path: '/contact',
				exact: true,
				hasChild: false
			},
			{
				path: '/',
				exact: true,
				hasChild: false
			}
		]
		let locationDetail = location
		let IsPermittedPage = true// false
		if (IsValid(locationDetail)) {
			let pathname = locationDetail.pathname.toLocaleLowerCase()
			if (pathname === '/myaccount' || pathname === '/' || pathname === '/mopinionsurvey') return true
			let RouteNames = RoutingDetail
			let Submenues = null
			let WebFunctionName = null
			let HasChild = false
			let hasRights = false
			if (IsValid(RouteNames)) {
				// let index = 0
				// while (index < RouteNames.length) {
				// 	if (RouteNames[index].hasChild) {
				// 		Submenues = RouteNames[index].submenus
				// 		let innerIndex = 0
				// 		while (innerIndex < Submenues.length) {
				// 			if (Submenues[innerIndex].path.toLocaleLowerCase() === pathname) {
				// 				WebFunctionName = Submenues[innerIndex].webFunction_Nm
				// 				HasChild = Submenues[innerIndex].hasChild
				// 				hasRights = hasWebFunctionRights(WebFunctionName, HasChild)
				// 				if (hasRights !== 'NONE')
				// 				{
				// 					IsPermittedPage = true
				// 					break
				// 				 }
				// 			}
				// 			innerIndex++
				// 		}
				// 	} else {
				// 		if (RouteNames[index].path.toLocaleLowerCase() === pathname) {
				// 			WebFunctionName = RouteNames[index].webFunction_Nm
				// 			HasChild = RouteNames[index].hasChild
				// 			hasRights = hasWebFunctionRights(WebFunctionName, HasChild)
				// 			if (hasRights !== 'NONE')
				// 			{
				// 				IsPermittedPage = true
				// 				break
				// 			}
				// 		}
				// 	}
				// 	index++
				// }
			}
		}
		return IsPermittedPage
	}

	componentWillMount () {
		// Temporary comment for double-load problem - WI 244
		// this.CheckUrl()

		let { isLoggedIn } = this.props
		if (loginToken) {
			isLoggedIn = false
		}
		// if (process.env.BROWSER) {
		// 	const {handleWindowResize} = this.props
		// 	handleWindowResize()
		// 	window.addEventListener('resize', handleWindowResize)
		// }
		this.checkAppAuthLogic(isLoggedIn)
	}

	CheckUrl () {
		// console.log(new Date())
		const DefaultDomain = process.env.DOMAIN
		// console.log('DefaultDomain ' + DefaultDomain)
		const RegisterPage = DefaultDomain + 'Registration'
		let loginFlag = true
		let UrlDomain = ''
		let url = ''
		let searchParams = ''
		if (typeof window !== 'undefined') {
			UrlDomain = window.location.href
			// console.log('UrlDomain ' + UrlDomain)
			url = new URL(UrlDomain)
			// console.log('url ' + url)
		}
		// console.log('UrlDomainOutSide ' + UrlDomain)
		// console.log('DefaultDomainOutside ' + DefaultDomain)
		// console.log('RegisterPage ' + RegisterPage)

		if (UrlDomain === DefaultDomain || UrlDomain === RegisterPage) {
			loginFlag = false
		} else {
			const token: string | null = getLocalToken()

			if (!_.isUndefined(url) && IsNotNullOrEmpty(url.search)) {
				let userId = this.GetImpersonationUserID(url)

				if (!(_.parseInt(userId) > 0)) {
					loginFlag = false

					if (typeof window !== 'undefined') {
						// console.log('companyimpersion ' + DefaultDomain)
						window.location.href = DefaultDomain
					}
				}
			} else if (!IsNotNullOrEmpty(token)) {
				loginFlag = false

				if (typeof window !== 'undefined') {
					// console.log('companyimpersionNOT ' + DefaultDomain)
					window.location.href = DefaultDomain
				}
			}
		}

		if (!loginFlag) {
			loginToken = true
			let SessionLoggedOut = LocaleDataGet('SessionLoggedOut')
			let showAlert = SessionLoggedOut === '1'
			if (!(this.props.IsResetPwdChangePending || this.props.isSafetyAttestationPending)) {
				clearStoreAndCookie()
				if (showAlert)
				{ LocaleDataSet('SessionLoggedOut', '1') }
			}
		}
		this.props.setLoginState(loginFlag)
	}

	GetImpersonationUserID (url) {
		let UserID = 0

		if (url.searchParams !== undefined) {
			UserID = url.searchParams.get('U_Id') || 0
		}
		else if (IsNotNullOrEmpty(url.search)) {
			let SearchString = url.search.substring(1)
			let SearchParams = SearchString.split('&')

			for (var i = 0; i < SearchParams.length; i++) {
				let KeyValue = SearchParams[i].split('=')

				if (KeyValue[0] === 'U_Id') {
					UserID = KeyValue[1]
					break
				}
			}
		}

		return UserID
	}

	render () {
		// this.CheckUrl()
		const {
			children,
			sidebarOpened,
			closeSidebar,
			isLoggedIn,
			isLoading,
			logout,
			toggleSidebar,
			location,
			isMobile,
			routes,
			ToggleFilter,
			IsWatchListToggle,
			IsAddUserGroupToggle
		} = this.props
		const dimmerProps = {
			active: sidebarOpened && isMobile,
			page: true,
			onClick: toggleSidebar
		}
		/** NOTE: There is an issue with props and styled-components,
			So we use custom attributes and handle them inside styled component
			{@link: https://github.com/styled-components/styled-components/issues/439}
		*/

		const SidebarSemanticPusherStyledPatch =
			!isMobile && isLoggedIn
				? SidebarSemanticPusherStyled.extend`
						max-width: calc(100% - 150px);
					`
				: SidebarSemanticPusherStyled

		// const sidebarProps = {
		// 	isMobile,
		// 	logout,
		// 	open: sidebarOpened,
		// 	routing: getSidebarRoutes(routes)
		// }

		// const headerProps = {
		// 	toggleSidebar,
		// 	title,
		// 	isLoggedIn,
		// 	isMobile
		// }
		return (
			<PageLayout>
				<ScrollChip className="zero-opac full-opac scroll-chip" id="scrolltop-chip">
					<a className="anc-scroll" onClick={this.scrollToTop}>
						<Icon name="angle up" />
					</a>
				</ScrollChip>
				{/* this.props.isLoading ? (
					<Dimmer className="custom-dimmer" active>
						<Loader size="large" active>
							<div className="loader-txt">Loading page...</div>
						</Loader>
					</Dimmer>
				) : null */}
				{/* {(ToggleFilter || IsWatchListToggle || IsAddUserGroupToggle) &&
					<AdvanceFilter
						send={this.props.send}
						IsWatchListToggle={IsWatchListToggle}
						IsToggleFilter={ToggleFilter}
						IsAddUserGroupToggle={IsAddUserGroupToggle}>
					</AdvanceFilter>
				} */}
				<Header isLoggedIn={isLoggedIn} />
				{/* {isLoggedIn && <Sidebar className='fixed-on-refresh' />} */}
				{/* {<Sidebar className='fixed-on-refresh' />} */}
				<SidebarSemanticPushableStyled className={!isLoggedIn && 'no-bar'} id="pushedsidebar">
					<SidebarSemanticPusherStyledPatch>
						<StyledDimmer {...dimmerProps} />
						<MainLayout>
							<MainContent>
								<MainContainer id="main-container" onScroll={this.handleContainerScrollEvent}>
									{children}
								</MainContainer>
							</MainContent>
						</MainLayout>
					</SidebarSemanticPusherStyledPatch>
				</SidebarSemanticPushableStyled>
				<Toast id="apptoast" />
				{/* <div id="liveagent_button_online_5733O000000007M" /> */}
				<Footer />
			</PageLayout>
		)
	}
}

const mapStateToProps = state => {
	const layoutState = getLayoutState(state)
	const authState = getAuthState(state)
	let { isLoggedIn, IsResetPwdChangePending, isSafetyAttestationPending} = authState
	const { sidebarOpened, isLoading, isMobile, isMobileXS, isMobileSM, ToggleFilter, IsWatchListToggle, IsAddUserGroupToggle } = layoutState
	return {
		sidebarOpened,
		isMobile,
		isMobileXS,
		isMobileSM,
		isLoggedIn,
		isLoading,
		ToggleFilter,
		IsWatchListToggle,
		IsAddUserGroupToggle,
		IsResetPwdChangePending,
		isSafetyAttestationPending
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	let resizer
	return {
		toggleSidebar () {
			dispatch(TOGGLE_SIDEBAR)
		},
		handleWindowResize () {
			clearTimeout(resizer)
			const innerWidth: number = window.innerWidth
			resizer = setTimeout(() => dispatch(WINDOW_RESIZE(innerWidth)), 85)
		},
		/**
         * Immediately push to homePath('/'), if user is logged.
         * Can be used for other auth logic checks.
         * Useful, because we don't need to dispatch `push(homePath)` action
         * from `Login` container after LOGIN_AUTH_SUCCESS action
         * @param  {String}  path       [current location path]
         * @param  {Boolean} isLoggedIn [is user logged in?]
         */
		checkAuthLogic (path: string, isLoggedIn: boolean) {
			const authPath = '/'
			const homePath = '/dashboard'
			if (isLoggedIn && path === authPath) {
				dispatch(push(homePath))
			}
		},
		send (toggle, identity) {
			identity === 'IsAdvancedSearchtoggle' && dispatch(TOGGLE_FILTER(toggle))
			identity === 'IsWatchListToggle' && dispatch(TOGGLE_ADDWATCHLIST(toggle))
			identity === 'IsAddUserGroupToggle' && dispatch(TOGGLE_ADDUSERGROUP(toggle))
		},
		setLoginState (value) {
			dispatch({ type: 'SET_LOGINSTATE', value: value })
		}
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
