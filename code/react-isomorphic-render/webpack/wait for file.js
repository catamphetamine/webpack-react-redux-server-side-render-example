import fs from 'fs'

// Waits for `assets/webpage_rendering_server.js` to be created 
// after Webpack build process finishes
//
// The callback is called when `assets/webpage_rendering_server.js` has been found 
// (it's needed for development because `webpack-dev-server` 
//  and your application server are run in parallel).
//
export default function(path, done)
{
	// condition check interval
	const check_interval = 300 // in milliseconds
	const message_interval = 2000 // in milliseconds

	// show the message not too often
	let message_timer = 0

	// waits for condition to be met, then proceeds
	function wait_for(condition, proceed)
	{
		function check()
		{
			// if the condition is met, then proceed
			if (condition())
			{
				return proceed()
			}

			message_timer += check_interval

			if (message_timer >= message_interval)
			{
				message_timer = 0

				console.log(`("${path}" not found)`)
				console.log('(waiting for the first Webpack build to finish)')
			}

			setTimeout(check, check_interval)
		}

		check()
	}

	// wait for webpack-assets.json to be written to disk by Webpack
	wait_for(() => fs.existsSync(path), done)
}