import React, { Component } from 'react'
import { Title } from 'react-isomorphic-render'

export default class Not_found extends Component
{
	render()
	{
		const markup =
		(
			<div className="page-content">
				<Title>Not found</Title>

				<h1 className="page-header">
					Page not found
				</h1>
			</div>
		)

		return markup
	}
}