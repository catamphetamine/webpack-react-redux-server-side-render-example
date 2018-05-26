import React, { Component } from 'react'
import { meta } from 'react-website'

import './Error.css'

@meta(({ state }) => ({ title: 'Not found' }))
export default class NotFound extends Component
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