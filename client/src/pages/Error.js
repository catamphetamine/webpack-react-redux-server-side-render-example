import React, { Component } from 'react'
import { Title } from 'react-isomorphic-render'

export default class Page extends Component
{
	render()
	{
		const markup =
		(
			<section className="page-content">
				<Title>Error</Title>

				<h1 className="page-header">
					Some kind of an error happened
				</h1>
			</section>
		)

		return markup
	}
}