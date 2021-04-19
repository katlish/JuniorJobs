import * as actionTypes from "../constants/constants";
import { AnyAction } from "redux";
import { JobsState } from "../../types";

const initialState: JobsState = {
  isLoading: true,
  error: null,
  data: [],
  query: "remote",
  isRemote: true,
  country: "All"
};

const jobs = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.JOBS_FETCH_BEGIN:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.JOBS_FETCH_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    }
    case actionTypes.JOBS_FETCH_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case actionTypes.JOBS_IS_REMOTE_TOGGLE: {
      return {
        ...state,
        isRemote: !state.isRemote
      };
    }
    case actionTypes.JOBS_SET_QUERY: {
      return {
        ...state,
        query: action.query
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

export default jobs;
