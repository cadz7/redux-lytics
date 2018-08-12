# Redux-lytics

Redux-lytics is a simple middleware to track events in your Redux app.  
For each action that needs to be tracked, an HTTP POST request is automatically made to a provided endpoint.

<p align="center">
    <a href="https://www.npmjs.com/package/redux-lytics"><img src="https://badge.fury.io/js/redux-lytics.svg"></a>
    <a href="https://www.npmjs.com/package/redux-lytics"><img src="https://img.shields.io/npm/dm/redux-lytics.svg?style=flat-square"></a>

</p>

## Getting Started:
Install redux-lytics:
- NPM: `npm install redux-lytics`
- Yarn: `yarn add redux-lytics`

## Usage:
```
// index.js
import { createLogger } from 'redux-lytics';
import { config, defaultHeaders } from './config';
const logger = createLogger(config, defaultHeaders);
const middleware = [logger];

// config.js
export const config = {
    ACTION_TYPE: {
      url: "/analytics",
      body: {'key': "hello"},
      headers: {}
    }
  };

export const defaultHeaders = {
    Accept: 'application/json'
};
```

## Contributing
Please feel free to create a PR or suggest improvements. Any help is appreciated!
