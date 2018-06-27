import yargs from 'yargs';
import path from 'path';
import webpack from 'webpack';

const ARGV = yargs.argv;

export const IS_DEBUG = !!ARGV.debug;
export const IS_MINIFY = !!ARGV.minify;
export const IS_WATCH = !!ARGV.watch;
export const IS_MOCK = !!ARGV.mock;
export const ENVIRONMENT = IS_DEBUG ? 'development' : 'production';

export const BS_HOST = '127.0.0.1';
export const BS_PORT = '3000';

export const fromProjectRoot = path.join.bind(path, path.resolve(__dirname, '../'));

export const PATHS = {
  APP: fromProjectRoot('app'),
  BUILD: fromProjectRoot('build'),
  SCRIPTS_SRC: fromProjectRoot('app/js'),
  SCRIPTS_DEST: fromProjectRoot('build/js'),
  SCRIPTS_LIBS: fromProjectRoot('node_modules'),
  IMAGES_SRC: fromProjectRoot('app/images'),
  IMAGES_DEST: fromProjectRoot('build/images'),
  FONTS_SRC: fromProjectRoot('app/fonts'),
  FONTS_DEST: fromProjectRoot('build/fonts'),
  STYLES_SRC: fromProjectRoot('app/stylus'),
  STYLES_DEST: fromProjectRoot('build/css'),
};

export const WEBPACK_CONFIG_BASE = {
  watch: IS_WATCH,
  mode: ENVIRONMENT,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/i,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      app: PATHS.APP,
    },
  },
  plugins: (() => {
    const plugins = [];

    plugins.push(new webpack.optimize.OccurrenceOrderPlugin(true));

    if (IS_DEBUG) {
      plugins.push(
        new webpack.SourceMapDevToolPlugin({
          exclude: /node_modules/i,
          module: true,
          columns: true,
        })
      );
    }

    if (IS_MINIFY) {
      plugins.push(new webpack.optimize.AggressiveMergingPlugin());
    }

    return plugins;
  })(),
};
