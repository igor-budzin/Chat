import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import rootReducer from '../reducers/rootReducer';

export default function configureStore(initialState) {
    const devtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
    const logger = createLogger()

    const store = createStore(rootReducer, initialState, compose(applyMiddleware(thunk, logger), devtools));

    if (module.hot) {
        module.hot.accept('../reducers/rootReducer', () => {
            const nextRootReducer = require('../reducers/rootReducer').default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
