# RX-HTTP-Request

<div style="float:right;">
    <a href="https://babeljs.io/docs/learn-es2015/">
        <img src="http://image.slidesharecdn.com/4-es6metbabel-150513100342-lva1-app6891/95/es6-with-babeljs-1-638.jpg"
             align="right" alt="ES2015 logo" width="50" height="50" />
    </a>
    <a href="https://github.com/Reactive-Extensions/RxJS">
        <img src="http://reactivex.io/assets/Rx_Logo_S.png"
             align="right" alt="ReactiveX logo" width="50" height="50"/>
    </a>
</div>

[![NPM](https://nodei.co/npm/rx-http-request.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/rx-http-request/)

[![Build Status](https://travis-ci.org/njl07/rx-http-request.svg?branch=master)](https://travis-ci.org/njl07/rx-http-request)
[![Coverage Status](https://coveralls.io/repos/github/njl07/rx-http-request/badge.svg?branch=master)](https://coveralls.io/github/njl07/rx-http-request?branch=master)
[![Dependencies](https://david-dm.org/njl07/rx-http-request.svg)](https://david-dm.org/njl07/rx-http-request)
[![DevDependencies](https://david-dm.org/njl07/rx-http-request/dev-status.svg)](https://david-dm.org/njl07/rx-http-request#info=devDependencies)

The world-famous HTTP client [Request](https://github.com/request/request) now [RxJS](https://github.com/Reactive-Extensions/RxJS) compliant and wrote in full [ES2015](https://babeljs.io/docs/learn-es2015/).

## Super simple to use

RX-HTTP-Request is designed to be the simplest way possible to make http calls.

It's fully `ES2015` wrotten so you can import it :

```javascript
import {RxHttpRequest} from 'rx-http-request';
```

or use `CommonJS`:

```javascript
const RxHttpRequest = require('rx-http-request').RxHttpRequest;
```

Now, it's easy to perform a `HTTP` request:

```javascript
RxHttpRequest.get('http://www.google.fr').subscribe(
    (data) => {

        if (data.response.statusCode === 200) {
            console.log(data.body); // Show the HTML for the Google homepage.
        }
    },
    (err) => console.error(err) // Show error in console
);
```