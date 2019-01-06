module.exports = {
	presets: [
		"@babel/preset-env"
	],
	plugins: [
		"@babel/plugin-transform-destructuring",
		["@babel/plugin-proposal-object-rest-spread", { useBuiltIns: true }],
		["@babel/plugin-proposal-decorators", { "legacy": true }],
		["@babel/plugin-proposal-class-properties", { "loose" : true }]
	],
	overrides: [{
		include: "./src",
		presets: [
			"@babel/preset-react"
		],
		plugins: [
			["babel-plugin-transform-react-remove-prop-types", { removeImport: true }],
			"react-hot-loader/babel"
		]
	}, {
		include: "./rendering-service",
		presets: [
			"@babel/preset-react"
		]
	}]
}