import pkg from 'gulp';
import pug from 'gulp-pug';
import pugBeautify from 'gulp-pug-beautify';
import gulpif from 'gulp-if';
import version from 'gulp-version-number';
import {config, dist} from "../config.js";
import {browserSync} from "./server.js";
import {production} from "./env.js";

const {src, dest} = pkg;
const {pages, minify, tasks, dist: htmlDest, versionFiles} = config.html;

/**
 * Html - Twig gulp task
 */
export const html = () => src(pages)
    .pipe(pug({pretty: !minify}))
    .pipe(gulpif(!production, pugBeautify(tasks.beautify)))
    .pipe(dest(htmlDest))
    .pipe(gulpif(!production, browserSync.stream()));


export const htmlVersion = () => src(dist + "*.html")
    .pipe(gulpif(versionFiles, version({
      append: {
        value: '%MDS%',
        key: 'v',
        to: ["css", "js", "image"]
      }
    }))).pipe(dest(dist))
