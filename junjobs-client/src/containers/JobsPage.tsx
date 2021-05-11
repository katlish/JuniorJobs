import {useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner, Form, Button } from "react-bootstrap";
import { setUserJob, removeUserJob } from "../store/actions/user";
import { fetchJobs, toggleIsRemote, toggleIsFavourite, setCountry } from "../store/actions/jobs";
import { filterJobs } from '../store/selectors/jobs';
import { Country } from "../types";
import JobsList from "../components/JobsList/JobsList";
import Pagination from "../components/Pagination/Pagination";
import { PAGINATION_ITEMS_PER_PAGE, PAGINATION_PAGES_PER_BLOCK, userRole } from "../store/constants/constants";
import CountriesList from "../components/CoutriesList/CountriesList";


const JobsPage = () => {
  const visibleJobs = useSelector(filterJobs);
  const isLoading = useSelector((state: any) => state.jobs.isLoading);
  const isRemote = useSelector((state: any) => state.jobs.isRemote);
  const isFavourite = useSelector((state: any) => state.jobs.isFavourite);
  const country = useSelector((state: any) => state.jobs.country);
  const error = useSelector((state: any) => state.jobs.error);
  const userFavourites = useSelector((state: any) => state.user.data?.jobs);
  const role = useSelector((state: any) => state.user.data?.role);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobs());
  }, []);

  const onSwitchChange = () => {
    dispatch(toggleIsRemote());
    paginate(1);
  };

  const onFavouritesChange = () => {
    dispatch(toggleIsFavourite());
    paginate(1);
  };
  
  const onCountryChange = (country: Country | null) => {
    dispatch(setCountry(country))
    paginate(1);
  }

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = PAGINATION_ITEMS_PER_PAGE;
  const pagesPerBlock = PAGINATION_PAGES_PER_BLOCK;

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobsOnPage = visibleJobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (curPage: number) => setCurrentPage(curPage);

 
  return (
    <div className="py-4">
      <Button className="d-flex flex-row justify-content-center m-auto" variant="info" onClick={onFavouritesChange}>
          {isFavourite ? "BACK TO ALL JOBS" : "MY SELECTED JOBS"}
      </Button>
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
        {visibleJobs?.length}
        {isFavourite ? " Selected Software Jobs Found" : " Entry Level Software Jobs Found"} 
        {isLoading && <Spinner as="span" variant="info" animation="border" />}
      </p>
      <JobsList 
        jobs={currentJobsOnPage} 
        withAdd={role === userRole.CANDIDATE} 
        checkedJobs={userFavourites} 
        addJob={(job: string) => dispatch(setUserJob(job, userFavourites))} 
        removeJob={(job: string) => dispatch(removeUserJob(job, userFavourites))}
      />
      <h3 className="text-left mb-4">{error && `Error: ${error}`}</h3>
    </div>
  );
};

export default JobsPage;
