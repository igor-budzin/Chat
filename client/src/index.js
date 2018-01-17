import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import SocketClient from './utils/socketAPI';
import configureStore from './store/configureStore';
import App from './containers/App';
import './assets/css/main.scss';

const socketClient = new SocketClient();

const store = configureStore({}, socketClient);

ReactDOM.render(
    <Provider store={store}>
        <App storeObj={store} />
    </Provider>,
    document.getElementById('root')
);
