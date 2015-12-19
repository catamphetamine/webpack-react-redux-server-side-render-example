// import fs from 'fs'
import path from 'path'
import minimist from 'minimist'

import _ from './language'

import configuration from '../../configuration.defaults'
import specific_configuration from '../../configuration'

Object.extend(configuration, specific_configuration)
export default configuration

// можно будет использовать этот файл в shell'овых скриптах
// (команда: node configuration.coffee --path="...")

const process_arguments = minimist(process.argv.slice(2))

if (process_arguments.path)
{
	console.log(Object.path(configuration, process_arguments.path))
	process.exit()
}
