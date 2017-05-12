import { serverConfiguration } from 'universal-webpack'
import settings from './universal-webpack-settings'
import configuration from './webpack.config'

export default serverConfiguration(configuration, settings)

// // https://github.com/babel/babel/issues/5731
//
// const serverSideConfiguration = serverConfiguration(configuration, settings)
//
// const entry = Object.keys(serverSideConfiguration.entry)[0]
//
// serverSideConfiguration.entry[entry] =
// [
// 	'babel-polyfill',
// 	serverSideConfiguration.entry[entry]
// ]
//
// export default serverSideConfiguration