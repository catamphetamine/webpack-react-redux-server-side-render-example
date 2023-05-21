import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// `react-time-ago` English language.
import JavascriptTimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
JavascriptTimeAgo.addLocale(en)

import Menu, { MenuLink } from '../components/Menu.js'
import Snackbar from '../components/Snackbar.js'
import PageLoadingIndicator from '../components/PageLoadingIndicator.js'

import Home  from '../../assets/images/home.svg'
import Users from '../../assets/images/users.svg'

import './Application.css'

export default function App({ children }) {
	return (
		<div>
			{/* Page loading indicator */}
			<PageLoadingIndicator/>

			{/* Pop-up messages */}
			<Snackbar/>

			<div className="webpage">
				<nav className="webpage__header">
					<div className="container">
						<Menu>
							<MenuLink to="/" exact>
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
					{children}
				</div>

				<footer className="webpage__footer">
					{/* */}
				</footer>
			</div>
		</div>
	)
}

App.propTypes = {
	children: PropTypes.node.isRequired
}

// Default `<meta/>`.
App.meta = () => {
	return {
		site_name   : 'WebApp',
		title       : 'WebApp',
		description : 'A generic web application boilerplate',
		image       : 'https://www.google.ru/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
		locale      : 'en_US',
		locales     : ['ru_RU', 'en_US']
	}
}