// import libraries
import * as request from 'request';
import { Buffer } from 'buffer';

import RequestAPI = request.RequestAPI;
import Request = request.Request;
import CoreOptions = request.CoreOptions;
import RequiredUriUrl = request.RequiredUriUrl;
import RequestResponse = request.RequestResponse;
import RequestCallback = request.RequestCallback;

import { Observable ,  of , merge,  throwError } from 'rxjs';
import { filter, tap, flatMap, map } from 'rxjs/operators';


import { RxCookieJar, Cookie } from './rx-cookie-jar';

// native javascript's objects typings
declare const Object: any;

/**
 * Class definition
 */
export class RxHttpRequest {
    // private property to store singleton instance
    private static _instance: RxHttpRequest;
    // private property to store request API object
    private readonly _request: RequestAPI<Request, CoreOptions, RequiredUriUrl>;

    /**
     * Returns singleton instance
     *
     * @return {RxHttpRequest}
     */
    static instance(): RxHttpRequest {
        if (!(RxHttpRequest._instance instanceof RxHttpRequest)) {
            RxHttpRequest._instance = new RxHttpRequest(request);
        }

        return RxHttpRequest._instance;
    }

    /**
     * Class constructor
     */
    constructor(req: RequestAPI<Request, CoreOptions, RequiredUriUrl>) {
        // check request parameter
        this._checkRequestParam(req);

        // set request object
        this._request = req;
    }

    /**
     * Returns private attribute _request
     *
     * @return {RequestAPI<Request, CoreOptions, RequiredUriUrl>}
     */
    get request(): RequestAPI<Request, CoreOptions, RequiredUriUrl> {
        return this._request;
    }

    /**
     * This method returns a wrapper around the normal rx-http-request API that defaults to whatever options
     * you pass to it.
     * It does not modify the global rx-http-request API; instead, it returns a wrapper that has your default settings
     * applied to it.
     * You can _call .defaults() on the wrapper that is returned from rx-http-request.defaults to add/override defaults
     * that were previously defaulted.
     *
     * @param options
     *
     * @return {RxHttpRequest}
     */
    defaults(options: CoreOptions): RxHttpRequest {
        return new RxHttpRequest(this._request.defaults(options));
    }

    /**
     * Function to do a GET HTTP request
     *
     * @param uri {string}
     * @param options {CoreOptions}
     *
     * @return {Observable<RxHttpRequestResponse<R>>}
     */
    get<R = any>(uri: string, options?: CoreOptions): Observable<RxHttpRequestResponse<R>> {
        return <Observable<RxHttpRequestResponse<R>>> this._call<R>('get', <string> uri,
            <CoreOptions> Object.assign({}, options || {}));
    }

    /**
     * Function to do a GET HTTP request and to return a buffer
     *
     * @param uri
     * @param options
     *
     * @return {Observable<RxHttpRequestResponse<R>>}
     */
    getBuffer<R = Buffer>(uri: string, options?: CoreOptions): Observable<RxHttpRequestResponse<R>> {
        return <Observable<RxHttpRequestResponse<R>>> Observable.create((observer) => {
            try {
                this._request.get(<string> uri, <CoreOptions> Object.assign({}, options || {}))
                    .on('response', (response: RequestResponse) => {
                        let res: Buffer;
                        response.on('data', (data: Buffer) => res = res ? Buffer.concat([].concat(res, data)) : data);
                        response.on('end', _ => {
                            observer.next(<RxHttpRequestResponse<Buffer>> Object.assign({}, {
                                response: <RequestResponse> response,
                                body: <Buffer> res
                            }));
                            observer.complete();
                        });
                    })
                    .on('error', /* istanbul ignore next */ error => observer.error(error));
            } catch (error) {
                observer.error(error);
            }
        });
    }

    /**
     * Function to do a POST HTTP request
     *
     * @param uri {string}
     * @param options {CoreOptions}
     *
     * @return {Observable<RxHttpRequestResponse<R>>}
     */
    post<R = any>(uri: string, options?: CoreOptions): Observable<RxHttpRequestResponse<R>> {
        return <Observable<RxHttpRequestResponse<R>>> this._call<R>('post', <string> uri,
            <CoreOptions> Object.assign({}, options || {}));
    }

    /**
     * Function to do a PUT HTTP request
     *
     * @param uri {string}
     * @param options {CoreOptions}
     *
     * @return {Observable<RxHttpRequestResponse<R>>}
     */
    put<R = any>(uri: string, options?: CoreOptions): Observable<RxHttpRequestResponse<R>> {
        return <Observable<RxHttpRequestResponse<R>>> this._call<R>('put', <string> uri,
            <CoreOptions> Object.assign({}, options || {}));
    }

