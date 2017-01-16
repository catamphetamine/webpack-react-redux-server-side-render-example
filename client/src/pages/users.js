import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators as bind_action_creators } from 'redux'
import { Button } from 'react-responsive-ui'
import { title, preload }   from 'react-isomorphic-render'
import styler      from 'react-styling'

import { connector, get_users, add_user, delete_user } from '../redux/users'

@preload(({ dispatch, getState }) => dispatch(get_users()))
@connect
(
	state => 
	({
		...connector(state.users)
	}),
	{ get_users, add_user, delete_user }
)
export default class Users_page extends Component
{
	constructor()
	{
		super()

		this.refresh     = this.refresh.bind(this)
		this.add_user    = this.add_user.bind(this)
		this.delete_user = this.delete_user.bind(this)
	}

	render()
	{
		return (
			<section>
				{ title("Simple REST API example") }

				<div>
					<p>This is an example of isomorphic REST API data querying</p>

					<div style={ style.users }>
						{ this.render_users() }
					</div>
				</div>
			</section>
		)
	}

	render_users()
	{
		const
		{
			users,
			getUsersPending,
			addUserPending
		}
		= this.props

		return (
			<div style={ style.users }>
				{ users.length === 0 ? 'No users' : 'Users' }

				<Button
					busy={ addUserPending }
					action={ this.add_user }
					style={ style.button }>
					Add user
				</Button>

				<Button
					busy={ getUsersPending }
					action={ this.refresh }
					style={ style.button }>
					Refresh
				</Button>

				<div style={ style.users }>
					{ this.render_user_list() }
				</div>
			</div>
		)
	}

	render_user_list()
	{
		const
		{
			users,
			getUsersPending,
			getUsersError,
			addUserError,
			deleteUserPending,
			deleteUserError
		}
		= this.props

		if (getUsersPending)
		{
			return 'Loading users...'
		}

		if (getUsersError)
		{
			return 'Failed to load the list of users'
		}

		if (users.length === 0)
		{
			return 'No users'
		}

		return (
			<ul style={ style.list }>
				{ users.map((user) => {
					return (
							<li key={ user.id }>
							<span style={ style.id }>{ user.id }</span>
							<span style={ style.name }>{ user.name }</span>

							<Button
								busy={ deleteUserPending }
								action={ () => this.delete_user(user.id) }
								style={ style.button }>
								delete user
							</Button>
						</li>
					)
				}) }
			</ul>
		)
	}

	refresh()
	{
		return this.props.get_users()
	}

	async add_user()
	{
		const name = prompt(`Enter user's name`)
		
		if (!name)
		{
			return
		}

		await this.props.add_user({ name })
		this.refresh()
	}

	async delete_user(id)
	{
		await this.props.delete_user(id)
		this.refresh()
	}
}

const style = styler
`
	users
		margin-top   : 2em

	list
		display         : inline-block
		list-style-type : none
		margin          : 0
		padding-left    : 0

	button
		margin-left : 1em

	id
		color : #9f9f9f

	name
		margin-left : 0.3em
`