import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Link, IndexLink } from 'react-isomorphic-render'
import styler from 'react-styling'

export default class Menu extends Component
{
	render()
	{
		const markup =
		(
			<ul style={ style.menu } className="menu">
				{ this.props.items.map((item, i) => {
					return (
						<li key={ i } style={ style.menu.item }>
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
				to={item.link}
				style={style.menu.item.link}
				activeClassName="menu-item-selected"
				className="menu-item">
				{item.name}
			</Link_component>
		)
	}
}

const style = styler
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