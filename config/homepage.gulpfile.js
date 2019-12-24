"use strict";

const { src, dest, series, parallel, watch } = require("gulp");
const sass = require("gulp-sass");
sass.compiler = require("node-sass");
const path = require("path");
const browserSync = require("browser-sync").create();
const appPort = require("../config").appPort;
const srcPath = "./src/homepage";
const destPath = "./public/homepage";

function sassToCss() {
	return src(`${srcPath}/sass/*.scss`)
		.pipe(sass().on("error", sass.logError))
		.pipe(dest(path.join(destPath, "css")));
}

function watch_sass(cb) {
	watch(
		`${srcPath}/sass/*.scss`,
		{
			events: ["change"]
		},
		sassToCss
	);
	cb();
}

function refresh(cb1) {
	browserSync.init({
		proxy: `127.0.0.1:${appPort}`
	});
	watch(
		["./views/*.ejs", `${destPath}/**`],
		{
			events: ["change"]
		},
		function(cb2) {
			browserSync.reload();
			cb2();
		}
	);
	cb1();
}

const del = require("delete");

function delOldCss(cb) {
	// Use the `delete` module directly, instead of using gulp-rimraf
	del([`${destPath}/stylesheets/**`], cb);
}

exports.default = parallel(series(delOldCss, sassToCss, watch_sass), refresh);
