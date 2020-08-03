const del = require('del');
const { config, isProduction } = require('../config');
const { dist, srcFolder } = config;
const distSrcPath = `${dist}/${srcFolder}`;
const distImgPath = `${distSrcPath}/images`;
const devImgPath = `${srcFolder}/images`;
const distFontPath = `${distSrcPath}/fonts`;
const devFontPath = `${srcFolder}/fonts`;
const miscDevPath = `${srcFolder}/misc`;

module.exports = function (gulp) {
  const watch = require('gulp-chokidar')(gulp);

  gulp.task('move:imgs', function () {
    return gulp
      .src([
        `!${devImgPath}/sprite/*.png`,
        `!${devImgPath}/svg/*.svg`,
        `${devImgPath}/**/*.png`,
        `${devImgPath}/**/*.jpg`,
        `${devImgPath}/**/*.svg`,
      ])
      .pipe(gulp.dest(distImgPath));
  });

  /** Task for move fonts for dev */
  gulp.task('move:fonts', function () {
    return gulp.src(`${devFontPath}/**/*.*`).pipe(gulp.dest(distFontPath));
  });

  gulp.task('move:misc', function () {
    return gulp.src(`${miscDevPath}/**/*.*`).pipe(gulp.dest(dist));
  });

  gulp.task('clear:all', function () {
    return del(`./${dist}/**/*.*`);
  });

  gulp.task('copy', gulp.series('move:imgs', 'move:fonts', 'move:misc'));

  gulp.task('copy:watch', function () {
    watch(
      [
        `${devImgPath}/**/*.png`,
        `${devImgPath}/**/*.jpg`,
        `${devImgPath}/**/*.svg`,
        `${miscDevPath}/**/*.*`,
        `${devFontPath}/**/*.*`
      ],
      ['copy', 'browser:reload']
    );
  });
};
