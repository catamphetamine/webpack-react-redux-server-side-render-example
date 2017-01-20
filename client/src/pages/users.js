import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators as bind_action_creators } from 'redux'
import { Button } from 'react-responsive-ui'
import { title, preload }   from 'react-isomorphic-render'
import styler from 'react-styling'

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
	state = {}

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
			addUserPending,
			deleteUserPending
		}
		= this.props

		const disableButtons = getUsersPending || addUserPending || deleteUserPending

		return (
			<div style={ style.users }>

				<Button
					busy={ addUserPending }
					disabled={ disableButtons }
					action={ this.add_user }>
					Add user
				</Button>

				<Button
					busy={ getUsersPending }
					disabled={ disableButtons }
					action={ this.refresh }
					style={ style.refresh }>
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
			addUserPending,
			addUserError,
			deleteUserPending,
			deleteUserError
		}
		= this.props

		const { userBeingDeleted } = this.state

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

		const disableButtons = getUsersPending || addUserPending || deleteUserPending
		
		return (
			<ul style={ style.list }>
				{ users.map((user) => {
					return (
							<li key={ user.id }>
							<span style={ style.id }>{ user.id }</span>
							<span style={ style.name }>{ user.name }</span>

							<Button
								busy={ userBeingDeleted === user.id }
								disabled={ disableButtons }
								action={ () => this.delete_user(user.id) }
								style={ style.delete }>
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
		this.setState({ userBeingDeleted: id })
		await this.props.delete_user(id)
		this.setState({ userBeingDeleted: undefined })
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

	refresh
		margin-left : 1em

	delete
		margin-left : 1em

	id
		color : #9f9f9f

	name
		margin-left : 0.3em
`