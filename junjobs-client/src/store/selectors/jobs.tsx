import { createSelector } from 'reselect';
import { Job } from "../../types";

const getJobs = (state: any) => state.jobs.data;
const getCountry = (state: any) => state.jobs.country;
const getIsRemote = (state: any) => state.jobs.isRemote;
const getIsFavourite = (state: any) => state.jobs.isFavourite;
const getUserJobs = (state: any) => state.user.data.jobs;

export const filterJobs = createSelector(getJobs, getCountry, getIsRemote, getIsFavourite, getUserJobs, (jobs, country, isRemote, isFavourite, favourites) => {
	console.log("filterJobs by - ", {country}, {isRemote}, {isFavourite}, {favourites});
	let filteredJobs: Job [] = [...jobs];

	if (country){
		filteredJobs = jobs.filter((job : Job) => job.location.toLowerCase().includes(country.name.toLowerCase()));
	}

	if (isRemote){
		filteredJobs = filteredJobs.filter((job : Job) => job.isremote === true);
	}

	if (isFavourite && favourites){
		filteredJobs = filteredJobs.filter((job: Job) => favourites.includes(job.externalId));
	}

	return filteredJobs;
});