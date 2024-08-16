// @flow
import {createSelector} from 'reselect'
import type {State as AuthState} from 'reducers/auth'
import type {GlobalState} from 'reducers'

export const getAuthState = (state: GlobalState): AuthState => state.auth
export const isLoaded = state => state.fetchStatus === 'loaded'
export const getLayoutState = state => state.layout
export const getEntitiesLinksState = state => state.entities.links

export const computeLayoutMobileStatuses = ({innerWidth}) => {
	const isMobile: boolean = innerWidth < 993
	const isMobileXS: boolean = innerWidth < 481
	const isMobileSM: boolean = innerWidth > 480 && innerWidth < 767
	return {isMobileSM, isMobileXS, isMobile}
}

export const getLayoutMobileStatuses = createSelector(
	getLayoutState, computeLayoutMobileStatuses
)
