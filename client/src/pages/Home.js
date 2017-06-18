import React, { Component } from 'react'
import { Title } from 'react-isomorphic-render'

import husky from '../../assets/images/husky.jpg'

export default class Page extends Component
{
	render()
	{
		return (
			<section className="page-content">
				<Title>Home</Title>

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