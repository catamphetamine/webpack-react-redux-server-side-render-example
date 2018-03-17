import path               from 'path'
import webpack            from 'webpack'
import CleanPlugin        from 'clean-webpack-plugin'
import Visualizer         from 'webpack-visualizer-plugin'

import baseConfiguration  from './webpack.config.client'

// With `development: false` all CSS will be extracted into a file
// named '[name]-[contenthash].css' using `extract-text-webpack-plugin`
// or `mini-css-extract-plugin`.
// (this behaviour can be disabled with `cssBundle: false`)
// (the filename can be customized with `cssBundle: "filename.css"`)
const configuration = baseConfiguration({ development: false, useMiniCssExtractPlugin: true })

configuration.devtool = 'source-map'

// Hides "Entrypoint size exeeds the recommened limit (250kB)" warnings.
// https://github.com/webpack/webpack/issues/3486
configuration.performance = { hints: false }

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

  // For production mode
  // https://moduscreate.com/webpack-2-tree-shaking-configuration/
  new webpack.LoaderOptionsPlugin
  ({
    minimize: true,
    debug: false
  }),

  // https://blog.etleap.com/2017/02/02/inspecting-your-webpack-bundle/
  new Visualizer
  ({
    // Relative to the output folder
    filename: '../bundle-stats.html'
  }),
)

export default configuration
