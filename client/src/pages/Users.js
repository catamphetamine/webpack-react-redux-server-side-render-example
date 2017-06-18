import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators as bind_action_creators } from 'redux'
import { Modal, TextInput, Button } from 'react-responsive-ui'
import Form, { Field, Submit } from 'simpler-redux-form'
import { Title, preload } from 'react-isomorphic-render'

import { connector, get_users, add_user, delete_user } from '../redux/users'

@preload(({ dispatch, getState }) => dispatch(get_users()))
@connect
(
	({ users }) =>
	({
		...connector(users)
	}),
	{
		get_users,
		add_user,
		delete_user
	}
)
export default class Users_page extends Component
{
	state = {}

	constructor()
	{
		super()

		this.refresh            = this.refresh.bind(this)
		this.show_add_user_form = this.show_add_user_form.bind(this)
		this.hide_add_user_form = this.hide_add_user_form.bind(this)
		this.delete_user        = this.delete_user.bind(this)
		this.user_added         = this.user_added.bind(this)
	}

	refresh()
	{
		const { get_users } = this.props

		return get_users()
	}

	show_add_user_form()
	{
		this.setState({ show_add_user_form: true })
	}

	hide_add_user_form()
	{
		this.setState({ show_add_user_form: false })
	}

	async delete_user(id)
	{
		const { delete_user } = this.props

		this.setState({ userBeingDeleted: id })
		await delete_user(id)
		this.setState({ userBeingDeleted: undefined })
		this.refresh()
	}

	user_added()
	{
		this.hide_add_user_form()
		this.refresh()
	}

	render()
	{
		const
		{
			users,
			getUsersPending,
			addUserPending,
			deleteUserPending
		}
		= this.props

		const
		{
			show_add_user_form
		}
		= this.state

		const disableButtons = getUsersPending || addUserPending || deleteUserPending

		return (
			<section className="page-content">
				<Title>Simple REST API example</Title>

				<div>
					<p className="users__description">
						This is an example of isomorphic REST API data querying (try disabling javascript and reloading the page)
					</p>

					<div>
						<Button
							disabled={ disableButtons }
							action={ this.show_add_user_form }>
							Add user
						</Button>

						<Button
							busy={ getUsersPending }
							disabled={ disableButtons }
							action={ this.refresh }
							className="users__refresh">
							Refresh
						</Button>

						<div className="users__list">
							{ this.render_users() }
						</div>

						<Modal
							isOpen={ show_add_user_form }
							close={ this.hide_add_user_form }
							busy={ addUserPending }>
							<Add_user_form onSubmitted={ this.user_added }/>
						</Modal>
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
			<table>
				<tbody>
					{ users.map((user) => {
						return (
							<tr key={ user.id }>
								<td className="user__id">
									{ user.id }
								</td>
								<td className="user__name">
									{ user.name }
								</td>
								<td>
									<Button
										busy={ userBeingDeleted === user.id }
										disabled={ disableButtons }
										action={ () => this.delete_user(user.id) }>
										delete
									</Button>
								</td>
							</tr>
						)
					}) }
				</tbody>
			</table>
		)
	}
}

@Form
@connect(state => ({}), { add_user })
class Add_user_form extends Component
{
	constructor()
	{
		super()

		this.submit = this.submit.bind(this)
	}

	async submit(values)
	{
		const { add_user, onSubmitted } = this.props

		await add_user(values)
		onSubmitted()
	}

	validate_name(value)
	{
		if (!value)
		{
			return "Enter a name"
		}
	}

	render()
	{
		const { submit, submitting } = this.props

		return (
			<form
				onSubmit={ submit(this.submit) }
				className="add-user">

				<Field
					name="name"
					label="Name"
					validate={ this.validate_name }
					component={ TextInput }
					className="add-user__name"/>

				<Submit
					submit
					component={ Button }
					className="rrui__button--border add-user__submit">
					Add
				</Submit>
			</form>
		)
	}
}