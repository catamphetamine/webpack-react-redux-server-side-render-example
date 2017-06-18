import React, { Component } from 'react'
import { Link, IndexLink } from 'react-isomorphic-render'

export default class Menu extends Component
{
	render()
	{
		const { items } = this.props

		const markup =
		(
			<ul className="menu">
				{ items.map((item, i) => {
					return (
						<li key={ i } className="menu-list-item">
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
				activeClassName="menu-item--selected"
				className="menu-item">
				{ item.name }
			</Link_component>
		)
	}
}