import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Title, Meta } from 'react-isomorphic-render'

import Menu, { MenuLink } from '../components/Menu'
import Preloading from '../components/Preloading'

import Home  from '../../assets/images/home.svg'
import Users from '../../assets/images/users.svg'

export default class Layout extends Component
{
	static propTypes =
	{
		children : PropTypes.node.isRequired
	}

	render()
	{
		const { children } = this.props

		return (
			<div>
				<Preloading/>

				<div className="webpage">
					<Title>WebApp</Title>

					<Meta>
						<meta charset="utf-8"/>
						<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"/>
						<meta property="og:title" content="WebApp"/>
						<meta property="og:description" content="A generic web application boilerplate"/>
						<meta property="og:image" content="https://www.google.ru/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"/>
						<meta property="og:locale" content="ru_RU"/>
					</Meta>

					<nav className="webpage__header">
						<Menu>
							<MenuLink to="/">
								<Home className="menu-item__icon menu-item__icon--home"/>
								Home
							</MenuLink>
							<MenuLink to="/users">
								<Users className="menu-item__icon menu-item__icon--users"/>
								Users
							</MenuLink>
						</Menu>
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