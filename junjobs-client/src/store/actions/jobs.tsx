import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import * as actions from "../constants/constants";
import { API_BASE_URL } from "../../API";
import { JobsState, Country } from "../../types";

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

export const toggleIsFavourite = () => ({
	type: actions.JOBS_IS_FAVOURITE_TOGGLE
});

export const setCountry = (country: Country | null) => ({
	type: actions.JOBS_SET_COUNTRY,
  country
});