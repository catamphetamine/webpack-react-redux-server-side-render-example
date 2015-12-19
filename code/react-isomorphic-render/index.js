import query_string from 'query-string'

import React                 from 'react'
import ReactDOM              from 'react-dom'
import ReactDOMServer        from 'react-dom/server'

// returns nothing.
// renders directly to the "to" DOM element.
// (to allow for faster DOM mutations instead of simple slow Html code replacement)
export function client({ development, component, wrap_component, to })
{
	ReactDOM.render(wrap_component(component), to)

	if (development)
	{
		window.React = React // enable debugger

		if (!to || !to.firstChild || !to.firstChild.attributes || !to.firstChild.attributes['data-react-checksum'])
		{
			console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.')
		}
	}
}

// returns Html code.
export function server({ html })
{
	return '<!doctype html>\n' + ReactDOMServer.renderToString(html.without_rendering())
}