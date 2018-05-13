import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from 'reducers/rootReducer';
import RoomList from 'containers/roomList/roomList';
import './root.css';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk)),
);

export default () => (
    <Provider store={store}>
        <Router>
            <Route path="/" component={RoomList} />
        </Router>
    </Provider>
);
