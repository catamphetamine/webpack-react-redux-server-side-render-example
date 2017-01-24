import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators as bind_action_creators } from 'redux'
import { Modal, TextInput, Button } from 'react-responsive-ui'
import Form, { Field, Submit } from 'simpler-redux-form'
import { title, preload } from 'react-isomorphic-render'
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

		this.refresh            = this.refresh.bind(this)
		this.show_add_user_form = this.show_add_user_form.bind(this)
		this.hide_add_user_form = this.hide_add_user_form.bind(this)
		this.delete_user        = this.delete_user.bind(this)
		this.user_added         = this.user_added.bind(this)
	}

	refresh()
	{
		return this.props.get_users()
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
		this.setState({ userBeingDeleted: id })
		await this.props.delete_user(id)
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
		return (
			<section>
				{ title("Simple REST API example") }

				<div>
					<p>This is an example of isomorphic REST API data querying (try disabling javascript and reloading the page)</p>

					<div style={ styles.users }>
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

		const
		{
			show_add_user_form
		}
		= this.state

		const disableButtons = getUsersPending || addUserPending || deleteUserPending

		return (
			<div style={ styles.users }>

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
					{ this.render_user_list() }
				</div>

				<Modal
					isOpen={ show_add_user_form }
					close={ this.hide_add_user_form }
					busy={ addUserPending }>
					<Add_user_form onSubmitted={ this.user_added }/>
				</Modal>
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
			<ul style={ styles.list }>
				{ users.map((user) => {
					return (
							<li key={ user.id }>
							<span style={ styles.id }>{ user.id }</span>
							<span style={ styles.name }>{ user.name }</span>

							<Button
								busy={ userBeingDeleted === user.id }
								disabled={ disableButtons }
								action={ () => this.delete_user(user.id) }
								style={ styles.delete }>
								delete user
							</Button>
						</li>
					)
				}) }
			</ul>
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
			<form onSubmit={ submit(this.submit) }>
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
					style={ styles.add_user_form_submit_button }>
					Add
				</Submit>
			</form>
		)
	}
}

const styles = styler
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

	add_user_form_input
		display        : inline-block
		vertical-align : top
		margin-right   : 0.6em
		font-size      : 85%

	add_user_form_submit_button
		display        : inline-block
		vertical-align : top
		margin-top     : 0.3em
		font-size      : 85%
`