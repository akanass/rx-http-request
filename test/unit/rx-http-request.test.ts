import { RxHR, RxHttpRequest } from '../../src';
import { Observable } from 'rxjs';

const uri = 'http://www.google.fr';

describe('- Unit rx-http-request.test.ts file', () => {
    /**
     * Test if instance() method returns the same instance
     */
    test('- `instance` method must return same instance of `rx-http-request`', () => {
        expect(RxHttpRequest.instance()).toMatchObject(RxHR);
    });

    /**
     * Test new instance parameter
     */
    test('- new instance parameter must be a valid `request` module API', () => {
        expect(() => new RxHttpRequest(null)).toThrow(/^Parameter must be a valid `request` module API$/);
    });

    /**
     * Test if defaults() method returns a wrapper around the normal API
     */
    test('- `defaults` method must return a wrapper around the normal `rx-http-request` API', () => {
        expect(RxHR.defaults({})).toBeInstanceOf(RxHttpRequest);
    });

    /**
     * Test if _call() method calls request API
     */
    test('- `_call` method must call `request` API method and returns error if no response found', () => {
        const spy = jest.spyOn(RxHR.request, 'get');
        spy.mockImplementationOnce((uri, opts, cb) => cb());

        RxHR['_call']('get', uri).subscribe(undefined, e => {
            expect(e.message).toBe('No response found');
            expect(spy).toHaveBeenCalled();
            spy.mockRestore();
        });
    });

    /**
     * Test response error in observable
     */
    test('- `Observable` rejects response if bad `method` parameter', () => {
        RxHR['_call']('unknown_method', uri)
            .subscribe(undefined, e => expect(e.message).toBe('Cannot read property \'apply\' of undefined'));
    });

    /**
     * Test get() method returns an Observable
     */
    test('- `get` method must return an `Observable`', () => {
        expect(RxHR.get(uri)).toBeInstanceOf(Observable);
    });

    /**
     * Test getBuffer() method returns an Observable
     */
    test('- `getBuffer` method must return an `Observable`', () => {
        expect(RxHR.getBuffer(uri)).toBeInstanceOf(Observable);
    });

    /**
     * Test post() method returns an Observable
     */
    test('- `post` method must return an `Observable`', () => {
        expect(RxHR.post(uri)).toBeInstanceOf(Observable);
    });

    /**
     * Test put() method returns an Observable
     */
    test('- `put` method must return an `Observable`', () => {
        expect(RxHR.put(uri)).toBeInstanceOf(Observable);
    });

    /**
     * Test patch() method returns an Observable
     */
    test('- `patch` method must return an `Observable`', () => {
        expect(RxHR.patch(uri)).toBeInstanceOf(Observable);
    });

    /**
     * Test delete() method returns an Observable
     */
    test('- `delete` method must return an `Observable`', () => {
        expect(RxHR.delete(uri)).toBeInstanceOf(Observable);
    });

    /**
     * Test head() method returns an Observable
     */
    test('- `head` method must return an `Observable`', () => {
        expect(RxHR.head(uri)).toBeInstanceOf(Observable);
    });

    /**
     * Test jar() method returns an Observable
     */
    test('- `jar` method must return an `Observable`', () => {
        expect(RxHR.jar()).toBeInstanceOf(Observable);
    });

    /**
     * Test cookie() method returns an Observable
     */
    test('- `cookie` method must return an `Observable`', () => {
        expect(RxHR.cookie('test')).toBeInstanceOf(Observable);
    });
});
