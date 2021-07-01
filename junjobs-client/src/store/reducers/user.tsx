import * as actionTypes from "../constants/constants";
import { AnyAction } from "redux";
import { UserState } from "../../types";

const initialState: UserState = {
  isLoading: false,
  error: null,
  data: {},
  loggedIn: false,
  isEmailConfirmed: false
};


const user = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_BEGIN:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.USER_LOGIN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null,
        loggedIn: true,
        data: action.payload,
        isEmailConfirmed: true
      };
    }
    case actionTypes.USER_LOGIN_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        loggedIn: false,
      };
    }
    case actionTypes.USER_SIGNUP_BEGIN:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.USER_SIGNUP_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    }
    case actionTypes.USER_SIGNUP_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        loggedIn: false,
      };
    }
    case actionTypes.USER_UPDATE_DATA_BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case actionTypes.USER_UPDATE_DATA_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null
      };
    }
    case actionTypes.USER_UPDATE_DATA_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case actionTypes.USER_GET_DATA_BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case actionTypes.USER_GET_DATA_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload
      };
    }
    case actionTypes.USER_GET_DATA_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case actionTypes.USER_LOGOUT: {
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
    case actionTypes.USER_SET_JOBS_ARR:
      return {
        ...state,
        data: {...state.data, jobs: action.payload}
      };
    case actionTypes.USER_SET_CANDIDATES_ARR:
      return {
        ...state,
        data: {...state.data, candidates: action.payload}
      };  
    case actionTypes.USER_SET_CONFIRMED:
      return {
        ...state,
        isEmailConfirmed: true
      };
    default:
      return state;
  }
};

export default user;
