import { applyMiddleware, createStore } from 'redux';
import { createLogger } from '../src';

const mockResponse = (status, statusText, response) => {
    return new window.Response(response, {
      status: status,
      statusText: statusText,
      headers: {
        'Content-type': 'application/json'
      }
    });
  };


const trackedActionType = 'TRACKED'
const untrackedActionType = 'UNTRACKED'

const mockEventsConfig = {
    [trackedActionType]: {
        url: "/analytics",
        body: {'key': 'value'},
        headers: {'X-default-header': 'defaultValue'}
    }
}

let store = createStore(() => ({}), applyMiddleware(createLogger(mockEventsConfig)))

describe('index test', () => {
    beforeEach(() => {
        global.fetch = jest.fn().mockImplementation((url, {}) =>
            Promise.resolve(mockResponse(
                200,
                null,
                '{}'
            ))
        );
    })

    it('should not make the API request if the action isnt provided in config', (done) => {
        store.dispatch({ type: untrackedActionType })
        setTimeout(() => {
            expect(global.fetch).not.toBeCalled();
            done()
        })
    })

    it('should make the API request if the action is provided in config', (done) => {
        store.dispatch({ type: trackedActionType })
        setTimeout(() => {
            expect(global.fetch).toBeCalled();
            expect(global.fetch.mock.calls[0][0]).toEqual(
                mockEventsConfig[trackedActionType].url
            );
            expect(global.fetch.mock.calls[0][1].body).toEqual(
                JSON.stringify(mockEventsConfig[trackedActionType].body)
            );
            expect(global.fetch.mock.calls[0][1].headers).toEqual(
                mockEventsConfig[trackedActionType].headers
            );
            done()
        })
    })

    it('should send custom headers', (done) => {
        const mockCustomHeaders = {
            'X-Custom-Header': 'customValue',
            'X-Custom-Header-2': 'customValue2'
        }
        store = createStore(() => ({}), applyMiddleware(createLogger(
            mockEventsConfig,
            mockCustomHeaders
        )))
        store.dispatch({ type: trackedActionType })
        setTimeout(() => {
            expect(global.fetch).toBeCalled();
            expect(global.fetch.mock.calls[0][1].headers).toEqual(mockCustomHeaders);
            done()
        })
    })
})
