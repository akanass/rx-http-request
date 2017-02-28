import {suite, test} from 'mocha-typescript';
import * as unit from 'unit.js';
import {RxHR, RxHttpRequest, RxCookieJar} from '../../src';

@suite('- Integration RxHttpRequestTest file')
class RxHttpRequestTest {
    // private property to store test uri
    private _fakeUri: string;
    // private property to store real instance
    private _rxHR: RxHttpRequest;

    /**
     * Class constructor
     */
    constructor() {
        this._fakeUri = 'http://fake.uri';
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
    testAPi() {
       this._rxHR.get(this._fakeUri).subscribe(null, err => unit.error(err));
    }

    /**
     * Test jar() method returns an Observable with RxCookieJar data
     */
    @test('- `jar` method must return an `Observable` with `RxCookieJar` data')
    testJarMethodReturnObservableType() {
        unit.object(this._rxHR.jar().subscribe(data => unit.object(data).isInstanceOf(RxCookieJar)));
    }

    /**
     * Test cookie() method returns a RxCookieJar
     */
    @test('- `cookie` method must return an `Observable` with `Cookie` data')
    testCookieMethodReturnObservableType() {
        unit.object(this._rxHR.cookie('key1=value1').subscribe((data) => {
            unit.object(data);
        }));
    }
}
