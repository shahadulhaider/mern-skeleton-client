import { DRAWER_STATE, SNACKBAR_STATE, LOADING_STATE } from '../store/types';

const initialState = {
  drawerOpen: false,
  loading: false,
  snackbar: {
    open: false,
    type: '',
    message: '',
  },
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case DRAWER_STATE: {
      return {
        ...state,
        drawerOpen: payload,
      };
    }

    case SNACKBAR_STATE: {
      return {
        ...state,
        snackbar: {
          open: payload.open,
          type: payload.type,
          message: payload.message,
        },
      };
    }

    case LOADING_STATE: {
      return {
        ...state,
        loading: payload,
      };
    }

    default:
      return state;
  }
}
