import React from 'react'

import husky from '../../assets/images/husky.jpg'

import './Home.css'

export default function HomePage() {
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

HomePage.meta = (state) => ({ title: 'Home' })