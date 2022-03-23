import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { Home, Auth } from './Pages';

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route exact path={'/'} component={Home} />
        <Redirect to={'/'} />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path={'/'} component={Auth} exact />
      <Redirect to={'/'} />
    </Switch>
  );
};
