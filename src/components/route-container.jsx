/* eslint-disable */
import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import LoginForm from './LoginForm';
import StallDetailForm from './StallDetailedForm'
class RouteContainer extends React.Component {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    return (
          <Switch>
            <Route exact path="/" component={LoginForm} />
            <Route exact path="/stallformdetails" component={StallDetailForm} />
          </Switch>
    );
  }
}

export default withRouter(RouteContainer);
