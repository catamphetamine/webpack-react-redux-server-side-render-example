import React, { Component } from 'react'
import { meta } from 'react-website'

import './Error.css'

@meta(({ state }) => ({ title: 'Error' }))
export default class Page extends Component
{
	render()
	{
		return (
			<section className="page-content">
				<h1 className="page-header">
					Some kind of an error happened
				</h1>
			</section>
		)
	}
}