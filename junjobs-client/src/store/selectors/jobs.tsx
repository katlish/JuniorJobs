import { createSelector } from 'reselect';
import { Job } from "../../types";

const getJobs = (state: any) => state.jobs.data;
const getCountry = (state: any) => state.jobs.country;
const getIsRemote = (state: any) => state.jobs.isRemote;


export const filterJobs = createSelector(getJobs, getCountry, getIsRemote, (jobs, country, isRemote) => {
	console.log("filterJobs by - ", {country}, {isRemote});
	let filteredJobs: Job [] = [...jobs];

	if (country){
		filteredJobs = filteredJobs.filter((job : Job) => job.location.toLowerCase().includes(country.name.toLowerCase()));
	}

	if (isRemote){
		filteredJobs = jobs.filter((job : Job) => job.isremote === true);
	}
	return filteredJobs;
});
