import React from 'react'

import './Error.css'

export default function NotFound() {
	return (
		<div className="page-content">
			<h1 className="page-header">
				Page not found
			</h1>
		</div>
	)
}

NotFound.meta = () => ({ title: 'Not found' })