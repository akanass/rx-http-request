pretest:
	@node ./node_modules/.bin/tslint -p ./tsconfig.json "./src/**/*.ts" "./test/**/*.ts"
test:
	@node ./node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha "./test/**/*.ts"
coveralls:
	cat ./coverage/lcov.info | node ./node_modules/.bin/coveralls
commonjs:
	@node ./node_modules/.bin/tsc -p ./tsconfig.build.json
esm2015:
	@node ./node_modules/.bin/tsc -p ./tsconfig.build.esm2015.json
esm5:
	@node ./node_modules/.bin/tsc -p ./tsconfig.build.esm5.json
clean:
	@node ./node_modules/.bin/rimraf ./dist
packaging:
	@node ./node_modules/.bin/ts-node ./tools/packaging.ts
browserify:
	@node ./node_modules/.bin/ts-node ./tools/init-browser-dir.ts && ./node_modules/.bin/browserify --debug -e ./dist/esm5/index.js -s rhr | ./node_modules/.bin/exorcist ./dist/browser/index.js.map  > ./dist/browser/index.js

.PHONY: pretest test coveralls commonjs esm2015 esm5 clean packaging browserify