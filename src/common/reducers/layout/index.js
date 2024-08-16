// @flow
import {
	UI_TOGGLE_SIDEBAR,
	UI_WINDOW_RESIZE,
	UI_TOGGLE_FILTER,
	UI_TOGGLE_ADDWATCHLIST,
	UI_TOGGLE_ADDUSERGROUP,
	UI_APICALL_PENDING,
	UI_APICALL_SUCCESS
} from 'actions/layout'
import {LOCATION_CHANGE} from 'actions/common'
import {computeLayoutMobileStatuses} from 'selectors'

export type State = {
	sidebarOpened: boolean,
	innerWidth?: number
}

// NOTE: sidebar is opened by default and rendered as visible on server
export const initialState: State = {
	sidebarOpened: false,
	innerWidth: 993
}

export function layout (state: State = initialState, action): State {
	switch (action.type) {
	case UI_WINDOW_RESIZE: {
		const {innerWidth} = action.payload
		const {isMobile} = computeLayoutMobileStatuses({innerWidth})
		return {
			innerWidth,
			sidebarOpened: !isMobile
		}
	}
	case UI_TOGGLE_SIDEBAR:
		return {
			...state,
			sidebarOpened: !state.sidebarOpened
		}
	case LOCATION_CHANGE:
		const {isMobile} = computeLayoutMobileStatuses(state)
		return {
			...state,
			sidebarOpened: !isMobile
		}
	case UI_TOGGLE_FILTER: {
		return {
			...state,
			ToggleFilter: action.IsToggle
		}
	}
	case UI_TOGGLE_ADDWATCHLIST: {
		return {
			...state,
			IsWatchListToggle: action.IsWatchListToggle
		}
	}
	case UI_TOGGLE_ADDUSERGROUP: {
		return {
			...state,
			IsAddUserGroupToggle: action.IsAddUserGroupToggle
		}
	}
	case UI_APICALL_PENDING: {
		return {
			...state,
			isLoading: true
		}
	}
	case UI_APICALL_SUCCESS: {
		return {
			...state,
			isLoading: false
		}
	}

	default:
		return state
	}
}
