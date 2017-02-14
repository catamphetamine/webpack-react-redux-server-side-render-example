import { cloneDeep } from 'lodash'
import base_configuration from './webpack.config.server'

const configuration = cloneDeep(base_configuration)

export default configuration
