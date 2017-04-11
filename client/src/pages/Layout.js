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

		const markup = 
		(
			<div className="content">
				<Title>{ title }</Title>
				<Meta>
					<meta charset="utf-8"/>
					<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"/>
					<meta property="og:title" content={ title }/>
					<meta property="og:description" content={ description }/>
					<meta property="og:locale" content="ru-RU"/>
				</Meta>

				<Preloading/>

				<nav className="main-header">
					<Menu items={ menu_items }/>
				</nav>

				{ children }

				<footer></footer>
			</div>
		)

		return markup
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
