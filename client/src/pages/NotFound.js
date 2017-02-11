import React, { Component } from 'react'
import { Title } from 'react-isomorphic-render'
import { flat as style } from 'react-styling'

export default class Not_found extends Component
{
	render()
	{
		const markup =
		(
			<div>
				<Title>Page not found</Title>

				<h1 style={ styles.header }>
					Page not found
				</h1>
			</div>
		)

		return markup
	}
}

const styles = style
`
	header
		text-align: center
`