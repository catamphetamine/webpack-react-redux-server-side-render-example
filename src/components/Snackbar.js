import React from 'react'
import { useSelector } from 'react-redux'

// Webpack still can't learn how to tree-shake.
// import { Snackbar } from 'react-responsive-ui'
import Snackbar from 'react-responsive-ui/commonjs/Snackbar'

export default function SnackBar() {
	const notification = useSelector(state => state.notifications.notification)
	return (
		<Snackbar
			value={notification} />
	)
}