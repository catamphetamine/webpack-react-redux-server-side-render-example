async function $onCall() {
	await new Promise((resolve, reject) => {
		database.loadDatabase({}, (error) => error ? reject(error) : resolve())
	})
}