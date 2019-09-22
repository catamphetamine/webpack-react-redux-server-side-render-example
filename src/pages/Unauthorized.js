import React from 'react'

import './Error.css'

export default function Unauthorized() {
	return (
		<section className="page-content">
			<h1 className="page-header">
				You're not authorized to perform this action
			</h1>
		</section>
	)
}

Unauthorized.meta = { title: 'Unauthorized' }