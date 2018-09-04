import React, { Component } from 'react'

import './Error.css'

export default class Unauthenticated extends Component
{
	render()
	{
		return (
			<section className="page-content">
				<h1 className="page-header">
					You need to sign in to access this page
				</h1>
			</section>
		)
	}
}