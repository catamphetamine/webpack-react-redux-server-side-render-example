import uuid from 'uuid'
import { InputRejected } from 'serverless-functions/errors'

export default async function({ body: { name } }) {
	if (!name) {
		throw new InputRejected(`"name" is required`)
	}
	const id = uuid.v4()
	let users = database.getCollection('users')
	if (!users) {
		users = database.addCollection('users', { unique: ['id'] })
	}
	users.insert({ id, name, dateAdded: new Date() })
	database.saveDatabase()
	return id
}