import fs from 'fs';

import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import newer from 'gulp-newer';
import path from '../config/path.js';

const { src, dest } = gulp;
const isProd = process.argv.includes('--production');
const isDev = !isProd;

const app = {
  src: src,
  dest: dest,
  path: path,
  plumber: plumber,
  notify: notify,
  newer: newer,
  isProd: isProd,
  isDev: isDev,
  htmlmin: {
    collapseWhitespace: isProd
  },
  pug: {
    doctype: 'html',
    pretty: isDev,
    basedir: 'src/pug',
    data: { },
  },
  sass: {
    outputStyle: isProd ? 'compressed' : 'expanded',
  },
  rename: {
    basename: 'main',
    suffix: '.min',
  },
  webpack: {
    mode: isProd ? "production" : "development",
    output: {
      filename: 'main.min.js'
    }
  },
  imagemin: {
    verbose: true
  },
  fonter:{
    formats: ["ttf"],
  },
  svg: {
    mode: {
      stack: {
        sprite: '../icons/icons.svg',
        example: true,
      },
    },
    shape: {
      transform: [ 'svgo' ],
    },
  },
};

export default app;