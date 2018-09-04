import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Loading } from 'react-website'

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
import Snackbar from '../components/Snackbar'

import Home  from '../../assets/images/home.svg'
import Users from '../../assets/images/users.svg'

import '../components/Loading.css'
import './Application.css'

export default class App extends Component
{
	static propTypes =
	{
		children : PropTypes.node
	}

	render()
	{
		const { children } = this.props

		return (
			<div>
				{/* Page loading indicator */}
				<Loading/>

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