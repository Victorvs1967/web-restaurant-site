import babel from 'gulp-babel';
import webpack from 'webpack-stream';
import replace from 'gulp-replace';

import app from '../config/app.js'

const scripts = () =>
  app.src(app.path.js.src, { sourcemaps: app.isDev })
    // Error handler
    .pipe(app.plumber({
      errorHandler: app.notify.onError(error => ({
        title: "JavaScript",
        message: error.message,
      })),
    }))
    // Script processing
    .pipe(babel())
    .pipe(replace(/@img\//g, '../img/'))
    .pipe(webpack(app.webpack))
    .pipe(app.dest(app.path.js.dest, { sourcemaps: app.isDev }));

export default scripts;