    /**
     * Function to do a PATCH HTTP request
     *
     * @param uri {string}
     * @param options {CoreOptions}
     *
     * @return {Observable<RxHttpRequestResponse<R>>}
     */
    patch<R = any>(uri: string, options?: CoreOptions): Observable<RxHttpRequestResponse<R>> {
        return <Observable<RxHttpRequestResponse<R>>> this._call<R>('patch', <string> uri,
            <CoreOptions> Object.assign({}, options || {}));
    }

    /**
     * Function to do a DELETE HTTP request
     *
     * @param uri {string}
     * @param options {CoreOptions}
     *
     * @return {Observable<RxHttpRequestResponse<R>>}
     */
    delete<R = any>(uri: string, options?: CoreOptions): Observable<RxHttpRequestResponse<R>> {
        return <Observable<RxHttpRequestResponse<R>>> this._call<R>('del', <string> uri,
            <CoreOptions> Object.assign({}, options || {}));
    }

    /**
     * Function to do a HEAD HTTP request
     *
     * @param uri {string}
     * @param options {CoreOptions}
     *
     * @return {Observable<RxHttpRequestResponse<R>>}
     */
    head<R = any>(uri: string, options?: CoreOptions): Observable<RxHttpRequestResponse<R>> {
        return <Observable<RxHttpRequestResponse<R>>> this._call<R>('head', <string> uri,
            <CoreOptions> Object.assign({}, options || {}));
    }

    /**
     * Function that creates a new rx cookie jar
     *
     * @return {Observable<RxCookieJar>}
     */
    jar(): Observable<RxCookieJar> {
        return <Observable<RxCookieJar>> of(new RxCookieJar(this._request.jar()));
    }

    /**
     * Function that creates a new cookie
     *
     * @param str {string}
     *
     * @return {Observable<Cookie>}
     */
    cookie(str: string): Observable<Cookie> {
        return <Observable<Cookie>> of(this._request.cookie(<string> str));
    }

    /**
     * Function to do a HTTP request for given method
     *
     * @param method {string}
     * @param uri {string}
     * @param options {CoreOptions}
     *
     * @return {Observable<RxHttpRequestResponse<R>>}
     *
     * @private
     */
    private _call<R = any>(method: string, uri: string, options?: CoreOptions): Observable<RxHttpRequestResponse<R>> {
        return <Observable<RxHttpRequestResponse<R>>> Observable.create((observer) => {
            of([].concat(<string> uri, <CoreOptions> Object.assign({}, options || {}),
                <RequestCallback> ((error: any, response: RequestResponse, body: R) => {
                    of(of(error))
                        .pipe(
                            flatMap(obsError =>
                                merge(
                                    obsError
                                        .pipe(
                                            filter(_ => !!_),
                                            tap(err => observer.error(err))
                                        ),
                                    obsError
                                        .pipe(
                                            filter(_ => !_),
                                            flatMap(_ =>
                                                !!response ?
                                                    <Observable<RequestResponse>> of(response) :
                                                    throwError(new Error('No response found'))
                                            ),
                                            flatMap(_ =>
                                                of({
                                                    response: <RequestResponse> _,
                                                    body: <R> body
                                                })
                                            ),
                                            tap(_ => observer.next(_)),
                                            tap(_ => observer.complete())
                                        )
                                )
                            )
                        )
                        .subscribe(undefined, err => observer.error(err));
                })))
                .pipe(
                    map(_ => this._request[<string> method].apply(<RequestAPI<Request, CoreOptions, RequiredUriUrl>> this._request, _)),
                )
                .subscribe(undefined, err => observer.error(err));
        });
    }

    /**
     * Function to check existing function in request API passed in parameter for a new instance
     *
     * @param req {RequestAPI<Request, CoreOptions, RequiredUriUrl>}
     *
     * @private
     */
    private _checkRequestParam(req: RequestAPI<Request, CoreOptions, RequiredUriUrl>) {
        // check existing function in API
        if (!req ||
            Object.prototype.toString.call(req.get) !== '[object Function]' ||
            Object.prototype.toString.call(req.head) !== '[object Function]' ||
            Object.prototype.toString.call(req.post) !== '[object Function]' ||
            Object.prototype.toString.call(req.put) !== '[object Function]' ||
            Object.prototype.toString.call(req.patch) !== '[object Function]' ||
            Object.prototype.toString.call(req.del) !== '[object Function]' ||
            Object.prototype.toString.call(req.defaults) !== '[object Function]' ||
            Object.prototype.toString.call(req.jar) !== '[object Function]' ||
            Object.prototype.toString.call(req.cookie) !== '[object Function]') {
            throw new TypeError('Parameter must be a valid `request` module API');
        }
    }
}

/**
 * Export {RxHttpRequest} instance
 */
export const RxHR: RxHttpRequest = RxHttpRequest.instance();

/**
 * Export response interface
 */
export interface RxHttpRequestResponse<R = any> {
    response: RequestResponse;
    body: R;
}

/**
 * Export all initial elements
 */
export { RequestAPI, Request, CoreOptions, RequiredUriUrl, RequestResponse };
