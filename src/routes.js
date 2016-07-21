import React from 'react';
import { IndexRedirect, Route } from 'react-router';
import {
    App,
    Auth,
    Step,
    Form1,
    Form2,
    Form3,
    Form4,
    Profile,
    NotFound,
  } from 'containers';

export default () => {
  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRedirect to="auth" />
      <Route path="auth" component={Auth}>
        <IndexRedirect to="step" />
        <Route path="step" component={Step}>
          <IndexRedirect to="1" />
          <Route path="1" component={Form1} />
          <Route path="2" component={Form2} />
          <Route path="3" component={Form3} />
          <Route path="4" component={Form4} />
        </Route>
        <Route path="profile" component={Profile} />
      </Route>

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
