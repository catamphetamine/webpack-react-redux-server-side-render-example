import React, { Component } from 'react'
import { meta } from 'react-isomorphic-render'

import husky from '../../assets/images/husky.jpg'

@meta(({ state }) => ({ title: 'Home' }))
export default class Page extends Component
{
	render()
	{
		return (
			<section className="page-content">
				<h1 className="page-header">
					Husky
				</h1>

				<img
					src={ husky }
					className="home-page-image"/>
			</section>
		)
	}
}