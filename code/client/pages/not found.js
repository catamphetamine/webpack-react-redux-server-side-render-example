import React, { Component } from 'react'
import { title }            from 'react-isomorphic-render'
import styler               from 'react-styling'

export default class Not_found extends Component
{
	render()
	{
		const markup =
		(
			<div>
				{title("Page not found")}

				<h1 style={style.header}>
					Page not found
				</h1>
			</div>
		)

		return markup
	}
}

const style = styler
`
	header
		text-align: center
`