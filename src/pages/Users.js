import React, { Component } from 'react'
import { connect } from 'react-redux'
// Webpack still can't learn how to tree-shake.
// import { Modal, TextInput, Button } from 'react-responsive-ui'
import Modal from 'react-responsive-ui/commonjs/Modal'
import TextInput from 'react-responsive-ui/commonjs/TextInput'
import Button from 'react-responsive-ui/commonjs/Button'
import ReactTimeAgo from 'react-time-ago'
import { Form, Field, Submit } from 'easy-react-form'
import { meta, preload } from 'react-website'

import {
	getUsers,
	addUser,
	deleteUser
} from '../redux/users'

import { notify } from '../redux/notifications'

import './Users.css'

@preload(async ({ dispatch }) => await dispatch(getUsers()))
@meta(state => ({
	title       : 'Simple REST API example',
	description : 'A list of users',
	image       : 'https://www.famouslogos.us/images/facebook-logo.jpg'
}))
@connect(({ users }) => ({
	users: users.users,
	getUsersPending: users.getUsersPending,
	addUserPending: users.addUserPending
}), {
	getUsers,
	addUser,
	deleteUser,
	notify
})
export default class UsersPage extends Component
{
	state = {}

	constructor()
	{
		super()
		this.deleteUser = this.deleteUser.bind(this)
	}

	showAddUserForm = () => this.setState({ showAddUserForm: true })
	hideAddUserForm = () => this.setState({ showAddUserForm: false })

	async deleteUser(id)
	{
		const { deleteUser, getUsers, notify } = this.props

		await deleteUser(id)
		notify(`User deleted`)
		getUsers()
	}

	userAdded = () =>
	{
		const { notify, getUsers } = this.props

		notify(`User added`)
		this.hideAddUserForm()
		getUsers()
	}

	render()
	{
		const
		{
			users,
			getUsers,
			addUserPending
		}
		= this.props

		const { showAddUserForm } = this.state

		return (
			<section className="page-content container">
				<div>
					<p className="users__description">
						This is an example of REST API data querying (try disabling javascript and reloading the page).
					</p>

					<p className="users__description">
						An artificial delay of 1 second is added to all Redux actions to illustrate the "loading" spinners.
					</p>

					<div>
						<Button onClick={ this.showAddUserForm }>
							Add user
						</Button>

						<Button
							onClick={ getUsers }
							className="users__refresh">
							Refresh
						</Button>

						<div className="users__content">
							{ this.renderUsers() }
						</div>

						<Modal
							isOpen={ showAddUserForm }
							close={ this.hideAddUserForm }
							wait={ addUserPending }>
							<AddUserForm onAfterSubmit={ this.userAdded }/>
						</Modal>
					</div>
				</div>
			</section>
		)
	}

	renderUsers()
	{
		const
		{
			users,
			getUsersPending
		}
		= this.props

		if (getUsersPending) {
			return 'Loading users...'
		}

		if (users.length === 0) {
			return 'No users'
		}

		return (
			<table className="users__list">
				<tbody>
					{ users.map((user) => {
						return (
							<tr key={ user.id }>
								{/*
								<td className="user__id">
									{ user.id }
								</td>
								*/}
								<td className="user__name">
									{ user.name }
								</td>
								<td>
									<ReactTimeAgo date={ user.dateAdded }/>
								</td>
								<td>
									<Button
										onClick={ () => this.deleteUser(user.id) }
										className="user__delete">
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

@connect(state => ({}), { addUser })
class AddUserForm extends Component
{
	constructor()
	{
		super()
		this.submit = this.submit.bind(this)
	}

	async submit(values)
	{
		const { addUser } = this.props
		await addUser(values)
	}

	render()
	{
		const { onAfterSubmit } = this.props

		return (
			<Form
				autoFocus
				onSubmit={ this.submit }
				onAfterSubmit={ onAfterSubmit }
				className="add-user">

				<Field
					required
					name="name"
					label="Name"
					component={ TextInput }
					className="add-user__name"/>

				<Submit
					submit
					component={ Button }
					className="rrui__button--border add-user__submit">
					Add
				</Submit>
			</Form>
		)
	}
}