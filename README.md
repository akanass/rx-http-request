# Rx-Http-Request

<div style="overflow:hidden;margin-bottom:20px;">
<div style="float:left;line-height:60px">
    <a href="https://travis-ci.org/njl07/rx-http-request.svg?branch=master">
        <img src="https://travis-ci.org/njl07/rx-http-request.svg?branch=master" alt="build" />
    </a>
    <a href="https://coveralls.io/github/njl07/rx-http-request?branch=master">
        <img src="https://coveralls.io/repos/github/njl07/rx-http-request/badge.svg?branch=master" alt="coveralls" />
    </a>
    <a href="https://david-dm.org/njl07/rx-http-request">
        <img src="https://david-dm.org/njl07/rx-http-request.svg" alt="dependencies" />
    </a>
    <a href="https://david-dm.org/njl07/rx-http-request?type=dev">
        <img src="https://david-dm.org/njl07/rx-http-request/dev-status.svg" alt="devDependencies" />
    </a>
</div>
<div style="float:right;">
    <a href="https://www.typescriptlang.org/docs/tutorial.html">
        <img src="https://cdn-images-1.medium.com/max/800/1*8lKzkDJVWuVbqumysxMRYw.png"
             align="right" alt="Typescript logo" width="50" height="50"/>
    </a>
    <a href="http://reactivex.io/rxjs">
        <img src="http://reactivex.io/assets/Rx_Logo_S.png"
             align="right" alt="ReactiveX logo" width="50" height="50"/>
    </a>
</div>
</div>

