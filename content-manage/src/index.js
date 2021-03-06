import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import IRouter from './router';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import Store from './redux/store/store';
const store = Store();
ReactDOM.render(<Provider store={store}>
    <IRouter />
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
