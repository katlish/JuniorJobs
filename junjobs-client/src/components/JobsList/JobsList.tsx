import React from "react";
import JobCard from "../Card/JobCard";
import { IJobsListProps } from "../../types";

const JobsList = ({ jobs }: IJobsListProps) => {
  if (!jobs.length) return null;
  return (
    <div className="d-flex flex-wrap justify-content-md-center">
      {jobs.map((job, i) => (
        <JobCard job={job} key={i} />
      ))}
    </div>
  );
};

export default JobsList;
