import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { loadUser } from "../actions/auth";
import { LoggedInRoute, ProtectedRoute } from "./routeTypes";

import Home from "../views/home";
import Login from "../views/authentication/login";
import Register from "../views/authentication/register";
import Dashboard from "../views/dashboard";
import ForgotPassword from "../views/authentication/forgotPassword";
import ResetPassword from "../views/authentication/resetPassword";
import VerifyEmail from "../views/authentication/verifyEmail";
import VerifyEmailNotify from "../views/authentication/verifyEmail/notify";
import UsersList from "../views/profile/UsersList";
import Profile from "../views/profile/Profile";
import EditProfile from "../views/profile/EditProfile";

function MainRouter() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <LoggedInRoute
        path="/auth/login"
        auth={isAuthenticated}
        component={Login}
      />
      <LoggedInRoute
        path="/auth/register"
        auth={isAuthenticated}
        component={Register}
      />
      <ProtectedRoute
        path="/dashboard"
        auth={isAuthenticated}
        component={Dashboard}
      />
      <LoggedInRoute
        path="/auth/forgotpassword"
        auth={isAuthenticated}
        component={ForgotPassword}
      />
      <LoggedInRoute
        path="/auth/resetpassword/:resetToken"
        auth={isAuthenticated}
        component={ResetPassword}
      />
      <LoggedInRoute
        exact
        path="/auth/verifyemail"
        auth={isAuthenticated}
        component={VerifyEmailNotify}
      />
      <LoggedInRoute
        path="/auth/verifyemail/:token"
        auth={isAuthenticated}
        component={VerifyEmail}
      />
      <Route exact path="/users" component={UsersList} />
      <ProtectedRoute
        exact
        path="/users/:userId"
        auth={isAuthenticated}
        component={Profile}
      />
      <ProtectedRoute
        exact
        path="/users/edit/:userId"
        auth={isAuthenticated}
        component={EditProfile}
      />
    </Switch>
  );
}

export default MainRouter;
