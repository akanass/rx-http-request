'use strict';

// import libraries
const Gulp = require('gulp');

// require all gulp scripts
require('require-dir')('./gulp');

// define default task
Gulp.task('default', ['dev']);
