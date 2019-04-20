import path from 'path';
import webpack from 'webpack';
// `CheckerPlugin` is optional. Use it if you want async error reporting.
// We need this plugin to detect a `--watch` mode. It may be removed later
// after https://github.com/webpack/webpack/issues/3460 will be resolved.
import { CheckerPlugin } from 'awesome-typescript-loader';

const abs = (literals: TemplateStringsArray, ...placeholders: string[]) => path.resolve(__dirname, literals.reduce((prev, curr, i) => prev += (placeholders || [])[--i] + curr));

const config: webpack.Configuration = {

  // Currently we need to add '.ts' to the resolve.extensions array.
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: ['node_modules']
  },
  target: "node",
  node: {
    fs: 'empty',
    net: 'empty',
  },
  entry: abs`src/startup.ts`,
  output: {
    path: abs`dist`
  },
  // Source maps support ('inline-source-map' also works)
  devtool: 'source-map',

  // Add the loader for .ts files.
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },
  plugins: [
      new CheckerPlugin()
  ]
};

export default config;