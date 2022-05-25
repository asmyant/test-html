import webpack from "webpack";

import {config} from "./gulp/config.js";
import {mode} from "./gulp/tasks/env.js";

export default {
  entry: config.scripts.src.index,
  output: {
    filename: '[name].js',
    chunkFilename: "[name].js",
  },
  plugins: [
    new webpack.ProvidePlugin(config.scripts.webpack.plugins),
  ],
  devtool: mode === 'production' ? 'source-map' : '',
  mode,
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          enforce: true,
          chunks: 'initial'
        }
      }
    }
  },
}

