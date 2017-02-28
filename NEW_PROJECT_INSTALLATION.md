## Node Modules installation

When you create project for first time and you want to have latest version of `node_modules`, delete `dependencies` and `devDependencies` block in `package.json`.

After that, launch following commands.

### Dependencies

```sh
$ npm install --save request rxjs
```

or

```sh
$ yarn cache clean
$ yarn add request rxjs
```

### Development Dependencies

```sh
npm install --save-dev @types/fs-extra @types/node @types/request browserify coveralls exorcist fs-extra istanbul@next mocha mocha-typescript rimraf ts-node tslint typescript unit.js
```

or

```sh
$ yarn cache clean
$ yarn add @types/fs-extra @types/node @types/request browserify coveralls exorcist fs-extra istanbul@1.1.0-alpha.1 mocha mocha-typescript rimraf ts-node tslint typescript unit.js --dev
```

## Conclusion

These packages are the minimal required to execute the project.

You can install after that all needed packages in `dependencies` or `devDependencies` to perform your project.