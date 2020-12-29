import React from 'react';
import { render, hydrate } from 'react-dom';
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import RouteContainer from './components/route-container'
const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <RouteContainer />
    </Router>
  );
}

export default App;
