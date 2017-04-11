import { suite, test } from 'mocha-typescript';
import * as unit from 'unit.js';
import * as Rx from 'rxjs';
import * as request from 'request';
import Cookie = request.Cookie;
import { RxHR, RxHttpRequest, RxHttpRequestResponse } from '../../src';

// native javascript's objects typings
declare const TypeError: any;

@suite('- Unit RxHttpRequestTest file')
class RxHttpRequestTest {
    // private property to store test uri
    private _uri: string;
    // private property to store real instance
    private _rxHR: RxHttpRequest;
    // private property to store mock instance
    private _rxHRMockRequest: any;

    /**
     * Class constructor
     */
    constructor() {
        this._uri = 'http://www.google.fr';
    }

    /**
     * Function executed before each test
     */
    before() {
        this._rxHR = RxHR;
        this._rxHRMockRequest = unit.mock(this._rxHR.request);
    }

    /**
     * Function executed after each test
     */
    after() {
        this._rxHR = undefined;
        this._rxHRMockRequest = undefined;
    }

    /**
     * Test if instance() method returns the same instance
     */
    @test('- `instance` method must return same instance of `rx-http-request`')
    testInstance() {
        unit.object(RxHttpRequest.instance()).isIdenticalTo(this._rxHR);
    }

    /**
     * Test new instance parameter
     */
    @test('- new instance parameter must be a valid `request` module API')
    testInstanceParams() {
        unit.exception(_ => {
            unit.when('create new instance without `request` module API in parameter', () => new RxHttpRequest(null));
        })
            .isInstanceOf(TypeError)
            .hasMessage('Parameter must be a valid `request` module API');
    }

    /**
     * Test if defaults() method returns a wrapper around the normal API
     */
    @test('- `defaults` method must return a wrapper around the normal `rx-http-request` API')
    testDefaultsMethod() {
        unit.object(this._rxHR.defaults({})).isInstanceOf(RxHttpRequest);
    }

    /**
     * Test if _call() method calls request API
     */
    @test('- `_call` method must call `request` API method')
    testCallMethod() {
        // mock request API
        const method = 'get';
        this._rxHRMockRequest.expects(method).once().callsArg(2);

        unit.object(this._rxHR['_call'](method, this._uri).subscribe())
            .when(_ => {
                this._rxHRMockRequest.verify();
                this._rxHRMockRequest.restore();
            });
    }

    /**
     * Test response data in observable
     */
    @test('- `Observable` response must be type of `RxHttpRequestResponse`')
    testObservableResponse() {
        // mock request API
        const method = 'get';
        this._rxHRMockRequest.expects(method).once().callsArg(2);

        unit.object(this._rxHR['_call'](method, this._uri).subscribe((data: RxHttpRequestResponse) => {
            unit.object(data)
                .hasOwnProperty('response')
                .hasOwnProperty('body')
                .when(_ => this._rxHRMockRequest.restore());
        }));
    }

    /**
     * Test response error in observable
     */
    @test('- `Observable` rejects response if bad `method` parameter')
    testObservableError() {
        this._rxHR['_call']('unknown_method', this._uri).subscribe(null, err => unit.error(err));
    }

    /**
     * Test get() method returns an Observable
     */
    @test('- `get` method must return an `Observable`')
    testGetMethod() {
        // mock request API
        this._rxHRMockRequest.expects('get').once().callsArg(2);

        unit.object(this._rxHR.get(this._uri))
            .isInstanceOf(Rx.Observable)
            .when(_ => this._rxHRMockRequest.restore());
    }

    /**
     * Test post() method returns an Observable
     */
    @test('- `post` method must return an `Observable`')
    testPostMethod() {
        // mock request API
        this._rxHRMockRequest.expects('post').once().callsArg(2);

        unit.object(this._rxHR.post(this._uri))
            .isInstanceOf(Rx.Observable)
            .when(_ => this._rxHRMockRequest.restore());
    }

    /**
     * Test put() method returns an Observable
     */
    @test('- `put` method must return an `Observable`')
    testPutMethod() {
        // mock request API
        this._rxHRMockRequest.expects('put').once().callsArg(2);

        unit.object(this._rxHR.put(this._uri))
            .isInstanceOf(Rx.Observable)
            .when(_ => this._rxHRMockRequest.restore());
    }

    /**
     * Test patch() method returns an Observable
     */
    @test('- `patch` method must return an `Observable`')
    testPatchMethod() {
        // mock request API
        this._rxHRMockRequest.expects('patch').once().callsArg(2);

        unit.object(this._rxHR.patch(this._uri))
            .isInstanceOf(Rx.Observable)
            .when(_ => this._rxHRMockRequest.restore());
    }

    /**
     * Test delete() method returns an Observable
     */
    @test('- `delete` method must return an `Observable`')
    testDeleteMethod() {
        // mock request API
        this._rxHRMockRequest.expects('del').once().callsArg(2);

        unit.object(this._rxHR.delete(this._uri))
            .isInstanceOf(Rx.Observable)
            .when(_ => this._rxHRMockRequest.restore());
    }

    /**
     * Test head() method returns an Observable
     */
    @test('- `head` method must return an `Observable`')
    testHeadMethod() {
        // mock request API
        this._rxHRMockRequest.expects('head').once().callsArg(2);

        unit.object(this._rxHR.head(this._uri))
            .isInstanceOf(Rx.Observable)
            .when(_ => this._rxHRMockRequest.restore());
    }

    /**
     * Test jar() method returns an Observable
     */
    @test('- `jar` method must return an `Observable`')
    testJarMethod() {
        // mock request API
        this._rxHRMockRequest.expects('jar').once();

        unit.object(this._rxHR.jar())
            .isInstanceOf(Rx.Observable)
            .when(_ => this._rxHRMockRequest.restore());
    }

    /**
     * Test cookie() method returns an Observable
     */
    @test('- `cookie` method must return an `Observable`')
    testCookieMethod() {
        // mock request API
        this._rxHRMockRequest.expects('cookie').once();

        unit.object(this._rxHR.cookie(null))
            .isInstanceOf(Rx.Observable)
            .when(_ => this._rxHRMockRequest.restore());
    }
}
