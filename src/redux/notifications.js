import { reduxModule } from 'react-website'

const redux = reduxModule()

export const notify = redux.simpleAction
(
	(content, options) => ({ content, options }),
	'notification'
)

export default redux.reducer()