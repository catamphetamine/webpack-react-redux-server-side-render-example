import configuration from '../configuration'

export default {
	// Would use this setting for a real-world cloud-based API
	// (e.g. AWS Lambda) for querying the API directly
	// without a "proxy server". But not on `localhost`:
	// Chrome won't allow doing that on `localhost`.
	api: `http://localhost:${configuration.services.api.port}`
}