import * as actionTypes from "../constants/constants";
import { AnyAction } from "redux";
import { CandidatesState } from "../../types";

const initialState: CandidatesState = {
  isLoading: true,
  data: []
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
        data: action.payload,
      };
    }
    case actionTypes.CANDIDATES_FETCH_FAILURE: {
      return {
        ...state,
        isLoading: false,
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
        data: action.payload
      };
    }
    case actionTypes.CANDIDATES_ADD_OR_UPDATE_CANDIDATE_FAILURE: {
      return {
        ...state,
        isLoading: false,
      };
    }
    default:
      return state;
  }
};

export default candidates;
