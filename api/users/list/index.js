export default async function() {
	const users = database.getCollection('users')
	if (!users) {
		return []
	}
	return users.find()
}