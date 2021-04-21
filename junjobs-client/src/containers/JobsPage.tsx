import React, {useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner, Form } from "react-bootstrap";
import { fetchJobs, toggleIsRemote, setCountry } from "../store/actions/jobs";
import { filterJobs } from '../store/selectors/jobs';
import { Country } from "../types";
import JobsList from "../components/JobsList/JobsList";
import Pagination from "../components/Pagination/Pagination";
import { PAGINATION_JOBS_PER_PAGE, PAGINATION_PAGES_PER_BLOCK } from "../store/constants/constants";
import CountriesList from "../components/CoutriesList/CountriesList";


const JobsPage = () => {
  const visibleJobs = useSelector(filterJobs);
  const isLoading = useSelector((state: any) => state.jobs.isLoading);
  const isRemote = useSelector((state: any) => state.jobs.isRemote);
  const country = useSelector((state: any) => state.jobs.country);
  const error = useSelector((state: any) => state.jobs.error);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobs());
  }, []);


  const onSwitchChange = () => {
    dispatch(toggleIsRemote());
    paginate(1);
  };

  // coutry list
  const onCountryChange = (country: Country | null) => {
    dispatch(setCountry(country))
    paginate(1);
  }

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = PAGINATION_JOBS_PER_PAGE;
  const pagesPerBlock = PAGINATION_PAGES_PER_BLOCK;

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobsOnPage = visibleJobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (curPage: number) => setCurrentPage(curPage);

  return (
    <div className="py-4">

      <CountriesList country={country} setCountry={onCountryChange}/>

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
          onChange={onSwitchChange}
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
