import { DRAWER_STATE, SNACKBAR_STATE, LOADING_STATE } from "../store/types";

export const handleSnackbar = (open, type = "error", message = "") => {
  return {
    type: SNACKBAR_STATE,
    payload: {
      open,
      type,
      message
    }
  };
};

export const handleDrawer = state => {
  return {
    type: DRAWER_STATE,
    payload: state
  };
};

export const handleLoading = state => {
  return {
    type: LOADING_STATE,
    payload: state
  };
};
