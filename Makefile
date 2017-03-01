pretest:
	@node ./node_modules/.bin/tslint -p ./tsconfig.json --type-check "./src/**/*.ts" "./test/**/*.ts"
test:
	@node ./node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha ./test
test-on-travis:
	@node ./node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha ./test && cat ./coverage/lcov.info | ./node_modules/.bin/coveralls
tsc:
	@node ./node_modules/.bin/tsc -p ./tsconfig.build.json
clean:
	@node ./node_modules/.bin/rimraf ./dist
packaging:
	@node ./node_modules/.bin/ts-node ./tools/packaging.ts
browserify:
	@node ./node_modules/.bin/browserify --debug -e ./dist/index.js -s rhr | ./node_modules/.bin/exorcist ./dist/browser.js.map  > ./dist/browser.js

.PHONY: pretest test test-on-travis tsc clean packaging browserify