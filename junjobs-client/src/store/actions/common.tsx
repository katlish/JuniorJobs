import * as actions from "../constants/constants";
import { Country } from "../../types";

export const toggleIsRemote = () => ({
	type: actions.COMMON_IS_REMOTE_TOGGLE
});

export const toggleIsFavourite = () => ({
	type: actions.COMMON_IS_FAVOURITE_TOGGLE
});

export const toggleIsBackend = () => ({
	type: actions.COMMON_IS_BACKEND_TOGGLE
});

export const toggleIsFullstack = () => ({
	type: actions.COMMON_IS_FULLSTACK_TOGGLE
});

export const toggleIsFrontend = () => ({
	type: actions.COMMON_IS_FRONTEND_TOGGLE
});

export const setCountry = (country: Country | null) => ({
	type: actions.COMMON_SET_COUNTRY,
    country
});

export const resetError = () => ({
	type: actions.COMMON_RESET_ERROR
});