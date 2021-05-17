// user
export const USER_LOGIN_BEGIN = "USER_LOGIN_BEGIN";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";
export const USER_SIGNUP_BEGIN = "USER_SIGNUP_BEGIN";
export const USER_SIGNUP_SUCCESS = "USER_SIGNUP_SUCCESS";
export const USER_SIGNUP_FAILURE = "USER_SIGNUP_FAILURE";
export const USER_SET_TOKEN = "USER_SET_TOKEN";
export const USER_SET_JOBS_ARR = "USER_SET_JOBS_ARR";
export const USER_SET_CANDIDATES_ARR = "USER_SET_CANDIDATES_ARR";
export const USER_UPDATE_JOBS_BEGIN = "USER_UPDATE_JOBS_BEGIN";
export const USER_UPDATE_JOBS_SUCCESS = "USER_UPDATE_JOBS_SUCCESS";
export const USER_UPDATE_JOBS_FAILURE = "USER_UPDATE_JOBS_FAILURE";
export const USER_GET_JOBS_BEGIN = "USER_GET_JOBS_BEGIN";
export const USER_GET_JOBS_SUCCESS = "USER_GET_JOBS_SUCCESS";
export const USER_GET_JOBS_FAILURE = "USER_GET_JOBS_FAILURE";
export const USER_LOGOUT = "USER_LOGOUT";
export const RESET_ERROR = "RESET_ERROR";

//jobs
export const JOBS_FETCH_BEGIN = "JOBS_FETCH_BEGIN";
export const JOBS_FETCH_SUCCESS = "JOBS_FETCH_SUCCESS";
export const JOBS_FETCH_FAILURE = "JOBS_FETCH_FAILURE";
export const JOBS_SEARCH_BY_QUERY = "JOBS_SEARCH_BY_QUERY";
export const JOBS_IS_REMOTE_TOGGLE = "JOBS_IS_REMOTE_TOGGLE";
export const JOBS_IS_FAVOURITE_TOGGLE = "JOBS_IS_FAVOURITE_TOGGLE";
export const JOBS_SET_QUERY = "JOBS_SET_QUERY";
export const JOBS_SET_COUNTRY = "JOBS_SET_COUNTRY";

//pagination
export const PAGINATION_ITEMS_PER_PAGE = 10;
export const PAGINATION_PAGES_PER_BLOCK = 6;

//candidates
export const CANDIDATES_FETCH_BEGIN = "CANDIDATES_FETCH_BEGIN";
export const CANDIDATES_FETCH_SUCCESS = "CANDIDATES_FETCH_SUCCESS";
export const CANDIDATES_FETCH_FAILURE = "CANDIDATES_FETCH_FAILURE";
export const CANDIDATES_ADD_OR_UPDATE_CANDIDATE_BEGIN = "CANDIDATES_ADD_OR_UPDATE_CANDIDATE_BEGIN";
export const CANDIDATES_ADD_OR_UPDATE_CANDIDATE_SUCCESS = "CANDIDATES_ADD_OR_UPDATE_CANDIDATE_SUCCESS";
export const CANDIDATES_ADD_OR_UPDATE_CANDIDATE_FAILURE = "CANDIDATES_ADD_OR_UPDATE_CANDIDATE_FAILURE";
export const CANDIDATES_SET_COUNTRY = "CANDIDATES_SET_COUNTRY";
export const CANDIDATES_IS_REMOTE_TOGGLE = "CANDIDATES_IS_REMOTE_TOGGLE";

export enum userRole {
    CANDIDATE = "candidate",
    HR = "hr"
}