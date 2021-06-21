import { createSelector } from 'reselect';
import { Job } from "../../types";

const getJobs = (state: any) => state.jobs.data;
const getCountry = (state: any) => state.common.country;
const getIsRemote = (state: any) => state.common.isRemote;
const getIsFavourite = (state: any) => state.common.isFavourite;
const getIsBackend = (state: any) => state.common.isBackend;
const getIsFullstack = (state: any) => state.common.isFullstack;
const getIsFrontend = (state: any) => state.common.isFrontend;
const getUserJobs = (state: any) => state.user.data.jobs;

export const filterJobs = createSelector(
		getJobs, 
		getCountry, 
		getIsRemote, 
		getIsFavourite, 
		getIsBackend,
		getIsFullstack,
		getIsFrontend,
		getUserJobs, (
			jobs, 
			country, 
			isRemote, 
			isFavourite,
			isBackend,
			isFullstack,
			isFrontend, 
			favourites
		) => {
	// console.log("filterJobs by - ", {country}, {isRemote}, {isFavourite}, {favourites});
	let filteredJobs: Job [] = [...jobs];

	if (country){
		filteredJobs = jobs.filter((job : Job) => job.location.toLowerCase().includes(country.name.toLowerCase()));
	}

	if (isRemote){
		filteredJobs = filteredJobs.filter((job : Job) => job.isremote === true);
	}

	if (isBackend){
		filteredJobs = filteredJobs.filter((job : Job) => job.jobs.includes("backend"));
	}

	if (isFullstack){
		filteredJobs = filteredJobs.filter((job : Job) => job.jobs.includes("fullstack"));
	}

	if (isFrontend){
		filteredJobs = filteredJobs.filter((job : Job) => job.jobs.includes("frontend"));
	}

	if (isFavourite && favourites){
		filteredJobs = filteredJobs.filter((job: Job) => favourites.includes(job.externalId));
	}

	return filteredJobs;
});