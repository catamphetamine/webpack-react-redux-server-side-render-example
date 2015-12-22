import React, { Component, PropTypes } from 'react'
import ReactDOMServer from 'react-dom/server'

import { server_generated_webpage_head } from '../webpage head'

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
export default class Html extends Component
{
	static propTypes =
	{
		development : PropTypes.bool,
		assets      : PropTypes.object.isRequired,
		component   : PropTypes.node,
		store       : PropTypes.object.isRequired,
		head        : PropTypes.array,
		body        : PropTypes.array,
		styles      : PropTypes.string
	}

	render()
	{
		const { development, assets, component, store, head, body, styles } = this.props

		// when server-side rendering is disabled, component will be undefined
		// (but server-side rendering is always enabled so this "if" condition may be removed)
		const content = component ? ReactDOMServer.renderToString(component) : ''

		const html = 
		(
			<html>
				<head>
					{/* webpage title and various meta tags */}
					{server_generated_webpage_head()}

					{/* (will be done only in production mode
					     with webpack extract text plugin) 

					    mount CSS stylesheets for all entry points
					    (should have been "for the current entry point only")

					    (currently there is only one entry point: "main";
					     and also the "common" chunk) */}
					{Object.keys(assets.styles).map((style, i) =>
						<link 
							href={assets.styles[style]} 
							key={i} 
							media="screen, projection"
							rel="stylesheet" 
							type="text/css"
							charSet="UTF-8"/>
					)}

					{/* (will be done only in development mode)

					    resolves the initial style flash (flicker) 
					    on page load in development mode 
					    (caused by Webpack style-loader mounting CSS styles 
					     through javascript after page load)
					    by mounting the entire CSS stylesheet in a <style/> tag */}
					{ development && styles ? <style dangerouslySetInnerHTML={{__html: styles()}} charSet="UTF-8"/> : null }

					{ head ? head() : null }
				</head>

				<body>
					{/* rendered React page */}
					<div id="react_markup" dangerouslySetInnerHTML={{__html: content}}/>

					{ body ? body() : null }

					{/* Flux store data will be reloaded into the store on the client */}
					<script dangerouslySetInnerHTML={{__html: `window._flux_store_data=${JSON.stringify(store.getState())}`}} charSet="UTF-8"/>

					{/* javascripts */}

					{/* the "common.js" chunk (see webpack extract commons plugin) */}
					{/* (needs to be included first (by design)) */}
					{ assets.javascript.common ? <script src={assets.javascript.common} charSet="UTF-8"/> : null }
					
					{/* current application "entry" point javascript
					    (currently there is only one entry point: "main") */}
					{Object.keys(assets.javascript)
						.filter(script => script !== 'common')
						.map((script, i) =>
							<script src={assets.javascript[script]} key={i} charSet="UTF-8"/>
						)
					}
				</body>
			</html>
		)

		return html
	}
}