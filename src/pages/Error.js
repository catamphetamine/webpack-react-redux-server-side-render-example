import React from 'react'

import './Error.css'

export default function ErrorPage() {
	return (
		<section className="page-content">
			<h1 className="page-header">
				Some kind of an error happened
			</h1>
		</section>
	)
}

ErrorPage.meta = () => ({ title: 'Error' })