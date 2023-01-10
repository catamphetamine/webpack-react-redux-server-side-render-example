import configuration from './webpack.config.server.production.js'
import { setDevFileServer } from './devserver.js'

// Same as production configuration
// with the only change that all files
// are served by webpack devserver.
export default setDevFileServer(configuration)
