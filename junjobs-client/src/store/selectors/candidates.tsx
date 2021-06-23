import { createSelector } from 'reselect';
import { Candidate } from "../../types";

const getCandidates= (state: any) => state.candidates.data;
const getCountry = (state: any) => state.common.country;
const getIsRemote = (state: any) => state.common.isRemote;
const getIsFavourite = (state: any) => state.common.isFavourite;
const getIsBackend = (state: any) => state.common.isBackend;
const getIsFullstack = (state: any) => state.common.isFullstack;
const getIsFrontend = (state: any) => state.common.isFrontend;
const getUserCandidates = (state: any) => state.user.data.candidates;

export const filterCandidates = createSelector(
	getCandidates, 
	getCountry, 
	getIsRemote, 
	getIsFavourite, 
	getIsBackend,
	getIsFullstack,
	getIsFrontend,
	getUserCandidates, (
		candidates, 
		country, 
		isRemote, 
		isFavourite,
		isBackend,
		isFullstack,
		isFrontend, 
		favourites
	) => {
	// console.log("filterCandidates by - ", {country}, {isRemote},{isFavourite}, {favourites});

	let filteredCandidates: Candidate [] = [...candidates];

	if (country){
		filteredCandidates = filteredCandidates.filter((candidate : Candidate) => candidate.location?.toLowerCase().includes(country.name.toLowerCase()));
	}

	if (isRemote){
		filteredCandidates = candidates.filter((candidate : Candidate) => candidate.isremote === true);
	}

	if (isBackend){
		filteredCandidates = filteredCandidates.filter((candidate : Candidate) => candidate.jobs.includes("backend"));
	}

	if (isFullstack){
		filteredCandidates = filteredCandidates.filter((candidate : Candidate) => candidate.jobs.includes("fullstack"));
	}

	if (isFrontend){
		filteredCandidates = filteredCandidates.filter((candidate : Candidate) => candidate.jobs.includes("frontend"));
	}

	if (isFavourite && favourites){
		filteredCandidates = filteredCandidates.filter((candidate : Candidate) => favourites.includes(candidate._id));
	}

	return sortByDate(filteredCandidates);
});

const sortByDate = (candidates: Candidate[]): Candidate[] => 
	candidates.sort((j1, j2) => new Date(j2.createdAt).getTime() - new Date(j1.createdAt).getTime());