import React, {useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner, Form } from "react-bootstrap";
import { fetchCandidates, setCountry, toggleIsRemote } from "../store/actions/candidates";
import { filterCandidates } from '../store/selectors/candidates';
import { Country } from "../types";
import CandidatesList from "../components/CandidatesList/CandidatesList";
import Pagination from "../components/Pagination/Pagination";
import { PAGINATION_ITEMS_PER_PAGE, PAGINATION_PAGES_PER_BLOCK } from "../store/constants/constants";
import CountriesList from "../components/CoutriesList/CountriesList";


const CandidatesPage = () => {
  const visibleCandidates = useSelector(filterCandidates);
  const isLoading = useSelector((state: any) => state.candidates.isLoading);
  const isRemote = useSelector((state: any) => state.candidates.isRemote);
  const country = useSelector((state: any) => state.candidates.country);
  const error = useSelector((state: any) => state.candidates.error);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCandidates());
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
  const candidatesPerPage = PAGINATION_ITEMS_PER_PAGE;
  const pagesPerBlock = PAGINATION_PAGES_PER_BLOCK;

  const indexOfLastCandidate = currentPage * candidatesPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
  const currentCandidatesOnPage = visibleCandidates.slice(indexOfFirstCandidate, indexOfLastCandidate);

  const paginate = (curPage: number) => setCurrentPage(curPage);

  return (
    <div className="py-4">

      <CountriesList country={country} setCountry={onCountryChange}/>
      
      <Form className="text-center my-4">
        <Form.Check 
          type="switch"
          id="custom-switch"
          label="Remote candidates only"
          onChange={onSwitchChange}
          checked={isRemote}
        />
      </Form>

      <Pagination totalItems={visibleCandidates.length}
          itemsPerPage={candidatesPerPage}
          paginate={paginate}
          currentPage={currentPage}
          pagesPerBlock={pagesPerBlock}
      />

      
      <p className="text-center">
        {visibleCandidates?.length} Candidates Found
        {isLoading && <Spinner as="span" variant="info" animation="border" />}
      </p>
      <CandidatesList candidates={currentCandidatesOnPage} />
      <h3 className="text-left mb-4">{error && `Error: ${error}`}</h3>
    </div>
  );
};

export default CandidatesPage;
