import * as actions from "../constants/constants";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { API_BASE_URL } from "../../API";
import { UserState } from "../../types";

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

export const setUserJob = (job: string, userCurrentJobs: string[]) => {
  if (job){
    const items = userCurrentJobs;
    const index = items.indexOf(job);
    if (index === -1) {
      items.push(job);
      return ({
        type: actions.USER_SET_JOBS_ARR,
        payload: items
      })
    }
  }
  return;
};

export const removeUserJob = (job: string, userCurrentJobs: string[]) => {
  if (job){
    const items = userCurrentJobs;
    const index = items.indexOf(job);
    if (index > -1) {
      items.splice(index, 1);
      return ({
        type: actions.USER_SET_JOBS_ARR,
        payload: items
      })
    }
  }
  return;
};
