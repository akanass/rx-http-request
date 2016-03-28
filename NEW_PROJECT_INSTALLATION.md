## Node Modules installation

When you create project for first time and you want to have latest version of `node_modules`, delete `dependencies` and `devDependencies` block in `package.json`.

After that, launch following commands.

### Dependencies

```sh
npm install --save request rx
```

### Development Dependencies

```sh
npm install --save-dev del gulp gulp-jshint gulp-jsonminify gulp-load-plugins gulp-size gulp-uglify jshint jshint-stylish require-dir uglify-save-license gulp-babel coveralls babel-preset-es2015 mocha unit.js istanbul@1.0.0-alpha.2 gulp-sourcemaps gulp-filter babelify browserify vinyl-buffer vinyl-source-stream
```

## Conclusion

These packages are the minimal required to execute the project.

You can install after that all needed packages in `dependencies` or `devDependencies` to perform your project.