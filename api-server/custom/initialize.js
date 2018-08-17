import loki from 'lokijs'

function $initialize() {
	const database = new loki('database.json')
	global.database = database
	global.loadDatabase = function() {
		return new Promise(resolve => database.loadDatabase({}, resolve))
	}
}