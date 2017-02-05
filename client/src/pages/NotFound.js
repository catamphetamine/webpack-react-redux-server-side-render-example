import React, { Component } from 'react'
import { title } from 'react-isomorphic-render'
import { flat as style } from 'react-styling'

export default class Not_found extends Component
{
	render()
	{
		const markup =
		(
			<div>
				{ title("Page not found") }

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