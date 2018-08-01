import { reduxModule } from 'react-website'

const redux = reduxModule('NOTIFICATIONS')

export const notify = redux.simpleAction
(
	(content, options) => ({ content, options }),
	'notification'
)

export const notified = redux.simpleAction
(
	() => ({ content: undefined, options: undefined }),
	'notification'
)

export default redux.reducer()