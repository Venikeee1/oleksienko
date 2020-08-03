const { config } = require('../config');
const replace = require('gulp-replace-task');
const concat = require('gulp-concat');
const scss = require('gulp-sass');
const browserSync = require('browser-sync');

const { dist, srcFolder } = config;
const outputFileName = 'main.css';
const devSassPath = `${srcFolder}/sass/main.scss`;
const handleBarsPath = `${srcFolder}/handlebars`;

module.exports = function (gulp) {
  const watch = require('gulp-chokidar')(gulp);

  gulp.task('scss', function () {
    return gulp
      .src(devSassPath)
      .pipe(scss().on('error', scss.logError))
      .pipe(concat(outputFileName))
      .pipe(
        replace({
          patterns: [
            {
              match: /%=staticPrefixForCss=%|%=static=%|__static__/gim,
              replacement: './../',
            },
          ],
          usePrefix: false,
        })
      )
      .pipe(gulp.dest(`${dist}/source/css`))
      .pipe(browserSync.reload({ stream: true }));
  });

  gulp.task('scss:watch', function () {
    watch(
      [`${devSassPath}/*.scss`, `${handleBarsPath}/**/*.scss`],
      gulp.series('scss', 'reload:stream')
    );
  });
};
