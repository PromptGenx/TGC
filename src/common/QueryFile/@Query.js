/**
 * @flow
 */

import React, {Component} from 'react'

const Selector = {
	by: {}
}

const Type = {
	id () {}
}

class $query extends Component {
    where = (expression) => {
    	return this
    }

    expression = () => {
    	return this
    }

    from = (selector) => {
    	return this
    }

    select = (picker) => {
    	return this
    }

    find = (selecte_type) => {
    	return this
    }
}

export const Query = new $query()
// export const where = Object
// export const find = Object
// export const execute = Object
// export const from = Object
// export const single = Object
