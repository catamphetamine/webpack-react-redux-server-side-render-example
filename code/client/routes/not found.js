export default
{
	path: '*',
	getComponent(nextState, callback)
	{
		require.ensure([], (require) =>
		{
			callback(null, require('../pages/not found'))
		})
	}
}