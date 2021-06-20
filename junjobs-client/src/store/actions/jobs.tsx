import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import * as actions from "../constants/constants";
import { API_BASE_URL } from "../../API";
import { JobsState } from "../../types";

export const fetchJobs = (): ThunkAction<
  void,
  JobsState,
  unknown,
  AnyAction
> => async dispatch => {
  try {
    dispatch({ type: actions.JOBS_FETCH_BEGIN });
    const { data } = await API_BASE_URL.get(`/jobs`);
    dispatch({ type: actions.JOBS_FETCH_SUCCESS, payload: data });
  } catch (e) {
    dispatch({ type: actions.JOBS_FETCH_FAILURE });
    dispatch({
      type: actions.COMMON_SET_ERROR,
      payload: e.message
    });
    throw e;
  }
};