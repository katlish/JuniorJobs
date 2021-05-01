import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import * as actions from "../constants/constants";
import { API_BASE_URL } from "../../API";
import { Candidate, CandidatesState, Country } from "../../types";

export const fetchCandidates = (): ThunkAction<
  void,
  CandidatesState,
  unknown,
  AnyAction
> => async dispatch => {
  try {
    dispatch({ type: actions.CANDIDATES_FETCH_BEGIN });
    const { data } = await API_BASE_URL.get('/candidates');
    dispatch({ type: actions.CANDIDATES_FETCH_SUCCESS, payload: data });
  } catch (e) {
    dispatch({
      type: actions.CANDIDATES_FETCH_FAILURE,
      payload: e.message
    });
    throw e;
  }
};

export const addOrUpdateCandidate = (candidate: Candidate): ThunkAction<
  void,
  CandidatesState,
  unknown,
  AnyAction
> => async dispatch => {
  try {
    dispatch({ type: actions.CANDIDATES_ADD_OR_UPDATE_CANDIDATE_BEGIN });
    await API_BASE_URL.post('/candidates', candidate);
    dispatch({ type: actions.CANDIDATES_FETCH_BEGIN });
    const { data } = await API_BASE_URL.get('/candidates');
    dispatch({ type: actions.CANDIDATES_ADD_OR_UPDATE_CANDIDATE_SUCCESS, payload: data});
  } catch (e) {
    dispatch({
      type: actions.CANDIDATES_ADD_OR_UPDATE_CANDIDATE_FAILURE,
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