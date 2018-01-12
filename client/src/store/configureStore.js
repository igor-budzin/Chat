import {createStore} from 'redux';
import rootReducer from '../reducers/rootReducer';

export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

    if (module.hot) {
        module.hot.accept('../reducers/rootReducer', () => {
            const nextRootReducer = require('../reducers/rootReducer').default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
