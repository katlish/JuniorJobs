import * as actions from "../constants/constants";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { API_BASE_URL } from "../../API";
import { UserState } from "../../types";
import { setError} from "../actions/common";


export const verifyEmail  = (token: string): ThunkAction<void, UserState, unknown, AnyAction> => async dispatch => {
  try {
    await API_BASE_URL.get(`/auth/confirmation/${token}`);
    dispatch({ type: actions.USER_SET_CONFIRMED });
  } catch (e) {
    if (e?.response.data.message === "This user has already been verified."){
      dispatch({ type: actions.USER_SET_CONFIRMED });
    }
    dispatch(setError(e));
  }
};

//TODO: add success message to the common state instead of setError with the msg
export const resendEmail  = (email: string): ThunkAction<void, UserState, unknown, AnyAction> => async dispatch => {
  try {
    const { data } = await API_BASE_URL.post(`/auth/resend`, {email});
    dispatch(setError(data.message));
  } catch (e) {
    if (e?.response?.data?.message === "This user has already been verified."){
      dispatch({ type: actions.USER_SET_CONFIRMED });
    }
    dispatch(setError(e));
  }
};

export const logIn = (
  payload: any
): ThunkAction<void, UserState, unknown, AnyAction> => async dispatch => {
  try {
    dispatch({ type: actions.USER_LOGIN_BEGIN });
    const { data } = await API_BASE_URL.post("/auth/login", payload);
    dispatch({ type: actions.USER_LOGIN_SUCCESS, payload: data });
  } catch (e) {
    dispatch({
      type: actions.USER_LOGIN_FAILURE,
      payload: e.message
    });
    throw e;
  }
};

export const signUp = (
  payload: any
): ThunkAction<void, UserState, unknown, AnyAction> => async dispatch => {
  try {
    dispatch({ type: actions.USER_SIGNUP_BEGIN });
    await API_BASE_URL.post("/auth/signup", payload);
    dispatch({ type: actions.USER_SIGNUP_SUCCESS });
  } catch (e) {
    dispatch({
      type: actions.USER_SIGNUP_FAILURE,
      payload: e.message
    });
    throw e;
  }
};

export const logOut = () => ({
  type: actions.USER_LOGOUT
});

export const setUserToken = (token: string) => ({
  type: actions.USER_SET_TOKEN,
  payload: {
    token,
    data: { ...jwt_decode<JwtPayload>(token) }
  }
});

export const getUserData = (): ThunkAction<void, UserState, unknown, AnyAction> => async dispatch => {
  try {
    dispatch({ type: actions.USER_GET_DATA_BEGIN });
    const { data } = await API_BASE_URL.get("/user");
    dispatch({ type: actions.USER_GET_DATA_SUCCESS, payload: data });
  } catch (e) {
    dispatch({
      type: actions.USER_GET_DATA_FAILURE,
      payload: e.message
    });
    throw e;
  }
};

export const setUserJob = (job: string, userCurrentJobs: string[]): ThunkAction<void, UserState, unknown, AnyAction> => async dispatch => {
  const res = checkAndPushNewItem(job, userCurrentJobs);
  dispatch(updateUserJobsState(res.itemsUpdated));
};

export const removeUserJob = (job: string, userCurrentJobs: string[]): ThunkAction<void, UserState, unknown, AnyAction> => async dispatch => {
  const res = checkAndRemoveItem(job, userCurrentJobs);
  dispatch(updateUserJobsState(res.itemsUpdated));
};

export const setUserCandidate = (candidate: string, userCurrentCands: string[]): ThunkAction<void, UserState, unknown, AnyAction> => async dispatch => {
  const res = checkAndPushNewItem(candidate, userCurrentCands);
  dispatch(updateUserCandidatesState(res.itemsUpdated));
};

export const removeUserCandidate = (candidate: string, userCurrentCands: string[]): ThunkAction<void, UserState, unknown, AnyAction> => async dispatch => {
  const res = checkAndRemoveItem(candidate, userCurrentCands);
  dispatch(updateUserCandidatesState(res.itemsUpdated));
};

const updateUserJobsState = (jobs: (string[] | null)): ThunkAction<void, UserState, unknown, AnyAction> => async dispatch => {
  if (jobs){
    dispatch({
      type: actions.USER_SET_JOBS_ARR,
      payload: jobs
    });
    dispatch(updateUserData({jobs: jobs}));
  }
};

const updateUserCandidatesState = (cands: (string[] | null)): ThunkAction<void, UserState, unknown, AnyAction> => async dispatch => {
  if (cands){
    dispatch({
      type: actions.USER_SET_CANDIDATES_ARR,
      payload: cands
    });
    dispatch(updateUserData({candidates: cands}));
  }
};

const checkAndPushNewItem = (item: string, currentItems: string[]) => {
  if (item){
    const items = currentItems;
    const index = items.indexOf(item);
    if (index === -1) {
      items.push(item);
      return ({itemsUpdated: items})
    }
  }
  return ({itemsUpdated: null})
}

const checkAndRemoveItem = (item: string, currentItems: string[]) => {
  const items = currentItems;
  const index = items.indexOf(item);
  if (index > -1) {
    items.splice(index, 1);
    return ({itemsUpdated: items})
  }
  return ({itemsUpdated: null})
}

const updateUserData = (selectedItems: any): ThunkAction<void, UserState, unknown, AnyAction> => async dispatch => {
  try {
    dispatch({ type: actions.USER_UPDATE_DATA_BEGIN });
    await API_BASE_URL.post("/user", selectedItems);
    dispatch({ type: actions.USER_UPDATE_DATA_SUCCESS });
  } catch (e) {
    dispatch({
      type: actions.USER_UPDATE_DATA_FAILURE,
      payload: e.message
    });
    throw e;
  }
};

