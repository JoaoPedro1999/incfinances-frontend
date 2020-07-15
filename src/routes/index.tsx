import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Transaction from '../pages/Transaction';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/register" component={SignUp} />

    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/transaction" component={Transaction} isPrivate />
    <Route path="/profile" component={Profile} isPrivate />
  </Switch>
);

export default Routes;
