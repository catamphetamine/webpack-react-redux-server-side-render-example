import React from 'react'

import create_store   from '../client/redux/store'
import routes         from '../client/routes'
import markup_wrapper from '../client/markup wrapper'

import webpage_server from '../react-isomorphic-render/page-server/web server'

import log from '../common/log'

export default function()
{
	webpage_server
	({
		port: configuration.webpage_server.http.port,
		server_side_rendering_path: require('path').resolve(Root_folder, 'build/assets/server_side_rendering'),
		log: log('webpage renderer'),
		create_store,
		routes,
		markup_wrapper,
		head:
		[
			<link rel="shortcut icon" href={require('../../assets/images/icon/cat_64x64.png')}/>
		],
		styles: require('../../assets/styles/style.scss').toString()
	})
}