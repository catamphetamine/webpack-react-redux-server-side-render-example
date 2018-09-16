import { ReduxModule } from 'react-website'

const redux = new ReduxModule()

export const notify = redux.simpleAction
(
	(content, options) => ({ content, ...options }),
	'notification'
)

export default redux.reducer()