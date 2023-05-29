import sprite from 'gulp-svg-sprite';
import app from '../config/app.js';

const svgSprite = () =>
  app.src(app.path.img.icons)
    // Error handler
    .pipe(app.plumber({
      errorHandler: app.notify.onError(error => ({
        title: 'SVG',
        message: error.message,
      }))
    }))
    // SVG processing
    .pipe(sprite(app.svg))
    .pipe(app.dest(app.path.img.dest));

export default svgSprite;