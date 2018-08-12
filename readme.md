# Redux-lytics

Redux-lytics is a simple Redux middleware to track events to a external service through HTTP POST requests.

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
    INCREMENT: {
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
