'use strict';

// import libraries
const Gulp        = require('gulp');
const LoadPlugins = require('gulp-load-plugins');
const exec        = require('child_process').exec;

// define internals variable
const internals   = {};

// set internals variables
internals.$ = LoadPlugins({
    pattern: ['gulp-*', 'uglify-save-license', 'del']
});

/********************
 * GULP BUILD TASKS *
 ********************/
Gulp.task('test', (done) => {

    exec('npm test', (err, stdout, stderr) => {

        if (stdout) {
            console.log(stdout);
        }

        if (stderr) {
            console.error(stderr);
        }

        done(err);
    });
});

Gulp.task('transform', (done) => {

    let error;

    exec('npm test', (err, stdout, stderr) => {

        if (err) {
            error = err;
            return done(error);
        }

        if (stdout) {
            console.log(stdout);
        }

        if (stderr) {
            console.error(stderr);
        }
    })
        .on('exit', (code) => {

            if (code === 0) {
                Gulp.src(['./index.js', './lib/**/*.js'], { base: './' })
                    .pipe(internals.$.sourcemaps.init())
                    .pipe(internals.$.babel())
                    .pipe(internals.$.uglify({ preserveComments: internals.$.uglifySaveLicense }))
                    .pipe(internals.$.sourcemaps.write('.'))
                    .pipe(Gulp.dest('dist/'))
                    .pipe(internals.$.size({ title: 'dist/', showFiles: true }))
                    .on('end', () =>  done());
            }
            else {
                done(error);
            }
    });
});

Gulp.task('clean', () => {

    internals.$.del.sync(['dist/']);
});

Gulp.task('static-files', () => {

    const jsonFilter = internals.$.filter('**/*.json', { restore: true });

    Gulp.src(['./package.json', './README.md', './LICENSE.md'], { base: './' })
        .pipe(jsonFilter)
        .pipe(internals.$.jsonminify())
        .pipe(jsonFilter.restore)
        .pipe(Gulp.dest('dist/'))
        .pipe(internals.$.size({ title: 'dist/', showFiles: true }));
});

Gulp.task('build', ['clean', 'transform', 'static-files']);

/********************
 * GULP DEV TASKS *
 ********************/

Gulp.task('dev', ['test'], () => {

    Gulp.watch(['./index.js', './lib/**/*.js', './test/**/*.js'], () => Gulp.start('test'));
});