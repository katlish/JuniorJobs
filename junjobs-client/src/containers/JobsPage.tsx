import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../store/actions/jobs";
import { Spinner } from "react-bootstrap";
// import { selectVisibleJobs } from '../store/selectors/jobs';
import JobsList from "../components/JobsList/JobsList";

const JobsPage = () => {
  // const jobs = useSelector(selectVisibleJobs);
  const jobs = useSelector((state: any) => state.jobs.data);
  const isLoading = useSelector((state: any) => state.jobs.isLoading);
  const error = useSelector((state: any) => state.jobs.error);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobs());
  }, []);

  return (
    <div className="py-4">
      <h3 className="text-left mb-4">
        Jobs
        {isLoading && <Spinner as="span" variant="info" animation="border" />}
      </h3>
      <JobsList jobs={jobs} />
      <h3 className="text-left mb-4">{error && `Error: ${error}`}</h3>
    </div>
  );
};

export default JobsPage;
