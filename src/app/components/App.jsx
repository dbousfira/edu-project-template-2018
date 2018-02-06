import React, {Component, PropTypes} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {Provider} from 'react-redux';
import configure from './store';

const store = configure();
const api = require('../../server/api.js');

class Yolo extends Component {
  render() {
    return (<table>
      <tr>
        <th>Nom</th>
        <th>Numéro</th>
        <th>Note</th>
      </tr>

    </table>);
  }
};

class Swag extends Component {
  render() {
    return (<h1>Swag</h1>);
  }
};
export default class App extends Component {
  render() {
    return (<Provider store={store}>
      <Router>
        <div>
          <Route path="/" component={Yolo}></Route>
          <Route path="/new" component={Swag}></Route>
        </div>
      </Router>
    </Provider>);
  }
};
