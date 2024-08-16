// @flow
import {get} from 'api/utils'

const WEB_HOST = process.env.PROTOCOL + '//' + process.env.HOST + ':' + process.env.PORT

export const getLinksAPI = async () =>
	get(`${WEB_HOST}/api/links`)
	// get(`http://${process.env.HOST}:29660/api/N4RequestProcess`)
	// get(`http://${process.env.HOST}:60701/api/Test`)
	// get(`https://10.20.41.245:8085/api/Test`)
	// get(`http://10.20.41.245:8086/api/Test`)
	// get(`${process.env.BASE_API}/Test`)
