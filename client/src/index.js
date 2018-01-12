import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import configureStore from './store/configureStore';
import App from './containers/App';
import './assets/css/main.scss';

const store = configureStore({});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
