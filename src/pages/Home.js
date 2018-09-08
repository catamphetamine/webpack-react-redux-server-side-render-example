import React, { Component } from 'react'

import husky from '../../assets/images/husky.jpg'

import './Home.css'

export default class Page extends Component
{
	render()
	{
		return (
			<section className="page-content container">
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