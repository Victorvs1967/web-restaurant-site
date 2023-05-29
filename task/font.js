import fs from 'fs';
import fonter from 'gulp-fonter-2';
import ttf2woff2 from 'gulp-ttf2woff2';
import ttf2woff from 'gulp-ttf2woff';

import app from '../config/app.js';

const font = () =>
app.src(app.path.font.src)
    // Error handler
    .pipe(app.plumber({
      errorHandler: app.notify.onError(error => ({
        title: "Font",
        message: error.message,
      })),
    }))
    // Fonts processing
    .pipe(app.newer(app.path.font.dest))
    .pipe(fonter(app.fonter))
    .pipe(ttf2woff({ clone: true }))
    .pipe(ttf2woff2({ clone: true }))
    .pipe(app.dest(app.path.font.dest));

export const fontsStyle = async () => {
  const cb = () => { };
  const fontsFile = app.path.src.concat('/sass/include/_fonts.sass');
  fs.readdir(app.path.font.dest, (err, fontsFiles) => {
    if (fontsFiles) {
      if (!fs.existsSync(fontsFile)) {
        fs.writeFile(fontsFile, '', cb);
        let newFileOnly;
        fontsFiles.forEach(fontFile => {
          const fontFileName = fontFile.split('.')[0];
          if (newFileOnly !== fontFileName) {
            const fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
            let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
            const fontStyle = fontWeight.toLowerCase().includes('italic') ? 'italic' : 'normal';
            fontWeight = fontWeight.toLowerCase().includes('italic') ? fontWeight.slice(0, -6) : fontWeight;
            switch (fontWeight.toLowerCase()) {
              case 'thin': fontWeight = 100; break;
              case 'extralight': fontWeight = 200; break;
              case 'light': fontWeight = 300; break;
              case 'medium': fontWeight = 500; break;
              case 'semibold': fontWeight = 600; break;
              case 'bold': fontWeight = 700; break;
              case 'extrabold': fontWeight = 800; break;
              case 'black': fontWeight = 900; break;
              default: fontWeight = 400;
            }
            const str =
              "@font-face\n\tfont-family: ".concat(fontName,
              "\n\tfont-display: swap\n\tsrc: url('../font/", fontFileName,
              ".woff2') format('woff2'), url('../font/", fontFileName,
              ".woff') format('woff')\n\tfont-weight: ", fontWeight,
              "\n\tfont-style: ", fontStyle,
              "\n\r\n"
            );
            fs.appendFile(fontsFile, str, cb);
            newFileOnly = fontFileName;
          }
        });
      } else {
        console.log('file sass/includes/_fonts.sass already exist...');
      }
    }
  });
  return app.dest(app.path.src);
};

export default font;