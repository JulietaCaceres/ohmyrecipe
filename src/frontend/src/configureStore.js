import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { rootSaga, rootReducer } from './ducks';

export default function configureStore(initialState) {
    const sagaMiddleware = createSagaMiddleware()
    const middlewares = [
        sagaMiddleware,
    ];

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools

    const store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(...middlewares))
    );

    sagaMiddleware.run(rootSaga);

    return store;
}