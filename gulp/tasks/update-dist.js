import pkg from "gulp";
import clean from "gulp-clean";
import {dist} from "../config.js";

const {src} = pkg;

/**
 * Update development folder
 */
export const updateDist = () => src(dist, {read: false, allowEmpty: true}).pipe(clean());

