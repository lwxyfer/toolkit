const gulp = require('gulp');
const bs = require('browser-sync');

gulp.task('server', () => {
  bs.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch('*', () => {
    bs.reload();
  })
})
