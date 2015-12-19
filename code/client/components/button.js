import React, { Component, PropTypes } from 'react'
import styler from 'react-styling'

export default class Button extends Component
{
	static propTypes =
	{
		text     : PropTypes.string.isRequired,
		on_click : PropTypes.func.isRequired,
		busy     : PropTypes.bool,
		style    : PropTypes.object
	}

	render()
	{
		const { busy, on_click, text } = this.props

		const markup = 
		(
			<div style={merge(style.container, this.props.style)}>
				<span className="spinner" style={ busy ? style.spinner.show : style.spinner.hide }></span>
				<button disabled={busy} onClick={on_click} style={ busy ? style.button.hide : style.button.show }>{text}</button>
			</div>
		)

		return markup
	}
}

const style = styler
`
	container
		position : relative
		display  : inline-block

	spinner
		position   : absolute
		z-index    : -1
		bottom     : 0.25em
		transition : opacity 300ms ease-out

		&show
			opacity          : 1
			transition-delay : 350ms
		&hide
			transition : opacity 200ms ease-out
			opacity    : 0

	button
		&show
			opacity          : 1
			transition       : opacity 150ms ease-out
			transition-delay : 100ms
		&hide
			opacity          : 0
			transition       : opacity 200ms ease-out
			transition-delay : 300ms
`