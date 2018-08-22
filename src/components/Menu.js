import React from 'react'
import { Link } from 'react-website'
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

export function MenuLink({ to, exact, children })
{
	return (
		<li className="menu-list-item">
			<Link
				to={ to }
				exact={ exact }
				activeClassName="menu-item--selected"
				className="menu-item">
				{ children }
			</Link>
		</li>
	)
}