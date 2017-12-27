import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import configureStore from './configureStore';
import App from './components/App';
import './assets/css/main.scss';

let initialState = {

};

const store = configureStore(initialState);
store.subscribe(() => {
    console.log("Fire");
});
window.store = store;

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
