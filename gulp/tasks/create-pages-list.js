import glob from "glob";
import * as fs from "fs";
import {basename} from "path";
import {config, dist} from "../config.js";

const file = dist + config.html.tasks.pagesList.fileName;
const create = config.html.tasks.pagesList.create;
const pages = config.html.pages;

/**
 * Page template
 */
const html = (list) => `<div style="font-family: 'Arial', sans-serif; font-size: 18px"><h1>Pages list</h1><ol>${list}</ol></div>`;

/**
 * Create ol list node task
 */
export const createPagesList = (cb) => {
  if (create) {
    return glob(pages, (err, data) => {
      let lis = "";

      data.forEach(file => {
        const content = fs.readFileSync(file);

        const title = String(content) !== "" ? String(content)
            .match(/{#-.*?-#}/g)[0]
            .replace('{#-', '')
            .replace('-#}', '')
            .trim() : basename(file).replace(".twig", "");

        lis += `<li><a href="${basename(file).replace(".twig", ".html")}">${title}</a></li>`;
      });

      fs.appendFileSync(file, html(lis))
    });
  }
  cb();
}
