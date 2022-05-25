import pkg from 'gulp';
import twig from 'gulp-twig';
import version from 'gulp-version-number';
import gulpif from 'gulp-if';
import {config, dist} from "../config.js";
import {browserSync} from "./server.js";
import {production} from "./env.js";

const {src, dest} = pkg;
const {pages, dist: twigDest, versionFiles} = config.html;

/**
 * Html - Twig gulp task
 * @returns {*}
 */
export const html = () => src(pages)
    .pipe(twig())
    .pipe(dest(twigDest))
    .pipe(gulpif(!production, browserSync.stream()));

/**
 * Set versions [images, js, css] html files gulp task
 * @returns {*}
 */
export const htmlVersion = () => src(dist + "*.html")
    .pipe(gulpif(versionFiles, version({
      append: {
        value: '%MDS%',
        key: 'v',
        to: ["css", "js", "image"]
      }
    }))).pipe(dest(dist))
