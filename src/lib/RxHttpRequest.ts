// import libraries
import * as request from 'request';
import { Buffer } from 'buffer';

import RequestAPI = request.RequestAPI;
import Request = request.Request;
import CoreOptions = request.CoreOptions;
import RequiredUriUrl = request.RequiredUriUrl;
import RequestResponse = request.RequestResponse;
import RequestCallback = request.RequestCallback;

import { Observable } from 'rxjs/Observable';
import { RxCookieJar, Cookie } from './RxCookieJar';

// native javascript's objects typings
declare const Object: any;

/**
 * Class definition
 */
export class RxHttpRequest {
    // private property to store singleton instance
    private static _instance: RxHttpRequest;
    // private property to store request API object
    private _request: RequestAPI<Request, CoreOptions, RequiredUriUrl>;

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
     * @return {Observable<RxHttpRequestResponse>}
     */
    get(uri: string, options?: CoreOptions): Observable<RxHttpRequestResponse> {
        return <Observable<RxHttpRequestResponse>> this._call.apply(this, [].concat('get', <string> uri,
            <CoreOptions> Object.assign({}, options || {})));
    }

    /**
     * Function to do a GET HTTP request and to return a buffer
     *
     * @param uri
     * @param options
     *
     * @return {Observable<RxHttpRequestResponse>}
     */
    getBuffer(uri: string, options?: CoreOptions): Observable<RxHttpRequestResponse> {
        return <Observable<RxHttpRequestResponse>> Observable.create((observer) => {
            try {
                this._request.get(<string> uri, <CoreOptions> Object.assign({}, options || {}))
                    .on('response', (response: RequestResponse) => {
                        let res: Buffer;
                        response.on('data', (data: Buffer) => res = res ? Buffer.concat([].concat(res, data)) : data);
                        response.on('end', _ => {
                            observer.next(<RxHttpRequestResponse> Object.assign({}, {
                                response: <RequestResponse> response,
                                body: <Buffer> res
                            }));
                            observer.complete();
                        });
                    })
                    .on('error', error => observer.error(error));
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
     * @return {Observable<RxHttpRequestResponse>}
     */
    post(uri: string, options?: CoreOptions): Observable<RxHttpRequestResponse> {
        return <Observable<RxHttpRequestResponse>> this._call.apply(this, [].concat('post', <string> uri,
            <CoreOptions> Object.assign({}, options || {})));
    }

    /**
     * Function to do a PUT HTTP request
     *
     * @param uri {string}
     * @param options {CoreOptions}
     *
     * @return {Observable<RxHttpRequestResponse>}
     */
    put(uri: string, options?: CoreOptions): Observable<RxHttpRequestResponse> {
        return <Observable<RxHttpRequestResponse>> this._call.apply(this, [].concat('put', <string> uri,
            <CoreOptions> Object.assign({}, options || {})));
    }

    /**
     * Function to do a PATCH HTTP request
     *
     * @param uri {string}
     * @param options {CoreOptions}
     *
     * @return {Observable<RxHttpRequestResponse>}
     */
    patch(uri: string, options?: CoreOptions): Observable<RxHttpRequestResponse> {
        return <Observable<RxHttpRequestResponse>> this._call.apply(this, [].concat('patch', <string> uri,
            <CoreOptions> Object.assign({}, options || {})));
    }

    /**
     * Function to do a DELETE HTTP request
     *
     * @param uri {string}
     * @param options {CoreOptions}
     *
     * @return {Observable<RxHttpRequestResponse>}
     */
    delete(uri: string, options?: CoreOptions): Observable<RxHttpRequestResponse> {
        return <Observable<RxHttpRequestResponse>> this._call.apply(this, [].concat('del', <string> uri,
            <CoreOptions> Object.assign({}, options || {})));
    }

    /**
     * Function to do a HEAD HTTP request
     *
     * @param uri {string}
     * @param options {CoreOptions}
     *
     * @return {Observable<RxHttpRequestResponse>}
     */
    head(uri: string, options?: CoreOptions): Observable<RxHttpRequestResponse> {
        return <Observable<RxHttpRequestResponse>> this._call.apply(this, [].concat('head', <string> uri,
            <CoreOptions> Object.assign({}, options || {})));
    }

    /**
     * Function that creates a new rx cookie jar
     *
     * @return {Observable<RxCookieJar>}
     */
    jar(): Observable<RxCookieJar> {
        return Observable.create((observer) => {
            observer.next(new RxCookieJar(this._request.jar()));
            observer.complete();
        });
    }

    /**
     * Function that creates a new cookie
     *
     * @param str {string}
     *
     * @return {Observable<Cookie>}
     */
    cookie(str: string): Observable<Cookie> {
        return <Observable<Cookie>> Observable.create((observer) => {
            observer.next(this._request.cookie(<string> str));
            observer.complete();
        });
    }

    /**
     * Function to do a HTTP request for given method
     *
     * @param method {string}
     * @param uri {string}
     * @param options {CoreOptions}
     *
     * @return {Observable<RxHttpRequestResponse>}
     *
     * @private
     */
    private _call(method: string, uri: string, options?: CoreOptions): Observable<RxHttpRequestResponse> {
        return <Observable<RxHttpRequestResponse>> Observable.create((observer) => {
            // build params array
            const params = [].concat(<string> uri, <CoreOptions> Object.assign({}, options || {}),
                <RequestCallback>(error: any, response: RequestResponse, body: any) => {
                    if (error) {
                        return observer.error(error);
                    }

                    observer.next(<RxHttpRequestResponse> Object.assign({}, {
                        response: <RequestResponse> response,
                        body: <any> body
                    }));
                    observer.complete();
                });

            // _call request method
            try {
                this._request[<string> method].apply(<RequestAPI<Request, CoreOptions, RequiredUriUrl>> this._request, params);
            } catch (error) {
                observer.error(error);
            }
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
export interface RxHttpRequestResponse {
    response: RequestResponse;
    body: any;
}

/**
 * Export all initial elements
 */
export { RequestAPI, Request, CoreOptions, RequiredUriUrl, RequestResponse };
