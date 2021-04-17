import * as actions from "../constants/constants";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { API_JOBS } from "../../API";
import { JobsState } from "../../types";

const HASH = process.env.REACT_APP_HASH_FOR_JOBS_IN_GITHUB;

export const fetchJobs = (): ThunkAction<
  void,
  JobsState,
  unknown,
  AnyAction
> => async dispatch => {
  try {
    dispatch({ type: actions.JOBS_FETCH_BEGIN });
    const { data } = await API_JOBS.get(`/api/jobs?hash=${HASH}`);
    dispatch({ type: actions.JOBS_FETCH_SUCCESS, payload: data });
  } catch (e) {
    dispatch({
      type: actions.JOBS_FETCH_FAILURE,
      payload: e.message
    });
    throw e;
  }
};
