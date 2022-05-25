import pkg from "gulp";
import open from "gulp-open";
import browserSync from "browser-sync";
import {config, dist} from "../config.js";

const {src} = pkg;
const fileName = config.html.tasks.pagesList.fileName;

/**
 * Server
 */
const server = () => browserSync.init(config.server);

/**
 * Open page list in browser after build (or index.html)
 */
const openBuild = () => src(dist + (fileName || "index.html")).pipe(open())

/**
 * Export
 */
export {browserSync, server, openBuild};
