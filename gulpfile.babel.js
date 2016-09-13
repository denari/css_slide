import gulp from 'gulp';
import serve from 'gulp-webserver';
import gulpPug from 'gulp-pug';
import sass from 'gulp-sass';
import compass from 'compass-importer';
import plumber from 'gulp-plumber';
import marked from 'marked';
import pug from 'pug';
import fs from 'fs'
import inlineCss from 'gulp-inline-css';

pug.filters.markdownInclude = function (filePath) {
  var str = fs.readFileSync(filePath).toString();
  return marked(str);
}

gulp.task('watch', () => {
  gulp.watch(["src/*.pug", "src/**/*.pug", "src/**/*.md"], ['pug']);
  gulp.watch(["src/sass/*.scss", "src/sass/**/*.scss"], ["sass"]);
});

gulp.task('pug', () => {
  gulp.src('src/*.pug')
    .pipe(plumber())
    .pipe(gulpPug({
      pug: pug
    }))
    .pipe(gulp.dest('./public/'));
});

gulp.task('sass', () => {
  gulp.src('./src/sass/style.scss')
    .pipe(plumber())
    .pipe(sass({ importer: compass }))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('serve', () => {
  gulp.src('public/')
    .pipe(serve({
      livereload: true,
      open: true
    }));
});
gulp.task("default", ['sass', 'pug', 'serve', 'watch']);
