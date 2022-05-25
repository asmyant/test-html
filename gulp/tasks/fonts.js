import pkg from "gulp";
import {config} from "../config.js";

const {src, dest} = pkg;
const {src: fontSrc, dist: fontDest} = config.fonts;

/**
 * Gulp task fonts
 * @returns {*}
 */
export const fonts = () => src(fontSrc).pipe(dest(fontDest));
