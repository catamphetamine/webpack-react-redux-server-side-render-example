import React from 'react'
import { Link, IndexLink } from 'react-website'
import classNames from 'classnames'

import './Menu.css'

export default function Menu({ className, children })
{
	return (
		<ul className={classNames('menu', className)}>
			{ children }
		</ul>
	)
}

export function MenuLink({ to, children })
{
	// A `<Link>` can know when the route it links to is "active"
	// and automatically apply an `activeClassName` and/or `activeStyle`
	// when given either prop. The `<Link>` will be "active" if
	// the current route is either the linked route or any
	// descendant of the linked route. To have the link be "active"
	// only on the exact linked route, use `<IndexLink>` instead.
	// (citation from `react-router@3` docs)

	const LinkComponent = to === '/' ? IndexLink : Link

	return (
		<li className="menu-list-item">
			<LinkComponent
				to={ to }
				activeClassName="menu-item--selected"
				className="menu-item">
				{ children }
			</LinkComponent>
		</li>
	)
}