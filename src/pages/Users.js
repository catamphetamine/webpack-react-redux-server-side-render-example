import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import { Modal, TextInput, Button } from 'react-responsive-ui'
// Webpack still can't learn how to "tree-shake" ES6 imports.
// import Modal from 'react-responsive-ui/commonjs/Modal'
// import TextInput from 'react-responsive-ui/commonjs/TextInput'
// import Button from 'react-responsive-ui/commonjs/Button'

import ReactTimeAgo from 'react-time-ago'
import { Form, Field, Submit } from 'easy-react-form'

import {
	getUsers,
	addUser,
	deleteUser
} from '../redux/users.js'

import { notify } from '../redux/notifications.js'

import './Users.css'

// For accessibility (WAI-ARIA stuff) (optional):
// Modal.setAppElement('#react')

export default function UsersPage() {
	const users = useSelector(state => state.users.users)
	const addUserPending = useSelector(state => state.users.addUserPending)
	const getUsersPending = useSelector(state => state.users.getUsersPending)

	const [isAddUserFormShown, setShowAddUserForm] = useState()
	const dispatch = useDispatch()
	const showAddUserForm = useCallback(() => setShowAddUserForm(true), [])
	const hideAddUserForm = useCallback(() => setShowAddUserForm(false), [])
	const onRefresh = useCallback(() => dispatch(getUsers()), [])

	const onDeleteUser = useCallback(async (id) => {
		await dispatch(deleteUser(id))
		dispatch(notify(`User deleted`))
		dispatch(getUsers())
	}, [dispatch])

	const onUserAdded = useCallback(() => {
		dispatch(notify(`User added`))
		hideAddUserForm()
		dispatch(getUsers())
	}, [dispatch])

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
					<Button onClick={showAddUserForm}>
						Add user
					</Button>

					<Button
						onClick={onRefresh}
						className="users__refresh">
						Refresh
					</Button>

					<div className="users__content">
						<Users
							users={users}
							getUsersPending={getUsersPending}
							onDeleteUser={onDeleteUser}/>
					</div>

					<Modal
						isOpen={isAddUserFormShown}
						close={hideAddUserForm}
						wait={addUserPending}>
						<AddUserForm onAfterSubmit={onUserAdded}/>
					</Modal>
				</div>
			</div>
		</section>
	)
}

UsersPage.meta = () => {
	return {
		title: 'Simple REST API example',
		description: 'A list of users',
		image: 'https://www.famouslogos.us/images/facebook-logo.jpg'
	}
}

UsersPage.load = async ({ dispatch }) => await dispatch(getUsers())

function Users({
	users,
	getUsersPending,
	onDeleteUser
}) {
	if (getUsersPending) {
		return 'Loading users...'
	}
	if (users.length === 0) {
		return 'No users'
	}
	return (
		<table className="users__list">
			<tbody>
				{users.map((user) => (
					<tr key={user.id}>
						{/*
						<td className="user__id">
							{user.id}
						</td>
						*/}
						<td className="user__name">
							{user.name}
						</td>
						<td>
							<ReactTimeAgo date={user.dateAdded}/>
						</td>
						<td>
							<Button
								onClick={() => onDeleteUser(user.id)}
								className="user__delete">
								delete
							</Button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}

function AddUserForm({ onAfterSubmit }) {
	const dispatch = useDispatch()
	const onSubmit = useCallback(async (values) => {
		try {
			await dispatch(addUser(values))
			onAfterSubmit()
		} catch (error) {
			dispatch(notify(error.message, { type: 'error' }))
		}
	}, [dispatch])
	return (
		<Form
			autoFocus
			onSubmit={onSubmit}
			className="add-user">
			<Field
				required
				name="name"
				label="Name"
				component={TextInput}
				className="add-user__name"/>
			<Submit
				submit
				component={Button}
				className="rrui__button--border add-user__submit">
				Add
			</Submit>
		</Form>
	)
}