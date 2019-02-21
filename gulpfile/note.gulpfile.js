'use strict';

const { watch } = require('gulp');
const browserSync = require('browser-sync').create();
const appPort = require("../config").appPort
const destPath = './public/note'


function refresh(cb1) {
  browserSync.init({
    proxy: `127.0.0.1:${appPort}`
  });
  watch(['./views/note/index.ejs', `${destPath}/**`], {
      events: ['change']
    },
    function (cb2) {
      browserSync.reload()
      cb2()
    }
  )
  cb1()
}

exports.default = refresh