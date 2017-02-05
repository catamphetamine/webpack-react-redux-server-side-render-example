import React, { Component, PropTypes } from 'react'
import { flat as style } from 'react-styling'
import { title } from 'react-isomorphic-render'

export default class Page extends Component
{
	render()
	{
		const markup = 
		(
			<section className="content">
				{ title("Error") }

				<h1 style={ styles.header }>
					Some kind of an error happened
				</h1>
			</section>
		)

		return markup
	}
}

const styles = style
`
	header
		text-align: center
`