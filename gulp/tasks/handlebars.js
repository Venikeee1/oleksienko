const rename = require('gulp-rename');
const replace = require('gulp-replace-task');
const concat = require('gulp-concat');
const clearFolder = require('del');
const fs = require('fs');
const handlebars = require('gulp-compile-handlebars');
const { config, isProduction } = require('../config');
const { dist, srcFolder } = config;
const handlebarsFolderPath = `${srcFolder}/handlebars`;

module.exports = function (gulp) {
  const watch = require('gulp-chokidar')(gulp);

  gulp.task('handlebars:compile', function () {
    const hash = isProduction ? Date.now() : '';
    const dataFields = fs.readFileSync('.temp/partialsData.js', 'utf8');
    const options = { batch: [handlebarsFolderPath] };
    var data = {};

    if (dataFields) {
      eval('data = {' + dataFields + ',' + 'hash:"' + hash + '"}');
    }

    return gulp
      .src([`${srcFolder}/pages/*.html`])
      .pipe(handlebars(data, options))
      .pipe(
        replace({
          patterns: [
            {
              match: /%=staticPrefixForCss=%|%=static=%|__static__/gim,
              replacement: `./${srcFolder}/`,
            },
          ],
          usePrefix: false,
        })
      )
      .pipe(
        rename(function (path) {
          path.extname = '.html';
          path.dirname = '';
        })
      )
      .pipe(gulp.dest(dist));
  });

  gulp.task('handlebars:clean', function () {
    return clearFolder('.temp/partialsData.js');
  });

  gulp.task('handlebars:data', function () {
    return gulp
      .src(`${handlebarsFolderPath}/**/**/*.js`)
      .pipe(concat('partialsData.js', { newLine: ',\n\n' }))
      .pipe(gulp.dest('.temp'));
  });

  gulp.task(
    'handlebars',
    gulp.series('handlebars:data', 'handlebars:compile', 'handlebars:clean')
  );

  gulp.task('handlebars:watch', function () {
    watch(
      [
        `${srcFolder}/pages/**/*.html`,
        `${handlebarsFolderPath}/**/*.hbs`,
        `${handlebarsFolderPath}/**/*.js`,
      ],
      gulp.series('handlebars', 'browser:reload')
    );
  });
};
