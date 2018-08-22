import React from 'react'
import { connect } from 'react-redux'

// Webpack still can't learn how to tree-shake.
// import { Snackbar } from 'react-responsive-ui'
import Snackbar from 'react-responsive-ui/commonjs/Snackbar'

@connect(({ notifications }) => ({
	notification: notifications.notification
}))
export default class SnackBar extends React.Component {
	render() {
		const {
			notification,
			notified
		} = this.props

		return (
			<Snackbar
				value={notification} />
		)
	}
}