// import libraries
import * as request from 'request';
import * as url from 'url';

import Cookie = request.Cookie;
import CookieJar = request.CookieJar;

import { Observable ,  of } from 'rxjs';

// native javascript's objects typings
declare const Object: any;

/**
 * Class definition
 */
export class RxCookieJar {
    // private property to store cookie jar object
    private _cookieJar: CookieJar;

    /**
     * Class constructor
     */
    constructor(cookieJar: CookieJar) {
        // check cookie parameter
        this._checkRequestParam(cookieJar);

        // set cookie jar object
        this._cookieJar = cookieJar;
    }

    /**
     * Returns private property _cookieJar
     *
     * @return {CookieJar}
     */
    get cookieJar(): CookieJar {
        return this._cookieJar;
    }

    /**
     * Function to set a new cookie jar
     *
     * @param cookie {Cookie}
     * @param uri {string | url.Url}
     * @param options {any}
     *
     * @return {Observable<void>}
     */
    setCookie(cookie: Cookie, uri: string | url.Url, options?: any): Observable<void> {
        return <Observable<void>> Observable.create((observer) => {
            this._cookieJar.setCookie(<Cookie> cookie, <string | url.Url> uri, <any> options);

            observer.next();
            observer.complete();
        });
    }

    /**
     * Function to get cookie string
     *
     * @param uri {string | url.Url}
     *
     * @return {Observable<string>}
     */
    getCookieString(uri: string | url.Url): Observable<string> {
        return <Observable<string>> of(this._cookieJar.getCookieString(<string | url.Url> uri));
    }

    /**
     * Funtion to get an array of cookies
     *
     * @param uri {string | url.Url}
     *
     * @return {Observable<Cookie[]>}
     */
    getCookies(uri: string | url.Url): Observable<Cookie[]> {
        return <Observable<Cookie[]>> of(this._cookieJar.getCookies(<string | url.Url> uri));
    }

    /**
     * Function to check existing function in object passed in parameter for a new instance
     *
     * @param cookieJar {CookieJar}
     *
     * @private
     */
    private _checkRequestParam(cookieJar: CookieJar) {
        // check existing function in object
        if (!cookieJar ||
            Object.prototype.toString.call(cookieJar.setCookie) !== '[object Function]' ||
            Object.prototype.toString.call(cookieJar.getCookieString) !== '[object Function]' ||
            Object.prototype.toString.call(cookieJar.getCookies) !== '[object Function]') {
            throw new TypeError('Parameter must be a valid `CookieJar` object');
        }
    }
}

/**
 * Export all initial elements
 */
export { CookieJar, Cookie, url };
