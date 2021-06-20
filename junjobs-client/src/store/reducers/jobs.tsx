import * as actionTypes from "../constants/constants";
import { AnyAction } from "redux";
import { JobsState } from "../../types";

const initialState: JobsState = {
  isLoading: true,
  data: [],
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
        isLoading: false
      };
    }
    default:
      return state;
  }
};

export default jobs;
