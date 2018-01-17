import {createStore, applyMiddleware, compose} from 'redux';
import {createLogger} from 'redux-logger';
import socketMiddleware from '../middlewares/socketMiddleware';
import requestMiddleware from '../middlewares/requestMiddleware';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

export default function configureStore(initialState, socketClient) {
    const devtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
    const logger = createLogger();

    const middlewares = [socketMiddleware(socketClient), requestMiddleware(socketClient), logger];

    const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middlewares), devtools));

    if (module.hot) {
        module.hot.accept('../reducers/rootReducer', () => {
            const nextRootReducer = require('../reducers/rootReducer').default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
