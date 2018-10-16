import { RxCookieJar, RxHR, RxHttpRequestResponse } from '../../src/lib';
import { Cookie } from 'tough-cookie';

const fakeUri = 'http://fake.uri';
const uri = 'https://www.google.fr';

describe('- Integration rx-http-request.test.ts file', () => {
    /**
     * Test response error in observable
     */
    test('- `Observable` rejects response if bad `method` parameter', () => {
        RxHR.get(fakeUri).subscribe(undefined, err => expect(err.message).toBe('getaddrinfo ENOTFOUND fake.uri fake.uri:80'));
    });

    /**
     * Test response data in observable
     */
    test('- `Observable` response must be type of `RxHttpRequestResponse`', (done) => {
        RxHR['_call']('get', uri).subscribe((data: RxHttpRequestResponse) => {
            expect(data).toHaveProperty('response');
            expect(data).toHaveProperty('body');
            done();
        });
    });

    /**
     * Test jar() method returns an Observable with RxCookieJar data
     */
    test('- `jar` method must return an `Observable` with `RxCookieJar` data', (done) => {
        RxHR.jar().subscribe(data => {
            expect(data).toBeInstanceOf(RxCookieJar);
            done();
        });
    });

    /**
     * Test cookie() method returns a RxCookieJar
     */
    test('- `cookie` method must return an `Observable` with `Cookie` data', (done) => {
        RxHR.cookie('key1=value1').subscribe((data) => {
            expect(data).toBeInstanceOf(Cookie);
            expect(data.toString()).toBe('key1=value1');
            done();
        });
    });

    /**
     * Test response data in observable
     */
    test('- `getBuffer` method needs to have an `Observable` response must be type of `RxHttpRequestResponse`', (done) => {
        RxHR.getBuffer(uri).subscribe((data: RxHttpRequestResponse) => {
            expect(data).toHaveProperty('response');
            expect(data).toHaveProperty('body');
            done();
        });
    });

    /**
     * Test response error in observable
     */
    test('- `getBuffer` method with `Observable` rejects response if bad `method` parameter', () => {
        RxHR.getBuffer(fakeUri).subscribe(undefined, err => expect(err.message).toBe('getaddrinfo ENOTFOUND fake.uri fake.uri:80'));
    });

    /**
     * Test request error in observable
     */
    test('- `getBuffer` method with `Observable` rejects if bad `method` parameter', () => {
        RxHR.getBuffer(null)
            .subscribe(undefined, err => expect(err.message).toBe('Unhandled error. (Error: options.uri is a required argument)'));
    });
});
