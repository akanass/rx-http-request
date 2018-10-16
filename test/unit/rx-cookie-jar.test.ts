import { RxCookieJar, RxHR } from '../../src';
import { Observable } from 'rxjs';

const rxCJ = new RxCookieJar(RxHR.request.jar());

describe('- Unit rx-cookie-jar.test.ts file', () => {
    /**
     * Test new instance parameter
     */
    test('- new instance parameter must be a valid `CookieJar` object', () => {
        expect(() => new RxCookieJar(null)).toThrow(/^Parameter must be a valid `CookieJar` object$/);
    });

    /**
     * Test setCookie() method calls CookieJar.setCookie() method
     */
    test('- `setCookie` method must call `CookieJar.setCookie` method', () => {
        const spy = jest.spyOn(rxCJ.cookieJar, 'setCookie');
        spy.mockImplementationOnce((cookie, uri, options) => undefined);

        rxCJ.setCookie(null, null).subscribe();

        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });

    /**
     * Test setCookie() method returns an Observable
     */
    test('- `setCookie` method must return an `Observable`', () => {
        expect(rxCJ.setCookie(null, null)).toBeInstanceOf(Observable);
    });

    /**
     * Test getCookieString() method calls CookieJar.getCookieString() method
     */
    test('- `getCookieString` method must call `CookieJar.getCookieString` method', () => {
        const spy = jest.spyOn(rxCJ.cookieJar, 'getCookieString');
        spy.mockImplementationOnce(uri => undefined);

        rxCJ.getCookieString(null).subscribe();

        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });

    /**
     * Test getCookieString() method returns an Observable
     */
    test('- `getCookieString` method must return an `Observable`', () => {
        expect(rxCJ.getCookieString(null)).toBeInstanceOf(Observable);
    });

    /**
     * Test getCookies() method calls CookieJar.getCookies() method
     */
    test('- `getCookies` method must call `CookieJar.getCookies` method', () => {
        const spy = jest.spyOn(rxCJ.cookieJar, 'getCookies');
        spy.mockImplementationOnce(uri => undefined);

        rxCJ.getCookies(null).subscribe();

        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });

    /**
     * Test getCookies() method returns an Observable
     */
    test('- `getCookies` method must return an `Observable`', () => {
        expect(rxCJ.getCookies(null)).toBeInstanceOf(Observable);
    });
});
