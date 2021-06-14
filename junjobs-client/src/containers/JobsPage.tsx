import {useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner, Form, Button } from "react-bootstrap";
import { setUserJob, removeUserJob, updateUserJobs } from "../store/actions/user";
import { fetchJobs, toggleIsRemote, toggleIsFavourite, setCountry } from "../store/actions/jobs";
import { filterJobs } from '../store/selectors/jobs';
import { Country } from "../types";
import JobsList from "../components/JobsList/JobsList";
import Pagination from "../components/Pagination/Pagination";
import { PAGINATION_ITEMS_PER_PAGE, PAGINATION_PAGES_PER_BLOCK, userRole } from "../store/constants/constants";
import FiltersBar from "../components/FiltersBar/FiltersBar";

const JobsPage = () => {
  const visibleJobs = useSelector(filterJobs);
  const isJobsLoading = useSelector((state: any) => state.jobs.isLoading);
  const isRemote = useSelector((state: any) => state.jobs.isRemote);
  const isFavourite = useSelector((state: any) => state.jobs.isFavourite);
  const country = useSelector((state: any) => state.jobs.country);
  const jobsError = useSelector((state: any) => state.jobs.error);
  const userFavourites = useSelector((state: any) => state.user.data?.jobs);
  const role = useSelector((state: any) => state.user.data?.role);
  const isUserLoading = useSelector((state: any) => state.user.isLoading);
  const userError = useSelector((state: any) => state.user.error);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobs());
  }, []);

  const onRemoteChange = () => {
    dispatch(toggleIsRemote());
    paginate(1);
  };

  const onFavouritesChange = () => {
    dispatch(toggleIsFavourite());
    paginate(1);
    
  };

  const onSaveChange = () => {
    dispatch(updateUserJobs(userFavourites));
  };

  const addJob = (job: string) => {
    dispatch(setUserJob(job, userFavourites));
    onSaveChange();
  }

  const removeJob = (job: string) => {
    dispatch(removeUserJob(job, userFavourites));
    onSaveChange();
  }

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
    <div className="text-white-50">
      <FiltersBar 
        country={country} 
        onCountryChange={onCountryChange} 
        onFavouritesChange={onFavouritesChange}
        isFavourite={isFavourite}
        role={role}
        onRemoteChange={onRemoteChange}
        isRemote={isRemote}
      />

      <div className="my-5">
        <p className="text-center">
          {visibleJobs?.length}
          {isFavourite ? " Selected Software Jobs Found" : " Entry Level Software Jobs Found"} 
          {isJobsLoading && <Spinner as="span" variant="primary" animation="border" />}
        </p>
      </div>

      <JobsList 
        jobs={currentJobsOnPage} 
        withAdd={role === userRole.CANDIDATE} 
        checkedJobs={userFavourites} 
        addJob={(job: string) => addJob(job)} 
        removeJob={(job: string) => removeJob(job)}
      />

      {
        visibleJobs.length > 0 &&
          <div className="my-5">
            <Pagination totalItems={visibleJobs.length}
                itemsPerPage={jobsPerPage}
                paginate={paginate}
                currentPage={currentPage}
                pagesPerBlock={pagesPerBlock}
            />
          </div>
      }


      <h3 className="text-left mb-4">{jobsError && `Error: ${jobsError}`}</h3>
    </div>
  );
};

export default JobsPage;
