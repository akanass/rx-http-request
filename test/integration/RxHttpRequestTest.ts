import {suite, test} from 'mocha-typescript';
import * as unit from 'unit.js';
import {RxHR, RxHttpRequest, RxCookieJar, RxHttpRequestResponse} from '../../src';

@suite('- Integration RxHttpRequestTest file')
export class RxHttpRequestTest {
    // private property to store test uri
    private _uri: string;
    // private property to store fake test uri
    private _fakeUri: string;
    /*
     * private property to store uri, which always results
     * in HTTP error status code
     */
    private _errCodeUri: string;
    // private property to store real instance
    private _rxHR: RxHttpRequest;

    /**
     * Class constructor
     */
    constructor() {
        this._fakeUri = 'http://fake.uri';
        this._uri = 'https://www.google.fr';
        // make sure, that there will be no guy with such fancy username
        this._errCodeUri = `https://api.github.com/users/~=29zoiIa,._jffT-jalkjpo-${Math.random()}`
    }

    /**
     * Function executed before each test
     */
    before() {
        this._rxHR = RxHR;
    }

    /**
     * Function executed after each test
     */
    after() {
        this._rxHR = undefined;
    }

    /**
     * Test response error in observable
     */
    @test('- `Observable` rejects response if bad `method` parameter')
    testAPi(done) {
       this._rxHR.get(this._fakeUri).subscribe(null, err => unit.error(err).when(_ => done()));
    }

    /**
    * Test response error in case of error HTTP status code from the back-end
    */
    @test('- `Observable` should be rejected in case of HTTP status code >= 400')
    testHttpErrStatusCode(done) {
       this._rxHR['_call']('get', this._errCodeUri).subscribe(null, err => unit.error(err).when(_ => done()));
    }

    /**
     * Test response data in observable
     */
    @test('- `Observable` response must be type of `RxHttpRequestResponse`')
    testObservableResponse(done) {
        this._rxHR['_call']('get', this._uri).subscribe((data: RxHttpRequestResponse) => {
            unit.object(data)
                .hasOwnProperty('response')
                .hasOwnProperty('body')
                .when(_ =>  done());
        });
    }

    /**
     * Test jar() method returns an Observable with RxCookieJar data
     */
    @test('- `jar` method must return an `Observable` with `RxCookieJar` data')
    testJarMethodReturnObservableType(done) {
        this._rxHR.jar().subscribe(data => unit.object(data).isInstanceOf(RxCookieJar).when(_ => done()));
    }

    /**
     * Test cookie() method returns a RxCookieJar
     */
    @test('- `cookie` method must return an `Observable` with `Cookie` data')
    testCookieMethodReturnObservableType(done) {
        this._rxHR.cookie('key1=value1').subscribe((data) => unit.object(data).when(_ => done()));
    }

    /**
     * Test response data in observable
     */
    @test('- `getBuffer` method needs to have an `Observable` response must be type of `RxHttpRequestResponse`')
    testGetBufferObservableResponse(done) {
        unit.object(this._rxHR.getBuffer(this._uri).subscribe((data: RxHttpRequestResponse) => {
            unit.object(data)
                .hasOwnProperty('response')
                .hasOwnProperty('body')
                .when(_ => done());
        }));
    }

    /**
     * Test response error in observable
     */
    @test('- `getBuffer` method with `Observable` rejects response if bad `method` parameter')
    testGetBufferError(done) {
        this._rxHR.getBuffer(this._fakeUri).subscribe(null, err => unit.error(err).when(_ => done()));
    }

    /**
     * Test request error in observable
     */
    @test('- `getBuffer` method with `Observable` rejects if bad `method` parameter')
    testGetBufferErrorParams(done) {
        this._rxHR.getBuffer(null).subscribe(null, err => unit.error(err).when(_ => done()));
    }
}
