'use strict';

// import libraries
import * as Request from 'request';
import {Observable} from 'rxjs';

// internals object for private methods and attributes
const internals = {};

/**
 * Add specific methods and attributes
 */
Object.assign(internals, {

    /**
     * Function to check if parameter is a `request` module
     *
     * @param request
     * @private
     */
    _checkRequestParam: (request) => {

        if (!request ||
            Object.prototype.toString.call( request.get ) !== '[object Function]' ||
            Object.prototype.toString.call( request.head ) !== '[object Function]' ||
            Object.prototype.toString.call( request.post ) !== '[object Function]' ||
            Object.prototype.toString.call( request.put ) !== '[object Function]' ||
            Object.prototype.toString.call( request.patch ) !== '[object Function]' ||
            Object.prototype.toString.call( request.del ) !== '[object Function]' ||
            Object.prototype.toString.call( request.defaults ) !== '[object Function]') {
            throw new TypeError('Parameter must be a valid `request` module API');
        }
    }
});

/**
 * RxHttpRequest definition class
 */
export class RxHttpRequestClass {

    /**
     * Class constructor
     *
     * @param _request
     */
    constructor(_request) {

        // check parameter
        internals._checkRequestParam(_request);

        // set request object
        this._request = _request;
    }

    /**
     * Returns private attribute _request
     * 
     * @returns {*}
     */
    get request() {

        return this._request;
    }

    /**
     * This method returns a wrapper around the normal rx-http-request API that defaults to whatever options you pass to it.
     * It does not modify the global rx-http-request API; instead, it returns a wrapper that has your default settings applied to it.
     * You can call .defaults() on the wrapper that is returned from rx-http-request.defaults to add/override defaults that were previously defaulted.
     *
     * @param options
     *
     * @returns {RxHttpRequest}
     */
    defaults(options) {

        return new RxHttpRequestClass(this.request.defaults(options));
    }

    /**
     * Function to do a HTTP request for given method
     *
     * @param method
     * @param uri
     * @param options
     *
     * @returns {Observable}
     * @private
     */
    _call() {

        // create new args array
        const args = [].concat(...arguments);

        // get all arguments to initialize
        const method = args.shift();
        const uri = args.shift();
        const options = Object.assign({}, args.pop() || {});

        // returns new Observable
        return Observable.create((observer) => {

            // build params array
            const params = [].concat(uri, options, (error, response, body) => {

                if (error) {
                    return observer.error(error);
                }

                observer.next(Object.assign({}, {response: response, body: body}));
                observer.complete();
            });

            // call request method
            try {
                this.request[method].apply(this.request, params);
            }
            catch(error) {
                observer.error(error);
            }
        });
    }

    /**
     * Function to do a GET HTTP request
     *
     * @param uri
     * @param options
     *
     * @returns {Observable}
     */
    get() {

        // create new args array
        const args = [].concat(...arguments);

        // get all arguments to initialize
        const method = 'get';
        const uri = args.shift();
        const options = Object.assign({}, args.pop() || {});

        return this._call.apply(this, [].concat(method, uri, options));
    }

    /**
     * Function to do a POST HTTP request
     *
     * @param uri
     * @param options
     *
     * @returns {Observable}
     */
    post() {

        // create new args array
        const args = [].concat(...arguments);

        // get all arguments to initialize
        const method = 'post';
        const uri = args.shift();
        const options = Object.assign({}, args.pop() || {});

        return this._call.apply(this, [].concat(method, uri, options));
    }

    /**
     * Function to do a PUT HTTP request
     *
     * @param uri
     * @param options
     *
     * @returns {Observable}
     */
    put() {

        // create new args array
        const args = [].concat(...arguments);

        // get all arguments to initialize
        const method = 'put';
        const uri = args.shift();
        const options = Object.assign({}, args.pop() || {});

        return this._call.apply(this, [].concat(method, uri, options));
    }

    /**
     * Function to do a PATCH HTTP request
     *
     * @param uri
     * @param options
     *
     * @returns {Observable}
     */
    patch() {

        // create new args array 
        const args = [].concat(...arguments);

        // get all arguments to initialize
        const method = 'patch';
        const uri = args.shift();
        const options = Object.assign({}, args.pop() || {});

        return this._call.apply(this, [].concat(method, uri, options));
    }

    /**
     * Function to do a DELETE HTTP request
     *
     * @param uri
     * @param options
     *
     * @returns {Observable}
     */
    delete() {

        // create new args array
        const args = [].concat(...arguments);

        // get all arguments to initialize
        const method = 'del';
        const uri = args.shift();
        const options = Object.assign({}, args.pop() || {});

        return this._call.apply(this, [].concat(method, uri, options));
    }

    /**
     * Function to do a HEAD HTTP request
     *
     * @param uri
     * @param options
     *
     * @returns {Observable}
     */
    head() {

        // create new args array
        const args = [].concat(...arguments);

        // get all arguments to initialize
        const method = 'head';
        const uri = args.shift();
        const options = Object.assign({}, args.pop() || {});

        return this._call.apply(this, [].concat(method, uri, options));
    }

    /**
     * Returns singleton instance
     *
     * @returns {null|RxHttpRequest|*}
     */
    static getInstance() {

        // singleton
        if (!(internals._instance instanceof RxHttpRequestClass)) {
            Object.assign(internals, { _instance: new RxHttpRequestClass(Request) });
        }

        return internals._instance;
    }
}

/**
 * Export {RxHttpRequestClass} instance
 */
const RxHttpRequest = RxHttpRequestClass.getInstance();
export {RxHttpRequest};