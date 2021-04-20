import React, {useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner, Form } from "react-bootstrap";
import { fetchJobs, toggleIsRemote, setQuery } from "../store/actions/jobs";
import { filterJobs } from '../store/selectors/jobs';
import JobsList from "../components/JobsList/JobsList";
import Pagination from "../components/Pagination/Pagination";

const JobsPage = () => {
  const visibleJobs = useSelector(filterJobs);
  const isLoading = useSelector((state: any) => state.jobs.isLoading);
  const isRemote = useSelector((state: any) => state.jobs.isRemote);
  const error = useSelector((state: any) => state.jobs.error);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobs());
  }, []);

  const onChange = () => {
    dispatch(toggleIsRemote());
    paginate(1);
    if (isRemote){
      dispatch(setQuery(""));
    }else{
      dispatch(setQuery("remote"));
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(5);
  const [pagesPerBlock] = useState(6);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobsOnPage = visibleJobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (curPage: number) => setCurrentPage(curPage);

  return (
    <div className="py-4">

        <Pagination totalItems={visibleJobs.length}
            itemsPerPage={jobsPerPage}
            paginate={paginate}
            currentPage={currentPage}
            pagesPerBlock={pagesPerBlock}
        />

      <Form className="text-center my-4">
        <Form.Check 
          type="switch"
          id="custom-switch"
          label="Remote jobs only"
          onChange={onChange}
          checked={isRemote}
        />
      </Form>
      <p className="text-center">
        {visibleJobs?.length} Entry Level Software Jobs Found
        {isLoading && <Spinner as="span" variant="info" animation="border" />}
      </p>
      <JobsList jobs={currentJobsOnPage} />
      <h3 className="text-left mb-4">{error && `Error: ${error}`}</h3>
    </div>
  );
};

export default JobsPage;
