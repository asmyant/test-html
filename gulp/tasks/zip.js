import pkg from "gulp";
import zip from "gulp-zip";
import {resolve} from 'path';
import date from "date-and-time";

import {config, dist} from "../config.js";

const {src, dest} = pkg;
const projectFolderName = (config.zip.title || resolve().slice(resolve().lastIndexOf('\\') + 1)) + '-' + date.format(new Date(), 'DD.MM.YYYY') + '.zip';

/**
 * Ziping
 */
export const ziped = (cb) => {
  if (config.zip.enable) {
    return src(dist + "**/*")
        .pipe(zip(projectFolderName))
        .pipe(dest("./"))
  }
  cb();
}
