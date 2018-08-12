import 'whatwg-fetch'

function _printUnexpectedActionPayload() {
    console.error( // eslint-disable-line no-console
        `Unexpected config provided. Please check https://github.com/cadz7/redux-lytics for reference.`
    );
}

function createLogger(actionPayload = {}, defaultHeaders = {}) {
    return store => next => action => {
        if (action.type in actionPayload) {
            let url = '/'
            let body = {}
            let overrideHeaders = null

            if ('headers' in actionPayload[action.type]) {
                overrideHeaders = actionPayload[action.type].headers
            }

            const headers = overrideHeaders ?
            Object.assign(defaultHeaders, overrideHeaders) :
            defaultHeaders

            if ('body' in actionPayload[action.type]) {
                body = actionPayload[action.type].body
            }

            if ('url' in actionPayload[action.type]) {
                url = actionPayload[action.type]['url']
            } else {
                _printUnexpectedActionPayload()
                return next(action)
            }
            
            fetch(url, {
                method: "POST",
                body: JSON.stringify(body),
                headers: headers
            }).catch(() => {})

        }
        return next(action)
    }
}
    
export { createLogger }
