import { getUsers } from '../redux/users'

export default ({ dispatch }) => {
	return dispatch(getUsers())
}