import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import * as actions from "../constants/constants";
import { API_JOBS } from "../../API";
import { JobsState } from "../../types";

export const fetchJobs = (): ThunkAction<
  void,
  JobsState,
  unknown,
  AnyAction
> => async dispatch => {
  try {
    dispatch({ type: actions.JOBS_FETCH_BEGIN });
    const { data } = await API_JOBS.get(`/api/jobs`);
    dispatch({ type: actions.JOBS_FETCH_SUCCESS, payload: data });
  } catch (e) {
    dispatch({
      type: actions.JOBS_FETCH_FAILURE,
      payload: e.message
    });
    throw e;
  }
};

export const toggleIsRemote = () => ({
	type: actions.JOBS_IS_REMOTE_TOGGLE
});

export const setQuery = (query: string) => ({
	type: actions.JOBS_SET_QUERY,
  query
});