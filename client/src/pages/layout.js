import React, { Component, PropTypes } from 'react'
import styler from 'react-styling'
import { head } from 'react-isomorphic-render'

import Menu from '../components/menu'
import Preloading from '../components/preloading'

export default class Layout extends Component
{
	static propTypes =
	{
		children : PropTypes.node.isRequired
	}

	render()
	{
		const { children } = this.props

		// Html document metadata

		const title = 'WebApp'
		const description = 'A generic web application boilerplate'

		const meta =
		[
			// <meta charset="utf-8"/>
			{ charset: 'utf-8' },

			// <meta name="..." content="..."/>
			{ name: 'viewport', content: 'width=device-width, initial-scale=1.0, user-scalable=no' },

			// <meta property="..." content="..."/>
			{ property: 'og:title',       content: 'International Bodybuilders Club' },
			{ property: 'og:description', content: 'Do some push ups' },
			{ property: 'og:locale',      content: 'ru-RU' }
		]

		const menu_items =
		[{
			name: 'Home',
			link: '/'
		}, {
			name: 'Users',
			link: '/users'
		}]

		const markup = 
		(
			<div className="content">
				{ head(title, meta) }

				<Preloading/>

				<header>
					<Menu items={ menu_items }/>
				</header>

				{ children }

				<footer></footer>
			</div>
		)

		return markup
	}
}