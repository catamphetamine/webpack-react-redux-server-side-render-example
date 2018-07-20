import { reduxModule } from 'react-website'

const redux = reduxModule('NOTIFICATIONS')

export const notify = redux.action
(
	'NOTIFY',
	async ({}, content, options) => ({ content, options }),
	'notification'
)

export const notified = redux.action
(
	'NOTIFIED',
	async () => ({ content: undefined, options: undefined }),
	'notification'
)

// This is the Redux reducer which now
// handles the asynchronous actions defined above.
export default redux.reducer()