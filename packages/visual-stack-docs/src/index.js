import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, browserHistory, IndexRoute } from 'react-router';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';


import { reducer as vsReducer } from '@cjdev/visual-stack-redux';
import App from './containers/App/';
import Home from './containers/Home/';

import '@cjdev/visual-stack/lib/global';
import './index.css';

const reducer = combineReducers({
  visualStack: vsReducer,
});
const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
