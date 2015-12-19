import React, { Component } from 'react'
import hoist_statics from 'hoist-non-react-statics'

/*
  Note:
    When this decorator is used, it MUST be the first (outermost) decorator.
    Otherwise, we cannot find and call the preload and preload_deferred methods.
*/

export default function(preload, preload_deferred)
{
	return function(Wrapped)
	{
		class Wrapper extends Component
		{
			render()
			{
				return <Wrapped {...this.props} />
			}
		}

		Wrapper.preload = preload
		Wrapper.preload_deferred = preload_deferred

		return hoist_statics(Wrapper, Wrapped)
	}
}