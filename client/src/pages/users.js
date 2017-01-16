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
			getUsersError,
			addUserPending,
			addUserError,
			deleteUserPending,
			deleteUserError
		}
		= this.props

		if (getUsersPending)
		{
			return (
				<div style={ style.users }>
					Loading users...
				</div>
			)
		}

		if (getUsersError)
		{
			return (
				<div style={ style.users }>
					Failed to load the list of users
				</div>
			)
		}

		return (
			<div style={ style.users }>
				{ users.length === 0 ? 'No users' : 'Users' }

				<Button
					action={ this.add_user }
					style={ style.button }>
					Add user
				</Button>

				<Button
					action={ this.refresh }
					style={ style.button }>
					Refresh
				</Button>

				{ users.length > 0 &&
					<div>
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
					</div>
				}
			</div>
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
		margin-top : 2em

	list
		display         : inline-block
		list-style-type : none
		padding-left    : 1em

	button
		margin-left : 1em

	id
		color : #9f9f9f

	name
		margin-left : 0.3em
`