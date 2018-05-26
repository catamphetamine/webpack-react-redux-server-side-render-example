import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { meta, Loading } from 'react-website'

// Not importing `Tooltip.css` because
// it's already loaded as part of `react-responsive-ui`.
// import 'react-time-ago/Tooltip.css'
import 'react-website/components/Loading.css'
// Not importing `LoadingIndicator.css` because
// it's already loaded as part of `react-responsive-ui`.
// import 'react-website/components/LoadingIndicator.css'

// `react-time-ago` English language.
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.locale(en)

import Menu, { MenuLink } from '../components/Menu'

import Home  from '../../assets/images/home.svg'
import Users from '../../assets/images/users.svg'

import '../components/Loading.css'
import './Application.css'

@meta(({ state }) =>
({
	site_name   : 'WebApp',
	title       : 'WebApp',
	description : 'A generic web application boilerplate',
	image       : 'https://www.google.ru/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
	locale      : 'ru_RU'
}))
export default class App extends Component
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
				<Loading/>

				<div className="webpage">
					<nav className="webpage__header">
						<div className="container">
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
						</div>
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