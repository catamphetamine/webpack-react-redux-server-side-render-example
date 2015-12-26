import React, { Component, PropTypes } from 'react'

// testing `flat` styler
import styler   from 'react-styling/flat'

import { head } from 'react-isomorphic-render'

import Menu from '../components/menu'

export default class Layout extends Component
{
	static propTypes =
	{
		children : PropTypes.object.isRequired
	}

	render()
	{
		// Html document metadata

		const title = 'WebApp'
		const description = 'A generic web application boilerplate'

		const meta =
		{
			charSet: 'utf-8',
			property:
			{
				'og:site_name': title,
				'og:title': title,
				'og:description': description
			}
		}

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
				{head(title, description, meta)}

				{/* header */}
				<header>
					{/* Navigation */}
					{/*<nav>*/}
						{/* main menu */}
						<Menu items={menu_items}/>
					{/*</nav>*/}
				</header>

				{this.props.children}

				<footer></footer>
			</div>
		)

		return markup
	}
}