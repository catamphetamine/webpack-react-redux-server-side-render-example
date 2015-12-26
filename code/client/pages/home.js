import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'
import styler      from 'react-styling'
import { title }   from 'react-isomorphic-render'

export default class Page extends Component
{
	render()
	{
		const husky = require('../../../assets/images/husky.jpg')

		const markup = 
		(
			<section className="content">
				{title("Home")}

				<h1 style={style.header}>
					Husky
				</h1>

				<img src={husky} style={style.image}/>
			</section>
		)

		return markup
	}
}

const style = styler
`
	header
		text-align: center

	image
		display: block

		margin-left  : auto
		margin-right : auto

		border-width : 1px
		border-style : solid
		border-color : #7f7f7f

		border-radius : 0.5em
`