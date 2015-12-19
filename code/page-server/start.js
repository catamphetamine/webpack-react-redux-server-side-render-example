import path from 'path'
import wait_for_file from '../react-isomorphic-render/webpack/wait for file'

const webpage_rendering_server_module_path = path.resolve(__dirname, '../..', 'build/assets/webpage_rendering_server.js')

wait_for_file(webpage_rendering_server_module_path, function()
{
	// this module will be compiled by Webpack from './web server.js'
	require(webpage_rendering_server_module_path)()
})