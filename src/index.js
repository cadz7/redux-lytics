import 'whatwg-fetch'

const rQueue = []
let totalCalls = 0
let lastTime = new Date()

function _printUnexpectedActionPayload() {
    console.error( // eslint-disable-line no-console
        `Unexpected config provided. Please check https://github.com/cadz7/redux-lytics for reference.`
    );
}

function fireRequest(payload) {
    totalCalls += 1
    fetch(payload.url, {
        method: "POST",
        body: JSON.stringify(payload.body),
        headers: payload.headers
    })
    .then(resp => {
        if (resp.status > 400 && resp.status != 404) {
            rQueue.push({ url: payload.url, body: payload.body, headers: payload.headers})
        } else {
            totalCalls -= 1
        }
    })
}

function fireIfAvailable() {
    if (rQueue.length > 0) {
        const currTime = new Date()
        if (currTime - lastTime < 2000) {
            return
        }
        const r = rQueue.pop()
        fireRequest({ url: r.url, body: r.body, headers: r.headers })
        lastTime = currTime
        fireIfAvailable()
    }
}

setInterval(fireIfAvailable, 1000)

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
            
            const payload = { url, body, headers }

            fireRequest(payload)

        }
        return next(action)
    }
}
    
export { createLogger }
