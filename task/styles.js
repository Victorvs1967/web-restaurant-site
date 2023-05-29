import autoprefixer from 'gulp-autoprefixer';
import rename from 'gulp-rename';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import webpCss from 'gulp-webp-css';
import replace from 'gulp-replace';

import app from '../config/app.js';

const sass = gulpSass(dartSass);

const styles = () =>
  app.src(app.path.sass.src, { sourcemaps: app.isDev })
    // Error handler
    .pipe(app.plumber({
      errorHandler: app.notify.onError(error => ({
        title: "SASS",
        message: error.message,
      })),
    }))
    // Sass processing
    .pipe(sass(app.sass))
    .pipe(webpCss())
    .pipe(autoprefixer())
    .pipe(rename(app.rename))
    .pipe(replace(/@img\//g, '../img/'))
    .pipe(app.dest(app.path.sass.dest, { sourcemaps: app.isDev }));

export default styles;