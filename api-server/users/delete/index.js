import { NotFound } from 'serverless-functions/errors'

export default async function({ path: { id } }) {
	const users = database.getCollection('users')
	if (!users.by('id', id)) {
		throw new NotFound(`User ${id} not found`)
	}
	users.findAndRemove({ id })
	database.saveDatabase()
}