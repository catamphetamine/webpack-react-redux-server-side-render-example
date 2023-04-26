import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './LinearProgress.css'

export default function LinearProgress({ className }) {
	return (
		<div className={classNames('LinearProgress', className)} role="progressbar">
			<div className="LinearProgress-bar LinearProgress-bar--1"/>
			<div className="LinearProgress-bar LinearProgress-bar--2"/>
		</div>
	)
}

LinearProgress.propTypes = {
	className: PropTypes.string
}
