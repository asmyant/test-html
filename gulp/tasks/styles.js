import pkg from "gulp";
import gulpSass from "gulp-sass";
import dartSass from "sass";
import gulpif from 'gulp-if';
import sourceMaps from "gulp-sourcemaps";
import gcmq from "gulp-group-css-media-queries";
import autoprefixer from "gulp-autoprefixer";
import shortHand from "gulp-shorthand";
import clean from "gulp-clean-css";
import concat from "gulp-concat";
import notify from "gulp-notify";
import {production} from "./env.js";
import {config} from "../config.js";
import {browserSync} from "./server.js";

const sass = gulpSass(dartSass);
const {src, dest} = pkg;

const {dist: mapDest, create} = config.styles.tasks.sourceMap;
const {clean: taskClean, sass: taskSass} = config.styles.tasks;
const {index, vendors, vendorsFile} = config.styles.src;
const stylesDest = config.styles.dist;

/**
 * Main styles gulp task
 */
export const styles = () => src(index)
    .pipe(gulpif(production && create, sourceMaps.init()))
    .pipe(sass(taskSass))
    .on("error", notify.onError((err) => {
      return {
        title: "Ошибка в стилях",
        message: err.message
      }
    }))
    .pipe(gulpif(production, gcmq(), autoprefixer(), shortHand()))
    .pipe(gulpif(production, clean(taskClean)))
    .pipe(gulpif(production && create, sourceMaps.write(mapDest)))
    .pipe(dest(stylesDest))
    .pipe(gulpif(!production, browserSync.stream()))

/**
 * Vendors gulp task
 */
export const styleVendors = () => src(vendors)
    .pipe(gulpif(production && create, sourceMaps.init()))
    .pipe(sass(taskSass))
    .on("error", notify.onError((err) => {
      return {
        title: "Ошибка в стилях",
        message: err.message
      }
    }))
    .pipe(gulpif(production, gcmq(), autoprefixer(), shortHand()))
    .pipe(gulpif(production, clean(taskClean)))
    .pipe(concat(vendorsFile))
    .pipe(gulpif(production && create, sourceMaps.write(mapDest)))
    .pipe(dest(stylesDest))
    .pipe(gulpif(!production, browserSync.stream()))
