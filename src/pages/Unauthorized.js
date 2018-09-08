import React, { Component } from 'react'

import './Error.css'

export default class Unauthorized extends Component
{
	render()
	{
		return (
			<section className="page-content">
				<h1 className="page-header">
					You're not authorized to perform this action
				</h1>
			</section>
		)
	}
}