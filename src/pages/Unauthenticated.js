import React from 'react'

import './Error.css'

export default function Unauthenticated() {
	return (
		<section className="page-content">
			<h1 className="page-header">
				You need to sign in to access this page
			</h1>
		</section>
	)
}

Unauthenticated.meta = () => ({ title: 'Unauthenticated' })