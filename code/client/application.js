// The polyfill will emulate a full ES6 environment (for old browsers)
// (including generators, which means async/await)
import 'babel-polyfill'

import language from '../common/language'

import React    from 'react'
import ReactDOM from 'react-dom'

import { render } from 'react-isomorphic-render/redux'

import common from './react-isomorphic-render'

require('../../assets/styles/style.scss')

// renders the webpage on the client side
render
({
	// enable/disable development mode
	development: _development_,

	// enable/disable Redux dev-tools
	devtools: _development_tools_ ? require('./devtools') : undefined
},
common)