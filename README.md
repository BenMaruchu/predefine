# predefine

[![Build Status](https://travis-ci.org/lykmapipo/predefine.svg?branch=master)](https://travis-ci.org/lykmapipo/predefine)
[![Dependencies Status](https://david-dm.org/lykmapipo/predefine/status.svg?style=flat-square)](https://david-dm.org/lykmapipo/predefine)
[![Coverage Status](https://coveralls.io/repos/github/lykmapipo/predefine/badge.svg?branch=master)](https://coveralls.io/github/lykmapipo/predefine?branch=master)
[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/lykmapipo/predefine/tree/master)

A representation of stored and retrieved information that does not qualify to belongs to their own domain model.

## Requirements

- [nodejs v8.11.1+](https://nodejs.org)
- [npm v5.6.0+](https://www.npmjs.com/)
- [MongoDB v3.4.10+](https://www.mongodb.com/)
- [mongoose v5.2.5+](https://github.com/Automattic/mongoose)

## Installation

```sh
npm install @lykmapipo/predefine --save
```

## Usage

```js
const { connect } = require('@lykmapipo/mongoose-common');
const { start, mount } = require('@lykmapipo/express-common');
const { Predefine, predefineRouter } = require('@lykmapipo/predefine');

// connect to mongodb
connect(process.env.MONGODB_URI, error => { ... });

// mount predefine http router
mount(predefineRouter);

// fire the http server
start(error => { ... });
```

## Environment
```js
PREDEFINE_NAMESPACES=Currency,Unit,Setting
```

## Testing

- Clone this repository

- Install all development dependencies

```sh
npm install
```

- Run example

```sh
npm run dev
```

- Then run test

```sh
npm test
```

## Contribute

It will be nice, if you open an issue first so that we can know what is going on, then, fork this repo and push in your ideas. Do not forget to add a bit of test(s) of what value you adding.

## License

The MIT License (MIT)

Copyright (c) lykmapipo & Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
