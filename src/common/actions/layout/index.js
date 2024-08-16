// @flow
export const UI_TOGGLE_SIDEBAR = 'UI_TOGGLE_SIDEBAR'
export const UI_WINDOW_RESIZE = 'UI_WINDOW_RESIZE'
export const UI_TOGGLE_FILTER = 'UI_TOGGLE_FILTER'
export const UI_APICALL_PENDING = 'UI_APICALL_PENDING'
export const UI_APICALL_SUCCESS = 'UI_APICALL_SUCCESS'

export const TOGGLE_SIDEBAR = ({
	type: UI_TOGGLE_SIDEBAR
})

export const TOGGLE_FILTER = (toggle: boolean) => ({
	type: UI_TOGGLE_FILTER,
	IsToggle: toggle
})

export const WINDOW_RESIZE = (innerWidth: number) => ({
	type: UI_WINDOW_RESIZE,
	payload: {
		innerWidth
	}
})
