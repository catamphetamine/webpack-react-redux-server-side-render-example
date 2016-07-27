export default
{
	path: 'users',
	getComponent(nextState, callback)
	{
		require.ensure([], (require) =>
		{
			callback(null, require('../pages/users'))
		})
	}
}