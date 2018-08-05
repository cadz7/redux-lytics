export default function createLogger(eventMap = {}) {
    return store => next => action => {
        if (action.type in eventMap) {
            if (navigator.sendBeacon) {
                let result = navigator.sendBeacon(eventMap[action.type].url, JSON.stringify(eventMap[action.type].data));
                if (!result) console.log('Failure.');
            } else {
                return fetch(url, {
                    method: "POST",
                    body: JSON.stringify(eventMap[action.type].data)
                })
            }
        }
        return next(action)
    }
}
