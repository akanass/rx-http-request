'use strict';

// import libraries
const Gulp        = require('gulp');
const LoadPlugins = require('gulp-load-plugins');
const exec        = require('child_process').exec;

// define internals variable
const internals   = {};

// set internals variables
internals.$ = LoadPlugins({
    pattern: ['gulp-*', 'uglify-save-license', 'del', 'browserify', 'babelify', 'vinyl-source-stream', 'vinyl-buffer']
});

/********************
 * GULP BUILD TASKS *
 ********************/
Gulp.task('package', (done) => {

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
                Gulp.start('transform');
                Gulp.start('browserify');

                done();
            }
            else {
                done(error);
            }
    });
});

Gulp.task('transform', () => {

    Gulp.src(['./index.js', './lib/**/*.js'], { base: './' })
        .pipe(internals.$.sourcemaps.init())
        .pipe(internals.$.babel())
        .pipe(internals.$.uglify({ preserveComments: internals.$.uglifySaveLicense }))
        .pipe(internals.$.sourcemaps.write('.'))
        .pipe(Gulp.dest('dist/'))
        .pipe(internals.$.size({ title: 'dist/', showFiles: true }));
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

Gulp.task('browserify', () => {

    return internals.$.browserify({entries: './index.js', debug: true, standalone: 'rhr'})
        .transform(internals.$.babelify)
        .bundle()
        .pipe(internals.$.vinylSourceStream('browser.js'))
        .pipe(internals.$.vinylBuffer())
        .pipe(internals.$.sourcemaps.init({loadMaps: true}))
        .pipe(internals.$.uglify())
        .pipe(internals.$.sourcemaps.write('.'))
        .pipe(Gulp.dest('dist/'))
        .pipe(internals.$.size({ title: 'dist/', showFiles: true }));
});

Gulp.task('build', ['clean', 'package', 'static-files']);

/********************
 * GULP DEV TASKS *
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

Gulp.task('dev', ['test'], () => {

    Gulp.watch(['./index.js', './lib/**/*.js', './test/**/*.js'], () => Gulp.start('test'));
});