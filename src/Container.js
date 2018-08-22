import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { hot } from 'react-hot-loader'
import { Loading } from 'react-website'

import Snackbar from './components/Snackbar'

function Container({ store, children })
{
	return (
		<Provider store={store}>
			<React.Fragment>
				<Loading/>
				{children}
				<Snackbar/>
			</React.Fragment>
		</Provider>
	)
}

Container.propTypes = {
	store: PropTypes.object.isRequired
}

export default hot(module)(Container)