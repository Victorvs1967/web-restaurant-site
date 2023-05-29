import pugs from 'gulp-pug';
import webpHtml from 'gulp-webp-html';
import gulpif from 'gulp-if';
import replace from 'gulp-replace';

import app from '../config/app.js';

const pug = () =>
  app.src(app.path.pug.src)
    // Error handler
    .pipe(app.plumber({
      errorHandler: app.notify.onError(error => ({
        title: "PUG",
        message: error.message,
      })),
    }))
    // PUG processing
    .pipe(pugs(app.pug))
    .pipe(replace(/@img\//g, './img/'))
    .pipe(gulpif(app.isProd, webpHtml()))
    .pipe(app.dest(app.path.pug.dest));

export default pug;