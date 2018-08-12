import 'whatwg-fetch'

function createLogger(eventMap = {}, defaultHeaders = {}) {
    return store => next => action => {
        if (action.type in eventMap) {
            const customHeaders = eventMap[action.type]['headers']
            const url = eventMap[action.type]['url']
            const body = eventMap[action.type].body

            const headers = customHeaders == {} ?
            defaultHeaders :
            Object.assign(defaultHeaders, customHeaders)
            
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
