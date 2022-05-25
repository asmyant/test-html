import pkg from "gulp";
import {config} from "../config.js";

const {src, dest} = pkg;
const {src: imageSrc, dist: imageDest} = config.images;

/**
 * Images gulp task
 */
export const images = () => src(imageSrc).pipe(dest(imageDest));
