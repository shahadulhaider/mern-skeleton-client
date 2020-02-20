import React from "react";
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({ component, auth, ...rest }) => {
  return (
    <CustomRoute component={component} auth={auth} redirectPath="/" {...rest} />
  );
};

export const LoggedInRoute = ({ component, auth, ...rest }) => {
  return (
    <CustomRoute
      component={component}
      auth={!auth}
      redirectPath="/dashboard"
      {...rest}
    />
  );
};

function CustomRoute({
  component: Component,
  auth: isAuthenticated,
  redirectPath,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={renderProps =>
        isAuthenticated ? (
          <Component {...renderProps} />
        ) : (
          <Redirect
            to={{
              pathname: redirectPath,
              state: { from: renderProps.location }
            }}
          />
        )
      }
    />
  );
}
