import path from 'path';

import webpack            from 'webpack';
import baseConfiguration  from './webpack.config.client';
import CleanPlugin        from 'clean-webpack-plugin';

// With `development: false` all CSS will be extracted into a file
// named '[name]-[contenthash].css' using `extract-text-webpack-plugin`
// (this behaviour can be disabled with `css_bundle: false`)
// (the filename can be customized with `css_bundle: "filename.css"`)
const configuration = baseConfiguration({ development: false });

configuration.devtool = 'source-map';

configuration.plugins = configuration.plugins.concat(
  // clears the output folder
  new CleanPlugin([path.relative(configuration.context, configuration.output.path)], { root: configuration.context }),

  // environment variables
  new webpack.DefinePlugin({
    'process.env': {
      // Useful to reduce the size of client-side libraries, e.g. react
      NODE_ENV: JSON.stringify('production') // 'development' to see non-minified React errors
    },

    // Just so that it doesn't throw "_development_tools_ is not defined"
    REDUX_DEVTOOLS: false
  }),

  // For production mode
  // https://moduscreate.com/webpack-2-tree-shaking-configuration/
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),

  // Compresses javascript files
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
);

export default configuration;
