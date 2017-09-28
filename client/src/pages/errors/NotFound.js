import React, { Component } from 'react'
import { meta } from 'react-isomorphic-render'

@meta(({ state }) => ({ title: 'Not found' }))
export default class Not_found extends Component
{
	render()
	{
		return (
			<div className="page-content">
				<h1 className="page-header">
					Page not found
				</h1>
			</div>
		)
	}
}