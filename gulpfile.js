const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const typescript = require('gulp-typescript');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const nodemon = require('gulp-nodemon');

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

function server(done) {
  nodemon({
    script: 'dist/js/index.js', // Assuming your compiled TypeScript entry file is in dist/js/index.js
    watch: 'dist/js', // Watch the compiled JS files for changes
  });

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
}

exports.default = gulp.series(gulp.parallel(html, styles, scripts), gulp.parallel(server, watch));
