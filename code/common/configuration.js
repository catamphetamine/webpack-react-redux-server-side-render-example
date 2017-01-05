import _ from './language'

import configuration from '../../configuration.defaults'
import specific_configuration from '../../configuration'

Object.extend(configuration, specific_configuration)
export default configuration