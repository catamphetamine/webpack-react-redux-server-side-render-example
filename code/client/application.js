// import 'babel/polyfill'

import language       from '../common/language'

import React          from 'react'
import ReactDOM       from 'react-dom'

import { render } from 'react-isomorphic-render/redux'

import markup_wrapper from './markup wrapper'
import create_store   from './redux/store'
import create_routes  from './routes'

require('../../assets/styles/style.scss')

// renders the webpage on the client side
render
({
	// enable/disable development mode
	development: _development_,

	// enable/disable Redux dev-tools
	development_tools: _development_tools_,

	// creates Redux store
	create_store,

	// creates React-router routes
	create_routes,

	// wraps React page component into arbitrary markup (e.g. Redux Provider)
	markup_wrapper
})