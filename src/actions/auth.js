import axios from "axios";
import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  VERIFICATION_SUCCESS,
  AUTH_SUCCESS,
  AUTH_FAIL,
  USER_LOADED,
  LOGOUT_SUCCESS
} from "../store/types";

import axiosHeader from "../services/api/axiosHeader";
import { handleLoading, handleSnackbar } from "./app";

const baseUrl = "http://localhost:5000/api/auth";

export const loadUser = () => async dispatch => {
  dispatch(handleLoading(true));

  try {
    const { data } = await axios.get(`${baseUrl}/me`, axiosHeader());

    dispatch({
      type: USER_LOADED,
      payload: data.user
    });
  } catch (error) {
    dispatch({ type: AUTH_FAIL });
  } finally {
    dispatch(handleLoading(false));
  }
};

export const login = ({ email, password }) => async dispatch => {
  dispatch(handleLoading(true));
  try {
    const {
      data: { user, token }
    } = await axios.post(`${baseUrl}/login`, { email, password });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user, token }
    });
    dispatch(handleSnackbar(true, "success", "Logged in"));
  } catch (error) {
    const { data } = error.response;
    dispatch(handleSnackbar(true, "error", data.message));
    dispatch({ type: AUTH_FAIL });
  } finally {
    dispatch(handleLoading(false));
  }
};

export const registerNewUser = ({
  email,
  password,
  username,
  firstname,
  lastname
}) => async dispatch => {
  dispatch(handleLoading(true));
  try {
    const {
      data: { info, user }
    } = await axios.post(`${baseUrl}/register`, {
      email,
      password,
      username,
      firstname,
      lastname
    });
    dispatch({
      type: REGISTER_SUCCESS,
      payload: user
    });
    dispatch(
      handleSnackbar(
        true,
        "success",
        `You have successfully registered. ${info}`
      )
    );
  } catch (error) {
    const { data } = error.response;
    dispatch(handleSnackbar(true, "error", data.message));
    dispatch({ type: AUTH_FAIL });
  } finally {
    dispatch(handleLoading(false));
  }
};

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT_SUCCESS });
  dispatch(handleSnackbar(true, "success", "Logged out"));
};

export const verifyEmailFromToken = verificationToken => dispatch => {
  dispatch(handleLoading(true));
  return new Promise(async resolve => {
    try {
      const {
        data: { user, token }
      } = await axios.post(`${baseUrl}/verifyemail/${verificationToken}`);
      dispatch({
        type: VERIFICATION_SUCCESS,
        payload: { user, token }
      });
      dispatch(handleSnackbar(true, "success", `Email verified`));
    } catch (error) {
      const { data } = error.response;
      dispatch(handleSnackbar(true, "error", data.message));
      dispatch({ type: AUTH_FAIL });
    } finally {
      dispatch(handleLoading(false));
      resolve();
    }
  });
};

export const sendForgotPasswordInfo = email => dispatch => {
  dispatch(handleLoading(true));
  return new Promise(async resolve => {
    try {
      await axios.post(`${baseUrl}/forgotpassword`, { email });
      dispatch(
        handleSnackbar(
          true,
          "success",
          "You will receive an email with instructions on how to reset your password in a few minutes."
        )
      );
    } catch (error) {
      const { data } = error.response;
      dispatch(handleSnackbar(true, "error", data.message));
    } finally {
      dispatch(handleLoading(false));
      resolve();
    }
  });
};

export const resetUserPassword = ({
  password,
  resetToken
}) => async dispatch => {
  dispatch(handleLoading(true));
  return new Promise(async resolve => {
    try {
      const {
        data: { user, token }
      } = await axios.put(`${baseUrl}/resetpassword/${resetToken}`, {
        password
      });
      dispatch({
        type: AUTH_SUCCESS,
        payload: { user, token }
      });
      dispatch(
        handleSnackbar(true, "success", "Successfully Updated the password.")
      );
    } catch (error) {
      const { data } = error.response;
      dispatch(handleSnackbar(true, "error", data.message));
    } finally {
      dispatch(handleLoading(false));
      resolve();
    }
  });
};
