import pkg from "gulp";

/**
 * Описание тасков
 */
import {styles, styleVendors} from "./gulp/tasks/styles.js";
import {server, openBuild} from "./gulp/tasks/server.js";
import {html, htmlVersion} from "./gulp/tasks/twig.js";
import {watcher} from "./gulp/tasks/watcher.js";
import {updateDist} from "./gulp/tasks/update-dist.js";
import {images} from "./gulp/tasks/images.js";
import {fonts} from "./gulp/tasks/fonts.js";
import {ziped} from "./gulp/tasks/zip.js";
import {createPagesList} from "./gulp/tasks/create-pages-list.js";
import {js, jsVendors} from "./gulp/tasks/javascript.js";
import {deploy} from "./gulp/tasks/ftp.js";

const {series, parallel, task} = pkg;

/**
 * Стартовый таск
 */
task("default", series(
    updateDist,
    parallel(styles, styleVendors, html, images, fonts, js, jsVendors),
    parallel(server, watcher),
));

/**
 * Таск для прода
 */
task("build", series(
    updateDist,
    parallel(styles, styleVendors, html, images, fonts, js, jsVendors),
    parallel(createPagesList, htmlVersion),
    parallel(ziped),
    openBuild,
    deploy
));
