function createLogger(eventMap = {}, defaultHeaders) {
    return store => next => action => {
        if (action.type in eventMap) {
            const customHeaders = eventMap[action.type][headers]
            const data = eventMap[action.type].data
            
            const headers = customHeaders == {} ?
            defaultHeaders :
            Object.assign(defaultHeaders, customHeaders)
            
            return fetch(url, {
                method: "POST",
                body: JSON.stringify(data),
                headers: defaultHeaders
            })
        }
        return next(action)
    }
}
    
export { createLogger }
