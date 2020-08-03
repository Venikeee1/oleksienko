const browserSync = require("browser-sync");
const { config } = require("../config");
const { dist } = config;

module.exports = function (gulp) {
  gulp.task("browser", function () {
    browserSync.init({
      server: {
        baseDir: `./${dist}/`,
      },
    });
  });

  gulp.task('browser:reload', function () {
    browserSync.reload();
  });

  gulp.task("reload:stream", function () {
    browserSync.reload({ stream: true });
  });
};
