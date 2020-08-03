/**
 * Created by Eugene on 12.12.16.
 */

/** Constant's */
const gulp = require('gulp');
const sassTask = require('./gulp/tasks/scss');
const jsTask = require('./gulp/tasks/webpack');
const handlebarsTask = require('./gulp/tasks/handlebars');
const browserSyncTask = require('./gulp/tasks/browserSync');
const copyFilesTask = require('./gulp/tasks/copyFiles');

handlebarsTask(gulp);
browserSyncTask(gulp);
copyFilesTask(gulp);
sassTask(gulp);
jsTask(gulp);

/** Watcher for task's files */
gulp.task(
  'watch',
  gulp.parallel('handlebars:watch', 'scss:watch', 'webpack:watch', 'copy:watch')
);

/** Default task  */
gulp.task(
  'default',
  gulp.series(
    'clear:all',
    'handlebars',
    'scss',
    'copy',
    'webpack',
    gulp.parallel('watch', 'browser')
  )
);

gulp.task('build', gulp.series('handlebars', 'scss', 'copy', 'webpack'));
