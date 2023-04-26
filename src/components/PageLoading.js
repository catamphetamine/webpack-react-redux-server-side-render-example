import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import { FadeInOut } from 'react-responsive-ui'

import LinearProgress from './LinearProgress.js'

import './PageLoading.css'

export default function PageLoading({
	initial,
	show,
	showAnimationDelay,
	hideAnimationDuration
}) {
	return (
		<div
			className={classNames('rrui__fixed-full-width', 'PageLoading', {
				'PageLoading--show': show,
				'PageLoading--initial': initial,
				'PageLoading--showImmediately': showAnimationDelay === 0
			})}>
			<FadeInOut show={show} fadeOutDuration={hideAnimationDuration}>
				<LinearProgress/>
			</FadeInOut>
		</div>
	)
}

PageLoading.propTypes = {
	initial: PropTypes.bool,
	show: PropTypes.bool,
	hideAnimationDuration: PropTypes.number.isRequired,
	showAnimationDelay: PropTypes.number
}

PageLoading.defaultProps = {
	hideAnimationDuration: 160
}