import { getUsers } from '../redux/users'

export default async ({ dispatch }) => await dispatch(getUsers())