import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators as bind_action_creators } from 'redux'
import { Modal, TextInput, Button } from 'react-responsive-ui'
import Form, { Field, Submit } from 'simpler-redux-form'
import { Title, preload } from 'react-isomorphic-render'
import { flat as style } from 'react-styling'

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
			<section className="content">
				<Title>Simple REST API example</Title>

				<div>
					<p>This is an example of isomorphic REST API data querying (try disabling javascript and reloading the page)</p>

					<div style={ styles.container }>

						<Button
							disabled={ disableButtons }
							action={ this.show_add_user_form }>
							Add user
						</Button>

						<Button
							busy={ getUsersPending }
							disabled={ disableButtons }
							action={ this.refresh }
							style={ styles.refresh }>
							Refresh
						</Button>

						<div style={ styles.users }>
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
								<td style={ styles.id }>{ user.id }</td>
								<td style={ styles.name }>{ user.name }</td>
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
				style={ styles.add_user_form }>

				<Field
					name="name"
					label="Name"
					validate={ this.validate_name }
					component={ TextInput }
					style={ styles.add_user_form_input }/>

				<Submit
					submit
					component={ Button }
					className="rrui__button--border"
					style={ styles.add_user_form_submit }>
					Add
				</Submit>
			</form>
		)
	}
}

const styles = style
`
	container
		margin-top : 2rem

	users
		margin-top : 1.5rem

	refresh
		margin-left : 2rem

	id
		color      : #9f9f9f
		text-align : center

	name
		padding-left  : 1em
		padding-right : 1em

	add_user_form
		padding : 2rem

	add_user_form_input
		width : auto

	add_user_form_input, add_user_form_submit
		display        : inline-block
		vertical-align : top
		font-size      : 85%
		
	add_user_form_input
		margin-right   : 1rem

	add_user_form_submit
`