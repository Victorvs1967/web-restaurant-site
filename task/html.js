// HTML processing
import fileinclude from 'gulp-file-include';
import htmlmin from 'gulp-htmlmin';
import size from 'gulp-size';
import webpHtml from 'gulp-webp-html';
import replace from 'gulp-replace';

import app from '../config/app.js';

const html = () =>
  app.src(app.path.html.src)
    // Error handler
    .pipe(app.plumber({
      errorHandler: app.notify.onError(error => ({
        title: "HTML",
        message: error.message,
      })),
    }))
    // include - template processing
    .pipe(fileinclude())
    .pipe(replace(/@img\//g, './img/'))
    .pipe(htmlmin(app.htmlmin))
    // Files size
    .pipe(size({ title: "Before compressed" }))
    // Compressed html
    .pipe(webpHtml())
    // Files size
    .pipe(size({ title: "After compressed" }))
    .pipe(app.dest(app.path.html.dest));

export default html;
