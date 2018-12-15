'use strict';

const {
  src,
  dest,
  series,
  parallel,
  watch
} = require('gulp');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const path = require('path')
const browserSync = require('browser-sync').create();
const appPort = require("../config").appPort
const srcPath = './src/ctrip'
const destPath = './public/ctrip'

function sassToCss() {
  return src(`${srcPath}/sass/**/*.scss`)
    .pipe(sass().on('error', sass.logError))
    .pipe(dest(path.join(destPath, "css")))
}

function watch_sass(cb) {
  watch(`${srcPath}/sass/**/*.scss`, {
    events: ['change'],
    ignoreInitial: false
  }, sassToCss)
  cb()
}

function refresh(cb1) {
  browserSync.init({
    proxy: `127.0.0.1:${appPort}`
  });
  watch(['./views/ctrip/index.ejs', `${destPath}/**`], {
      events: ['change']
    },
    function (cb2) {
      browserSync.reload()
      cb2()
    }
  )
  cb1()
}

var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");

/**
 * babel中是 @babel/preset-env   而babel-gulp中是 @babel/env
 */

function es6ToEs5() {
  console.log("es6 to es5")
  /*
  return src(`${srcPath}/es6/*.js`)
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ["@babel/preset-env"]
    }))
    .pipe(concat("all.js"))
    .pipe(sourcemaps.write())
    .pipe(dest(`${destPath}/es5/`));
    */
  return src(`${srcPath}/es6/*.js`)
    .pipe(babel())
    .pipe(dest(`${destPath}/es5/`));

}

function watchEs6ToEs5(cb) {
  watch(`${srcPath}/es6/**`, {
    events: ["change"]
  }, es6ToEs5)
  cb()
}
exports.default = parallel(
  series(sassToCss, watch_sass),
  series(es6ToEs5, watchEs6ToEs5),
  refresh)