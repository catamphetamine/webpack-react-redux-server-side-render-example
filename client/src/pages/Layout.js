import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Title, Meta } from 'react-isomorphic-render'

import Menu       from '../components/Menu'
import Preloading from '../components/Preloading'

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

		return (
			<div>
				<Preloading/>

				<div className="webpage">
					<Title>{ title }</Title>

					<Meta>
						<meta charset="utf-8"/>
						<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"/>
						<meta property="og:title" content={ title }/>
						<meta property="og:description" content={ description }/>
						<meta property="og:image" content="https://www.google.ru/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"/>
						<meta property="og:locale" content="ru_RU"/>
					</Meta>

					<nav className="webpage__header">
						<Menu items={ menu_items }/>
					</nav>

					<div className="webpage__content">
						{ children }
					</div>

					<footer className="webpage__footer">
						{/* */}
					</footer>
				</div>
			</div>
		)
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
