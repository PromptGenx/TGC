// @flow
import React, {Component} from 'react'
import {Provider} from 'react-redux'
import {IntlProvider, defineMessages, addLocaleData} from 'react-intl'
import Helmet from 'react-helmet'
import {APPLICATION_INIT} from 'actions/common'
import {ThemeProvider} from 'styled-components'
import theme from 'styles/theme'
import RoutingWrapper from 'components/RoutingWrapper'
import App from 'containers/App'
import Login from 'containers/Login'

type Props = {
	store: Object,
	i18n: Object,
	SSR: {
		location?: Object,
		context?: Object
	},
	history: any
}

const Router = process.env.BROWSER
	? require('react-router-redux').ConnectedRouter
	: require('react-router').StaticRouter

class Root extends Component<Props> {
	static defaultProps = {
		SSR: {}
	}

	componentWillMount () {
		const {store, i18n} = this.props
		const {asyncBootstrapPhase} = this.context
		if (!asyncBootstrapPhase) {
			store.dispatch({type: APPLICATION_INIT})
			addLocaleData(i18n.localeData)
		}
	}

	render () {
		if (this.context.asyncBootstrapPhase) {
			return null
		}
		const {SSR, store, history, i18n} = this.props
		const routerProps = process.env.BROWSER ? {history} : {location: SSR.location, context: SSR.context}
		// Function to sanitize user locale attribute
		function Sanitize (locale) {
			if (locale === 'en' || locale === 'es' || locale === 'it')
			{ return locale }
			else
			{ return 'en' }
		}
		return (
			<IntlProvider locale={Sanitize(i18n.locale)} messages={defineMessages(i18n.messages)}>
				{/* key={Math.random()} = hack for HMR
					From https://github.com/webpack/webpack-dev-server/issues/395
				*/}
				<Provider store={store} key={Date.now()}>
					<ThemeProvider theme={theme}>
						<Router {...routerProps}>
							<App>
								<Helmet>
									<html lang={Sanitize(i18n.lang)} />
									{/* {
										process.env.NODE_ENV === 'production'
											? <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.mopinion.com; style-src 'self' 'unsafe-inline' fonts.googleapis.com blob: https://*.mopinion.com; connect-src 'self' www.google-analytics.com https://*.mopinion.com http://*.mopinion.com; font-src 'self' data: blob: fonts.gstatic.com https://*.mopinion.com; base-uri 'self';img-src 'self' data: www.google-analytics.com https://*.mopinion.com;script-src-elem 'self' https://www.google-analytics.com/analytics.js https://cdn.ravenjs.com/ https://*.mopinion.com 'unsafe-inline' 'unsafe-eval';frame-src https://*.mopinion.com" />
											: <meta httpEquiv="Content-Security-Policy" content="default-src 'self' localhost:*; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.mopinion.com; style-src 'self' 'unsafe-inline' fonts.googleapis.com blob: https://*.mopinion.com; connect-src 'self' localhost:* www.google-analytics.com ws://localhost:* https://*.mopinion.com http://*.mopinion.com; font-src 'self' data: blob: fonts.gstatic.com https://*.mopinion.com; base-uri 'self'; img-src 'self' data: www.google-analytics.com https://*.mopinion.com;script-src-elem 'self' localhost:* https://www.google-analytics.com/analytics.js https://cdn.ravenjs.com/ https://*.mopinion.com 'unsafe-inline' 'unsafe-eval';frame-src https://*.mopinion.com" />
									} */}
									<meta charSet="utf-8" />
									<title>Throne of Grace</title>
									<meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
									<meta
										name="description"
										content="TERMPoint is the name of our truck appointment system. TERMPoint can be used to efficiently schedule, merge or update appointments using real time terminal availability information. In addition, receive up-to-date alerts on confirmed appointments and containers available for appointments"
									/>
									<meta name="theme-color" content="#1b1e2f" />
									<meta name="viewport" content="width=device-width, initial-scale=1.0" />
									<base href="/" />

									<meta name="msapplication-tap-highlight" content="no" />

									<link rel="manifest" href="manifest.json" />
									{/* <link rel="stylesheet" type="text/css" href="https://cdn.rawgit.com/alpertuna/react-metismenu/master/dist/react-metismenu-standart.min.css" /> */}
									{/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" /> */}
									<noscript
										dangerouslySetInnerHTML={{
											__html: `You are using outdated browser. You can install modern browser here:
										<a href="http://outdatedbrowser.com/">http://outdatedbrowser.com</a>.`
										}}
									/>
									{/* <script type="text/javascript" language="javascript" src="http://sightmax.namapmterminals.com/SightMaxAgentInterface/Monitor.smjs?accountID=1&siteID=1&queueID=3"></script> */}
									{/* <script type="text/javascript" src="https://c.la2-c1cs-cdg.salesforceliveagent.com/content/g/js/49.0/deployment.js"></script> */}
									{/* <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/aes.js"></script> */}
								</Helmet>
								<RoutingWrapper />
							</App>
						</Router>
					</ThemeProvider>
				</Provider>
			</IntlProvider>
		)
	}
}

export default Root
