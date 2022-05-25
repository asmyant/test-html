import pkg from "gulp";
import webpack from "webpack";
import babel from "gulp-babel";
import webpackStream from "webpack-stream";
import uglify from "gulp-uglify";
import gulpif from "gulp-if";
import concat from "gulp-concat";
import {config} from "../config.js";
import {production} from "./env.js";
import {browserSync} from "./server.js";
import sourceMaps from "gulp-sourcemaps";
import webPackConfig from "../../webpack.config.js";

const {src, dest} = pkg;
const {src: jsSrc, mode, dist: jsDest} = config.scripts;

/**
 * Main javascript file gulp task
 */
export const js = () => {
  if (mode === "webpack") {
    return src(jsSrc.index)
        .pipe(webpackStream(webPackConfig), webpack)
        .pipe(gulpif(!production, babel({presets: ["@babel/env"]})))
        .pipe(dest(jsDest))
        .pipe(gulpif(!production, browserSync.stream()))
  } else {
    return src(jsSrc.index)
        .pipe(dest(jsDest))
        .pipe(gulpif(!production, browserSync.stream()))
  }
}

/**
 * Vendors gulp task
 */
export const jsVendors = (cb) => {
  if (mode !== "webpack") {
    return src(jsSrc.vendors)
        .pipe(gulpif(production && create, sourceMaps.init()))
        .pipe(uglify())
        .pipe(concat("vendors.js"))
        .pipe(dest(jsDest))
        .pipe(gulpif(!production, browserSync.stream()))
  }
  cb();
}
