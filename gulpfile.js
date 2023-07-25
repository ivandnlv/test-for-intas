require = require('esm')(module); // Это позволит поддерживать динамический импорт

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const typescript = require('gulp-typescript');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();

const tsProject = typescript.createProject('tsconfig.json');

function html(done) {
  gulp.src('src/*.html').pipe(gulp.dest('dist')).pipe(browserSync.stream()); // Reload the browser when HTML changes
  done();
}

function styles(done) {
  gulp.src('src/scss/*.scss').pipe(sass()).pipe(gulp.dest('dist/css')).pipe(browserSync.stream()); // Reload the browser when CSS changes
  done();
}

function scripts(done) {
  tsProject
    .src()
    .pipe(tsProject())
    .pipe(
      babel({
        presets: ['@babel/env'],
      }),
    )
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream()); // Reload the browser when JS changes
  done();
}

function icons() {
  return gulp
    .src('src/icons/**/*.{png,svg}')
    .pipe(gulp.dest('dist/icons'))
    .pipe(browserSync.stream()); // Reload the browser when icon files change
}

function images() {
  return gulp.src('src/img/**/*.{png,jpg}').pipe(gulp.dest('dist/img')).pipe(browserSync.stream()); // Reload the browser when image files change
}

function server(done) {
  browserSync.init({
    server: {
      baseDir: './dist', // Serve files from the dist directory
      index: 'index.html', // The entry point of your app
    },
    port: 3000, // Change this to the desired port number
    open: false, // Set to true if you want the browser to open automatically
  });

  done();
}

function watch() {
  gulp.watch('src/*.html', html);
  gulp.watch('src/scss/**/*.scss', styles);
  gulp.watch('src/ts/**/*.ts', scripts);
  gulp.watch('src/icons/**/*.{png,svg}', icons);
  gulp.watch('src/img/**/*.{png,jpg}', images);
}

exports.default = gulp.series(
  gulp.parallel(html, styles, scripts, icons, images),
  gulp.parallel(server, watch),
);
