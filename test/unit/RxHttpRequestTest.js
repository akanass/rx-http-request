'use strict';

// import libraries
import {RxHttpRequest} from '../..';
import {RxHttpRequestClass} from '../../lib';
import * as test from 'unit.js';
import * as Rx from 'rx';

// define internals object for private methods and attributes
const internals = {};

// add constants
Object.assign(internals, {
    _constants: {
        uri: 'http://www.google.fr'
    }
});

// describe test file
describe('- Unit RxHttpRequestTest file', () => {

    // init before each tests
    beforeEach(() => Object.assign(internals, {_RxHttpRequest: RxHttpRequest, _RxHttpRequestMockRequest: test.mock(RxHttpRequest.request)}));

    // delete after each tests
    afterEach(() => {

        delete internals._RxHttpRequest;
        delete internals._RxHttpRequestMockRequest;
    });

    // test RxHttpRequest module
    describe('- test `rx-http-request` module', () => {
        
        it('- `getInstance` method must return same instance of `rx-http-request`', () => {

            test.object(RxHttpRequestClass.getInstance()).isIdenticalTo(internals._RxHttpRequest);
        });

        it('- `defaults` method must return a wrapper around the normal `rx-http-request` API', () => {

            test.object(internals._RxHttpRequest.defaults()).isInstanceOf(RxHttpRequestClass);
        });

        it('- new instance parameter must be a valid `request` module API', () => {

            test.exception(() => {

                test.when('create new instance without `request` module API in parameter', () => new RxHttpRequestClass());
            })
                .isInstanceOf(TypeError)
                .hasMessage('Parameter must be a valid `request` module API');
        });
    });

    // test RxHttpRequest API
    describe('- test `rx-http-request` API', () => {

        // test RxHttpRequest API _call method
        describe('- test `_call` method', () => {

            it('- `_call` method must call `request` API method', () => {

                // mock request API
                const method = 'get';
                internals._RxHttpRequestMockRequest.expects(method).once().callsArg(2);

                test.object(internals._RxHttpRequest._call(method, internals._constants.uri).subscribeOnNext())
                    .when(() => {

                        internals._RxHttpRequestMockRequest.verify();
                        internals._RxHttpRequestMockRequest.restore();
                    });
            });

            it('- `Observable` response must resolve good data', () => {

                // mock request API
                const method = 'get';
                internals._RxHttpRequestMockRequest.expects(method).once().callsArg(2);

                internals._RxHttpRequest._call(method, internals._constants.uri).subscribeOnNext(
                    (data) => {

                        test.object(data)
                            .hasOwnProperty('response')
                            .hasOwnProperty('body')
                            .when(() => {

                                internals._RxHttpRequestMockRequest.restore();
                            });
                    }
                );
            });

            it('- `Observable` rejects response if bad `method` parameter', () => {

                internals._RxHttpRequest._call().subscribeOnError(
                    (err) => {

                        test.error(err);
                    }
                );
            });
        });

        // test RxHttpRequest API get method
        describe('- test `get` method', () => {

            it('- `get` method must return an `Observable`', () => {

                // mock request API
                internals._RxHttpRequestMockRequest.expects('get').once().callsArg(2);

                test.object(internals._RxHttpRequest.get(internals._constants.uri))
                    .isInstanceOf(Rx.Observable)
                    .when(() => {

                        internals._RxHttpRequestMockRequest.restore();
                    });
            });
        });

        // test RxHttpRequest API post method
        describe('- test `post` method', () => {

            it('- `post` method must return an `Observable`', () => {

                // mock request API
                internals._RxHttpRequestMockRequest.expects('post').once().callsArg(2);

                test.object(internals._RxHttpRequest.post(internals._constants.uri))
                    .isInstanceOf(Rx.Observable)
                    .when(() => {

                        internals._RxHttpRequestMockRequest.restore();
                    });
            });
        });
        
        // test RxHttpRequest API put method
        describe('- test `put` method', () => {

            it('- `put` method must return an `Observable`', () => {

                // mock request API
                internals._RxHttpRequestMockRequest.expects('put').once().callsArg(2);

                test.object(internals._RxHttpRequest.put(internals._constants.uri))
                    .isInstanceOf(Rx.Observable)
                    .when(() => {

                        internals._RxHttpRequestMockRequest.restore();
                    });
            });
        });

        // test RxHttpRequest API patch method
        describe('- test `patch` method', () => {

            it('- `patch` method must return an `Observable`', () => {

                // mock request API
                internals._RxHttpRequestMockRequest.expects('patch').once().callsArg(2);

                test.object(internals._RxHttpRequest.patch(internals._constants.uri))
                    .isInstanceOf(Rx.Observable)
                    .when(() => {

                        internals._RxHttpRequestMockRequest.restore();
                    });
            });
        });

        // test RxHttpRequest API delete method
        describe('- test `delete` method', () => {

            it('- `delete` method must return an `Observable`', () => {

                // mock request API
                internals._RxHttpRequestMockRequest.expects('del').once().callsArg(2);

                test.object(internals._RxHttpRequest.delete(internals._constants.uri))
                    .isInstanceOf(Rx.Observable)
                    .when(() => {

                        internals._RxHttpRequestMockRequest.restore();
                    });
            });
        });

        // test RxHttpRequest API head method
        describe('- test `head` method', () => {

            it('- `head` method must return an `Observable`', () => {

                // mock request API
                internals._RxHttpRequestMockRequest.expects('head').once().callsArg(2);

                test.object(internals._RxHttpRequest.head(internals._constants.uri))
                    .isInstanceOf(Rx.Observable)
                    .when(() => {

                        internals._RxHttpRequestMockRequest.restore();
                    });
            });
        });
    });
});