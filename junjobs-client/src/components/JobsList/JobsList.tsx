import JobCardDark from "../Card/JobCardDark";
import { IJobsListProps } from "../../types";

const JobsList = ({ jobs, withAdd, checkedJobs, addJob, removeJob }: IJobsListProps) => {
  if (!jobs.length) return null;
  return (
    <section className="container">
      <div className="row gy-5">
      {
        jobs.map((job) => {
              return (
                <div className="col-xl-4 col-lg-6 col-sm-12 mb-4 d-flex justify-content-center" key={job.externalId}>
                  <JobCardDark 
                    job={job} 
                    key={job.externalId} 
                    isChecked={isChecked(checkedJobs, job.externalId)} 
                    withAdd={withAdd} 
                    addJob={addJob} 
                    removeJob={removeJob}
                  />
                </div>
              )
        })
      }
      </div>
    </section>
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
