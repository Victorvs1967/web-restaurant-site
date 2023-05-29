const src = './src',
      dest = './dist';

const path = {
  root: dest,
  src: src,
  html: {
    src: src.concat('/html/*.html'),
    watch: src.concat('/html/**/*.html'),
    dest: dest,
  },
  pug: {
    src: src.concat('/pug/*.pug'),
    watch: src.concat('/pug/**/*.pug'),
    dest: dest,
  },
  sass: {
    src: src.concat('/sass/*.sass'),
    watch: src.concat('/sass/**/*.sass'),
    dest: dest.concat('/css/'),
  },
  js: {
    src: src.concat('/scripts/*.js'),
    watch: src.concat('/scripts/**/*.js'),
    dest: dest.concat('/js/'),
  },
  img: {
    src: src.concat('/img/*.{png,jpg,jpeg,gif,svg}'),
    icons: src.concat('/icons/*.svg'),
    watch: src.concat('/img/**/*.{png,jpg,jpeg,gif,svg}'),
    dest: dest.concat('/img/'),
  },
  font: {
    src: src.concat('/font/**/*.{ttf,otf,eot,otc,woff,woff2,svg}'),
    watch: src.concat('/font/**/*.{ttf,otf,eot,otc,woff,woff2,svg}'),
    dest: dest.concat('/font/'),
  },
  lib: {
    srcCss: src.concat('/libs/css/*.css'),
    srcJs: src.concat('/libs/js/*.js'),
    watch: src.concat(['/libs/css/*.css', '/libs/js/*.js']),
    destCss: dest.concat('/css/'),
    destJs: dest.concat('/js/'),
  },
};

export default path;