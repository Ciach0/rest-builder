# REST Builder

REST Builder is a library for making requests, heavily inspired by [Discord.js'](https://discordjs.org) Client#api.

## Installation

Use the package manager [npm](https://npmjs.com) or [yarn](https://yarnpkg.com) to install REST Builder.

```bash
npm i rest-builder
# OR
yarn add rest-builder
```

# Important
`rest-builder` is an asynchronous library, so you should use it in an asynchronous environment or utilize `.then()`.

## Usage
### Using CommonJS
```js
const RESTBuilder = require('rest-builder');

async function main() {
  const client = new RESTBuilder({
    baseURL: 'https://example.com'
  });
  // client.api is the entrypoint to HTTP requests
  // to use an HTTP method, simply put .[your method]() at the end of your expression.
  const response = await client.api.users['userid'].setttings.get(); // invoke an HTTP GET method (equivalent to /users/userid/settings)
  console.log(response);
}
main();
```
### Using ES Modules
```js
import RESTBuilder from 'rest-builder';

const client = new RESTBuilder({
  baseURL: 'https://example.com'
});

const response = await client.api.users['userid'].settings.get(); // in ES Modules, you are able to use await at the top level
console.log(response);
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[GPL-3.0](https://choosealicense.com/licenses/gpl-3.0/)
