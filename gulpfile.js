import gulp from 'gulp';
import browserSync from 'browser-sync';

import app from './config/app.js';
import pug from './task/pug.js';
import styles from './task/styles.js';
import scripts from './task/scripts.js';
import image from './task/image.js';
import svgSprite from './task/svgsprite.js';
import { libCss, libJs } from './task/libs.js';
import font, { fontsStyle } from './task/font.js';
import clear from './task/clear.js';

export { clear, styles, scripts, pug, font, image, svgSprite };

const { watch, series, parallel } = gulp;
const browsersync = browserSync.create();

const watcher = () => {
  watch(app.path.pug.watch, pug).on('all', browsersync.reload);
  watch(app.path.sass.watch, styles).on('all', browsersync.reload);
  watch(app.path.js.watch, scripts).on('all', browsersync.reload);
  watch(app.path.img.watch, image).on('all', browsersync.reload);
  watch(app.path.lib.watch, parallel(libCss, libJs)).on('all', browsersync.reload);
};

const server = () =>
  browsersync.init({
    server: {
      baseDir: app.path.root,
    }
  });

export const fonts = series(font, fontsStyle);

export const build = series(
  clear,
  parallel(fonts, svgSprite, image, libCss, libJs),
  parallel(styles, scripts, pug),
);

export const dev = series(
  build,
  parallel(watcher, server)
);

export default app.isProd ? build : dev;