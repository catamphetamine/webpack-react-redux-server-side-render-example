import path from 'path'
import webpack from 'webpack'
import CleanPlugin from 'clean-webpack-plugin'
import Visualizer from 'webpack-visualizer-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

import { clientConfiguration } from 'universal-webpack'
import settings from './universal-webpack-settings'
import base_configuration from './webpack.config'

// With `development: false` all CSS will be extracted into a file
// named '[name]-[contenthash].css' using `mini-css-extract-plugin`.
const configuration = clientConfiguration(base_configuration, settings, { development: false, useMiniCssExtractPlugin: true })

configuration.devtool = 'source-map'

configuration.plugins.push
(
  // clears the output folder
  new CleanPlugin([path.relative(configuration.context, configuration.output.path)], { root: configuration.context }),

  // environment variables
  new webpack.DefinePlugin
  ({
    // Just so that it doesn't throw "_development_tools_ is not defined"
    REDUX_DEVTOOLS: false
  }),

  // https://blog.etleap.com/2017/02/02/inspecting-your-webpack-bundle/
  new Visualizer
  ({
    // Relative to the output folder
    filename: '../bundle-stats.html'
  }),

  new BundleAnalyzerPlugin
  ({
    analyzerMode: 'static',
    reportFilename: '../bundle-stats-2.html',
    openAnalyzer: false
  })
)

export default configuration
