import JobCard from "../Card/JobCard";
import { IJobsListProps } from "../../types";

const JobsList = ({ jobs, withAdd, checkedJobs, addJob, removeJob }: IJobsListProps) => {
  if (!jobs.length) return null;
  return (
    <div className="d-flex flex-wrap justify-content-md-center">
      {jobs.map((job, i) => {
            return <JobCard 
              job={job} 
              key={job.externalId} 
              isChecked={isChecked(checkedJobs, job.externalId)} 
              withAdd={withAdd} 
              addJob={addJob} 
              removeJob={removeJob}
            />
            })
      }
    </div>
  );
};

const isChecked = (jobs: string[], jobid: string) => {
  if (jobs){
    const index = jobs.indexOf(jobid);
    if(index !== -1){
      return true;
    }
  }
  return false;
}

export default JobsList;
