import * as actionTypes from "../constants/constants";
import { AnyAction } from "redux";
import { CommonState } from "../../types";

const initialState: CommonState = {
  error: null,
  isRemote: false,
  isFavourite: false,
  country: null,
  isBackend: false,
  isFullstack: false,
  isFrontend: false
};

const common = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.COMMON_IS_REMOTE_TOGGLE: {
      return {
        ...state,
        isRemote: !state.isRemote
      };
    }
    case actionTypes.COMMON_IS_FAVOURITE_TOGGLE: {
      return {
        ...state,
        isFavourite: !state.isFavourite
      };
    }
    case actionTypes.COMMON_IS_BACKEND_TOGGLE: {
      return {
        ...state,
        isBackend: !state.isBackend
      };
    }
    case actionTypes.COMMON_IS_FULLSTACK_TOGGLE: {
      return {
        ...state,
        isFullstack: !state.isFullstack
      };
    }
    case actionTypes.COMMON_IS_FRONTEND_TOGGLE: {
      return {
        ...state,
        isFrontend: !state.isFrontend
      };
    }
    case actionTypes.COMMON_SET_COUNTRY: {
      return {
        ...state,
        country: action.country
      };
    }
    case actionTypes.COMMON_SET_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case actionTypes.COMMON_RESET_ERROR:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

export default common;
