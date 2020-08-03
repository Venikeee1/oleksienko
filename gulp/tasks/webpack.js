const { config, isProduction } = require('../config');
const { jsFolder } = config;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpackStream = require('webpack-stream');
const webpack = webpackStream.webpack;
const gulpIf = require('gulp-if');
const replace = require('gulp-replace-task');
const uglify = require('gulp-uglify');

module.exports = function (gulp) {
  const watch = require('gulp-chokidar')(gulp);

  gulp.task('webpack', function () {
    const name = '[name].js';
    const webpackParams = {
      output: {
        publicPath: jsFolder,
        filename: name,
      },
      devtool: isProduction ? null : 'cheap-module-inline-source-map',
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel',
            exclude: /(node_modules|source\/js\/components\/vendors\/plugins\/ui\/utils)/,
            query: {
              presets: ['es2015'],
              plugins: ['transform-runtime'],
              cacheDirectory: true,
            },
          },
        ],
      },
      optimization: {
        minimizer: [
          new UglifyJsPlugin({
            test: /\.js(\?.*)?$/i,
          }),
        ],
      },
      plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
          name: 'common',
          minChunks: 2,
        }),
      ],
    };

    return gulp
      .src(`source/js/*.js`)
      .pipe(webpackStream(webpackParams, webpack))
      .pipe(
        replace({
          patterns: [
            {
              match: /%=staticPrefixForCss=%|%=static=%|__static__/gim,
              replacement: './source/',
            },
          ],
          usePrefix: false,
        })
      )
      .pipe(gulpIf(isProduction, uglify()))
      .pipe(gulp.dest(jsFolder));
  });

  gulp.task('webpack:watch', function () {
    watch(['source/js/**/*.js'], gulp.series('webpack', 'browser:reload'));
  });
};
