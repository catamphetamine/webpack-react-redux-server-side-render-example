// import 'babel/polyfill'

import language       from '../common/language'

import React          from 'react'
import ReactDOM       from 'react-dom'

import http_client    from '../react-isomorphic-render/http client'
import { client }     from '../react-isomorphic-render/redux'
import create_store   from './redux/store'
import markup_wrapper from './markup wrapper'

import dev_tools from '../react-isomorphic-render/redux/dev tools'

// styles need to be included on the client side
require.include('../../assets/styles/style.scss')

// create Redux store
const store = create_store(window._flux_store_data)
delete window._flux_store_data

// since react-intl assumes Intl is already in the global scope, 
// we can't import the routes (which imports react-intl in some of its components) 
// before polyfilling Intl. That's why you see require("./routes") here, 
// and not as import on the top of the file.
const routes = require('./routes')

const content_container = document.getElementById('react_markup')

client
({
	development    : _development_,
	wrap_component : component =>
	{
		const wrapped_component = markup_wrapper(component, { store })

		if (!_development_tools_)
		{
			return wrapped_component
		}

		// Render dev tools after initial client render to prevent warning
		// "React attempted to reuse markup in a container but the checksum was invalid"
		// https://github.com/erikras/react-redux-universal-hot-example/pull/210

		ReactDOM.render(wrapped_component, content_container)

		console.log(`You are gonna see a warning about "React.findDOMNode is deprecated" in the console. It's normal: redux_devtools hasn't been updated to React 0.14 yet`)

		const markup =
		(
			<div>
				{wrapped_component}
				<dev_tools/>
			</div>
		)

		return markup
	},
	routes : routes({ store }),
	to     : content_container
})