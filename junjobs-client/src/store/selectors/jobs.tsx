import { createSelector } from 'reselect';
import { Job } from "../../types";

const getJobs = (state: any) => state.jobs.data;
const getQuery = (state: any) => state.jobs.query;

export const filterJobs = createSelector(getJobs, getQuery, (jobs, query) => {
	console.log("filterJobs by query- ", query);
	if (query.length){
		return jobs.filter((job : Job) => job.title.toLowerCase().includes(query));
	}
	return jobs;
});
