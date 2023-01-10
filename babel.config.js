const REACT_FAST_REFRESH_PLUGINS = []

// Works around `react-refresh-webpack-plugin` bug:
// "$RefreshReg$ is not defined".
// Another wokraround:
// https://github.com/pmmmwh/react-refresh-webpack-plugin/issues/176#issuecomment-782770175
if (process.env.NODE_ENV === 'development') {
  REACT_FAST_REFRESH_PLUGINS.push('react-refresh/babel')
}

export default {
	presets: [
		"@babel/preset-env"
	],
	plugins: [
		["@babel/plugin-proposal-decorators", { "legacy": true }],
    "@babel/plugin-syntax-import-assertions"
	],
	overrides: [{
		include: "./src",
		presets: [
			"@babel/preset-react"
		],
		plugins: [
			["babel-plugin-transform-react-remove-prop-types", { removeImport: true }],
			...REACT_FAST_REFRESH_PLUGINS
		]
	}, {
		include: "./rendering-service",
		presets: [
			"@babel/preset-react"
		]
	}]
}