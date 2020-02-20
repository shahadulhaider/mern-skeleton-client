import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  AUTH_FAIL,
  AUTH_SUCCESS,
  USER_LOADED,
  LOGOUT_SUCCESS,
  VERIFICATION_SUCCESS
} from "../store/types";

const initialState = {
  isAuthenticated: false,
  user: {},
  token: localStorage.getItem("token")
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case LOGIN_SUCCESS:
    case AUTH_SUCCESS:
    case VERIFICATION_SUCCESS: {
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        isAuthenticated: true,
        user: payload.user,
        token: payload.token
      };
    }

    case LOGOUT_SUCCESS:
    case AUTH_FAIL: {
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        user: {},
        token: null
      };
    }

    case REGISTER_SUCCESS: {
      return {
        ...state,
        user: payload
      };
    }

    case USER_LOADED: {
      return {
        ...state,
        isAuthenticated: true,
        user: payload
      };
    }

    default:
      return state;
  }
}
