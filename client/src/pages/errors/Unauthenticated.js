import React, { Component } from 'react'
import { Title } from 'react-isomorphic-render'

export default class Unauthenticated extends Component
{
	render()
	{
		const markup =
		(
			<section className="page-content">
				<Title>Unauthenticated</Title>

				<h1 className="page-header">
					You need to sign in to access this page
				</h1>
			</section>
		)

		return markup
	}
}