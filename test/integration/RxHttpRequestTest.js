'use strict';

// import libraries
import {RxHttpRequest} from '../..';
import * as test from 'unit.js';

// define internals object for private methods and attributes
const internals = {};

// add constants
Object.assign(internals, {
    _constants: {
        fakeUri: 'http://fake.uri'
    }
});

// describe test file
describe('- Integration RxHttpRequestTest file', () => {

    // init before each tests
    beforeEach(() => Object.assign(internals, {_RxHttpRequest: RxHttpRequest}));

    // delete after each tests
    afterEach(() => delete internals._RxHttpRequest);

    // test RxHttpRequest API
    describe('- test `rx-http-request` API', () => {

        // test RxHttpRequest API get method
        describe('- test `_call` method', () => {

            it('- `Observable` rejects response if bad `uri` parameter', () => {

                internals._RxHttpRequest._call('get', internals._constants.fakeUri).subscribe(
                    null,
                    (err) => {

                        test.error(err);
                    }
                );
            });
        });
    });
});