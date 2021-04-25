import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import * as actions from "../constants/constants";
import { API_CANDIDATES } from "../../API";
import { CandidatesState, Candidate, Country } from "../../types";

export const fetchCandidates = (): ThunkAction<
  void,
  CandidatesState,
  unknown,
  AnyAction
> => async dispatch => {
  try {
    dispatch({ type: actions.CANDIDATES_FETCH_BEGIN });
    const { data } = await API_CANDIDATES.get(`/candidates.json`);
    const candidates: Candidate[] = [];
    Object.keys(data).forEach((candidate, index) => {
      candidates.push({
        id: data[candidate][0].id,
        name: data[candidate][0].name,
        yearsOfExperience: data[candidate][0].yearsOfExperience,
        jobs: data[candidate][0].jobs,
        location: data[candidate][0].location,
        description: data[candidate][0].description,
        url: data[candidate][0].url,
        created_at: data[candidate][0].created_at
      });
    });
    dispatch({ type: actions.CANDIDATES_FETCH_SUCCESS, payload: candidates });
  } catch (e) {
    dispatch({
      type: actions.CANDIDATES_FETCH_FAILURE,
      payload: e.message
    });
    throw e;
  }
};

export const setCountry = (country: Country | null) => ({
	type: actions.CANDIDATES_SET_COUNTRY,
  country
});

export const toggleIsRemote = () => ({
	type: actions.CANDIDATES_IS_REMOTE_TOGGLE
});