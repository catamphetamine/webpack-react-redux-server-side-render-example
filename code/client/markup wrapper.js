import React            from 'react'
import { Provider }     from 'react-redux'

export default function markup_wrapper(component, { store })
{
	// all React "prop"erty providers go here.
	// e.g. redux Provider, react-intl IntlProvider.

	const markup = 
	(
		<Provider store={store} key="provider">
			{component}
		</Provider>
	)

	return markup
}