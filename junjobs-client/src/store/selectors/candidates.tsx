import { createSelector } from 'reselect';
import { Candidate } from "../../types";

const getCandidates= (state: any) => state.candidates.data;
const getCountry = (state: any) => state.common.country;
const getIsRemote = (state: any) => state.common.isRemote;
const getIsFavourite = (state: any) => state.common.isFavourite;
const getUserCandidates = (state: any) => state.user.data.candidates;

export const filterCandidates = createSelector(getCandidates, getCountry, getIsRemote, getIsFavourite, getUserCandidates,(candidates, country, isRemote, isFavourite, favourites) => {
	console.log("filterCandidates by - ", {country}, {isRemote},{isFavourite}, {favourites});

	let filteredCandidates: Candidate [] = [...candidates];

	if (country){
		filteredCandidates = filteredCandidates.filter((candidate : Candidate) => candidate.location?.toLowerCase().includes(country.name.toLowerCase()));
	}

	if (isRemote){
		filteredCandidates = candidates.filter((candidate : Candidate) => candidate.isremote === true);
	}

	if (isFavourite && favourites){
		filteredCandidates = filteredCandidates.filter((candidate : Candidate) => favourites.includes(candidate._id));
	}

	return filteredCandidates;
});
