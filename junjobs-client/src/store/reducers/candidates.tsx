import * as actionTypes from "../constants/constants";
import { AnyAction } from "redux";
import { CandidatesState } from "../../types";

const initialState: CandidatesState = {
  isLoading: true,
  error: null,
  data: [],
  isRemote: false,
  country: null
};

const candidates = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.CANDIDATES_FETCH_BEGIN:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.CANDIDATES_FETCH_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload,
      };
    }
    case actionTypes.CANDIDATES_FETCH_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case actionTypes.CANDIDATES_ADD_OR_UPDATE_CANDIDATE_BEGIN:
      return {
        ...state,
        isLoading: true
    }
    case actionTypes.CANDIDATES_ADD_OR_UPDATE_CANDIDATE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload
      };
    }
    case actionTypes.CANDIDATES_ADD_OR_UPDATE_CANDIDATE_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case actionTypes.CANDIDATES_SET_COUNTRY: {
      return {
        ...state,
        country: action.country
      };
    }
    case actionTypes.CANDIDATES_IS_REMOTE_TOGGLE: {
      return {
        ...state,
        isRemote: !state.isRemote
      };
    }
    case actionTypes.RESET_ERROR:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

export default candidates;
