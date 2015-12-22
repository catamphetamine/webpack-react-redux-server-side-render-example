import { client } from './render'
import dev_tools from './dev tools'

export default function({ development, development_tools, to, create_store, create_routes, markup_wrapper })
{
	// create Redux store
	const store = create_store(window._flux_store_data, { development, development_tools })
	delete window._flux_store_data

	client
	({
		development    : development,
		wrap_component : component =>
		{
			const wrapped_component = markup_wrapper(component, { store })

			if (!development_tools)
			{
				return wrapped_component
			}

			// Render dev tools after initial client render to prevent warning
			// "React attempted to reuse markup in a container but the checksum was invalid"
			// https://github.com/erikras/react-redux-universal-hot-example/pull/210

			ReactDOM.render(wrapped_component, content_container)

			console.log(`You are gonna see a warning about "React.findDOMNode is deprecated" in the console. It's normal: redux_devtools hasn't been updated to React 0.14 yet`)

			const markup =
			(
				<div>
					{wrapped_component}
					<dev_tools/>
				</div>
			)

			return markup
		},
		routes : create_routes({ store }),
		to
	})
}