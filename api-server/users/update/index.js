import { NotFound } from 'serverless-functions/errors'

export default async function({ path: { id }, body: { name } }) {
	const users = database.getCollection('users')
	if (!users || !users.by('id', id)) {
		throw new NotFound(`User ${id} not found`)
	}
	users.findAndUpdate({ id }, user => user.name = name)
	database.saveDatabase()
}