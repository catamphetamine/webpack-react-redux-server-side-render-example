import React, { Component, PropTypes } from 'react'
import { Link, IndexLink } from 'react-isomorphic-render'
import { flat as style } from 'react-styling'

export default class Menu extends Component
{
	render()
	{
		const { items } = this.props

		const markup =
		(
			<ul style={ styles.menu } className="menu">
				{ items.map((item, i) => {
					return (
						<li key={ i } style={ styles.menu_item }>
							{ this.render_link(item) }
						</li>
					)
				}) }
			</ul>
		)

		return markup
	}

	render_link(item)
	{
		const Link_component = item.link === '/' ? IndexLink : Link

		return (
			<Link_component
				to={ item.link }
				style={ styles.menu_item_link }
				activeClassName="menu-item-selected"
				className="menu-item">
				{ item.name }
			</Link_component>
		)
	}
}

const styles = style
`
	menu
		margin-top    : 0
		margin-bottom : 0

		list-style-type : none
		padding         : 0

		item
			display: inline-block

			link
				display         : inline-block
				text-decoration : none
`