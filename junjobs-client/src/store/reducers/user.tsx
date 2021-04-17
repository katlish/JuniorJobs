import * as actionTypes from "../constants/constants";
import { AnyAction } from "redux";
import { API_USER } from "../../API/";
import { UserState } from "../../types";

const initialState: UserState = {
  isLoading: true,
  error: null,
  data: {},
  loggedIn: false
};

// TODO: add signUP
const user = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_BEGIN:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.USER_LOGIN_SUCCESS: {
      localStorage.setItem("token", action.payload.token);
      API_USER.defaults.headers.common = {
        Authorization: `bearer ${action.payload.token}`
      };
      return {
        ...state,
        isLoading: false,
        loggedIn: true,
        data: action.payload
      };
    }
    case actionTypes.USER_LOGIN_FAILURE: {
      return {
        ...state,
        isLoading: false,
        loggedIn: false,
        error: action.payload
      };
    }
    case actionTypes.USER_SET_TOKEN: {
      API_USER.defaults.headers.common = {
        Authorization: `bearer ${action.payload.token}`
      };
      return {
        ...state,
        loggedIn: true,
        data: action.payload.data
      };
    }
    case actionTypes.USER_LOGOUT: {
      localStorage.removeItem("token");
      return {
        ...state,
        data: {},
        loggedIn: false
      };
    }
    case actionTypes.RESET_ERROR:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

export default user;
