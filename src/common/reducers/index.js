// @flow
import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import {layout} from './layout'
import {links} from './links'
import {auth} from './auth'
import {commondata} from './commondata'

// Root reducer
export default combineReducers({
	layout,
	entities: combineReducers({
		links
	}),
	auth,
	routing: routerReducer,
	commondata
})
