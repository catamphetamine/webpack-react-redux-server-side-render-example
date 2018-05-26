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