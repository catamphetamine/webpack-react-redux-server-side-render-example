import React from 'react'
import { createDevTools, persistState } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

export default
{
	component: createDevTools
	(
		<DockMonitor toggleVisibilityKey="ctrl-H" changePositionKey="ctrl-Q" defaultIsVisible>
			<LogMonitor theme="tomorrow" />
		</DockMonitor>
	),
	persistState
}