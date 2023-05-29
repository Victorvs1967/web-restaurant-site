import imagemin from 'gulp-imagemin';
import webp from 'gulp-webp';
import gulpif from 'gulp-if';

import app from '../config/app.js';

const image = () =>
  app.src([app.path.img.src, app.path.img.icons])
    // Error handler
    .pipe(app.plumber({
      errorHandler: app.notify.onError(error => ({
        title: "Image",
        message: error.message,
      })),
    }))
    // Images processing
    .pipe(app.newer(app.path.img.dest))
    .pipe(webp())
    .pipe(app.dest(app.path.img.dest))
    .pipe(app.src(app.path.img.src))
    .pipe(gulpif(app.isProd, imagemin(app.imagemin)))
    .pipe(app.dest(app.path.img.dest));

export default image;