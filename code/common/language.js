import deep_equal from 'deep-equal'

const exists = what => typeof what !== 'undefined'
global.exists = exists

// used for JSON object type checking
const object_constructor = {}.constructor

// detects a JSON object
export function is_object(object)
{
	return exists(object) && (object !== null) && object.constructor === object_constructor
}

const no = function()
{
	const parameters = Array.prototype.slice.call(arguments, 0)
	return !exists.apply(this, parameters)
}
global.no = no

// extends the first object with all the others
Object.extend = function(...objects)
{
	objects = objects.filter(x => exists(x))

	const to   = objects[0]
	const from = objects[1]

	if (objects.length > 2)
	{
		const last = objects.pop()
		const intermediary_result = extend.apply(this, objects)
		return extend(intermediary_result, last)
	}

	for (let key of Object.keys(from))
	{
		if (is_object(from[key]))
		{
			if (!is_object(to[key]))
			{
				to[key] = {}
			}

			extend(to[key], from[key])
		}
		else if (Array.isArray(from[key]))
		{
			if (!Array.isArray(to[key]))
			{
				to[key] = []
			}

			to[key] = to[key].concat(Object.clone(from[key]))
		}
		else
		{
			to[key] = from[key]
		}
	}

	return to
}

global.extend = Object.extend

Object.merge = function()
{
	const parameters = Array.prototype.slice.call(arguments, 0)
	parameters.unshift({})
	return Object.extend.apply(this, parameters)
}

global.merge = Object.merge

Object.clone = function(object)
{
	if (is_object(object))
	{
		return merge({}, object)
	}
	else if (Array.isArray(object))
	{
		return object.map(x => Object.clone(x))
	}
	else
	{
		return object
	}
}

global.clone = Object.clone

Object.equals = (a, b) => deep_equal(a, b)

Object.get_value_at_path = (where, paths) =>
{
	paths = paths instanceof Array ? paths.clone() : paths.split('.')

	const get_value_at_path = (where, paths) =>
	{
		if (paths.is_empty())
		{
			return where
		}

		const path = paths.shift()

		if (!exists(where[path]))
		{
			return
		}

		return get_value_at_path(where[path], paths)
	}

	return get_value_at_path(where, paths)
}

Object.set_value_at_path = (where, paths, value) =>
{
	paths = paths instanceof Array ? paths.clone() : paths.split('.')

	const set_value_at_path = (where, paths, value) =>
	{
		const path = paths.shift()

		if (paths.is_empty())
		{
			return where[path] = value
		}

		if (typeof where[path] != 'object')
		{
			where[path] = {}
		}

		return set_value_at_path(where[path], paths, value)
	}

	return set_value_at_path(where, paths, value)
}

Object.defineProperty(Array.prototype, 'first',
{
	enumerable: false,
	value: function() 
	{ 
		return this[0]
	}
})

Object.defineProperty(Array.prototype, 'has',
{
	enumerable: false,
	value: function(element) 
	{ 
		return this.indexOf(element) >= 0
	}
})

Object.defineProperty(Array.prototype, 'not_empty', 
{
	enumerable: false,
	value: function() 
	{ 
		return this.length > 0
	}
})

Object.defineProperty(Array.prototype, 'is_empty', 
{
	enumerable: false,
	value: function() 
	{ 
		return this.length == 0 
	}
})

Object.defineProperty(Array.prototype, 'clone', 
{
	enumerable: false,
	value: function() 
	{ 
		return this.splice(0)
	}
})

Object.defineProperty(Array.prototype, 'last', 
{
	enumerable: false,
	value: function()
	{
		if (this.is_empty()) {
			return
		}
		return this[this.length - 1]
	}
})

Object.defineProperty(Array.prototype, 'remove', 
{
	enumerable: false,
	value: function(element)
	{
		const index = this.indexOf(element)
		if (index >= 0)
		{
			array.splice(index, 1)
		}
		return this
	}
})

Object.defineProperty(String.prototype, 'starts_with', 
{
	enumerable: false,
	value: function(substring)
	{
		return this.indexOf(substring) === 0
	}
})

Object.defineProperty(String.prototype, 'ends_with', 
{
	enumerable: false,
	value: function(substring)
	{
		const index = this.lastIndexOf(substring)
		return index >= 0 && index === this.length - substring.length
	}
})

RegExp.escape = function(string)
{
	const specials = new RegExp("[.*+?|()\\[\\]{}\\\\]", 'g')
	return string.replace(specials, "\\$&")
}

Object.defineProperty(String.prototype, 'replace_all', 
{
	enumerable: false,
	value: function(what, with_what)
	{
		const regexp = new RegExp(RegExp.escape(what), 'g')
		return this.replace(regexp, with_what)
	}
})

Object.defineProperty(String.prototype, 'has', 
{
	enumerable: false,
	value: function(what)
	{
		return this.indexOf(what) >= 0
	}
})

Object.defineProperty(String.prototype, 'before', 
{
	enumerable: false,
	value: function(what)
	{
		const index = this.indexOf(what)
		if (index < 0)
		{
			return this
		}
		return this.substring(0, index)
	}
})

Object.defineProperty(String.prototype, 'after', 
{
	enumerable: false,
	value: function(what)
	{
		const index = this.indexOf(what)
		if (index < 0)
		{
			return ''
		}
		return this.substring(index + what.length)
	}
})

Object.defineProperty(String.prototype, 'is_blank', 
{
	enumerable: false,
	value: function()
	{
		return !this || /^\s*$/.test(this)
	}
})

Object.defineProperty(String.prototype, 'repeat', 
{
	enumerable: false,
	value: function(times)
	{
		let result = ''
		while (times > 0)
		{
			result += this
			times--
		}
		return result
	}
})

Object.defineProperty(Function.prototype, 'delay_for', 
{
	enumerable: false,
	value: function(time)
	{
		setTimeout(this, time)
	}
})

Object.defineProperty(Function.prototype, 'periodical', 
{
	enumerable: false,
	value: function (interval)
	{
		const action = this

		function periodical()
		{
			const result = action()

			if (result instanceof Promise)
			{
				result.finally(() => periodical.delay_for(interval))
			}
			else
			{
				periodical.delay_for(interval)
			}
		}

		periodical()
	}
})