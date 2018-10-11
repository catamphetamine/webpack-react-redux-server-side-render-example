import path from 'path'
import webpack from 'webpack'
import CleanPlugin from 'clean-webpack-plugin'
import Visualizer from 'webpack-visualizer-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

import { clientConfiguration } from 'universal-webpack'
import settings from './universal-webpack-settings'
import baseConfiguration from './webpack.config'

const configuration = clientConfiguration(baseConfiguration, settings,
{
  // Extract all CSS into separate `*.css` files (one for each chunk)
  // using `mini-css-extract-plugin`
  // instead of leaving that CSS embedded directly in `*.js` chunk files.
  development : false,
  useMiniCssExtractPlugin : true
})

configuration.devtool = 'source-map'

// Minimize CSS.
// https://github.com/webpack-contrib/mini-css-extract-plugin#minimizing-for-production
configuration.optimization = {
  minimizer: [
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: true // set to true if you want JS source maps
    }),
    new OptimizeCSSAssetsPlugin({})
  ]
};

configuration.plugins.push
(
  // Clears the output folder before building.
  new CleanPlugin([
    path.relative(configuration.context, configuration.output.path)
  ], {
    root: configuration.context
  }),

  // Shows the resulting bundle size stats.
  // https://blog.etleap.com/2017/02/02/inspecting-your-webpack-bundle/
  new Visualizer
  ({
    // The path is relative to the output folder
    filename : '../bundle-stats.html'
  }),

  // Shows the resulting bundle size stats (too).
  // https://github.com/webpack-contrib/webpack-bundle-analyzer
  new BundleAnalyzerPlugin
  ({
    // The path is relative to the output folder
    reportFilename : '../bundle-stats-2.html',
    analyzerMode   : 'static',
    openAnalyzer   : false
  })
)

export default configuration
