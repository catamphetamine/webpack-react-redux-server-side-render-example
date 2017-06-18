import React, { Component } from 'react'
import { Title } from 'react-isomorphic-render'

export default class Unauthorized extends Component
{
	render()
	{
		return (
			<section className="page-content">
				<Title>Unauthorized</Title>

				<h1 className="page-header">
					You're not authorized to perform this action
				</h1>
			</section>
		)
	}
}