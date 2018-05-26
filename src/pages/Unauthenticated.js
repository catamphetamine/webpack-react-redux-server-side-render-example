import React, { Component } from 'react'
import { meta } from 'react-website'

import './Error.css'

@meta(({ state }) => ({ title: 'Unauthenticated' }))
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