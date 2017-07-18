## Node Modules installation

When you create project for first time and you want to have latest version of `node_modules`, delete `dependencies` and `devDependencies` block in `package.json`.

After that, launch following commands.

### Dependencies

```sh
$ npm install --save request @types/node @types/request
```

or

```sh
$ yarn cache clean
$ yarn add request @types/node @types/request
```

### Development Dependencies

```sh
npm install --save-dev @types/fs-extra browserify coveralls exorcist fs-extra istanbul@next mocha mocha-typescript rxjs rimraf ts-node tslint typescript unit.js
```

or

```sh
$ yarn cache clean
$ yarn add @types/fs-extra browserify coveralls exorcist fs-extra istanbul@1.1.0-alpha.1 mocha mocha-typescript rxjs rimraf ts-node tslint typescript unit.js --dev
```

## Conclusion

These packages are the minimal required to execute the project.

You can install after that all needed packages in `dependencies` or `devDependencies` to perform your project.