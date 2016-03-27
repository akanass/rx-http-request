pretest:
	@node ./node_modules/.bin/jshint .
test:
	@node ./node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha test
test-on-travis:
	@node ./node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha test && cat ./coverage/lcov.info | ./node_modules/.bin/coveralls

.PHONY: pretest test test-on-travis