import pkg from "gulp";
import {config} from "../config.js";
import {production} from "./env.js";
import {styles, styleVendors} from "./styles.js";
import {html} from "./twig.js";
import {images} from "./images.js";
import {fonts} from "./fonts.js";
import {js, jsVendors} from "./javascript.js";

const {watch} = pkg;

/**
 * Gulp watchers
 */
export const watcher = (cb) => {
   if (!production) {
      watch([
         config.styles.watch.index,
         "!" + config.styles.watch.vendors,
      ], styles);
      watch(config.styles.watch.vendors, styleVendors);
      watch(config.html.watch, html);
      watch(config.images.watch, images);
      watch(config.fonts.watch, fonts);
      watch([config.scripts.watch.index, "!" + config.scripts.watch.vendors], js);
      watch(config.scripts.watch.vendors, jsVendors);
   }
   cb();
}
