// @flow
import type {State as commonData} from 'reducers/commondata'
import type {GlobalState} from 'reducers'

export const CommonDataState = (state: GlobalState): commonData => state.commondata
