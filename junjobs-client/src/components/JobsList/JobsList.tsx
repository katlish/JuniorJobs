import React from "react";
import JobCard from "../Card/JobCard";
import { IJobsListProps } from "../../types";

const JobsList = ({ jobs }: IJobsListProps) => {
  if (!jobs.length) return null;
  return (
    <div className="books-list d-flex flex-wrap">
      {jobs.map((job, i) => (
        <JobCard job={job} />
      ))}
    </div>
  );
};

export default JobsList;
