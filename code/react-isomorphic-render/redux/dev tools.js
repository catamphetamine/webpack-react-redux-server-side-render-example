import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

export default function dev_tools()
{
	return createDevTools
	(
		<DockMonitor toggleVisibilityKey="H" changePositionKey="Q">
			<LogMonitor />
		</DockMonitor>
	)
}