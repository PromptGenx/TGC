// @flow
import {
	SET_SCHEDULEAPPOINTMENT_CONTAINEROBJECT,
	GET_SCHEDULEAPPOINTMENT_CONTAINEROBJECT,
	SET_MYAPPOINTMENTS_FILTER,
	CLEAR_MYAPPOINTMENTS_FILTER,
	SET_SCHEDULEAPPOINTMENT_CONTAINERS,
	CLEAR_SCHEDULEAPPOINTMENT_CONTAINERS
} from 'actions/common'

type Action =
    | SET_SCHEDULEAPPOINTMENT_CONTAINEROBJECT
	| GET_SCHEDULEAPPOINTMENT_CONTAINEROBJECT
	| SET_MYAPPOINTMENTS_FILTER_TYPE
	| CLEAR_MYAPPOINTMENTS_FILTER_TYPE
	| SET_SCHEDULEAPPOINTMENT_CONTAINERS_TYPE
	| CLEAR_SCHEDULEAPPOINTMENT_CONTAINERS_TYPE

// NOTE: COMMON DATA STORAGE
export const initialState: State = {
	containerobject: {},
	appointmentsfilter: {},
	importcontainers: '',
	isset: false
}

export function commondata (state: State = initialState, action: Action): State {
	// console.log(action.type)
	switch (action.type) {
	case SET_SCHEDULEAPPOINTMENT_CONTAINEROBJECT: {
		const data = action.payload
		return {
			...state,
			containerobject: data,
			isset: true
		}
	}

	case GET_SCHEDULEAPPOINTMENT_CONTAINEROBJECT: {
		return state.containerobject
	}

	case SET_MYAPPOINTMENTS_FILTER: {
		const data = action.payload
		return {
			...state,
			appointmentsfilter: data
		}
	}

	case CLEAR_MYAPPOINTMENTS_FILTER: {
		return {
			...state,
			appointmentsfilter: {}
		}
	}

	case SET_SCHEDULEAPPOINTMENT_CONTAINERS: {
		const data = action.payload
		return {
			...state,
			importcontainers: data
		}
	}

	case CLEAR_SCHEDULEAPPOINTMENT_CONTAINERS: {
		return {
			...state,
			importcontainers: ''
		}
	}

	default:
		return state
	}
}
