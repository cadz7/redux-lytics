# Getting Started:
Install redux-lytics:
- NPM: `npm install redux-lytics --save-dev`

Usage:
```
// index.js
import { createLogger } from 'redux-lytics';
import { config, defaultHeaders } from './config'
const logger = createLogger(config, defaultHeaders);
const middleware = [logger];

// config.js
export const config = {
  INCREMENT: {
    url: "/analytics",
    data: {},
    headers: {}
  }
}

export const defaultHeaders = {
    Accept: application/json
}
```

