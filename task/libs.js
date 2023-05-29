import app from '../config/app.js';

export const libCss = () =>
  app.src(app.path.lib.srcCss)
    .pipe(app.dest(app.path.lib.destCss));

export const libJs = () =>
  app.src(app.path.lib.srcJs)
    .pipe(app.dest(app.path.lib.destJs));