The world-famous HTTP client [Request](https://github.com/request/request) now [RxJS](http://reactivex.io/rxjs) compliant, wrote in full [Typescript](https://www.typescriptlang.org/docs/tutorial.html) | [ES6](https://babeljs.io/docs/learn-es2015/) for client and server side.

## Table of contents

* [Installation](#installation)
* [Super simple to use](#super-simple-to-use)
* [Browser compatibility](#browser-compatibility)
* [Build your project with Webpack](#build-your-project-with-webpack)
* [API in Detail](#api-in-detail)
    * [.request](#request)
    * [.defaults(options)](#defaultsoptions)
    * [.get(uri[,options])](#geturi-options)
        * [Crawl a webpage](#crawl-a-webpage)
        * [GET something from a JSON REST API](#get-something-from-a-json-rest-api)
    * [.getBuffer(uri[,options])](#getbufferuri-options)
        * [GET a buffer image](#get-a-buffer-image)
    * [.post(uri[,options])](#posturi-options)
        * [POST data to a JSON REST API](#post-data-to-a-json-rest-api)
        * [POST like HTML forms do](#post-like-html-forms-do)
    * [.put(uri[,options])](#puturi-options)
    * [.patch(uri[,options])](#patchuri-options)
    * [.delete(uri[,options])](#deleteuri-options)
    * [.head(uri[,options])](#headuri-options)
    * [.jar()](#jar)
    * [.cookie(str)](#cookiestr)
* [Contributing](#contributing)
* [Change History](#change-history)
* [License](#license)

## Installation

```sh
$ npm install --save @akanass/rx-http-request rxjs

or

$ yarn add @akanass/rx-http-request rxjs
```

## Super simple to use

**Rx-Http-Request** is designed to be the simplest way possible to make http calls.

It's fully `Typescript` | `ES6` wrotten so you can import it :

```typescript
import {RxHR} from "@akanass/rx-http-request";
```

or use `CommonJS`:

```javascript
const RxHR = require('@akanass/rx-http-request').RxHR;
```

Now, it's easy to perform a `HTTP` request:

```typescript
RxHR.get('http://www.google.fr').subscribe(
    (data) => {

        if (data.response.statusCode === 200) {
            console.log(data.body); // Show the HTML for the Google homepage.
        }
    },
    (err) => console.error(err) // Show error in console
);
```

## Browser compatibility

**Rx-Http-Request** can be used in your favorite browser to have all features in your own front application.

Just import `browser/index.js` script and enjoy:

```javascript
<script src="node_modules/@akanass/rx-http-request/browser/index.js" type="application/javascript"></script>
<script type="application/javascript">
    const RxHR = rhr.RxHR;
    
    RxHR.get('http://www.google.fr').subscribe(
        function(data){
    
            if (data.response.statusCode === 200) {
                console.log(data.body); // Show the HTML for the Google homepage.
            }
        },
        function(err){
            console.error(err) // Show error in console
        }
    );
</script>
```

Browser version is a **standalone** version so you just need to `copy/paste` file from `node_modules/@akanass/rx-http-request/browser/index.js` when you want to create your bundle and change path to it.   

## Build your project with Webpack

If you want to include this library inside a project builds with `webpack` for a `client` application, you must add this configuration inside your `webpack configuration`:

```javascript
{
    target: "web",
    node: {
        fs: "empty",
        net: "empty",
        tls: "empty"
    }
}
``` 

For a `server` application, `target` will be `node`, `node` block in configuration **doesn't exist** and `uglify` plugin must be `disabled`. 

## API in Detail

**Rx-Http-Request** uses [Request](https://github.com/request/request) **API** to perform calls and returns [RxJS.Observable](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html).

All **options** to pass to **API** **methods** can be found [here](https://github.com/request/request#requestoptions-callback).

All **methods** to execute on **response object** can be found [here](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/observable.md#observable-instance-methods).

--------


### `.request`

Returns the original [Request](https://github.com/request/request#requestoptions-callback) **API** to perform calls without `RxJS.Observable` response but with a **callback method**.

```typescript
import {RxHR} from '@akanass/rx-http-request';

RxHR.request({uri: 'http://www.google.fr'}, (error, response, body) => {

    if (!error && response.statusCode == 200) {
        console.log(body); // Show the HTML for the Google homepage.
    }
});
```

[Back to top](#table-of-contents)

### `.defaults(options)`

This method **returns a wrapper** around the normal **Rx-Http-Request API**  that defaults to whatever options you pass to it.

**Parameters:**
> ***options*** *(required): Original [Request](https://github.com/request/request#requestoptions-callback) `options` object with default values foreach next requests*

**Response:**
> ***new*** *`RxHttpRequest` instance*

**Note:** `RxHR.defaults()` **does not** modify the global API; instead, it returns a wrapper that has your default settings applied to it.

**Note:** You can call `.defaults()` on the wrapper that is returned from `RxHR.defaults()` to add/override defaults that were previously defaulted.

For example:
 
```typescript
// requests using baseRequest will set the 'x-token' header
const baseRequest = RxHR.defaults({
    headers: {'x-token': 'my-token'}
});

// requests using specialRequest will include the 'x-token' header set in
// baseRequest and will also include the 'special' header
const specialRequest = baseRequest.defaults({
    headers: {special: 'special value'}
});
```

[Back to top](#table-of-contents)

### `.get(uri[, options])`

Performs a request with `get` http method.

**Parameters:**
> - ***uri*** *(required): The `uri` where request will be performed*
> - ***options*** *(optional): Original [Request](https://github.com/request/request#requestoptions-callback) `options` object*

**Response:**
> *[RxJS.Observable](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/observable.md) instance*

#### Crawl a webpage

```typescript
import {RxHR} from '@akanass/rx-http-request';

RxHR.get('http://www.google.fr').subscribe(
    (data) => {

        if (data.response.statusCode === 200) {
            console.log(data.body); // Show the HTML for the Google homepage.
        }
    },
    (err) => console.error(err) // Show error in console
);
```

#### GET something from a JSON REST API
     
```typescript
import {RxHR} from '@akanass/rx-http-request';

const options = {
    qs: {
        access_token: 'xxxxx xxxxx' // -> uri + '?access_token=xxxxx%20xxxxx'
    },
    headers: {
        'User-Agent': 'Rx-Http-Request'
    },
    json: true // Automatically parses the JSON string in the response
};

RxHR.get('https://api.github.com/user/repos', options).subscribe(
    (data) => {

        if (data.response.statusCode === 200) {
            console.log(data.body); // Show the JSON response object.
        }
    },
    (err) => console.error(err) // Show error in console
);
```

[Back to top](#table-of-contents)

### `.getBuffer(uri[, options])`

Performs a request with `get` http method and returns a **buffer** in response body. Very useful to crawl data from a **stream**.

**Parameters:**
> - ***uri*** *(required): The `uri` where request will be performed*
> - ***options*** *(optional): Original [Request](https://github.com/request/request#requestoptions-callback) `options` object*

**Response:**
> *[RxJS.Observable](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/observable.md) instance*

#### GET a buffer image

```typescript
import {RxHR} from '@akanass/rx-http-request';

RxHR.getBuffer('https://portalstoragewuprod2.azureedge.net/vision/Analysis/1-1.jpg').subscribe(
    (data) => {

        if (data.response.statusCode === 200) {
            console.log(data.response.headers['content-type']); // Show image content-type.
            console.log(data.body); // Show image buffer array.
        }
    },
    (err) => console.error(err) // Show error in console
);
```

[Back to top](#table-of-contents)

### `.post(uri[, options])`

Performs a request with `post` http method.

**Parameters:**
> - ***uri*** *(required): The `uri` where request will be performed*
> - ***options*** *(optional): Original [Request](https://github.com/request/request#requestoptions-callback) `options` object*

**Response:**
> *[RxJS.Observable](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/observable.md) instance*

#### POST data to a JSON REST API

```typescript
import {RxHR} from '@akanass/rx-http-request';

const options = {
    body: {
        some: 'payload'
    },
    json: true // Automatically stringifies the body to JSON
};

RxHR.post('http://posttestserver.com/posts', options).subscribe(
    (data) => {

        if (data.response.statusCode === 201) {
            console.log(data.body); // Show the JSON response object.
        }
    },
    (err) => console.error(err) // Show error in console
);
```

#### POST like HTML forms do

```typescript
import {RxHR} from '@akanass/rx-http-request';

const options = {
    form: {
        some: 'payload' // Will be urlencoded
    },
    headers: {
        /* 'content-type': 'application/x-www-form-urlencoded' */ // Set automatically
    }
};

RxHR.post('http://posttestserver.com/posts', options).subscribe(
    (data) => {

        if (data.response.statusCode === 201) {
            console.log(data.body); // POST succeeded...
        }
    },
    (err) => console.error(err) // Show error in console
);
```

[Back to top](#table-of-contents)

### `.put(uri[, options])`

Performs a request with `put` http method.

**Parameters:**
> - ***uri*** *(required): The `uri` where request will be performed*
> - ***options*** *(optional): Original [Request](https://github.com/request/request#requestoptions-callback) `options` object*

**Response:**
> *[RxJS.Observable](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/observable.md) instance*

```typescript
import {RxHR} from '@akanass/rx-http-request';

RxHR.put(uri).subscribe(...);
```

[Back to top](#table-of-contents)

### `.patch(uri[, options])`

Performs a request with `patch` http method.

**Parameters:**
> - ***uri*** *(required): The `uri` where request will be performed*
> - ***options*** *(optional): Original [Request](https://github.com/request/request#requestoptions-callback) `options` object*

**Response:**
> *[RxJS.Observable](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/observable.md) instance*

```typescript
import {RxHR} from '@akanass/rx-http-request';

RxHR.patch(uri).subscribe(...);
```

[Back to top](#table-of-contents)

### `.delete(uri[, options])`

Performs a request with `delete` http method.

**Parameters:**
> - ***uri*** *(required): The `uri` where request will be performed*
> - ***options*** *(optional): Original [Request](https://github.com/request/request#requestoptions-callback) `options` object*

**Response:**
> *[RxJS.Observable](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/observable.md) instance*

```typescript
import {RxHR} from '@akanass/rx-http-request';

RxHR.delete(uri).subscribe(...);
```

[Back to top](#table-of-contents)

### `.head(uri[, options])`

**Parameters:**
> - ***uri*** *(required): The `uri` where request will be performed*
> - ***options*** *(optional): Original [Request](https://github.com/request/request#requestoptions-callback) `options` object*

**Response:**
> *[RxJS.Observable](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/observable.md) instance*

Performs a request with `head` http method.

```typescript
import {RxHR} from '@akanass/rx-http-request';

RxHR.head(uri).subscribe(...);
```

[Back to top](#table-of-contents)

### `.jar()`

Creates a new `RxCookieJar` instance

**Response:**
> *[RxJS.Observable](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/observable.md) instance*


```typescript
import {RxHR} from '@akanass/rx-http-request';

RxHR.jar().subscribe(...);
```

[Back to top](#table-of-contents)

### `.cookie(str)`

Creates a new cookie

**Parameters:**
> - ***str*** *(required): The `string` representation of the cookie*

**Response:**
> *[RxJS.Observable](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/observable.md) instance*

 
```typescript
import {RxHR} from '@akanass/rx-http-request';

RxHR.cookie('key1=value1').subscribe(...);
```

[Back to top](#table-of-contents)

## Contributing

To set up your development environment:

1. clone the repo to your workspace,
2. in the shell `cd` to the main folder,
3. hit `npm or yarn install`,
4. run `npm or yarn run test`.
    * It will lint the code and execute all tests. 
    * The test coverage report can be viewed from `./coverage/lcov-report/index.html`.

[Back to top](#table-of-contents)

## Change History

* v3.1.0 (2018-10-16)
    * Upgrade all packages' versions
    * Migrate tests to [jest](https://jestjs.io/en/) and [ts-jest](https://kulshekhar.github.io/ts-jest/)
    * Refactor files' names
    * Documentation
* v3.0.0 (2018-05-28)
    * Upgrade to `rxjs` v6+ ([#29](https://github.com/njl07/rx-http-request/pull/29))
    * Add `generics` in response ([#28](https://github.com/njl07/rx-http-request/issues/28))
    * Upgrade all packages' versions
    * Documentation
* v2.7.1 (2018-01-24)
    * Upgrade all packages' versions
    * Fix problem with response object with retry process
    * Documentation
* v2.7.0 (2017-11-20)
    * Upgrade all packages' versions
    * Fix [Issue 12](https://github.com/njl07/rx-http-request/issues/12)
    * Fix [Issue 13](https://github.com/njl07/rx-http-request/issues/13)
    * Fix [Issue 15](https://github.com/njl07/rx-http-request/issues/15)
    * Lettable version of `rxjs` operators
    * Update tests
    * Documentation
* v2.6.0 (2017-09-14)
    * Upgrade all packages' versions
    * Add config for `unused` packages error in compilation
    * Update code to use `rxjs` operators instead of manual creation
    * Update tests
* v2.5.0 (2017-07-18)
    * Upgrade all packages' versions
    * Fix [Issue 11](https://github.com/njl07/rx-http-request/issues/11)
    * `rxjs` in **peerDependencies** and need to be installed manually
* v2.4.0 (2017-07-10)
    * Upgrade all packages' versions
    * Change `no-shadowed-variable` value in `tslint` config
* v2.3.0 (2017-05-15)
    * Upgrade all packages' versions
    * Extended `tsconfig` files
    * Check file exists in packaging process
* v2.2.1 (2017-05-02)
    * Upgrade all packages' versions
    * Fix error handler in `getBuffer` method if no `uri` provided
* v2.2.0 (2017-04-14)
    * Upgrade all packages' versions
    * Fix tests
    * Add new method to get data with buffer response
    * Export all initial elements from request to have them in library
* v2.1.1 (2017-03-23)
    * Upgrade all packages' versions
    * [Fix `request typings` installation](https://github.com/njl07/rx-http-request/issues/8)
* v2.1.0 (2017-03-09)
    * Upgrade `Request` version to `v2.80.0`
* v2.0.0 (2017-02-28)
    * New package version for `RxJS` and `Request`
    * Don't import all of `RxJS`, only `Observable`
    * Rewritten all **library and test files in `Typescript`**
    * Add `typings` support
    * Add **scope** to library and move to **`@akanass/rx-http-request`**
* v1.2.0 (2016-09-29)
    * New package version for `RxJS` and `Request`
    * New `ES6` features
    * [Issue 1](https://github.com/njl07/rx-http-request/issues/1)
    * [Issue 2](https://github.com/njl07/rx-http-request/issues/2)
* v1.1.0 (2016-03-28)
    * Browserify to have browser compatibility
* v1.0.0 (2016-03-27)
    * Carefully rewritten from scratch to make Rx-Http-Request a drop-in replacement for Request
    
[Back to top](#table-of-contents)

## License

Copyright (c) 2017 **Nicolas Jessel** Licensed under the [MIT license](https://github.com/njl07/rx-http-request/tree/master/LICENSE.md).

[Back to top](#table-of-contents)
