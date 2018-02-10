import React, {Component, PropTypes} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {Provider} from 'react-redux';
import List from './List';
import configure from './store';

const store = configure();

export default class App extends Component {
  render() {
    return (
    <Provider store={store}>
      <Router>
        <div>
          <List/>
        </div>
      </Router>
    </Provider>
    );
  }
};
