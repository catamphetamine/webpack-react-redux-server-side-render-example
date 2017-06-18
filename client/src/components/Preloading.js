import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ActivityIndicator } from 'react-responsive-ui'
import classNames from 'classnames'

@connect(({ preload }) =>
({
	pending   : preload.pending,
	immediate : preload.immediate
}))
export default class Preloading extends Component
{
	static propTypes =
	{
		pending: PropTypes.bool,
		immediate: PropTypes.bool
	}

	render()
	{
		const { pending, immediate } = this.props

		return (
			<div
				className={classNames('rrui__fixed-full-width', 'preloading',
				{
					'preloading--shown'     : pending,
					'preloading--immediate' : immediate
				})}>
				<ActivityIndicator/>
			</div>
		)
	}
}