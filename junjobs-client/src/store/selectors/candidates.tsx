import { createSelector } from 'reselect';
import { Candidate } from "../../types";

//TODO: add general reducer for country and isremote

const getCandidates= (state: any) => state.candidates.data;
const getCountry = (state: any) => state.candidates.country;
const getIsRemote = (state: any) => state.candidates.isRemote;


export const filterCandidates = createSelector(getCandidates, getCountry, getIsRemote, (candidates, country, isRemote) => {
	console.log("filterCandidates by - ", {country}, {isRemote});
	let filteredCandidates: Candidate [] = [...candidates];

	if (country){
		filteredCandidates = filteredCandidates.filter((candidate : Candidate) => candidate.location?.toLowerCase().includes(country.name.toLowerCase()));
	}

	if (isRemote){
		filteredCandidates = candidates.filter((candidate : Candidate) => candidate.isremote === true);
	}
	return filteredCandidates;
});
