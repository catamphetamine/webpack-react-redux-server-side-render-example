const initial_state =
{
	loaded: false
}

const handlers =
{
	'retrieving users': (result, state) =>
	{
		const new_state = 
		{
			...state,
			loading       : true,
			loading_error : undefined
		}

		return new_state
	},

	'users retrieved': (result, state) =>
	{
		const new_state = 
		{
			...state,
			loading : false,
			loaded  : true,
			stale   : false,
			users   : result
		}

		return new_state
	},

	'users retrieval failed': (error, state) =>
	{
		const new_state = 
		{
			...state,
			loading       : false,
			loading_error : error
		}

		return new_state
	},

	'adding user': (result, state) =>
	{
		const new_state = 
		{
			...state,
			adding : true
		}

		return new_state
	},

	'user added': (result, state) =>
	{
		const new_state = 
		{
			...state,
			adding : false,
			stale  : true
		}

		return new_state
	},

	'adding user failed': (error, state) =>
	{
		const new_state = 
		{
			...state,
			adding       : false,
			adding_error : error
		}

		return new_state
	},

	'adding error dismissed': (result, state) =>
	{
		const new_state = 
		{
			...state,
			adding_error : undefined
		}

		return new_state
	},

	'deleting user': (result, state) =>
	{
		const new_state = 
		{
			...state,
			deleting : true
		}

		return new_state
	},

	'user deleted': (result, state) =>
	{
		const new_state = 
		{
			...state,
			deleting : false,
			stale  : true
		}

		return new_state
	},

	'deleting user failed': (error, state) =>
	{
		const new_state = 
		{
			...state,
			deleting       : false,
			deleting_error : error
		}

		return new_state
	}
}

// for this module to work should be added to reducers/index.js

// applies a handler based on the action type
// (is copy & paste'd for all action response handlers)
export default function(state = initial_state, action_data = {})
{
	return (handlers[action_data.type] || ((result, state) => state))(action_data.result || action_data.error || action_data, state)
}