import { suite, test } from 'mocha-typescript';
import * as unit from 'unit.js';
import * as Rx from 'rxjs';
import { RxHR, RxCookieJar } from '../../src';

// native javascript's objects typings
declare const TypeError: any;

@suite('- Unit RxCookieJarTest file')
class RxCookieJarTest {
    // private property to store real instance
    private _rxCJ: RxCookieJar;
    // private property to store mock instance
    private _rxCJMockCookieJar: any;

    /**
     * Function executed before each test
     */
    before() {
        this._rxCJ = new RxCookieJar(RxHR.request.jar());
        this._rxCJMockCookieJar = unit.mock(this._rxCJ.cookieJar);
    }

    /**
     * Function executed after each test
     */
    after() {
        this._rxCJ = undefined;
        this._rxCJMockCookieJar = undefined;
    }

    /**
     * Test new instance parameter
     */
    @test('- new instance parameter must be a valid `CookieJar` object')
    testInstanceParams() {
        unit.exception(_ => {
            unit.when('create new instance without `CookieJar` object in parameter', () => new RxCookieJar(null));
        })
            .isInstanceOf(TypeError)
            .hasMessage('Parameter must be a valid `CookieJar` object');
    }

    /**
     * Test setCookie() method calls CookieJar.setCookie() method
     */
    @test('- `setCookie` method must call `CookieJar.setCookie` method')
    testSetCookieMethod() {
        // mock CookieJar API
        this._rxCJMockCookieJar.expects('setCookie').once();

        unit.object(this._rxCJ.setCookie(null, null).subscribe())
            .when(_ => {
                this._rxCJMockCookieJar.verify();
                this._rxCJMockCookieJar.restore();
            });
    }

    /**
     * Test setCookie() method returns an Observable
     */
    @test('- `setCookie` method must return an `Observable`')
    testSetCookieMethodReturnType() {
        // mock CookieJar API
        this._rxCJMockCookieJar.expects('setCookie').once();

        unit.object(this._rxCJ.setCookie(null, null))
            .isInstanceOf(Rx.Observable)
            .when(_ => this._rxCJMockCookieJar.restore());
    }

    /**
     * Test getCookieString() method calls CookieJar.getCookieString() method
     */
    @test('- `getCookieString` method must call `CookieJar.getCookieString` method')
    testGetCookieStringMethod() {
        // mock CookieJar API
        this._rxCJMockCookieJar.expects('getCookieString').once();

        unit.object(this._rxCJ.getCookieString(null).subscribe())
            .when(_ => {
                this._rxCJMockCookieJar.verify();
                this._rxCJMockCookieJar.restore();
            });
    }

    /**
     * Test getCookieString() method returns an Observable
     */
    @test('- `getCookieString` method must return an `Observable`')
    testGetCookieStringMethodReturnType() {
        // mock CookieJar API
        this._rxCJMockCookieJar.expects('getCookieString').once();

        unit.object(this._rxCJ.getCookieString(null))
            .isInstanceOf(Rx.Observable)
            .when(_ => this._rxCJMockCookieJar.restore());
    }

    /**
     * Test getCookies() method calls CookieJar.getCookies() method
     */
    @test('- `getCookieString` method must call `CookieJar.getCookieString` method')
    testGetCookiesMethod() {
        // mock CookieJar API
        this._rxCJMockCookieJar.expects('getCookies').once();

        unit.object(this._rxCJ.getCookies(null).subscribe())
            .when(_ => {
                this._rxCJMockCookieJar.verify();
                this._rxCJMockCookieJar.restore();
            });
    }

    /**
     * Test getCookieString() method returns an Observable
     */
    @test('- `getCookies` method must return an `Observable`')
    testGetCookiesMethodReturnType() {
        // mock CookieJar API
        this._rxCJMockCookieJar.expects('getCookies').once();

        unit.object(this._rxCJ.getCookies(null))
            .isInstanceOf(Rx.Observable)
            .when(_ => this._rxCJMockCookieJar.restore());
    }

}
