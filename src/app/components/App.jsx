import React, {Component, PropTypes} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {Provider} from 'react-redux';
import EpLister from './EpLister';
import configure from './store';

const store = configure();

export default class App extends Component {
  render() {
    return (
    <Provider store={store}>
      <Router>
        <div className="container">
          <br/><br/><br/>
          <EpLister/>
        </div>
      </Router>
    </Provider>
    );
  }
};
