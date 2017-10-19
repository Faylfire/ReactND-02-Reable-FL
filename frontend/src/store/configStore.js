import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import logger from 'redux-logger'
import { createBrowserHistory } from 'history'
import {connectRouter, routerMiddleware } from 'connected-react-router'



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose



export const history = createBrowserHistory()


export function configStore(initialState) {
    return createStore(
        connectRouter(history)(rootReducer),
        initialState,
        composeEnhancers(
					applyMiddleware(routerMiddleware(history),logger, thunk))
    );
}

