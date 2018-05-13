import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from 'reducers/rootReducer';
import Navigation from 'components/navigation/navigation';
import ProductList from 'containers/productList/productList';
import * as css from './root.css';

const store = createStore(rootReducer);

export default () => (
    <Provider store={store}>
        <div className={css.root}>
            <Router>
                <React.Fragment>
                    <Navigation />
                    <div className={css.content}>
                        <Route path="/" component={ProductList} />
                    </div>
                </React.Fragment>
            </Router>
        </div>
    </Provider>
);
