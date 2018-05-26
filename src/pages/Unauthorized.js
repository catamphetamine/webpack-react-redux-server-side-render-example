import React, { Component } from 'react'
import { meta } from 'react-website'

import './Error.css'

@meta(({ state }) => ({ title: 'Unauthorized' }))
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