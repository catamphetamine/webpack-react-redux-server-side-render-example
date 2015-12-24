import path from 'path'
import { wait_for_file } from 'react-isomorphic-render/webpack'

// path to `webpage_rendering_server.js`
// (which is the entry point for Webpack server-side build)
const webpage_rendering_server_module_path = path.resolve(__dirname, '../..', 'build/assets/webpage_rendering_server.js')

// waits for the first Webpack server-side build to finish and produce `webpage_rendering_server.js`
wait_for_file(webpage_rendering_server_module_path, function()
{
	// start webpage rendering server
	// (this module will be compiled by Webpack server-side build from './web server.js')
	require(webpage_rendering_server_module_path)()
})